#!/usr/bin/env bash
#
# One-off optimisation of the assets in public/assets/.
#
# The originals were downloaded from the current med-dev.org site at full
# resolution: the hero PNG alone was 2047x2292 / 2.9 MB for a slot the CSS caps
# at 29rem, and the background video was 3.5 MB. This script re-encodes each
# file at the size it is actually displayed at and deletes the original.
#
# It is NOT part of the build. Run it manually when adding or replacing an
# asset, then commit the result. Requires cwebp (libwebp) and ffmpeg.
#
# The target widths below are 2x the largest CSS display size, so they stay
# sharp on retina screens without paying for more.

set -euo pipefail

cd "$(dirname "$0")/.."

IMAGES="public/assets/images"
VIDEOS="public/assets/videos"

for tool in cwebp ffmpeg; do
  command -v "$tool" >/dev/null || { echo "missing required tool: $tool" >&2; exit 1; }
done

# file:width — width is 2x the CSS display cap for that slot.
webp_targets=(
  "image04.png:928"   # hero, .hero__media img caps at 29rem
  "image11.jpg:1216"  # story band, half of 68rem
  "image14.jpg:1216"  # story band
  "image13.jpg:1100"  # pillar layout image
  "image03.jpg:768"   # team grid, third of 68rem
  "image01.jpg:768"   # team grid
  "image06.jpg:768"   # team grid
  "image08.jpg:768"   # team grid
  "image09.jpg:768"   # team grid
  "image10.jpg:768"   # team grid
  "image02.png:400"   # header logo, 9rem
  "image05.png:400"   # footer logo
)

for target in "${webp_targets[@]}"; do
  file="${target%%:*}"
  width="${target##*:}"
  src="$IMAGES/$file"
  out="$IMAGES/${file%.*}.webp"

  [ -f "$src" ] || { echo "skip $file (already converted)"; continue; }

  cwebp -quiet -q 80 -resize "$width" 0 "$src" -o "$out"
  printf '%-16s %6s KB -> %5s KB\n' "$file" \
    "$(( $(stat -f%z "$src") / 1024 ))" "$(( $(stat -f%z "$out") / 1024 ))"
  rm "$src"
done

# The hero is the one image with a wide DPR spread, so it also gets a 1x source
# for the srcset.
if [ -f "$IMAGES/image04.webp" ] && [ ! -f "$IMAGES/image04-464.webp" ]; then
  cwebp -quiet -q 80 -resize 464 0 "$IMAGES/image04.webp" -o "$IMAGES/image04-464.webp"
fi

# card.jpg is the Open Graph image and stays JPEG: several link unfurlers still
# handle WebP poorly. Re-encode in place at quality 82.
if [ -f "$IMAGES/card.jpg" ]; then
  ffmpeg -v error -y -i "$IMAGES/card.jpg" -q:v 5 "$IMAGES/card.opt.jpg"
  mv "$IMAGES/card.opt.jpg" "$IMAGES/card.jpg"
fi

# Background video: 1280x720 source, no audio track, sitting behind a 76% black
# overlay, so it tolerates a low bitrate. 960w is smaller but bands on large
# displays. -an drops the (already absent) audio stream explicitly.
if [ -f "$VIDEOS/bg.mp4" ] && [ ! -f "$VIDEOS/bg-opt.mp4" ]; then
  ffmpeg -v error -y -i "$VIDEOS/bg.mp4" \
    -an -vf "scale=1280:-2,fps=24" \
    -c:v libx264 -crf 34 -preset slow -pix_fmt yuv420p \
    -movflags +faststart \
    "$VIDEOS/bg-opt.mp4"
  printf '%-16s %6s KB -> %5s KB\n' "bg.mp4" \
    "$(( $(stat -f%z "$VIDEOS/bg.mp4") / 1024 ))" \
    "$(( $(stat -f%z "$VIDEOS/bg-opt.mp4") / 1024 ))"
  mv "$VIDEOS/bg-opt.mp4" "$VIDEOS/bg.mp4"
fi

# The video poster is shown on its own below 860px and under reduced motion.
if [ -f "$VIDEOS/bg.mp4.jpg" ]; then
  cwebp -quiet -q 78 -resize 1280 0 "$VIDEOS/bg.mp4.jpg" -o "$VIDEOS/bg-poster.webp"
  rm "$VIDEOS/bg.mp4.jpg"
fi

echo "done"
