export function Background() {
  return (
    <div className="site-background" aria-hidden="true">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/current-site/videos/bg.mp4.jpg"
      >
        <source src="/assets/current-site/videos/bg.mp4" type="video/mp4" />
      </video>
      <div className="site-background__overlay" />
    </div>
  );
}
