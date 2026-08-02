"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Link from "next/link";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { motion, useReducedMotion } from "framer-motion";
import { AtelierDiary } from "./atelier-diary";

/* Self-contained fonts for this route. Display = Bricolage (brand display),
   UI/body = Hanken (brand grotesk). Applied via className on the wrapper. */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});
const ui = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Brand palette (warm-dark Atelier mood) */
const WARM_BLACK = "#15110d";
const SECTION_DARK = "#191410"; // alternate warm near-black band
const CREAM = "#f4ede2";
const CREAM_DIM = "rgba(244,237,226,0.66)"; // softened body cream
const CREAM_FAINT = "rgba(244,237,226,0.42)";
const NEAR_WHITE = "#faf7f1";
const INK = "#211f24";
const BLUE = "#2a52ff";
const BLUE_DEEP = "#1f3fcc";
const BLUE_SOFT = "#7d93ff"; // legible blue on the dark ground
const HAIRLINE = "rgba(244,237,226,0.14)";

const NAV_ITEMS = ["Why us", "What to expect", "Founders", "Diaries"] as const;
const MAXW = 1100;

/* ---------- content (real brand copy) ---------- */

const STATS = [
  { value: "60k+", label: "startup candidates in our network" },
  { value: "Under 30 days", label: "to a vetted shortlist" },
  {
    value: "100%",
    label: "of profiles deeply vetted before they reach you",
  },
];

const DIFFS = [
  {
    title: "We only do startups",
    body: "You get recruiters who know startup pace, ownership, and ambiguity, because we have hired for niche and blended tech and non-tech roles inside fast-growing teams.",
  },
  {
    title: "Our matching gets sharper with every role",
    body: "Our matching engine learns from every assessment, screen, and rejection reason, so each shortlist we send fits your role better than the last.",
  },
  {
    title: "You interview a shortlist, not a slush pile",
    body: "Every candidate clears a rigorous screen and is mapped to your specific needs before you ever see them. Your team interviews finalists, not filler.",
  },
  {
    title: "We get startup hiring chaos",
    body: "Roles evolve, priorities shift, timelines move. We are built for that volatility, so a changing brief speeds you up instead of starting you over.",
  },
];

const STEPS = [
  {
    k: "First",
    title: "All we need is one call",
    body: "A 30-minute conversation about the role, the team, and what right looks like. No 10-page brief, no busywork on your side.",
  },
  {
    k: "Then",
    title: "A shortlist in under 30 days, or we keep going",
    body: "You get a tight, vetted shortlist mapped to your brief from our 60,000-strong network. If the first one misses, we recalibrate and send the next.",
  },
  {
    k: "No risk",
    title: "Start with a conversation, not a contract",
    body: "The first call is a no-obligation look at your role and how we would approach it. You decide what happens next.",
  },
];

const FOUNDERS = [
  {
    mono: "SM",
    name: "Sanghamitra Moulik",
    pedigree: "ex Awign, Unacademy, Interview Kickstart",
    bio: "Eight years built entirely in the chaos of startup hiring: early teams at Awign, high-volume GTM hiring for Unacademy's most profitable verticals, and highly niche mandates at Interview Kickstart. Not just recruitment experience, startup context. Do not just find someone who can do the job today. Find someone who can grow with the chaos, the momentum, and the mission.",
  },
  {
    mono: "MD",
    name: "Mashika De Almeida",
    pedigree: "ex 91Springboard, Unacademy, Interview Kickstart",
    bio: "A leadership-hiring nerd who has spent years building teams inside high-growth startups: hiring vertical heads, setting up teams from scratch, and partnering with founders on roles that never fit a standard job description. The belief it shaped: great hiring is not a funnel problem, it is a relationship problem. Build relationships long before the role exists.",
  },
];

const DIARIES = [
  {
    cat: "Founder Notes",
    title: "How to Hire Your First PM",
    excerpt: "A practical playbook for founders hiring their first product manager.",
    date: "May 10, 2024",
    mins: 6,
  },
  {
    cat: "Hiring Diaries",
    title: "Founder conversations we loved in April",
    excerpt: "Raw, unfiltered takeaways from our chats with founders building fast.",
    date: "May 2, 2024",
    mins: 5,
  },
  {
    cat: "Startup Lessons",
    title: "Building a feedback culture early",
    excerpt: "Why tight feedback loops become your unfair advantage as you scale.",
    date: "Apr 28, 2024",
    mins: 7,
  },
];

