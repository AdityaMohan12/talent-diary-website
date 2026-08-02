import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talent Diary — Style directions",
  description: "Three style directions for the Talent Diary site. Pick the one that fits.",
};

const STYLES = [
  {
    href: "/style/atelier",
    name: "Atelier",
    tag: "Editorial, warm-dark, architectural",
    desc: "A giant ghost wordmark with the diary as the centrepiece, frosted-glass pill nav, parallax bottom panels. Spacious and premium.",
    accent: "var(--ink)",
    bg: "linear-gradient(150deg, #15110d, #221a12)",
    fg: "#f4ede2",
  },
  {
    href: "/style/workspace",
    name: "Workspace",
    tag: "Light, playful, floating product UI",
    desc: "A big white card hero on a dot grid, surrounded by floating cards: a shortlist, open roles, a sticky note, and the diary as a 'Talent Diaries' folder.",
    accent: "#2a52ff",
    bg: "#fdfdfd",
    fg: "#141414",
  },
  {
    href: "/style/editorial",
    name: "Editorial",
    tag: "Minimal, high-end, serif accent",
    desc: "A spacious editorial headline with an italic serif word, the diary blended softly into the page, an email capture, and quiet social proof.",
    accent: "#2a52ff",
    bg: "linear-gradient(180deg, #efe9dd, #ffffff)",
    fg: "#211f24",
  },
];

export default function StyleIndex() {
  return (
    <main
      style={{
        minHeight: "100svh",
        background: "var(--paper)",
        color: "var(--ink)",
        padding: "clamp(3rem, 9vh, 7rem) var(--gutter)",
        fontFamily: "var(--body)",
      }}
    >
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <span
          style={{
            fontSize: ".8rem",
            fontWeight: 600,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: "var(--ink-soft)",
          }}
        >
          Talent Diary
        </span>
        <h1
          style={{
            fontFamily: "var(--display)",
            fontWeight: 700,
            fontSize: "clamp(2rem, 5vw, 3.4rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
            marginTop: ".6rem",
            maxWidth: "20ch",
          }}
        >
          Three directions. Pick the one that fits.
        </h1>
        <p
          style={{
            marginTop: "1rem",
            color: "var(--ink-soft)",
            fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
            maxWidth: "52ch",
          }}
        >
          Same brand, same diary motif, three different feels. Open each in a tab and
          tell me which one we build on.
        </p>

        <div
          style={{
            marginTop: "clamp(2.5rem, 5vw, 4rem)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {STYLES.map((s) => (
            <a
              key={s.href}
              href={s.href}
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "18px",
                overflow: "hidden",
                border: "1px solid var(--hairline)",
                background: "color-mix(in oklab, var(--paper) 55%, var(--paper-2))",
                textDecoration: "none",
                color: "inherit",
                transition: "transform .35s cubic-bezier(0.16,1,0.3,1), box-shadow .25s",
              }}
            >
              <div
                style={{
                  height: "150px",
                  background: s.bg,
                  color: s.fg,
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "1.1rem 1.25rem",
                  fontFamily: "var(--display)",
                  fontWeight: 700,
                  fontSize: "1.6rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.name}
              </div>
              <div style={{ padding: "1.1rem 1.25rem 1.3rem" }}>
                <div
                  style={{
                    fontSize: ".72rem",
                    fontWeight: 600,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    color: s.accent === "var(--ink)" ? "var(--blue-deep)" : s.accent,
                  }}
                >
                  {s.tag}
                </div>
                <p
                  style={{
                    marginTop: ".55rem",
                    color: "var(--ink-soft)",
                    fontSize: ".96rem",
                    lineHeight: 1.5,
                  }}
                >
                  {s.desc}
                </p>
                <span
                  style={{
                    marginTop: ".9rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: ".35rem",
                    fontFamily: "var(--display)",
                    fontWeight: 700,
                    color: "var(--blue-deep)",
                  }}
                >
                  View style {"→"}
                </span>
              </div>
            </a>
          ))}
        </div>

        <p style={{ marginTop: "2.5rem", fontSize: ".9rem", color: "var(--ink-soft)" }}>
          <a href="/" style={{ color: "var(--blue-deep)", fontWeight: 600 }}>
            {"←"} Back to the current site
          </a>
        </p>
      </div>
    </main>
  );
}
