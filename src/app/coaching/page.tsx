import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/sections";
import { Reveal, Stagger, RevealItem, InkReveal } from "@/components/site/reveal";
import {
  Doodle,
  DoodleStar,
  DoodleArrow,
  DoodlePeople,
  DoodleNotepad,
  DoodleBulb,
  SketchUnderline,
  MarginNote,
  Paperclip,
} from "@/components/site/scraps";
import { CALENDLY_URL, COACHING_CALENDLY_URL } from "@/lib/site";
import { CoachingForm } from "@/components/site/forms/coaching-form";

export const metadata: Metadata = {
  title: "Career Coaching | Talent Diary",
  description:
    "Stand out in the startup market. LinkedIn optimization, resume writing, and 1-on-1 coaching from the recruiters who know what founders stop scrolling for.",
};

type Service = {
  tag: string;
  title: string;
  body: string;
  points: string[];
  cta: string;
  book?: boolean; // CTA opens Calendly instead of the enquiry form
};

const SERVICES: Service[] = [
  {
    tag: "Inbound optimization",
    title: "LinkedIn Profile Optimization",
    body: "Make your profile impossible to miss for the startup founders and hiring panels who are already searching. We rebuild it around how recruiters actually search and behave.",
    points: [
      "Tagline and About section rewritten for maximum hook",
      "Keywords aligned to your target tech or non-tech niche",
      "Experience restructured to show real ownership",
      "Settings checklist that lifts your search appearances",
      "Delivered in 4 to 5 business days",
    ],
    cta: "Optimize LinkedIn",
  },
  {
    tag: "Resume design",
    title: "Resume Writing",
    body: "No more generic CV. We rebuild yours from the ground up around metrics, speed, and execution, framed for founders who hire in ambiguity.",
    points: [
      "Fully custom, modern CV rebuilt from scratch",
      "Laid out for the six-second recruiter scan",
      "Metric-driven bullets that prove outcomes, not tasks",
      "ATS-friendly formatting and keyword density",
      "PDF and editable versions, both yours",
    ],
    cta: "Rewrite resume",
  },
  {
    tag: "1-on-1 mentorship",
    title: "Career Coaching",
    body: "Work one-on-one with top coaches who have real expertise in your domain and your specific situation.",
    points: [
      "Career-trajectory growth consultation",
      "Workplace-relationship navigation",
      "A 60-minute intensive one-on-one session",
      "Mock-interview feedback and negotiation coaching",
      "Follow-up support over chat for 15 days",
    ],
    cta: "Book a coaching session",
    book: true,
  },
];

const PROOF = [
  {
    title: "Active market context",
    body: "We run live mandates for high-growth tech companies every day. We know which titles, skill sets, and salary bands are realistic right now.",
  },
  {
    title: "Recruiter-lens alignment",
    body: "We are the ones reading the profiles all day. We frame your experience the way a recruiter actually scans it, so you clear the first screen on real signal, not keywords.",
  },
  {
    title: "Direct referral pipeline",
    body: "Candidates we coach or rewrite who show strong startup alignment get prioritised for relevant Talent Diary mandates.",
  },
];

type Testimonial = {
  name: string;
  role: string;
  date: string;
  quote: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Chandra Bhushan Mishra",
    role: "Sales Leader, EdTech & IT Sales",
    date: "August 2025",
    quote:
      "Thank you for crafting a well-structured and impactful resume. The content clearly highlights my strengths and aligns with my career goals. I appreciate your professionalism and attention to detail.",
  },
  {
    name: "Cecil Wilson, CCIE, CISSP",
    role: "Collaboration Architect & Cybersecurity Expert",
    date: "September 2025",
    quote:
      "Sanghamitra redesigned my LinkedIn profile and resume and made them far more effective. I really appreciate and admire the work she did.",
  },
  {
    name: "Bunty Deb",
    role: "Program Manager, Learning & Business Operations",
    date: "May 2026",
    quote:
      "Working with Sanghamitra was a wonderful experience. She is extremely professional, detail-oriented, and committed to delivering high-quality work. She carefully understood my profile and created a resume that was both visually appealing and professionally strong. I especially appreciated her timely communication and on-time delivery. Highly recommended for anyone seeking professional help with their resume.",
  },
  {
    name: "Subhajeet Das",
    role: "EdTech & B2C Sales, ex-Byju's",
    date: "June 2025",
    quote:
      "I had a great experience working with Sanghamitra. She listened to my requirements and curated a CV which far exceeded my expectations. Her attention to detail is top-notch and she is very communicative. She is very easy to work with, and I would 100% recommend her to anyone looking to curate a perfect CV.",
  },
];

