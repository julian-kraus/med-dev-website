import { useEffect, useState } from "react";

// The video is decorative and costs ~840 KB, so it is only fetched where it is
// actually worth it: wide viewports, and only when the visitor has not asked
// for reduced motion. Everywhere else the poster carries the same look.
const videoQuery = "(min-width: 861px) and (prefers-reduced-motion: no-preference)";

function shouldPlayVideo() {
  return typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(videoQuery).matches
    : false;
}

export function Background() {
  const [playVideo, setPlayVideo] = useState(shouldPlayVideo);

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
          poster="/assets/current-site/videos/bg-poster.webp"
        >
          <source src="/assets/current-site/videos/bg.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/assets/current-site/videos/bg-poster.webp"
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
