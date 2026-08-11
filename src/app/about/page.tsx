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
  DoodleBooks,
  DoodlePeople,
  DoodleStar,
  DoodleBulb,
  InkRocket,
  MarginNote,
  Paperclip,
  SketchUnderline,
} from "@/components/site/scraps";
import { CALENDLY_URL } from "@/lib/site";
import { FounderForm } from "@/components/site/forms/founder-form";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "Fractional Recruitment | Talent Diary",
  description:
    "Talent Diary is a startup-specialist recruitment partner. We embed with your team and own hiring end to end, so founders stay focused on the product.",
};

const STEPS = [
  {
    n: "01",
    title: "Embedded Partnership",
    body: "We join standups, learn your culture, meet your hiring managers, and become a true extension of your internal team, not an outsider throwing resumes over the fence.",
  },
  {
    n: "02",
    title: "Define the Role",
    body: "We help you get crystal clear on who you need before hiring begins. We build the JD, set compensation benchmarks, and define candidate evaluation criteria.",
  },
  {
    n: "03",
    title: "Full Cycle Execution",
    body: "From sourcing to interview facilitation to offer negotiation, we manage the entire process, so you stay focused on building your product.",
  },
  {
    n: "04",
    title: "A monthly retainer, no per-hire surprise",
    body: "We charge a predictable monthly fee that replaces your unpredictable placement cost and aligns with your long-term hiring goals.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ===== Intro ===== */}
        <section className="page-hero on-blue">
          <div className="wrap">
            <hr className="diary-rule" aria-hidden="true" />
            <Reveal className="sec-head">
              <span className="folio" aria-hidden="true">
                01
              </span>
              <Doodle
                tone="blue"
                className="-left-1 top-4 w-6 max-md:hidden"
              >
                <DoodleStar />
              </Doodle>
              <span className="eyebrow">
                <span className="tri" />
                <span className="no">No.&nbsp;01</span>
                <span className="slash">/</span> Fractional recruitment
              </span>
              <h2>
                Build your{" "}
                <InkReveal as="span" className="ink ink--sketch">
                  core team
                  <SketchUnderline />
                </InkReveal>
                .
              </h2>
              <p className="dek">
                Talent Diary is a startup-specialist recruitment partner. We
                embed with your team and own hiring end to end, so founders stay
                focused on the product.
              </p>
              <MarginNote className="-bottom-9 right-2 max-md:hidden">
                since day one
              </MarginNote>
              <Doodle
                tone="ink"
                className="bottom-[-2.4rem] left-8 w-[54px] rotate-[12deg] max-md:hidden"
              >
                <DoodleBooks />
              </Doodle>
            </Reveal>
          </div>
        </section>

        {/* ===== How we work ===== */}
        <section className="section ruled">
          <div className="wrap">
            <hr className="diary-rule" aria-hidden="true" />
            <Reveal className="sec-head">
              <span className="folio" aria-hidden="true">
                02
              </span>
              <Doodle
                tone="blue"
                className="right-2 top-0 w-7 max-md:hidden"
              >
                <DoodleBulb />
              </Doodle>
              <Doodle
                tone="ink"
                className="-left-2 top-3 w-5 max-md:hidden"
              >
                <DoodleStar />
              </Doodle>
              <span className="eyebrow">
                <span className="tri" />
                <span className="no">No.&nbsp;02</span>
                <span className="slash">/</span> How we work
              </span>
              <h2>
                Four ways we{" "}
                <InkReveal as="span" className="ink ink--sketch">
                  embed
                  <SketchUnderline />
                </InkReveal>{" "}
                with your team
              </h2>
              <p className="dek">
                Not an agency at arm&apos;s length. A partner inside the room,
                owning the full hiring cycle alongside you.
              </p>
            </Reveal>

            <Stagger className="why-grid">
              {STEPS.map(({ n, title, body }, i) => (
                <RevealItem
                  settle
                  tilt={i % 2 === 0 ? -0.7 : 0.7}
                  className="why-card ruled relative"
                  key={title}
                >
                  <Paperclip />
                  <span
                    className="why-ic"
                    style={{
                      fontFamily: "var(--display)",
                      fontWeight: 700,
                      fontSize: "1.25rem",
                      fontVariantNumeric: "tabular-nums",
                    }}
                    aria-hidden="true"
                  >
                    {n}
                  </span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </RevealItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ===== Pricing ===== */}
        <section className="section ruled">
          <div className="wrap">
            <hr className="diary-rule" aria-hidden="true" />
            <Reveal
              className="sec-head"
              as="div"
              style={{ textAlign: "center", marginInline: "auto" }}
            >
              <span className="eyebrow" style={{ justifyContent: "center" }}>
                <span className="tri" /> Pricing structure
              </span>
              <h2 style={{ marginInline: "auto" }}>
                Simple, fixed-fee hiring{" "}
                <InkReveal as="span" className="ink ink--sketch">
                  support
                  <SketchUnderline />
                </InkReveal>
              </h2>
              <p className="dek" style={{ marginInline: "auto" }}>
                Transparent pricing based on the number, level, and complexity of
                roles. No open-ended contingency percentages that balloon with
                salary.
              </p>
            </Reveal>

            <Reveal
              className="why-card ruled svc-card relative"
              as="div"
              style={{
                maxWidth: "62ch",
                marginInline: "auto",
                marginTop: "clamp(1.4rem, 3vw, 2.2rem)",
              }}
            >
              <Paperclip />
              <span className="svc-tag">Fixed-fee model</span>
              <h3>What you get</h3>
              <p>
                TalentDiary works on a fixed-fee model for startups building their
                first teams. We structure pricing transparently around the number,
                level, and complexity of roles, instead of open-ended contingency
                percentages that change with salary.
              </p>
              <ul className="svc-list">
                <li>Complete cost visibility before hiring starts</li>
                <li>
                  Aligned incentives: we focus on matching, not salary padding
                </li>
                <li>Cost-effective for hiring multiple core employees</li>
                <li>Flexible payment structures based on milestones</li>
              </ul>
              <a href="#hiring" className="btn btn-primary">
                Get a fixed-fee quote
              </a>
            </Reveal>
          </div>
        </section>

        {/* ===== Tell us the role (founder form) ===== */}
        <section
          id="hiring"
          className="section ruled"
          style={{ paddingTop: 0, scrollMarginTop: "5rem" }}
          aria-label="Tell us the role"
        >
          <div className="wrap">
            <Reveal
              className="why-card ruled relative"
              as="div"
              style={{ maxWidth: "62ch", marginInline: "auto" }}
            >
              <Paperclip />
              <Doodle tone="blue" className="right-3 top-2 w-8 rotate-6 max-md:hidden">
                <DoodleBulb />
              </Doodle>

              <span className="eyebrow">
                <span className="tri" /> For founders
              </span>
              <h3>Tell us the role</h3>
              <p style={{ maxWidth: "46ch" }}>
                A few lines on what you are hiring for. We come back fast with a
                fixed-fee plan, or grab a time and talk it through.
              </p>

              <FounderForm />

              <div
                style={{
                  marginTop: "1.2rem",
                  paddingTop: "1.1rem",
                  borderTop: "1px solid var(--hairline)",
                  display: "flex",
                  alignItems: "center",
                  gap: ".8rem",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: ".9rem", color: "var(--ink-soft)" }}>
                  Prefer to talk first?
                </span>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Book a consultation call
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== Closing CTA (blue band) ===== */}
        <section className="closing on-blue ruled">
          <Doodle
            tone="ink"
            className="left-[clamp(1rem,4vw,3rem)] bottom-[clamp(2rem,5vw,4rem)] w-[clamp(48px,7vw,64px)] max-md:hidden"
          >
            <DoodlePeople />
          </Doodle>
          <div className="wrap closing-inner">
            <Reveal>
              <span className="eyebrow">
                <span className="tri" /> Start here
              </span>
              <h2>
                Let us build your hiring engine, so you can build your company.
              </h2>
              <p>
                One conversation about the role, the team, and what right looks
                like. We take it from there.
              </p>
            </Reveal>
            <Reveal className="closing-act relative" delay={0.12}>
              <Doodle
                tone="ink"
                className="-top-10 right-6 w-10 rotate-6 max-md:hidden"
              >
                <InkRocket className="w-full" />
              </Doodle>
              <MarginNote className="-top-9 left-1 max-md:hidden">
                one conversation
              </MarginNote>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-on-blue"
              >
                Book a consultation call
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}