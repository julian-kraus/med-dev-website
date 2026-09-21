import { useEffect, useState } from "react";
import { asset } from "../../content/assets";

// The video is decorative and costs ~840 KB, so it is only fetched where it is
// actually worth it: wide viewports, and only when the visitor has not asked
// for reduced motion. Everywhere else the poster carries the same look.
const videoQuery = "(min-width: 861px) and (prefers-reduced-motion: no-preference)";

export function Background() {
  // Always start on the poster, matching what the prerendered HTML contains.
  // Deciding here with matchMedia would render <video> on a wide client while
  // the server rendered <img>, which is a hydration mismatch. The effect flips
  // it immediately after, which also keeps the video off the critical path.
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(videoQuery);
    const onChange = () => setPlayVideo(query.matches);

    onChange();
    query.addEventListener("change", onChange);

    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="site-background" aria-hidden="true">
      {playVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={asset("/assets/videos/bg-poster.webp")}
        >
          <source src={asset("/assets/videos/bg.mp4")} type="video/mp4" />
        </video>
      ) : (
        <img
          src={asset("/assets/videos/bg-poster.webp")}
          alt=""
          width={1280}
          height={720}
          decoding="async"
        />
      )}
      <div className="site-background__overlay" />
    </div>
  );
}
