import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/sections";
import { Reveal, InkReveal } from "@/components/site/reveal";
import {
  Doodle,
  DoodleStar,
  InkRocket,
  MarginNote,
  Paperclip,
  SketchUnderline,
} from "@/components/site/scraps";
import { ROLES, getRole, COMPANIES } from "@/lib/roles";
import { APPLY_FORM_URL } from "@/lib/site";

export function generateStaticParams() {
  return ROLES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) return { title: "Role not found | Talent Diary" };
  return {
    // Each role is its own canonical. These are the pages carrying the
    // searchable content on a recruiting site, so declaring them duplicates of
    // the home page cost every one of them its chance at being indexed.
    alternates: { canonical: `/jobs/${role.slug}` },
    title: `${role.title} | Talent Diary`,
    description: role.summary,
  };
}

const chipStyle: React.CSSProperties = {
  fontFamily: "var(--display)",
  fontWeight: 600,
  fontSize: "0.8rem",
  color: "white",
  background: "rgba(255,255,255,0.15)",
  border: "1px solid rgba(255,255,255,0.3)",
  padding: "0.34rem 0.78rem",
  borderRadius: 999,
};

const h3Style: React.CSSProperties = {
  fontFamily: "var(--display)",
  fontWeight: 700,
  fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
  letterSpacing: "-0.02em",
  marginBottom: "0.8rem",
};

const listStyle: React.CSSProperties = {
  display: "grid",
  gap: "0.7rem",
  margin: 0,
  paddingLeft: "1.15rem",
  color: "var(--ink-soft)",
  fontSize: "1.02rem",
  lineHeight: 1.6,
};

/** Bold a short "Label:" lead-in for scannability, otherwise plain. */
function Bullet({ text }: { text: string }) {
  const idx = text.indexOf(": ");
  if (idx > 0 && idx < 46 && !text.slice(0, idx).includes(".")) {
    return (
      <li>
        <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
          {text.slice(0, idx)}:
        </strong>
        {text.slice(idx + 1)}
      </li>
    );
  }
  return <li>{text}</li>;
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) notFound();

  const company = COMPANIES[role.company];

  return (
    <>
      <Nav />
      <main>
        {/* ===== Hero ===== */}
        <section className="page-hero on-blue">
          <div className="wrap">
            <hr className="diary-rule" aria-hidden="true" />
            <Reveal className="sec-head" as="div">
              <Doodle tone="blue" className="scrap--jobs-rocket max-md:hidden">
                <InkRocket />
              </Doodle>
              <Doodle tone="ink" className="scrap--jobs-star max-md:hidden">
                <DoodleStar />
              </Doodle>

              <a
                href="/jobs"
                className="u-underline"
                style={{
                  fontFamily: "var(--display)",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "white",
                  display: "inline-block",
                  marginBottom: "0.4rem",
                }}
              >
                &larr; All open roles
              </a>

              <span className="eyebrow">
                <span className="tri" /> {company.descriptor} &middot; {role.location}
              </span>
              <h2>
                <InkReveal as="span" className="ink ink--sketch">
                  {role.title}
                  <SketchUnderline />
                </InkReveal>
              </h2>
              <p className="dek">{role.summary}</p>

              <div
                style={{
                  marginTop: "1.3rem",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                {role.tags.map((t) => (
                  <span key={t} style={chipStyle}>
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: "1.6rem" }}>
                <a
                  href={APPLY_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-on-blue"
                >
                  Apply now
                </a>
              </div>

              <MarginNote className="-bottom-8 right-2 max-md:hidden">
                takes 2 minutes
              </MarginNote>
            </Reveal>
          </div>
        </section>

        {/* ===== JD body ===== */}
        <section className="section">
          <div className="wrap">
            <div style={{ maxWidth: "72ch", marginInline: "auto" }}>
              {/* About the company */}
              <Reveal as="div" style={{ marginBottom: "2.4rem" }}>
                <span className="eyebrow">
                  <span className="tri" /> About the company
                </span>
                <p
                  style={{
                    marginTop: "0.7rem",
                    color: "var(--ink-soft)",
                    fontSize: "1.05rem",
                    lineHeight: 1.65,
                  }}
                >
                  {company.blurb}
                </p>
              </Reveal>

              {/* Overview */}
              <Reveal as="div" style={{ marginBottom: "2.4rem" }} delay={0.04}>
                <h3 style={h3Style}>The role</h3>
                <p
                  style={{
                    color: "var(--ink-soft)",
                    fontSize: "1.05rem",
                    lineHeight: 1.65,
                  }}
                >
                  {role.overview}
                </p>
                {role.shift && (
                  <p
                    style={{
                      marginTop: "0.9rem",
                      color: "var(--ink-soft)",
                      fontSize: "1.02rem",
                    }}
                  >
                    <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                      Shift:
                    </strong>{" "}
                    {role.shift}
                  </p>
                )}
              </Reveal>

              {/* Sections */}
              {role.sections.map((sec, si) => (
                <Reveal
                  as="div"
                  key={sec.heading}
                  style={{ marginBottom: "2.4rem" }}
                  delay={0.04}
                >
                  <h3 style={h3Style}>{sec.heading}</h3>
                  {sec.intro && (
                    <p
                      style={{
                        color: "var(--ink-soft)",
                        fontSize: "1.02rem",
                        marginBottom: "0.9rem",
                      }}
                    >
                      {sec.intro}
                    </p>
                  )}
                  {sec.bullets && (
                    <ul style={listStyle}>
                      {sec.bullets.map((b) => (
                        <Bullet key={b} text={b} />
                      ))}
                    </ul>
                  )}
                  {sec.groups &&
                    sec.groups.map((g) => (
                      <div key={g.label} style={{ marginTop: "1.3rem" }}>
                        <h4
                          style={{
                            fontFamily: "var(--display)",
                            fontWeight: 700,
                            fontSize: "1.02rem",
                            letterSpacing: "-0.01em",
                            color: "var(--blue-deep)",
                            marginBottom: "0.6rem",
                          }}
                        >
                          {g.label}
                        </h4>
                        <ul style={listStyle}>
                          {g.bullets.map((b) => (
                            <Bullet key={b} text={b} />
                          ))}
                        </ul>
                      </div>
                    ))}
                  {si === role.sections.length - 1 && (
                    <Paperclip />
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Closing apply band ===== */}
        <section className="closing on-blue ruled">
          <Doodle
            tone="ink"
            className="left-[clamp(1rem,4vw,3rem)] bottom-[clamp(2rem,5vw,4rem)] w-[clamp(44px,6vw,58px)] max-md:hidden"
          >
            <InkRocket className="w-full" />
          </Doodle>
          <div className="wrap closing-inner">
            <Reveal>
              <span className="eyebrow">
                <span className="tri" /> Think this is you?
              </span>
              <h2>Apply for {role.title}.</h2>
              <p>
                Tell us a bit about yourself and we take it from there. The form
                takes a couple of minutes.
              </p>
            </Reveal>
            <Reveal className="closing-act relative" delay={0.12}>
              <MarginNote className="-top-9 left-1 max-md:hidden">
                we read every one
              </MarginNote>
              <a
                href={APPLY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-on-blue"
              >
                Apply now
              </a>
              <div className="sidedoor">
                Not quite it?{" "}
                <a href="/jobs">See all roles &rarr;</a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