const OPERATORS = ["Unacademy", "Interview Kickstart", "91Springboard", "Awign"];

/* ---------- scroll-reveal helper (respects reduced motion) ---------- */

function Reveal({
  children,
  delay = 0,
  y = 24,
  as = "div",
  style,
  reduce,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "p" | "h2" | "header";
  style?: CSSProperties;
  reduce: boolean;
}) {
  const MotionTag = motion[as];
  if (reduce) {
    const Tag = as;
    return <Tag style={style}>{children}</Tag>;
  }
  return (
    <MotionTag
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* A quiet section eyebrow: thin rule + small tracked label. */
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 28,
      }}
    >
      <span
        aria-hidden
        style={{ width: 28, height: 1, background: BLUE_SOFT, display: "block" }}
      />
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: CREAM_FAINT,
        }}
      >
        {children}
      </span>
    </div>
  );
}

export default function AtelierPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceRaw = useReducedMotion();
  const reduce = reduceRaw ?? false;

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ----- frosted-glass helper ----- */
  const frostedPanel: CSSProperties = {
    background: "rgba(248,245,240,0.9)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.5)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  };

  /* The two interactive frosted panels passed into AtelierDiary as the overlay.
     AtelierDiary's overlay wrapper is pointerEvents:none, so each interactive
     panel sets pointerEvents:auto. They are pinned to the bottom of the sticky
     stage, mirroring the original static hero. */
  const heroPanels = (
    <>
      {/* Bottom-left frosted approach panel */}
      <div
        style={{
          position: "absolute",
          left: isMobile ? 20 : 36,
          right: isMobile ? 20 : "auto",
          bottom: isMobile ? 24 + 180 + 12 : 36,
          maxWidth: isMobile ? "none" : 270,
          borderRadius: 18,
          padding: "22px 28px",
          pointerEvents: "auto",
          ...frostedPanel,
          color: INK,
        }}
      >
        <p
          className={display.className}
          style={{
            margin: 0,
            fontWeight: 700,
            fontSize: "clamp(17px, 2vw, 24px)",
            lineHeight: 1.18,
            letterSpacing: "-0.01em",
            color: "#282425",
          }}
        >
          For startups where
          <br />
          every hire
          <br />
          matters
        </p>
        <div
          style={{
            height: 1,
            background: "rgba(33,31,36,0.18)",
            margin: "16px 0 12px",
          }}
        />
        <a
          href="#why-us"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            color: INK,
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Explore our approach
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M6 1.5v9M6 10.5L2.5 7M6 10.5L9.5 7"
              stroke={INK}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {/* Bottom-right CTA card */}
      <div
        style={{
          position: "absolute",
          right: isMobile ? 20 : 36,
          left: isMobile ? 20 : "auto",
          bottom: 36,
          width: isMobile ? "auto" : "clamp(210px, 21vw, 290px)",
          height: 180,
          borderRadius: 18,
          overflow: "hidden",
          pointerEvents: "auto",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          background: `linear-gradient(145deg, ${BLUE} 0%, ${BLUE_DEEP} 100%)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.45) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            padding: "18px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              margin: 0,
              color: NEAR_WHITE,
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.3,
              maxWidth: "92%",
            }}
          >
            Every great team starts with one right hire.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              aria-hidden="true"
              style={{
                width: 36,
                height: 36,
                flex: "0 0 auto",
                borderRadius: "50%",
                background: NEAR_WHITE,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="2" y="4" width="16" height="12" rx="2.5" stroke={BLUE_DEEP} strokeWidth="1.5" />
                <path
                  d="M3 5.5l7 5 7-5"
                  stroke={BLUE_DEEP}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <a
              href="#book"
              style={{
                flex: 1,
                height: 36,
                borderRadius: 12,
                border: "none",
                background: NEAR_WHITE,
                color: BLUE_DEEP,
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Book a hiring call
            </a>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div
      className={ui.className}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: WARM_BLACK,
        color: CREAM,
        overflowX: "hidden",
      }}
    >
      {/* ===== Animated scroll-scrubbed diary hero ===== */}
      <AtelierDiary isMobile={isMobile} overlay={heroPanels} />

      {/* ===== Fixed top navbar ===== */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "16px 20px" : "20px 36px",
        }}
      >
        <Link
          href="#"
          className={display.className}
          style={{
            textDecoration: "none",
            color: NEAR_WHITE,
            fontWeight: 700,
            fontSize: isMobile ? 18 : 21,
            letterSpacing: "-0.02em",
            display: "inline-flex",
            alignItems: "flex-start",
            gap: 2,
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
          }}
        >
          Talent Diary
          <sup
            style={{
              fontSize: isMobile ? 8 : 9,
              fontWeight: 600,
              marginTop: 2,
              opacity: 0.8,
            }}
          >
            ®
          </sup>
        </Link>

        {!isMobile ? (
          <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {NAV_ITEMS.map((item, i) => {
              const active = i === 0;
              const href =
                item === "Diaries"
                  ? "/diaries"
                  : `#${item.toLowerCase().replace(/\s+/g, "-")}`;
              return (
                <a
                  key={item}
                  href={href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    background: "rgba(248,245,240,0.92)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    borderRadius: 12,
                    padding: "13px 20px",
                    fontSize: 13,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    color: "#241f21",
                    textDecoration: "none",
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {active && (
                    <span
                      aria-hidden="true"
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: "50%",
                        background: BLUE,
                        display: "inline-block",
                      }}
                    />
                  )}
                  {item}
                </a>
              );
            })}
            <button
              type="button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(248,245,240,0.92)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "none",
                borderRadius: 999,
                padding: "13px 16px",
                fontSize: 13,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                color: "#241f21",
                cursor: "pointer",
              }}
            >
              EN
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path
                  d="M2.5 4.5L6 8l3.5-3.5"
                  stroke="#241f21"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </nav>
        ) : (
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              border: "none",
              background: "rgba(248,245,240,0.92)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                width: 16,
                height: 2,
                borderRadius: 2,
                background: "#241f21",
                transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
                transition: "transform 0.2s ease",
              }}
            />
            <span
              style={{
                width: 16,
                height: 2,
                borderRadius: 2,
                background: "#241f21",
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.2s ease",
              }}
            />
            <span
              style={{
                width: 16,
                height: 2,
                borderRadius: 2,
                background: "#241f21",
                transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
                transition: "transform 0.2s ease",
              }}
            />
          </button>
        )}
      </header>

      {/* ===== Mobile frosted dropdown menu ===== */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 66,
            left: 20,
            right: 20,
            zIndex: 99,
            borderRadius: 16,
            padding: 10,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            ...frostedPanel,
          }}
        >
          {NAV_ITEMS.map((item) => {
            const href =
              item === "Diaries"
                ? "/diaries"
                : `#${item.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <a
                key={item}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: "13px 16px",
                  borderRadius: 10,
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  color: "#241f21",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                {item}
              </a>
            );
          })}
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: "13px 16px",
              borderRadius: 10,
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              color: "#241f21",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            EN
          </a>
        </div>
      )}

      {/* ===== Fixed Styles link (variant hopper) ===== */}
      <Link
        href="/style"
        style={{
          position: "fixed",
          left: isMobile ? 10 : 14,
          top: "50%",
          transform: "translateY(-50%) rotate(180deg)",
          writingMode: "vertical-rl",
          zIndex: 120,
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: CREAM,
          textDecoration: "none",
          background: "rgba(20,16,11,0.55)",
          border: "1px solid rgba(244,237,226,0.25)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          padding: "12px 7px",
          borderRadius: 999,
          display: "inline-block",
        }}
      >
        Styles
      </Link>

      {/* ===================== PAGE BODY (below the hero) ===================== */}

      {/* ========================= PROOF / STATS ========================= */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          background: WARM_BLACK,
          borderTop: `1px solid ${HAIRLINE}`,
        }}
      >
        <div
          style={{
            maxWidth: MAXW,
            margin: "0 auto",
            padding: "clamp(56px, 8vh, 96px) 24px",
          }}
        >
          <div className="atl-stats">
            {STATS.map((s, i) => (
              <Reveal
                key={s.label}
                reduce={reduce}
                delay={i * 0.08}
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div
                  className={display.className}
                  style={{
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    fontSize: "clamp(40px, 5.2vw, 64px)",
                    color: CREAM,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    lineHeight: 1.45,
                    color: CREAM_DIM,
                    maxWidth: 260,
                  }}
                >
                  {s.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY FOUNDERS CHOOSE US ==================== */}
      <section
        id="why-us"
        style={{
          position: "relative",
          zIndex: 10,
          background: WARM_BLACK,
        }}
      >
        <div
          style={{
            maxWidth: MAXW,
            margin: "0 auto",
            padding: "clamp(64px, 10vh, 130px) 24px",
          }}
        >
          <Reveal reduce={reduce} as="header" style={{ maxWidth: 640 }}>
            <Eyebrow>Why us</Eyebrow>
            <h2
              className={display.className}
              style={{
                margin: 0,
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1.06,
                fontSize: "clamp(30px, 4.4vw, 50px)",
                color: CREAM,
              }}
            >
              Why founders <span style={{ color: BLUE_SOFT }}>choose</span> us
            </h2>
          </Reveal>

          <ol
            style={{
              listStyle: "none",
              margin: "clamp(40px, 6vh, 72px) 0 0",
              padding: 0,
            }}
          >
            {DIFFS.map((d, i) => (
              <Reveal
                key={d.title}
                reduce={reduce}
                as="li"
                delay={i * 0.05}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 0.42fr) minmax(0, 0.58fr)",
                  gap: "clamp(20px, 4vw, 64px)",
                  alignItems: "start",
                  padding: "clamp(28px, 4vh, 44px) 0",
                  borderTop: `1px solid ${HAIRLINE}`,
                }}
              >
                <div className="atl-diff-head">
                  <span
                    className={display.className}
                    style={{
                      fontWeight: 600,
                      fontSize: "clamp(26px, 3vw, 38px)",
                      color: BLUE_SOFT,
                      lineHeight: 1,
                      minWidth: "1.6em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={display.className}
                    style={{
                      margin: 0,
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.12,
                      fontSize: "clamp(20px, 2.4vw, 28px)",
                      color: CREAM,
                    }}
                  >
                    {d.title}
                  </h3>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: CREAM_DIM,
                  }}
                >
                  {d.body}
                </p>
              </Reveal>
            ))}
            <li style={{ borderTop: `1px solid ${HAIRLINE}`, height: 0 }} />
          </ol>
        </div>
      </section>

      {/* ======================= WHAT TO EXPECT ======================= */}
      <section
        id="what-to-expect"
        style={{
          position: "relative",
          zIndex: 10,
          background: SECTION_DARK,
          borderTop: `1px solid ${HAIRLINE}`,
          borderBottom: `1px solid ${HAIRLINE}`,
        }}
      >
        <div
          style={{
            maxWidth: MAXW,
            margin: "0 auto",
            padding: "clamp(64px, 10vh, 130px) 24px",
          }}
        >
          <Reveal reduce={reduce} as="header" style={{ maxWidth: 640 }}>
            <Eyebrow>What to expect</Eyebrow>
            <h2
              className={display.className}
              style={{
                margin: 0,
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1.06,
                fontSize: "clamp(30px, 4.4vw, 50px)",
                color: CREAM,
              }}
            >
              A <span style={{ color: BLUE_SOFT }}>quiet</span> process, start to
              shortlist
            </h2>
          </Reveal>

          <div className="atl-steps">
            {STEPS.map((s, i) => (
              <Reveal
                key={s.title}
                reduce={reduce}
                delay={i * 0.08}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: BLUE_SOFT,
                  }}
                >
                  {s.k}
                </span>
                <span
                  aria-hidden
                  style={{ width: "100%", height: 1, background: HAIRLINE }}
                />
                <h3
                  className={display.className}
                  style={{
                    margin: 0,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.18,
                    fontSize: "clamp(19px, 2.2vw, 23px)",
                    color: CREAM,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15.5,
                    lineHeight: 1.6,
                    color: CREAM_DIM,
                  }}
                >
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== FOUNDERS ========================== */}
      <section
        id="founders"
        style={{
          position: "relative",
          zIndex: 10,
          background: WARM_BLACK,
        }}
      >
        <div
          style={{
            maxWidth: MAXW,
            margin: "0 auto",
            padding: "clamp(72px, 12vh, 150px) 24px",
          }}
        >
          <Reveal reduce={reduce} as="header" style={{ maxWidth: 820 }}>
            <Eyebrow>Founders</Eyebrow>
            <p
              className={display.className}
              style={{
                margin: 0,
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1.12,
                fontSize: "clamp(30px, 4.8vw, 56px)",
                color: CREAM,
              }}
            >
              Hiring is a <span style={{ color: BLUE_SOFT }}>relationship</span>,
              not a funnel.
            </p>
          </Reveal>

          <div className="atl-founders">
            {FOUNDERS.map((f, i) => (
              <Reveal
                key={f.name}
                reduce={reduce}
                delay={i * 0.1}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 22,
                  paddingTop: 36,
                  borderTop: `1px solid ${HAIRLINE}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    aria-hidden
                    className={display.className}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      border: `1px solid ${BLUE_SOFT}`,
                      color: BLUE_SOFT,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 19,
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      flexShrink: 0,
                    }}
                  >
                    {f.mono}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 18,
                        letterSpacing: "-0.01em",
                        color: CREAM,
                      }}
                    >
                      {f.name}
                    </div>
                    <div
                      style={{
                        fontSize: 13.5,
                        color: CREAM_FAINT,
                        marginTop: 3,
                      }}
                    >
                      {f.pedigree}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15.5,
                    lineHeight: 1.65,
                    color: CREAM_DIM,
                  }}
                >
                  {f.bio}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FROM THE TALENT DIARIES ==================== */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          background: SECTION_DARK,
          borderTop: `1px solid ${HAIRLINE}`,
        }}
      >
        <div
          style={{
            maxWidth: MAXW,
            margin: "0 auto",
            padding: "clamp(64px, 10vh, 130px) 24px",
          }}
        >
          <Reveal
            reduce={reduce}
            as="header"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 20,
              maxWidth: "100%",
            }}
          >
            <div>
              <Eyebrow>From the Talent Diaries</Eyebrow>
              <h2
                className={display.className}
                style={{
                  margin: 0,
                  fontWeight: 700,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.06,
                  fontSize: "clamp(30px, 4.4vw, 50px)",
                  color: CREAM,
                }}
              >
                Notes on <span style={{ color: BLUE_SOFT }}>hiring</span> well
              </h2>
            </div>
            <a
              href="/diaries"
              className="atl-link"
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: BLUE_SOFT,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Read all entries →
            </a>
          </Reveal>

          <div className="atl-diary-grid">
            {DIARIES.map((d, i) => (
              <Reveal key={d.title} reduce={reduce} delay={i * 0.06}>
                <a
                  href="/diaries"
                  className="atl-diary-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    height: "100%",
                    padding: "26px 26px 28px",
                    borderRadius: 18,
                    background: "rgba(244,237,226,0.04)",
                    border: `1px solid ${HAIRLINE}`,
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <span
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: BLUE_SOFT,
                    }}
                  >
                    {d.cat}
                  </span>
                  <span
                    className={`${display.className} atl-diary-title`}
                    style={{
                      display: "block",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                      fontSize: "clamp(20px, 2.4vw, 25px)",
                      color: CREAM,
                    }}
                  >
                    {d.title}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: 14.5,
                      lineHeight: 1.5,
                      color: CREAM_DIM,
                      flex: 1,
                    }}
                  >
                    {d.excerpt}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 6,
                      fontSize: 12.5,
                      color: CREAM_FAINT,
                    }}
                  >
                    {d.date}
                    <span
                      aria-hidden
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: "50%",
                        background: CREAM_FAINT,
                      }}
                    />
                    {d.mins} min read
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= CLOSING CTA ========================= */}
      <section
        id="book"
        style={{
          position: "relative",
          zIndex: 10,
          background: WARM_BLACK,
          borderTop: `1px solid ${HAIRLINE}`,
        }}
      >
        <div
          style={{
            maxWidth: MAXW,
            margin: "0 auto",
            padding: "clamp(90px, 16vh, 200px) 24px",
            textAlign: "center",
          }}
        >
          <Reveal
            reduce={reduce}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 28,
            }}
          >
            <h2
              className={display.className}
              style={{
                margin: 0,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                fontSize: "clamp(32px, 5.4vw, 64px)",
                color: CREAM,
                maxWidth: 800,
              }}
            >
              Tell us the role. See a{" "}
              <span style={{ color: BLUE_SOFT }}>shortlist</span> in days, not
              weeks.
            </h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 14,
                marginTop: 6,
              }}
            >
              <a
                href="#book"
                className="atl-cta"
                style={{
                  textDecoration: "none",
                  padding: "15px 30px",
                  borderRadius: 999,
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: NEAR_WHITE,
                  background: `linear-gradient(145deg, ${BLUE} 0%, ${BLUE_DEEP} 100%)`,
                  boxShadow: "0 14px 36px rgba(42,82,255,0.32)",
                }}
              >
                Book a hiring call
              </a>
              <a
                href="#book"
                className="atl-ghost"
                style={{
                  textDecoration: "none",
                  padding: "15px 30px",
                  borderRadius: 999,
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: CREAM,
                  background: "transparent",
                  border: `1px solid ${HAIRLINE}`,
                }}
              >
                Submit a role
              </a>
            </div>

            <p
              style={{
                margin: "8px 0 0",
                fontSize: 14,
                lineHeight: 1.6,
                color: CREAM_FAINT,
                maxWidth: 560,
              }}
            >
              Built by operators who hired at {OPERATORS.join(", ")}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* =========================== FOOTER =========================== */}
      <footer
        style={{
          position: "relative",
          zIndex: 10,
          background: WARM_BLACK,
          borderTop: `1px solid ${HAIRLINE}`,
        }}
      >
        <div
          style={{
            maxWidth: MAXW,
            margin: "0 auto",
            padding: "clamp(36px, 6vh, 56px) 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div
            className={display.className}
            style={{
              display: "inline-flex",
              alignItems: "flex-start",
              gap: 2,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: NEAR_WHITE,
            }}
          >
            Talent Diary
            <sup style={{ fontSize: 8, fontWeight: 600, marginTop: 2, opacity: 0.8 }}>
              ®
            </sup>
          </div>

          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              fontSize: 14,
            }}
          >
            <a className="atl-foot-link" href="#why-us" style={footLink}>
              Why us
            </a>
            <a className="atl-foot-link" href="#what-to-expect" style={footLink}>
              What to expect
            </a>
            <a className="atl-foot-link" href="#founders" style={footLink}>
              Founders
            </a>
            <a className="atl-foot-link" href="/diaries" style={footLink}>
              Diaries
            </a>
          </nav>

          <a
            className="atl-foot-link"
            href="mailto:contact@talentdiary.in"
            style={{ ...footLink, color: BLUE_SOFT, opacity: 1, fontWeight: 600 }}
          >
            contact@talentdiary.in
          </a>
        </div>
        <div
          style={{
            maxWidth: MAXW,
            margin: "0 auto",
            padding: "0 24px clamp(28px, 5vh, 44px)",
            fontSize: 12.5,
            color: CREAM_FAINT,
          }}
        >
          © 2026 Talent Diary
        </div>
      </footer>

      {/* Scoped polish: hover + responsive layout tuning */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .atl-cta { transition: transform 160ms ease, filter 160ms ease; display: inline-block; }
        .atl-cta:hover { filter: brightness(1.1); transform: translateY(-1px); }
        .atl-cta:active { transform: translateY(0); }
        .atl-ghost { transition: background 160ms ease, border-color 160ms ease; }
        .atl-ghost:hover { background: rgba(244,237,226,0.06); border-color: rgba(244,237,226,0.28); }
        .atl-link { transition: opacity 160ms ease; }
        .atl-link:hover { opacity: 0.7; }
        .atl-foot-link { transition: opacity 160ms ease; }
        .atl-foot-link:hover { opacity: 0.6; }
        .atl-diary-card { transition: background 200ms ease, border-color 200ms ease, transform 200ms ease; }
        .atl-diary-card:hover { background: rgba(244,237,226,0.07); border-color: rgba(244,237,226,0.24); transform: translateY(-3px); }
        .atl-diary-card .atl-diary-title { transition: color 160ms ease; }
        .atl-diary-card:hover .atl-diary-title { color: ${BLUE_SOFT}; }

        .atl-diff-head { display: flex; gap: 18px; align-items: baseline; }

        .atl-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(28px, 5vw, 72px);
        }
        .atl-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(28px, 4vw, 56px);
          margin-top: clamp(40px, 6vh, 72px);
        }
        .atl-founders {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(36px, 5vw, 72px);
          margin-top: clamp(40px, 6vh, 72px);
        }
        .atl-diary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(18px, 2.4vw, 28px);
          margin-top: clamp(36px, 5vh, 60px);
        }

        @media (max-width: 860px) {
          .atl-stats { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .atl-steps { grid-template-columns: 1fr; }
          .atl-founders { grid-template-columns: 1fr; }
          .atl-diary-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .atl-stats { grid-template-columns: 1fr; }
          .atl-cta, .atl-ghost { padding: 13px 22px !important; font-size: 15px !important; }
        }
      `,
        }}
      />
    </div>
  );
}

const footLink: CSSProperties = {
  color: CREAM,
  textDecoration: "none",
  opacity: 0.8,
};
