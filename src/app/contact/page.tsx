import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/sections";
import { Reveal, InkReveal } from "@/components/site/reveal";
import { CALENDLY_URL } from "@/lib/site";
import { FounderForm } from "@/components/site/forms/founder-form";
import { TalentForm } from "@/components/site/forms/talent-form";
import {
  Doodle,
  DoodleBulb,
  DoodleArrow,
  DoodleNotepad,
  DoodleStar,
  MarginNote,
  StickyNote,
  Paperclip,
  SketchUnderline,
} from "@/components/site/scraps";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Get in touch | Talent Diary",
  description:
    "Founders, tell us the role and we come back fast. Talent, join our network for startup roles built around what you do next.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ---------- Hero ---------- */}
        <section className="page-hero on-blue">
          <div className="wrap">
            <hr className="diary-rule" aria-hidden="true" />
            <Reveal className="sec-head" as="div">
              <Doodle tone="blue" className="right-0 top-1 w-10 rotate-6 max-md:hidden">
                <DoodleBulb />
              </Doodle>
              <Doodle tone="ink" className="left-0 -top-2 w-5 max-md:hidden">
                <DoodleStar />
              </Doodle>

              <span className="eyebrow">
                <span className="tri" /> Get in touch
              </span>
              <h2>
                Hiring is hard. Career moves are{" "}
                <InkReveal as="span" className="ink ink--sketch">
                  harder
                  <SketchUnderline />
                </InkReveal>
                .
              </h2>
              <p className="dek">We have got both covered. Pick your lane below.</p>

              <MarginNote className="-bottom-7 right-2 max-md:hidden">say hi</MarginNote>
              <Doodle tone="ink" className="-bottom-9 left-8 w-12 rotate-12 max-md:hidden">
                <DoodleArrow />
              </Doodle>
            </Reveal>
          </div>
        </section>

        {/* ---------- Two lanes ---------- */}
        <section className="section">
          <div className="wrap">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                gap: "clamp(1.6rem, 3vw, 2.4rem)",
                alignItems: "start",
              }}
            >
              {/* Lane 1 — Founders */}
              <Reveal className="why-card ruled" as="div" delay={0.04}>
                <Paperclip />
                <Doodle tone="blue" className="-top-2 right-14 w-8 rotate-6 max-md:hidden">
                  <DoodleNotepad />
                </Doodle>

                <span className="eyebrow">
                  <span className="tri" /> For founders
                </span>
                <h3 style={{ marginTop: ".6rem", minHeight: "2.05em" }}>
                  Tell us the role
                </h3>
                <p style={{ maxWidth: "44ch" }}>
                  A few lines on what you are hiring for. We come back fast, or
                  grab a time and talk it through.
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
                    position: "relative",
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
                    Book a hiring call
                  </a>
                  <StickyNote tone="blue" className="-top-7 -right-1 max-md:hidden">
                    one call, that is it
                  </StickyNote>
                </div>
              </Reveal>

              {/* Lane 2 — Talent */}
              <Reveal className="why-card ruled" as="div" delay={0.1}>
                <Paperclip />

                <span className="eyebrow">
                  <span className="tri" /> For talent
                </span>
                <h3 style={{ marginTop: ".6rem", minHeight: "2.05em" }}>
                  Join the talent network
                </h3>
                <p style={{ maxWidth: "44ch" }}>
                  Tell us where you want to go next. We reach out when the right
                  startup role opens.
                </p>

                <TalentForm />
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
