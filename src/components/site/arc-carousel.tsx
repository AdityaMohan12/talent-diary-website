"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ENTRIES, category } from "@/components/site/diaries/entries";
import { Reveal, InkReveal } from "@/components/site/reveal";
import {
  WashiTape,
  SpiralCoil,
  Doodle,
  DoodleStar,
  InkRocket,
  SketchUnderline,
} from "@/components/site/scraps";

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const u = () => setM(mq.matches);
    u();
    mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
  }, []);
  return m;
}

/**
 * A fanned arc of diary-entry cards (the Auragate arc-carousel mechanic, adapted
 * to brand: solid paper cards, not glassmorphism). Outer cards drop and rotate
 * into a downward arc; the centre card is raised and prominent. Prev/next wrap.
 */
export function ArcCarousel() {
  const items = ENTRIES;
  const total = items.length;
  const half = Math.floor(total / 2);
  const [active, setActive] = useState(half);
  const isMobile = useIsMobile();

  const C = isMobile
    ? { cardW: 232, cardH: 340, stepX: 150, dropY: 30, tilt: 7, containerH: 470, bump: 20 }
    : { cardW: 300, cardH: 380, stepX: 236, dropY: 46, tilt: 8, containerH: 520, bump: 26 };

  const move = (dir: number) => setActive((a) => (a + dir + total) % total);

  return (
    <section className="arc-sec section">
      <SpiralCoil className="scrap--arc-coil" rings={7} />
      <Doodle tone="blue" className="scrap--arc-rocket">
        <InkRocket />
      </Doodle>
      <Doodle tone="ink" className="scrap--arc-star2">
        <DoodleStar />
      </Doodle>
      <Reveal className="wrap arc-head">
        <WashiTape className="scrap--arc-washi" />
        <span className="eyebrow">
          <span className="tri" /> From the Talent Diaries
        </span>
        <h2>
          Notes from inside startup{" "}
          <InkReveal as="span" className="ink ink--sketch">
            hiring
            <SketchUnderline />
          </InkReveal>
        </h2>
        <p className="dek">
          Founder notes, hiring diaries and candidate stories. Flip through a few.
        </p>
      </Reveal>

      <div className="arc" style={{ height: C.containerH }}>
        {items.map((e, i) => {
          let pos = i - active;
          if (pos > half) pos -= total;
          if (pos < -half) pos += total;
          const abs = Math.abs(pos);
          const isCenter = pos === 0;
          const cat = category(e.category);
          const transform = `translateX(calc(-50% + ${pos * C.stepX}px)) translateY(${
            abs * C.dropY + (isCenter ? C.bump : 0)
          }px) rotate(${pos * C.tilt}deg)`;
          return (
            <article
              key={e.id}
              className={`arc-card${isCenter ? " is-center" : ""}`}
              style={{
                width: C.cardW,
                height: C.cardH,
                transform,
                opacity: isCenter ? 1 : Math.max(0, 0.62 - (abs - 1) * 0.2),
                zIndex: 100 - abs,
                pointerEvents: isCenter ? "auto" : "none",
              }}
            >
              <span
                className="arc-card__cat"
                style={{ "--chip": cat.tint, "--chip-ink": cat.ink } as CSSProperties}
              >
                {cat.label}
              </span>
              <h3>{e.title}</h3>
              <p>{e.excerpt}</p>
              <div className="arc-card__meta">
                <span>{e.readMins} min read</span>
                <span className="dot" />
                <span>{e.date}</span>
              </div>
              {isCenter ? (
                <a className="arc-card__link" href="/diaries">
                  Read in the diaries →
                </a>
              ) : null}
            </article>
          );
        })}

        <div className="arc-nav">
          <button className="arc-btn" aria-label="Previous entry" onClick={() => move(-1)}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="arc-btn arc-btn--next"
            aria-label="Next entry"
            onClick={() => move(1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