function Stars() {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: ".45rem" }}
      aria-label="Rated 5 out of 5"
    >
      <span
        aria-hidden="true"
        style={{
          color: "oklch(0.72 0.15 72)",
          fontSize: "1.05rem",
          letterSpacing: "2px",
        }}
      >
        ★★★★★
      </span>
      <span
        style={{
          fontFamily: "var(--display)",
          fontWeight: 700,
          fontSize: ".82rem",
          color: "var(--ink-soft)",
        }}
      >
        5.0
      </span>
    </div>
  );
}

export default function CoachingPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ===== Hero ===== */}
        <section className="page-hero on-blue">
          <div className="wrap">
            <hr className="diary-rule" aria-hidden="true" />
            <Reveal className="sec-head">
              <Doodle tone="blue" className="right-2 top-0 w-[clamp(40px,6vw,56px)] max-md:hidden">
                <DoodlePeople />
              </Doodle>
              <Doodle tone="ink" className="-left-1 top-4 w-6 max-md:hidden">
                <DoodleStar />
              </Doodle>
              <span className="eyebrow">
                <span className="tri" /> Elevate your career narrative
              </span>
              <h2>
                Stand out in the{" "}
                <InkReveal as="span" className="ink ink--sketch">
                  startup market
                  <SketchUnderline />
                </InkReveal>
                .
              </h2>
              <p className="dek">
                We read hundreds of resumes a day. We know exactly what makes a
                founder stop scrolling. Let us turn your work history into a
                high-impact story that proves ownership, metrics, and startup
                readiness.
              </p>

              <div
                style={{
                  marginTop: "1.6rem",
                  display: "flex",
                  gap: ".8rem",
                  flexWrap: "wrap",
                }}
              >
                <a href="#services" className="btn btn-primary">
                  Explore services
                </a>
                <a href="#start" className="btn btn-ghost">
                  Submit your profile
                </a>
              </div>

              <MarginNote className="-bottom-9 right-2 max-md:hidden">
                from the hiring side
              </MarginNote>
              <Doodle tone="ink" className="bottom-[-2.4rem] left-8 w-[52px] rotate-[10deg] max-md:hidden">
                <DoodleArrow />
              </Doodle>
            </Reveal>
          </div>
        </section>

        {/* ===== Services ===== */}
        <section id="services" className="section ruled" style={{ paddingTop: 0 }} aria-label="Services">
          <div className="wrap">
            <Reveal className="sec-head" as="div">
              <Doodle tone="blue" className="right-2 top-0 w-8 rotate-3 max-md:hidden">
                <DoodleNotepad />
              </Doodle>
              <span className="eyebrow">
                <span className="tri" /> Three ways we help
              </span>
              <h2>
                Pick the lift you{" "}
                <InkReveal as="span" className="ink ink--sketch">
                  need
                  <SketchUnderline />
                </InkReveal>
              </h2>
              <p className="dek">
                One service or all three. Start where it hurts most, we will tell
                you the honest order.
              </p>
            </Reveal>

            <Stagger className="why-grid svc-grid">
              {SERVICES.map((s, i) => (
                <RevealItem
                  settle
                  tilt={i % 2 === 0 ? -0.5 : 0.5}
                  className="why-card ruled svc-card relative"
                  key={s.title}
                >
                  <Paperclip />
                  <span className="svc-tag">{s.tag}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <ul className="svc-list">
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  {s.book ? (
                    <a
                      href={COACHING_CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      {s.cta}
                    </a>
                  ) : (
                    <a href="#start" className="btn btn-primary">
                      {s.cta}
                    </a>
                  )}
                </RevealItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ===== Why get coached ===== */}
        <section className="section ruled" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal className="sec-head" as="div">
              <Doodle tone="ink" className="right-2 top-0 w-7 rotate-3 max-md:hidden">
                <DoodleBulb />
              </Doodle>
              <span className="eyebrow">
                <span className="tri" /> Why us
              </span>
              <h2>
                Why get coached by Talent Diary?
              </h2>
              <p className="dek">
                We are not generic career coaches. We are active recruiters on
                the ground, who know who is hiring and exactly how they evaluate.
              </p>
            </Reveal>

            <Stagger className="why-grid why-cols" style={{ marginTop: "clamp(1.4rem, 3vw, 2.2rem)" }}>
              {PROOF.map((p, i) => (
                <RevealItem className="relative" key={p.title}>
                  <h3>{p.title}</h3>
                  <p className="lined">{p.body}</p>
                </RevealItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ===== Testimonials ===== */}
        <section
          className="section"
          style={{ paddingTop: 0 }}
          aria-label="Testimonials"
        >
          <div className="wrap">
            <Reveal className="sec-head" as="div">
              <Doodle tone="ink" className="right-2 top-0 w-7 rotate-6 max-md:hidden">
                <DoodleStar />
              </Doodle>
              <span className="eyebrow">
                <span className="tri" /> Kind words
              </span>
              <h2>What clients say after working with us.</h2>
              <p className="dek">
                Recent LinkedIn recommendations from people whose resumes and
                profiles we rebuilt.
              </p>
            </Reveal>

            <Stagger
              className="why-grid"
              style={{ marginTop: "clamp(1.4rem, 3vw, 2.2rem)" }}
            >
              {TESTIMONIALS.map((t, i) => (
                <RevealItem
                  className="why-card relative"
                  key={t.name}
                  settle
                  tilt={i % 2 === 0 ? -0.5 : 0.5}
                  style={{ display: "flex", flexDirection: "column", gap: ".8rem" }}
                >
                  <Stars />
                  <p
                    style={{
                      fontSize: "1.02rem",
                      lineHeight: 1.6,
                      color: "var(--ink)",
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ marginTop: "auto", paddingTop: ".4rem" }}>
                    <div
                      style={{
                        fontFamily: "var(--display)",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontSize: ".88rem",
                        color: "var(--ink-soft)",
                        marginTop: ".15rem",
                      }}
                    >
                      {t.role} &middot; {t.date}
                    </div>
                  </div>
                </RevealItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ===== Start: coaching enquiry form ===== */}
        <section
          id="start"
          className="section ruled"
          style={{ paddingTop: 0, scrollMarginTop: "5rem" }}
          aria-label="Submit your profile"
        >
          <div className="wrap">
            <Reveal className="sec-head" as="div">
              <Doodle tone="blue" className="right-2 top-0 w-8 rotate-3 max-md:hidden">
                <DoodleNotepad />
              </Doodle>
              <span className="eyebrow">
                <span className="tri" /> Start here
              </span>
              <h2>
                Send us your{" "}
                <InkReveal as="span" className="ink ink--sketch">
                  details
                  <SketchUnderline />
                </InkReveal>
              </h2>
              <p className="dek">
                Tell us where you are and what you want help with. We come back
                with the honest next step, not a sales pitch.
              </p>
            </Reveal>
            <Reveal
              className="why-card ruled relative"
              as="div"
              delay={0.06}
              style={{
                maxWidth: "62ch",
                marginInline: "auto",
                marginTop: "clamp(1.4rem, 3vw, 2.2rem)",
              }}
            >
              <Paperclip />
              <CoachingForm />
            </Reveal>
          </div>
        </section>

        {/* ===== Closing CTA ===== */}
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
                <span className="tri" /> Your move
              </span>
              <h2>Your next move is worth getting right.</h2>
              <p>
                Tell us where you are and where you want to be. We will tell you
                the truth about how to get there.
              </p>
            </Reveal>
            <Reveal className="closing-act" delay={0.12}>
              <MarginNote className="scrap--closing">no fluff, just the move</MarginNote>
              <a href="#start" className="btn btn-on-blue">
                Start with a conversation
              </a>
              <div className="sidedoor">
                Hiring instead?{" "}
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book a hiring call →
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
