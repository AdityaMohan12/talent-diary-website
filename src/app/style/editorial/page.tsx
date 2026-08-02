"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Inter, Instrument_Serif } from "next/font/google";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

/* Self-contained fonts (module scope). Do not rely on global CSS. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--ed-sans",
});
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  display: "swap",
  variable: "--ed-serif",
});

/* Brand tokens, inlined so this route never touches globals.css. */
const BLUE = "#2a52ff";
const BLUE_DEEP = "#1f3fcc";
const INK = "#141414";
const INK_SOFT = "#373a46";
const CREAM = "#f4ede2";
const HAIRLINE = "rgba(20,20,20,0.12)";

const SANS = "var(--ed-sans), system-ui, -apple-system, sans-serif";
const SERIF = "var(--ed-serif), Georgia, serif";

const OPERATORS = ["Unacademy", "Interview Kickstart", "91Springboard", "Awign"];

/* ---------- content (real copy, pulled from the brand files) ---------- */

const STATS = [
  { value: "60k+", label: "startup candidates in our network" },
  { value: "Under 30 days", label: "to a vetted shortlist" },
  { value: "100%", label: "of profiles deeply vetted before they reach you" },
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

/* ---------- scroll-reveal helper (respects reduced motion) ---------- */

function Reveal({
  children,
  delay = 0,
  y = 24,
  as = "div",
  style,
  className,
  reduce,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "p" | "h2" | "header";
  style?: React.CSSProperties;
  className?: string;
  reduce: boolean;
}) {
  const MotionTag = motion[as];
  if (reduce) {
    const Tag = as;
    return (
      <Tag style={style} className={className}>
        {children}
      </Tag>
    );
  }
  return (
    <MotionTag
      style={style}
      className={className}
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
        style={{ width: 28, height: 1, background: BLUE, display: "block" }}
      />
      <span
        style={{
          fontFamily: SANS,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: INK_SOFT,
        }}
      >
        {children}
      </span>
    </div>
  );
}

export default function EditorialStyle() {
  const reduceRaw = useReducedMotion();
  const reduce = reduceRaw ?? false;

  // The VISIBLE state is the DOM default. The hero entrance is an opt-in
  // enhancement: we only switch to the animated path once the tab is confirmed
  // visible and motion is allowed. SSR + first client render both use
  // `play === false`, so there is no hydration mismatch and the hero can never
  // be stranded at opacity 0 in a background tab.
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const start = () => {
      if (!document.hidden) setPlay(true);
    };
    start();
    document.addEventListener("visibilitychange", start);
    return () => document.removeEventListener("visibilitychange", start);
  }, [reduce]);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const motionProps = play
    ? ({ variants: container, initial: "hidden", animate: "show" } as const)
    : ({} as const);
  const childVariants = play ? item : undefined;

  const MAXW = 1100;

  return (
    <div
      className={`${inter.variable} ${instrument.variable}`}
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        background: "#ffffff",
        color: INK,
        fontFamily: SANS,
        overflowX: "hidden",
      }}
    >
      {/* Fixed cross-variant nav link */}
      <a
        href="/style"
        style={{
          position: "fixed",
          top: 22,
          left: 22,
          zIndex: 50,
          fontFamily: SANS,
          fontSize: 13,
          letterSpacing: "-0.01em",
          color: INK,
          opacity: 0.6,
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          padding: "8px 14px",
          borderRadius: 999,
          border: "1px solid rgba(0,0,0,0.08)",
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          aria-hidden
          style={{
            width: 7,
            height: 7,
            borderRadius: 999,
            background: BLUE,
            display: "inline-block",
          }}
        />
        Styles
      </a>

      {/* ============================== HERO ============================== */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {/* DIARY background motif. Pushed lower and washed much harder so the
            headline reads crisp and the journal is a quiet motif, not text. */}
        <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/diary/poster.png"
            alt=""
            className="ed-diary"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 110%",
              opacity: 0.32,
            }}
          />
          {/* Heavy white wash: opaque through the headline band, only a faint
              hint of the journal surfacing low. */}
          <div
            className="ed-wash"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, #ffffff 0%, #ffffff 40%, rgba(255,255,255,0.94) 58%, rgba(255,255,255,0.82) 72%, rgba(255,255,255,0.7) 84%, rgba(255,255,255,0.85) 100%)",
            }}
          />
          {/* Faint brand tint at the very top edge for warmth */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(120% 55% at 50% 0%, rgba(42,82,255,0.05) 0%, rgba(42,82,255,0) 55%)",
            }}
          />
        </div>

        <motion.div
          {...motionProps}
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: MAXW,
            margin: "0 auto",
            padding: "clamp(140px, 22vh, 250px) 24px clamp(72px, 11vh, 120px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 30,
          }}
        >
          {/* Wordmark */}
          <motion.div
            variants={childVariants}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              fontFamily: SANS,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: INK,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 0,
                height: 0,
                borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent",
                borderLeft: `8px solid ${BLUE}`,
                display: "inline-block",
              }}
            />
            Talent Diary
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={childVariants}
            style={{
              margin: 0,
              fontFamily: SANS,
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              fontSize: "clamp(40px, 7vw, 80px)",
              color: INK,
              maxWidth: 900,
            }}
          >
            Simple{" "}
            <span
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                fontSize: "clamp(48px, 8.5vw, 100px)",
                color: BLUE,
                lineHeight: 0.9,
              }}
            >
              hiring
            </span>{" "}
            for your startup team
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={childVariants}
            style={{
              margin: 0,
              fontFamily: SANS,
              fontSize: 18,
              lineHeight: 1.5,
              color: INK_SOFT,
              opacity: 0.85,
              maxWidth: 554,
            }}
          >
            A shortlist of deeply vetted, startup-ready candidates in under 30
            days. Not a flood of resumes.
          </motion.p>

          {/* Email capture pill + glossy CTA */}
          <motion.form
            variants={childVariants}
            onSubmit={(e) => e.preventDefault()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: "min(100%, 480px)",
              padding: 6,
              borderRadius: 40,
              background: "#fcfcfc",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0px 10px 40px 5px rgba(194,194,194,0.25)",
            }}
          >
            <label
              htmlFor="ed-email"
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: "hidden",
                clip: "rect(0 0 0 0)",
                whiteSpace: "nowrap",
                border: 0,
              }}
            >
              Work email
            </label>
            <input
              id="ed-email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              style={{
                flex: 1,
                minWidth: 0,
                border: "none",
                outline: "none",
                background: "transparent",
                padding: "12px 16px",
                fontFamily: SANS,
                fontSize: 15,
                color: INK,
              }}
            />
            <a
              href="#book"
              className="ed-cta shadow-[inset_-4px_-6px_25px_0px_rgba(201,201,201,0.08),inset_4px_4px_10px_0px_rgba(29,29,29,0.24)]"
              style={{
                flexShrink: 0,
                textDecoration: "none",
                cursor: "pointer",
                padding: "12px 22px",
                borderRadius: 999,
                fontFamily: SANS,
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: "#ffffff",
                whiteSpace: "nowrap",
                background: "linear-gradient(180deg, #2a2a2e 0%, #161618 100%)",
              }}
            >
              Book a hiring call
            </a>
          </motion.form>

          {/* Secondary action, quiet */}
          <motion.a
            variants={childVariants}
            href="#book"
            style={{
              marginTop: -14,
              fontFamily: SANS,
              fontSize: 14,
              color: INK_SOFT,
              opacity: 0.7,
              textDecoration: "none",
              borderBottom: "1px solid rgba(55,58,70,0.25)",
              paddingBottom: 1,
            }}
          >
            or submit a role
          </motion.a>

          {/* Social proof row */}
          <motion.div
            variants={childVariants}
            style={{
              marginTop: 18,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: 4 }}
              aria-label="Five star rating"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} />
              ))}
            </div>

            <p
              style={{
                margin: 0,
                fontFamily: SANS,
                fontSize: 12.5,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: INK_SOFT,
                opacity: 0.55,
              }}
            >
              Built by operators from
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 8,
                maxWidth: 620,
              }}
            >
              {OPERATORS.map((name) => (
                <span
                  key={name}
                  style={{
                    fontFamily: SANS,
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: INK,
                    padding: "7px 14px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.75)",
                    border: "1px solid rgba(0,0,0,0.07)",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================= PROOF / STATS ========================= */}
      <section
        style={{
          maxWidth: MAXW,
          margin: "0 auto",
          padding: "clamp(56px, 8vh, 96px) 24px",
          borderTop: `1px solid ${HAIRLINE}`,
        }}
      >
        <div className="ed-stats">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              reduce={reduce}
              delay={i * 0.08}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontFamily: SANS,
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  fontSize: "clamp(38px, 5vw, 58px)",
                  color: INK,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: 15,
                  lineHeight: 1.45,
                  color: INK_SOFT,
                  maxWidth: 260,
                }}
              >
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==================== WHY FOUNDERS CHOOSE US ==================== */}
      <section
        style={{
          maxWidth: MAXW,
          margin: "0 auto",
          padding: "clamp(64px, 10vh, 130px) 24px",
        }}
      >
        <Reveal reduce={reduce} as="header" style={{ maxWidth: 640 }}>
          <Eyebrow>Why us</Eyebrow>
          <h2
            style={{
              margin: 0,
              fontFamily: SANS,
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 1.06,
              fontSize: "clamp(30px, 4.4vw, 50px)",
              color: INK,
            }}
          >
            Why founders{" "}
            <span style={{ fontFamily: SERIF, fontStyle: "italic", color: BLUE }}>
              choose
            </span>{" "}
            us
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
              className="ed-diff-row"
            >
              <div style={{ display: "flex", gap: 18, alignItems: "baseline" }}>
                <span
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(28px, 3vw, 40px)",
                    color: BLUE,
                    lineHeight: 1,
                    minWidth: "1.6em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: SANS,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.12,
                    fontSize: "clamp(20px, 2.4vw, 28px)",
                    color: INK,
                  }}
                >
                  {d.title}
                </h3>
              </div>
              <p
                style={{
                  margin: 0,
                  fontFamily: SANS,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: INK_SOFT,
                }}
              >
                {d.body}
              </p>
            </Reveal>
          ))}
          <li style={{ borderTop: `1px solid ${HAIRLINE}`, height: 0 }} />
        </ol>
      </section>

      {/* ======================= WHAT TO EXPECT ======================= */}
      <section
        style={{
          background: "#faf7f1",
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
              style={{
                margin: 0,
                fontFamily: SANS,
                fontWeight: 500,
                letterSpacing: "-0.035em",
                lineHeight: 1.06,
                fontSize: "clamp(30px, 4.4vw, 50px)",
                color: INK,
              }}
            >
              A{" "}
              <span style={{ fontFamily: SERIF, fontStyle: "italic", color: BLUE }}>
                quiet
              </span>{" "}
              process, start to shortlist
            </h2>
          </Reveal>

          <div className="ed-steps">
            {STEPS.map((s, i) => (
              <Reveal
                key={s.title}
                reduce={reduce}
                delay={i * 0.08}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: BLUE_DEEP,
                  }}
                >
                  {s.k}
                </span>
                <span
                  aria-hidden
                  style={{ width: "100%", height: 1, background: HAIRLINE }}
                />
                <h3
                  style={{
                    margin: 0,
                    fontFamily: SANS,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.18,
                    fontSize: "clamp(19px, 2.2vw, 23px)",
                    color: INK,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontFamily: SANS,
                    fontSize: 15.5,
                    lineHeight: 1.6,
                    color: INK_SOFT,
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
        style={{
          maxWidth: MAXW,
          margin: "0 auto",
          padding: "clamp(72px, 12vh, 150px) 24px",
        }}
      >
        <Reveal reduce={reduce} as="header" style={{ maxWidth: 820 }}>
          <Eyebrow>Founders</Eyebrow>
          <p
            style={{
              margin: 0,
              fontFamily: SANS,
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 1.12,
              fontSize: "clamp(30px, 4.8vw, 56px)",
              color: INK,
            }}
          >
            Hiring is a{" "}
            <span style={{ fontFamily: SERIF, fontStyle: "italic", color: BLUE }}>
              relationship
            </span>
            , not a funnel.
          </p>
        </Reveal>

        <div className="ed-founders">
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
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    border: `1px solid ${BLUE}`,
                    color: BLUE,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    fontSize: 22,
                    flexShrink: 0,
                  }}
                >
                  {f.mono}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: SANS,
                      fontWeight: 600,
                      fontSize: 18,
                      letterSpacing: "-0.01em",
                      color: INK,
                    }}
                  >
                    {f.name}
                  </div>
                  <div
                    style={{
                      fontFamily: SANS,
                      fontSize: 13.5,
                      color: INK_SOFT,
                      opacity: 0.8,
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
                  fontFamily: SANS,
                  fontSize: 15.5,
                  lineHeight: 1.65,
                  color: INK_SOFT,
                }}
              >
                {f.bio}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==================== FROM THE TALENT DIARIES ==================== */}
      <section
        style={{
          background: CREAM,
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
                style={{
                  margin: 0,
                  fontFamily: SANS,
                  fontWeight: 500,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.06,
                  fontSize: "clamp(30px, 4.4vw, 50px)",
                  color: INK,
                }}
              >
                Notes on{" "}
                <span
                  style={{ fontFamily: SERIF, fontStyle: "italic", color: BLUE }}
                >
                  hiring
                </span>{" "}
                well
              </h2>
            </div>
            <a
              href="/diaries"
              className="ed-link"
              style={{
                fontFamily: SANS,
                fontSize: 15,
                fontWeight: 500,
                color: BLUE_DEEP,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Read all entries →
            </a>
          </Reveal>

          <div style={{ marginTop: "clamp(36px, 5vh, 60px)" }}>
            {DIARIES.map((d, i) => (
              <Reveal key={d.title} reduce={reduce} delay={i * 0.06}>
                <a
                  href="/diaries"
                  className="ed-diary-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    alignItems: "center",
                    gap: "clamp(16px, 3vw, 40px)",
                    padding: "clamp(22px, 3.4vh, 34px) 0",
                    borderTop: `1px solid ${HAIRLINE}`,
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <span
                    style={{
                      fontFamily: SANS,
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: BLUE_DEEP,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {d.cat}
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span
                      className="ed-diary-title"
                      style={{
                        display: "block",
                        fontFamily: SANS,
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.2,
                        fontSize: "clamp(20px, 2.6vw, 28px)",
                        color: INK,
                      }}
                    >
                      {d.title}
                    </span>
                    <span
                      style={{
                        display: "block",
                        marginTop: 8,
                        fontFamily: SANS,
                        fontSize: 15,
                        lineHeight: 1.5,
                        color: INK_SOFT,
                      }}
                    >
                      {d.excerpt}
                    </span>
                  </span>
                  <span
                    className="ed-diary-meta"
                    style={{
                      fontFamily: SANS,
                      fontSize: 13,
                      color: INK_SOFT,
                      opacity: 0.75,
                      whiteSpace: "nowrap",
                      textAlign: "right",
                    }}
                  >
                    {d.date}
                    <br />
                    {d.mins} min read
                  </span>
                </a>
              </Reveal>
            ))}
            <div style={{ borderTop: `1px solid ${HAIRLINE}` }} />
          </div>
        </div>
      </section>

      {/* ========================= CLOSING CTA ========================= */}
      <section
        id="book"
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
            style={{
              margin: 0,
              fontFamily: SANS,
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              fontSize: "clamp(32px, 5.4vw, 64px)",
              color: INK,
              maxWidth: 800,
            }}
          >
            Tell us the role. See a{" "}
            <span style={{ fontFamily: SERIF, fontStyle: "italic", color: BLUE }}>
              shortlist
            </span>{" "}
            in days, not weeks.
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
              className="ed-cta shadow-[inset_-4px_-6px_25px_0px_rgba(201,201,201,0.08),inset_4px_4px_10px_0px_rgba(29,29,29,0.24)]"
              style={{
                textDecoration: "none",
                padding: "15px 30px",
                borderRadius: 999,
                fontFamily: SANS,
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: "#ffffff",
                background: "linear-gradient(180deg, #2a2a2e 0%, #161618 100%)",
              }}
            >
              Book a hiring call
            </a>
            <a
              href="#book"
              className="ed-ghost"
              style={{
                textDecoration: "none",
                padding: "15px 30px",
                borderRadius: 999,
                fontFamily: SANS,
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: INK,
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
              fontFamily: SANS,
              fontSize: 14,
              lineHeight: 1.6,
              color: INK_SOFT,
              opacity: 0.7,
              maxWidth: 560,
            }}
          >
            Built by operators who hired at Unacademy, Interview Kickstart,
            91Springboard, Awign.
          </p>
        </Reveal>
      </section>

      {/* =========================== FOOTER =========================== */}
      <footer
        style={{
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
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              fontFamily: SANS,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: INK,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 0,
                height: 0,
                borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent",
                borderLeft: `8px solid ${BLUE}`,
                display: "inline-block",
              }}
            />
            Talent Diary
          </div>

          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              fontFamily: SANS,
              fontSize: 14,
            }}
          >
            <a className="ed-foot-link" href="/style/editorial" style={footLink}>
              Why us
            </a>
            <a className="ed-foot-link" href="/style/editorial" style={footLink}>
              What to expect
            </a>
            <a className="ed-foot-link" href="/style/editorial" style={footLink}>
              Founders
            </a>
            <a className="ed-foot-link" href="/diaries" style={footLink}>
              Diaries
            </a>
          </nav>

          <a
            className="ed-foot-link"
            href="mailto:contact@talentdiary.in"
            style={{ ...footLink, color: BLUE_DEEP, fontWeight: 500 }}
          >
            contact@talentdiary.in
          </a>
        </div>
        <div
          style={{
            maxWidth: MAXW,
            margin: "0 auto",
            padding: "0 24px clamp(28px, 5vh, 44px)",
            fontFamily: SANS,
            fontSize: 12.5,
            color: INK_SOFT,
            opacity: 0.6,
          }}
        >
          © 2026 Talent Diary. All rights reserved.
        </div>
      </footer>

      {/* Scoped polish: hover + responsive layout tuning */}
      <style>{`
        .ed-cta { transition: transform 160ms ease, filter 160ms ease; display: inline-block; }
        .ed-cta:hover { filter: brightness(1.12); transform: translateY(-1px); }
        .ed-cta:active { transform: translateY(0); }
        .ed-ghost { transition: background 160ms ease, border-color 160ms ease; }
        .ed-ghost:hover { background: rgba(20,20,20,0.04); border-color: rgba(20,20,20,0.22); }
        .ed-link { transition: opacity 160ms ease; }
        .ed-link:hover { opacity: 0.7; }
        .ed-foot-link { transition: opacity 160ms ease; }
        .ed-foot-link:hover { opacity: 0.6; }
        .ed-diary-row { transition: background 200ms ease; }
        .ed-diary-row:hover { background: rgba(20,20,20,0.025); }
        .ed-diary-row .ed-diary-title { transition: color 160ms ease; }
        .ed-diary-row:hover .ed-diary-title { color: ${BLUE_DEEP}; }

        .ed-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(28px, 5vw, 72px);
        }
        .ed-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(28px, 4vw, 56px);
          margin-top: clamp(40px, 6vh, 72px);
        }
        .ed-founders {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(36px, 5vw, 72px);
          margin-top: clamp(40px, 6vh, 72px);
        }

        @media (max-width: 860px) {
          .ed-stats { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .ed-steps { grid-template-columns: 1fr; }
          .ed-founders { grid-template-columns: 1fr; }
          .ed-diff-row { grid-template-columns: 1fr !important; gap: 12px !important; }
          .ed-diary-row { grid-template-columns: 1fr !important; gap: 8px !important; }
          .ed-diary-meta { text-align: left !important; }
          /* Lift the hero wash on phones where the diary art zooms in. */
          .ed-wash {
            background: linear-gradient(
              to bottom,
              #ffffff 0%,
              #ffffff 46%,
              rgba(255,255,255,0.96) 64%,
              rgba(255,255,255,0.88) 80%,
              rgba(255,255,255,0.9) 100%
            ) !important;
          }
          .ed-diary { opacity: 0.22 !important; }
        }
        @media (max-width: 560px) {
          .ed-stats { grid-template-columns: 1fr; }
          .ed-cta { padding: 11px 16px !important; font-size: 14px !important; }
        }
      `}</style>
    </div>
  );
}

const footLink: React.CSSProperties = {
  color: INK,
  textDecoration: "none",
  opacity: 0.8,
};

function Star() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={BLUE} aria-hidden="true">
      <path d="M12 2.5l2.74 5.55 6.13.89-4.43 4.32 1.05 6.1L12 16.98 6.51 19.86l1.05-6.1L3.13 9.44l6.13-.89L12 2.5z" />
    </svg>
  );
}
