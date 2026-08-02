import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/sections";
import {
  Reveal,
  Stagger,
  RevealItem,
  InkReveal,
} from "@/components/site/reveal";
import {
  Doodle,
  DoodleStar,
  DoodleArrow,
  DoodleBulb,
  InkRocket,
  SketchUnderline,
  MarginNote,
  Paperclip,
  IndexTab,
} from "@/components/site/scraps";
import { TalentForm } from "@/components/site/forms/talent-form";
import { ROLES, COMPANIES } from "@/lib/roles";

export const metadata: Metadata = {
  title: "Open roles | Talent Diary",
  description:
    "Live roles at the startups we partner with. Open one for the full JD, then apply in a couple of minutes.",
};

const cardBase: React.CSSProperties = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: "0.85rem",
  padding: "clamp(1.5rem, 2.4vw, 2.1rem)",
  border: "1px solid var(--hairline)",
  borderRadius: 16,
  background: "color-mix(in oklab, var(--paper) 58%, var(--paper-2))",
  backgroundPosition: "0 1rem",
};

export default function JobsPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ===== Hero / opener ===== */}
        <section className="page-hero on-blue">
          <div className="wrap">
            <hr className="diary-rule" aria-hidden="true" />
            <Reveal className="sec-head">
              <span className="folio" aria-hidden="true">
                01
              </span>
              <Doodle tone="blue" className="scrap--jobs-rocket max-md:hidden">
                <InkRocket />
              </Doodle>
              <Doodle tone="ink" className="scrap--jobs-star max-md:hidden">
                <DoodleStar />
              </Doodle>
              <span className="eyebrow">
                <span className="tri" />
                <span className="no">No.&nbsp;01</span>
                <span className="slash">/</span> Open roles
              </span>
              <h2>
                Roles we are hiring for right{" "}
                <InkReveal as="span" className="ink ink--sketch">
                  now
                  <SketchUnderline />
                </InkReveal>
                .
              </h2>
              <p className="dek">
                Hand-picked roles at high-growth startups we partner with. If
                one fits, apply and we will fast-track you.
              </p>
              <MarginNote className="scrap--jobs-note max-md:hidden">
                fresh this week
              </MarginNote>
              <Doodle tone="ink" className="scrap--jobs-arrow max-md:hidden">
                <DoodleArrow />
              </Doodle>
            </Reveal>
          </div>
        </section>

        {/* ===== Open roles list ===== */}
        <section
          className="section"
          style={{ paddingTop: 0 }}
          aria-label="Open roles"
        >
          <div className="wrap">
            {ROLES.length === 0 ? (
              <Reveal
                className="why-card ruled relative"
                as="div"
                style={{
                  maxWidth: "58ch",
                  marginInline: "auto",
                  textAlign: "center",
                }}
              >
                <Paperclip />
                <Doodle
                  tone="blue"
                  className="right-3 top-2 w-7 rotate-3 max-md:hidden"
                >
                  <DoodleBulb />
                </Doodle>
                <span className="eyebrow" style={{ justifyContent: "center" }}>
                  <span className="tri" /> Between searches
                </span>
                <h3 style={{ marginTop: ".5rem" }}>No open roles right now.</h3>
                <p style={{ marginInline: "auto", maxWidth: "46ch" }}>
                  We are between mandates. The moment we start a new search, the
                  roles land here. Join our talent network and we will reach out
                  when the right one opens.
                </p>
                <a
                  href="#join"
                  className="btn btn-primary"
                  style={{ marginTop: "1.1rem" }}
                >
                  Join the talent network
                </a>
              </Reveal>
            ) : (
            <Stagger
              as="ul"
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                gap: "clamp(1.25rem, 2vw, 1.75rem)",
              }}
            >
              {ROLES.map((role, i) => (
                <RevealItem
                  as="li"
                  key={role.title}
                  settle
                  tilt={i % 2 === 0 ? -0.6 : 0.6}
                  className="ruled"
                  style={cardBase}
                >
                  {/* one paperclip + one sticky tab, art-directed (not every card) */}
                  <Paperclip />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                    }}
                  >
                    <IndexTab className="scrap--jobs-tab">open</IndexTab>
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: "var(--display)",
                        fontWeight: 700,
                        fontSize: "0.82rem",
                        letterSpacing: "0.12em",
                        color: "var(--blue-deep)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--display)",
                      fontWeight: 700,
                      fontSize: "clamp(1.18rem, 1.7vw, 1.45rem)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                    }}
                  >
                    {role.title}
                  </h3>

                  <p
                    style={{
                      color: "var(--ink)",
                      fontSize: "0.96rem",
                      marginTop: "-0.2rem",
                      fontWeight: 600,
                    }}
                  >
                    {COMPANIES[role.company].descriptor}
                    <span style={{ color: "var(--ink-soft)", fontWeight: 400 }}>
                      {"  ·  "}
                      {role.location}
                    </span>
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.4rem",
                    }}
                  >
                    {role.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "0.76rem",
                          fontWeight: 500,
                          color: "var(--ink-soft)",
                          background: "var(--paper-2)",
                          border: "1px solid var(--hairline)",
                          padding: "0.28rem 0.6rem",
                          borderRadius: 999,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <p
                    style={{
                      color: "var(--ink-soft)",
                      fontSize: "1rem",
                      maxWidth: "48ch",
                    }}
                  >
                    {role.summary}
                  </p>

                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: "0.4rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <a
                      href={`/jobs/${role.slug}`}
                      className="btn btn-primary"
                      style={{ fontSize: "0.95rem", padding: "0.7rem 1.2rem" }}
                    >
                      View role &amp; JD
                    </a>
                    <a
                      href="#join"
                      className="u-underline"
                      style={{
                        fontFamily: "var(--display)",
                        fontWeight: 700,
                        fontSize: "0.92rem",
                        color: "var(--blue-deep)",
                      }}
                    >
                      Not quite it? Join the network
                    </a>
                  </div>
                </RevealItem>
              ))}
            </Stagger>
            )}
          </div>
        </section>

        {/* ===== Join the talent network ===== */}
        <section
          id="join"
          className="section"
          style={{ paddingTop: 0, scrollMarginTop: "5rem" }}
          aria-label="Join the talent network"
        >
          <div className="wrap">
            <Reveal
              className="why-card ruled relative"
              as="div"
              style={{ maxWidth: "62ch", marginInline: "auto" }}
            >
              <Paperclip />
              <Doodle tone="ink" className="right-3 top-2 w-7 rotate-3 max-md:hidden">
                <DoodleBulb />
              </Doodle>

              <span className="eyebrow">
                <span className="tri" /> Talent network
              </span>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
                  letterSpacing: "-0.03em",
                  marginTop: "0.6rem",
                  maxWidth: "24ch",
                }}
              >
                Do not see your role yet?
              </h2>
              <p
                style={{
                  marginTop: "0.7rem",
                  color: "var(--ink-soft)",
                  fontSize: "clamp(1.02rem, 1.2vw, 1.12rem)",
                  maxWidth: "48ch",
                }}
              >
                Join our talent network. We reach out when the right startup role
                opens, often before it is public.
              </p>

              <TalentForm submitLabel="Join the talent network" />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
