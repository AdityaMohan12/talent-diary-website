// Static, non-animated hero for /diaries.
// No ScrollHero, no canvas, no scroll scrubbing. A still open-journal image on
// the right, editorial copy on the left. Server component (no hooks, no client JS).

export function DiariesHero() {
  return (
    <section className="diaries-static-hero" id="top" aria-labelledby="diaries-hero-title">
      <div className="wrap dsh-grid">
        <div className="dsh-copy">
          <span className="eyebrow">
            <span className="tri" />
            The blog
          </span>
          <h1 id="diaries-hero-title">
            Welcome to our <span className="accent">Talent Diaries</span>
          </h1>
          <p className="lede">Real conversations. Honest insights. Better teams.</p>
          <div className="hero-cta">
            <a href="#latest" className="btn btn-primary">
              Start reading
            </a>
          </div>
        </div>

        <div className="dsh-visual" aria-hidden="true">
          <div className="dsh-frame">
            <img
              src="/diary/poster.png"
              alt=""
              width={1376}
              height={768}
              decoding="async"
              fetchPriority="high"
              className="dsh-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
