import {
  Reveal,
  Stagger,
  RevealItem,
  InkReveal,
} from "@/components/site/reveal";
import { Logo } from "@/components/site/logo";
import { CALENDLY_URL } from "@/lib/site";
import {
  InkRocket,
  InkSparkle,
  InkChecklist,
  InkBolt,
  InkPhone,
  InkCalendarCheck,
  InkHandshake,
  MarginNote,
  Paperclip,
  WaxSeal,
  IndexTab,
  Doodle,
  DoodleBooks,
  DoodlePeople,
  DoodleBulb,
  DoodleStar,
  DoodleArrow,
  DoodleNotepad,
  SketchUnderline,
  SeamStrip,
} from "@/components/site/scraps";

const DIFFS = [
  {
    Icon: InkRocket,
    title: "We only do startups",
    body: "Not a generalist desk that dabbles. Every mandate we take is a startup mandate, so we already know your pace, your ownership culture, and the blended tech and non-tech roles a growing team actually needs.",
  },
  {
    Icon: InkSparkle,
    title: "Proprietary agentic AI",
    body: "We built our own agentic tool that learns from every assessment, screen, and rejection reason. It models the exact persona your role needs, so each shortlist lands sharper than the last and your time-to-fill keeps falling.",
  },
  {
    Icon: InkChecklist,
    title: "You interview a shortlist, not a slush pile",
    body: "Every candidate clears a hard screen and is mapped to your brief before you ever see them. You spend your hours on finalists worth hiring, not the filler the rest of the market forwards.",
  },
  {
    Icon: InkBolt,
    title: "Built for startup chaos",
    body: "Roles change, priorities shift, timelines move. That is startup hiring, and we expect it. A brief that evolves speeds us up instead of sending us back to square one.",
  },
];

export function WhyUs() {
  return (
    <section id="why" className="section">
      <SeamStrip variant="top" />
      <div className="wrap">
        <hr className="diary-rule" aria-hidden="true" />
        <Reveal className="sec-head">
          <span className="folio" aria-hidden="true">01</span>
          <Doodle tone="blue" className="scrap--why-people">
            <DoodlePeople />
          </Doodle>
          <Doodle tone="ink" className="scrap--why-star">
            <DoodleStar />
          </Doodle>
          <span className="eyebrow">
            <span className="tri" />
            <span className="no">No. 01</span>
            <span className="slash">/</span> Why us
          </span>
          <h2>
            Why startups{" "}
            <InkReveal as="span" className="ink ink--sketch">
              hire
              <SketchUnderline />
            </InkReveal>{" "}
            with us
          </h2>
          <p className="dek">
            Other agencies send you resumes. We send you the people worth
            interviewing, chosen by recruiters who have actually built startup
            teams.
          </p>
          <MarginNote className="scrap--head">four reasons that matter</MarginNote>
          <Doodle tone="ink" className="scrap--why-arrow">
            <DoodleArrow />
          </Doodle>
        </Reveal>
        <Stagger className="why-grid">
          {DIFFS.map(({ Icon, title, body }, i) => (
            <RevealItem settle tilt={-0.8} className="why-card ruled" key={title}>
              <Paperclip />
              <span className="why-ic">
                <Icon className="why-glyph" />
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

const WORK = [
  {
    title: "We learn your standard first",
    body: "Before we touch the market, we sit with the people who own the role and pull out what good actually means here. You will not find that written on a job posting.",
  },
  {
    title: "A short list, well briefed",
    body: "You get a handful of names, not a stack, and each one arrives with the context to judge it quickly. The more you react, the closer the next batch lands.",
  },
  {
    title: "We trade on the why",
    body: "A plain yes or no moves nothing forward. The one line on why a candidate did or did not fit is what turns a near miss into a signed offer, so we pull it out of every round.",
  },
  {
    title: "We mind the human side",
    body: "Strong people lose interest when a process stalls. We track how the search feels from their seat and tell you the moment someone starts to drift.",
  },
  {
    title: "One place for everything",
    body: "No scattered threads or rival trackers. The whole search lives in a single shared sheet, ordered around the skills the role genuinely cannot do without.",
  },
  {
    title: "It runs on candour",
    body: "Fast replies and blunt feedback are the fuel. Give us both and the search moves at the speed a startup actually needs.",
  },
];

export function HowWeWork() {
  return (
    <section id="how-we-work" className="section">
      <div className="wrap">
        <hr className="diary-rule" aria-hidden />
        <Reveal className="sec-head">
          <Doodle tone="blue" className="scrap--why-people">
            <DoodleNotepad />
          </Doodle>
          <Doodle tone="ink" className="scrap--why-arrow">
            <DoodleArrow />
          </Doodle>
          <span className="eyebrow">
            <span className="tri" /> How we work
          </span>
          <h2>
            We tune the search to your{" "}
            <InkReveal as="span" className="ink ink--sketch">
              team
              <SketchUnderline />
            </InkReveal>
          </h2>
          <p className="dek">
            Not a one-way stream of resumes. A close loop with your team that
            fits tighter the more you tell us.
          </p>
        </Reveal>
        <Stagger className="why-grid">
          {WORK.map(({ title, body }, i) => (
            <RevealItem
              settle
              tilt={i % 2 === 0 ? -0.8 : 0.8}
              className="why-card ruled"
              key={title}
            >
              <Paperclip />
              <span
                className="why-ic"
                style={{
                  fontFamily: "var(--display)",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  fontVariantNumeric: "tabular-nums",
                }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

const ROLE_GROUPS = [
  {
    title: "GTM hiring",
    roles: [
      "Head of Category Management",
      "Strategic Management",
      "Founder's Office, Program Management",
      "VP Revenue",
      "Head of Growth",
      "Head of Marketing",
      "Head of Partnerships",
      "Head of International Expansion / New Markets",
      "Head of Revenue Operations",
      "Head of Business Development",
    ],
  },
  {
    title: "Core AI / ML roles",
    roles: [
      "Machine Learning Engineer",
      "Data Scientist",
      "Applied Scientist",
      "NLP Engineer",
      "Deep Learning Engineer",
      "AI Agent Engineer",
      "Conversational AI Engineer",
    ],
  },
  {
    title: "Mid-level startup roles",
    roles: [
      "Enterprise Sales Manager",
      "Operations Manager",
      "Business Analyst",
      "Performance Marketing Manager",
      "Brand Manager",
      "Content Manager",
      "Strategic Partnerships",
      "Customer Experience Analyst",
      "Product Manager",
    ],
  },
];

export function RolesSection() {
  return (
    <section className="section">
      <SeamStrip variant="top" />
      <div className="wrap">
        <hr className="diary-rule" aria-hidden />
        <Reveal className="sec-head">
          <Doodle tone="ink" className="scrap--why-star">
            <DoodleStar />
          </Doodle>
          <span className="eyebrow">
            <span className="tri" /> What we specialise in
          </span>
          <h2>
            The roles we{" "}
            <InkReveal as="span" className="ink ink--sketch">
              fill
              <SketchUnderline />
            </InkReveal>
          </h2>
          <p className="dek">
            From GTM leadership to core AI and ML to the mid-level operators who
            keep a startup moving.
          </p>
        </Reveal>
        <Stagger className="role-grid">
          {ROLE_GROUPS.map((g) => (
            <RevealItem className="role-card ruled" key={g.title}>
              <Paperclip />
              <h3>{g.title}</h3>
              <div className="role-tags">
                {g.roles.map((r) => (
                  <span key={r}>{r}</span>
                ))}
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

const STEPS = [
  {
    Icon: InkPhone,
    n: "01",
    title: "All we need is one call",
    body: "A 30-minute conversation about the role, the team, and what right looks like. No 10-page brief, no busywork on your side.",
  },
  {
    Icon: InkCalendarCheck,
    n: "02",
    title: "A shortlist in under 30 days, or we keep going",
    body: "You get a tight, vetted shortlist mapped to your brief from our 60,000-strong network. If the first one misses, we recalibrate and send the next. We are not done until you have people worth interviewing.",
  },
  {
    Icon: InkHandshake,
    n: "03",
    title: "Start with a conversation, not a contract",
    body: "The first call is a no-obligation look at your role and how we would approach it. You decide what happens next.",
  },
];

export function WhatToExpect() {
  return (
    <section id="how" className="how ruled">
      <div className="wrap how-wrap">
        <hr className="diary-rule" />
        <Reveal className="sec-head how-head">
          <span className="folio" aria-hidden>02</span>
          <Doodle tone="blue" className="scrap--how-pad">
            <DoodleNotepad />
          </Doodle>
          <Doodle tone="blue" className="scrap--how-bulb">
            <DoodleBulb />
          </Doodle>
          <span className="eyebrow">
            <span className="tri" />
            <span className="no">No. 02</span>
            <span className="slash">/</span> What to expect
          </span>
          <h2>
            What we need from you, and what you get{" "}
            <InkReveal as="span" className="ink ink--sketch">
              back
              <SketchUnderline />
            </InkReveal>
          </h2>
          <p className="dek how-dek">
            Three short steps. No long brief, no lock-in, no busywork on your
            side.
          </p>
        </Reveal>
        <Stagger className="steps">
          {STEPS.map(({ Icon, n, title, body }, i) => (
            <RevealItem className="step" key={title}>
              <span className="step-ic">
                <Icon className="step-glyph" />
                <span className="step-no" aria-hidden>{n}</span>
                {i === 0 && (
                  <MarginNote className="scrap--how">no busywork</MarginNote>
                )}
              </span>
              {i === 0 && (
                <Doodle tone="blue" className="scrap--how-arrow">
                  <DoodleArrow />
                </Doodle>
              )}
              <h3>{title}</h3>
              <p>{body}</p>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

const FOUNDERS = [
  {
    mono: "SM",
    photo: "/founders/sangha.jpg",
    name: "Sanghamitra Moulik",
    linkedin: "https://www.linkedin.com/in/sangha-moulik/",
    tags: ["Awign", "Unacademy", "Interview Kickstart", "8 years in startup hiring"],
    bio: "My career has been built entirely in the chaos of startup hiring. Over eight years I helped set up early teams at Awign, drove high-volume GTM hiring for Unacademy's most profitable verticals, and closed highly niche mandates at Interview Kickstart. What I bring is not just recruitment experience. I bring startup context: I know early teams need people who can work without perfect systems, take ownership without direction, and stay effective when priorities shift. My approach is simple. Do not just find someone who can do the job today. Find someone who can grow with the chaos, the momentum, and the mission.",
  },
  {
    mono: "MD",
    photo: "/founders/mashika.jpg",
    name: "Mashika De Almeida",
    linkedin: "https://www.linkedin.com/in/mashika-de-almeida-4164a1169/",
    tags: ["91Springboard", "Unacademy", "Interview Kickstart", "Leadership hiring"],
    bio: "I am a leadership-hiring nerd who has spent years building teams inside high-growth startups like 91Springboard, Unacademy, and Interview Kickstart: hiring vertical heads, setting up teams from scratch, and partnering with founders on roles that never fit a standard job description. I have seen startup hiring from the inside, with all its urgency and ambiguity. It shaped one belief I hold strongly: great hiring is not a funnel problem, it is a relationship problem. The future of hiring is not finding candidates when a role opens. It is building relationships long before the role exists.",
  },
];

export function Founders() {
  return (
    <section id="founders" className="founders section">
      <SeamStrip variant="top" />
      <div className="wrap">
        <hr className="diary-rule" aria-hidden />
        <Reveal className="sec-head founders-head">
          <IndexTab className="scrap--founders-tab">the team</IndexTab>
          <Doodle tone="ink" className="scrap--founders-books">
            <DoodleBooks />
          </Doodle>
          <span className="eyebrow">
            <span className="tri" /> <span className="no">No.&nbsp;03</span>
            <span className="slash">/</span> Founders
          </span>
          <span className="folio" aria-hidden>03</span>
          <h2>
            Built by recruiters who have lived startup{" "}
            <InkReveal as="span" className="ink ink--sketch">
              hiring
              <SketchUnderline />
            </InkReveal>
          </h2>
          <p className="dek">
            We have built early teams from the inside, so we know what right
            looks like before the role even opens.
          </p>
        </Reveal>
        <Stagger className="founder-grid">
          {FOUNDERS.map((f, i) => (
            <RevealItem
              className="founder ruled--margin"
              key={f.name}
              settle
              tilt={i === 0 ? -0.6 : 0.6}
            >
              <Paperclip />
              <div className="founder-top">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="founder-photo"
                  src={f.photo}
                  alt={f.name}
                  width={72}
                  height={72}
                  loading="lazy"
                />
                <div>
                  <div className="nm">{f.name}</div>
                  <div className="ro">Co-Founder</div>
                  {f.linkedin && (
                    <a
                      href={f.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${f.name} on LinkedIn`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: ".35rem",
                        marginTop: ".45rem",
                        color: "var(--blue-deep)",
                        fontFamily: "var(--display)",
                        fontWeight: 700,
                        fontSize: ".82rem",
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="15"
                        height="15"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
              <div className="tags">
                {f.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <p>{f.bio}</p>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function TrustedBy() {
  return (
    <section className="trusted section">
      <div className="wrap">
        <hr className="diary-rule" aria-hidden />
        <Reveal className="sec-head">
          <span className="folio" aria-hidden>04</span>
          <Doodle tone="ink" className="scrap--trusted-star">
            <DoodleStar />
          </Doodle>
          <span className="eyebrow">
            <span className="tri" />
            <span className="no">No. 04</span>
            <span className="slash">/</span> Proof
          </span>
          <h2>
            Founders who trusted us with their hardest{" "}
            <InkReveal as="span" className="ink ink--sketch">
              roles
              <SketchUnderline />
            </InkReveal>
          </h2>
          <p className="dek">
            Trusted by high-growth teams across edtech, AI, and D2C to fill the
            roles a job board never could.
          </p>
        </Reveal>
        <Stagger className="row ruled--soft">
          <RevealItem as="span">edtech</RevealItem>
          <RevealItem as="span">AI &amp; ML</RevealItem>
          <RevealItem as="span">D2C</RevealItem>
          <RevealItem as="span">fintech</RevealItem>
          <RevealItem as="span">SaaS</RevealItem>
        </Stagger>
        <Reveal className="trusted-foot">
          <p className="note">
            Named client stories and testimonials are landing here soon.
          </p>
          <MarginNote className="scrap--trusted">more entries coming</MarginNote>
          <Doodle tone="ink" className="scrap--trusted-arrow">
            <DoodleArrow />
          </Doodle>
        </Reveal>
      </div>
    </section>
  );
}

export function ClosingCTA() {
  return (
    <section id="book" className="closing on-blue ruled">
      <SeamStrip variant="top" />
      <Doodle tone="ink" className="scrap--closing-people">
        <DoodlePeople />
      </Doodle>
      <div className="wrap closing-inner">
        <Reveal>
          <span className="eyebrow">
            <span className="tri" /> Start here
          </span>
          <h2>Tell us the role. See a shortlist in days, not weeks.</h2>
          <p>
            One call is all it takes to start. No long forms, no commitment,
            just a faster path to the right hire.
          </p>
        </Reveal>
        <Reveal className="closing-act" delay={0.12}>
          <WaxSeal className="scrap--closing-seal" />
          <Doodle tone="ink" className="scrap--closing-star">
            <DoodleStar />
          </Doodle>
          <MarginNote className="scrap--closing">one call, that&apos;s it</MarginNote>
          <Doodle tone="ink" className="scrap--closing-arrow">
            <DoodleArrow />
          </Doodle>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-on-blue"
          >
            Book a hiring call
          </a>
          <div className="sidedoor" id="candidates">
            Looking for your next startup role?{" "}
            <a href="/contact">
              Join our talent network →
            </a>
          </div>
        </Reveal>
      </div>
      <SeamStrip variant="foot" />
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="ruled--soft">
      <div className="wrap foot-inner">
        <div className="foot-brand">
          <Logo />
          <p>The recruitment partner for startups where every hire matters.</p>
          <a className="mail u-underline" href="mailto:contact@talentdiary.in">
            contact@talentdiary.in
          </a>
        </div>
        <div className="foot-col">
          <h4>Company</h4>
          <a className="u-underline" href="#why">Why us</a>
          <a className="u-underline" href="#how">What to expect</a>
          <a className="u-underline" href="#founders">Founders</a>
        </div>
        <div className="foot-col">
          <h4>For candidates</h4>
          <a
            className="u-underline"
            href="mailto:contact@talentdiary.in?subject=Join%20the%20talent%20network"
          >
            Join the talent network
          </a>
          <a
            className="u-underline"
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener"
          >
            LinkedIn
          </a>
          <a className="u-underline" href="mailto:contact@talentdiary.in">
            Contact
          </a>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>© 2026 Talent Diary. All rights reserved.</span>
        <span className="foot-colophon">Made for startups in India.</span>
      </div>
    </footer>
  );
}
