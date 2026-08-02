"use client";

import Image from "next/image";
import Link from "next/link";
import { Folder, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Caveat, Hanken_Grotesk, Bricolage_Grotesque } from "next/font/google";

/* Self-contained fonts for this isolated variant. */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});
const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});
const hand = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const BLUE = "#2a52ff";

/* ---------- shared motion helpers ---------- */
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

/** Floating decorative block: fades in with a slight rotate + slide, staggered. */
function Float({
  children,
  className,
  delay,
  from,
  rotate = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
  from: { x?: number; y?: number };
  rotate?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: from.x ?? 0, y: from.y ?? 0, rotate: rotate - 6 }}
      animate={{ opacity: 1, x: 0, y: 0, rotate }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: "none" }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- scroll reveal (respects prefers-reduced-motion) ---------- */

type RevealTag = "div" | "section" | "li" | "p" | "h2" | "header" | "ul" | "a";

function Reveal({
  children,
  delay = 0,
  y = 24,
  as = "div",
  className,
  style,
  href,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  as?: RevealTag;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
}) {
  const reduceRaw = useReducedMotion();
  const reduce = reduceRaw ?? false;
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} style={style} {...(href ? { href } : {})}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={style}
      {...(href ? { href } : {})}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* ---------- small UI atoms ---------- */

function Avatar({ seed }: { seed: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(
        seed,
      )}&backgroundColor=c7d2fe,ddd6fe,bfdbfe`}
      alt=""
      referrerPolicy="no-referrer"
      width={26}
      height={26}
      className="h-[26px] w-[26px] rounded-full border-2 border-white bg-white object-cover"
    />
  );
}

function Initial({ children }: { children: string }) {
  return (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
      style={{ background: BLUE }}
      aria-hidden
    >
      {children}
    </span>
  );
}

/** Bookmark mark: rounded rect with a V-notch bottom. */
function BookmarkMark() {
  return (
    <svg width="22" height="28" viewBox="0 0 22 28" fill="none" aria-hidden>
      <path
        d="M3 2.5A2.5 2.5 0 0 1 5.5 0h11A2.5 2.5 0 0 1 19 2.5V26a1 1 0 0 1-1.6.8L11 22.2 4.6 26.8A1 1 0 0 1 3 26V2.5Z"
        fill={BLUE}
      />
    </svg>
  );
}

/** Compact wordmark for nav + footer. */
function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="inline-flex h-6 w-6 items-center justify-center">
        <svg width="15" height="19" viewBox="0 0 22 28" fill="none" aria-hidden>
          <path
            d="M3 2.5A2.5 2.5 0 0 1 5.5 0h11A2.5 2.5 0 0 1 19 2.5V26a1 1 0 0 1-1.6.8L11 22.2 4.6 26.8A1 1 0 0 1 3 26V2.5Z"
            fill={BLUE}
          />
        </svg>
      </span>
      <span className={`${display.className} text-[15px] font-bold tracking-tight text-[#141414]`}>
        Talent Diary
      </span>
    </span>
  );
}

/* ---------- floating panels ---------- */

function StickyNote() {
  return (
    <div
      className="relative w-56 rounded-sm bg-[#FFF188] p-6 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.25)]"
      style={{ pointerEvents: "auto" }}
    >
      <span
        className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full shadow"
        style={{ background: "#D32F2F", boxShadow: "inset 0 -2px 3px rgba(0,0,0,0.25)" }}
        aria-hidden
      />
      <p className={`${hand.className} text-[20px] leading-snug text-[#424242]`}>
        every hire matters
      </p>
    </div>
  );
}

function OpenRolesFolder() {
  return (
    <div className="relative w-[420px]" style={{ pointerEvents: "auto" }}>
      <Folder
        className="h-auto w-[420px] fill-[#F2F3F5] text-gray-200 drop-shadow-[0_24px_50px_-20px_rgba(0,0,0,0.3)]"
        strokeWidth={1}
        aria-hidden
      />
      <span className="absolute left-10 top-9 text-sm font-semibold text-gray-500">
        Open roles
      </span>

      <TaskCard
        className="absolute left-9 top-[112px]"
        badge="1"
        badgeColor="#2a52ff"
        role="Founding Engineer"
        seeds={["Riya", "Tarun", "Meera"]}
        progress={0.7}
        date="30 days"
      />
      <TaskCard
        className="absolute left-16 top-[182px]"
        badge="2"
        badgeColor="#16a34a"
        role="GTM Lead"
        seeds={["Devansh", "Ananya"]}
        progress={0.45}
        date="In review"
      />
    </div>
  );
}

function TaskCard({
  className,
  badge,
  badgeColor,
  role,
  seeds,
  progress,
  date,
}: {
  className?: string;
  badge: string;
  badgeColor: string;
  role: string;
  seeds: string[];
  progress: number;
  date: string;
}) {
  return (
    <div
      className={`${className ?? ""} w-60 rounded-xl bg-white/95 p-3 shadow-[0_14px_30px_-12px_rgba(0,0,0,0.28)] backdrop-blur`}
    >
      <div className="flex items-center gap-2">
        <span
          className="flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-bold text-white"
          style={{ background: badgeColor }}
          aria-hidden
        >
          {badge}
        </span>
        <span className="text-[13px] font-semibold text-[#222]">{role}</span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex -space-x-2">
          {seeds.map((s) => (
            <Avatar key={s} seed={s} />
          ))}
        </div>
        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
          {date}
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full"
          style={{ width: `${progress * 100}%`, background: BLUE }}
        />
      </div>
    </div>
  );
}

function ShortlistFolder() {
  const rows = [
    { name: "A. Khan", role: "Senior Backend" },
    { name: "P. Nair", role: "Product Designer" },
    { name: "S. Rao", role: "Growth Lead" },
  ];
  return (
    <div className="relative w-[360px]" style={{ pointerEvents: "auto" }}>
      <Folder
        className="h-auto w-[360px] fill-[#EEF2FF] text-indigo-100 drop-shadow-[0_24px_50px_-20px_rgba(0,0,0,0.3)]"
        strokeWidth={1}
        aria-hidden
      />
      <span className="absolute left-9 top-8 text-sm font-semibold text-gray-500">
        Your shortlist
      </span>
      <div className="absolute left-7 top-[92px] flex w-[300px] flex-col gap-2">
        {rows.map((r) => (
          <div
            key={r.name}
            className="flex items-center gap-3 rounded-xl bg-white/95 px-3 py-2 shadow-[0_12px_26px_-14px_rgba(0,0,0,0.25)] backdrop-blur"
          >
            <Initial>{r.name.replace(/\W/g, "").slice(0, 2).toUpperCase()}</Initial>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold leading-tight text-[#222]">
                {r.name}, {r.role}
              </p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
              <Check className="h-3 w-3" strokeWidth={3} /> vetted
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DiaryFolder() {
  return (
    <div
      className="w-[300px] rounded-2xl bg-white p-3 shadow-[0_28px_60px_-22px_rgba(0,0,0,0.35)]"
      style={{ pointerEvents: "auto" }}
    >
      <div className="mb-2 flex items-center gap-2 px-1">
        <BookmarkMark />
        <span className="text-sm font-semibold text-gray-600">The Talent Diaries</span>
      </div>
      <div className="relative h-[170px] w-full overflow-hidden rounded-xl rotate-[-1.5deg]">
        <Image
          src="/diary/poster.png"
          alt="The Talent Diary, an open navy-leather journal of notes, lessons and stories from startup hiring, showing Entry 42, Why Most Founders Hire Too Late."
          fill
          sizes="300px"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}

/* ---------- page-level content ---------- */

const STATS = [
  { value: "60k+", label: "startup candidates in our network" },
  { value: "Under 30 days", label: "to a vetted shortlist" },
  { value: "100%", label: "of profiles deeply vetted before they reach you" },
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

/* A quiet section eyebrow: small dot + tracked label. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-gray-400">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: BLUE }} aria-hidden />
      {children}
    </span>
  );
}

/* ---------- page ---------- */

export default function WorkspacePage() {
  const chips = ["Unacademy", "Interview Kickstart", "91Springboard", "Awign"];

  return (
    <div
      className={`${body.className} min-h-screen w-full overflow-x-clip bg-[#FDFDFD] p-3 sm:p-6`}
    >
      {/* Fixed cross-variant link */}
      <Link
        href="/style"
        className="fixed left-4 top-4 z-50 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-xs font-medium text-gray-500 shadow-sm backdrop-blur transition hover:text-[#2a52ff]"
      >
        Styles
      </Link>

      {/* ============================ HERO ============================ */}
      <section className="relative flex min-h-[88vh] w-full flex-col items-center justify-center overflow-clip rounded-[2.5rem] border border-black/10 bg-white py-24 text-center sm:py-32">
        {/* dot-grid noise layer */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "#ffffff",
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
          aria-hidden
        />

        {/* ---- floating frame: a centered, fixed-width stage so blocks anchor
            to the card, not the viewport. overflow-clip on the section keeps
            any bleed from creating horizontal scroll. ---- */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-full w-[1180px] max-w-[100vw] -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          {/* top-left: sticky note */}
          <Float
            delay={0.4}
            from={{ x: -30, y: -20 }}
            rotate={-7}
            className="absolute left-[1%] top-[6%] origin-top-left scale-[0.5] sm:left-[3%] sm:scale-[0.7] md:scale-90 lg:scale-100"
          >
            <StickyNote />
          </Float>

          {/* top-right: diary motif (static art, no animation/canvas) */}
          <Float
            delay={0.55}
            from={{ x: 30, y: -20 }}
            rotate={4}
            className="absolute right-[0%] top-[3%] origin-top-right scale-[0.5] sm:right-[2%] sm:scale-[0.68] md:scale-[0.82] lg:scale-95"
          >
            <DiaryFolder />
          </Float>

          {/* bottom-left: open roles folder */}
          <Float
            delay={0.85}
            from={{ x: -30, y: 30 }}
            rotate={-3}
            className="absolute -left-[3%] bottom-[1%] origin-bottom-left scale-[0.5] sm:-left-[1%] sm:scale-[0.66] md:scale-[0.8] lg:scale-95"
          >
            <OpenRolesFolder />
          </Float>

          {/* bottom-right: shortlist folder */}
          <Float
            delay={1.05}
            from={{ x: 30, y: 30 }}
            rotate={3}
            className="absolute -right-[2%] bottom-[2%] origin-bottom-right scale-[0.5] sm:right-[0%] sm:scale-[0.66] md:scale-[0.8] lg:scale-95"
          >
            <ShortlistFolder />
          </Float>
        </div>

        {/* soft white vignette so the centered card stays legible over blocks */}
        <div
          className="pointer-events-none absolute inset-0 z-[25]"
          style={{
            background:
              "radial-gradient(58% 50% at 50% 50%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.55) 55%, rgba(255,255,255,0) 100%)",
          }}
          aria-hidden
        />

        {/* ---- center content ---- */}
        <div className="relative z-30 mx-auto flex max-w-2xl flex-col items-center px-5">
          <motion.div variants={rise} initial="hidden" animate="show" custom={0}>
            <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_14px_34px_-10px_rgba(42,82,255,0.35)] ring-1 ring-black/5">
              <BookmarkMark />
            </div>
          </motion.div>

          <motion.h1
            variants={rise}
            initial="hidden"
            animate="show"
            custom={1}
            className={`${display.className} text-4xl font-bold tracking-tight text-[#141414] md:text-6xl lg:text-7xl`}
          >
            Hire the people who
            <br />
            <span className="text-gray-400">actually move the needle</span>
          </motion.h1>

          <motion.p
            variants={rise}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-xl text-xl text-gray-400"
          >
            A shortlist of deeply vetted, startup-ready candidates in under 30 days.
            Not a flood of resumes.
          </motion.p>

          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <a
              href="#book"
              className="rounded-xl px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={{ background: BLUE }}
            >
              Book a hiring call
            </a>
            <a
              href="#book"
              className="rounded-xl border border-black/10 bg-white px-6 py-3 text-base font-semibold text-[#141414] transition-colors hover:border-black/20"
            >
              Submit a role
            </a>
          </motion.div>

          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-10 flex flex-col items-center gap-2"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-gray-300">
              Built by operators from
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {chips.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-black/5 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500"
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== PROOF STATS BAND ===================== */}
      <section className="mx-auto mt-6 w-full max-w-6xl px-1 sm:px-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className="rounded-3xl border border-black/[0.07] bg-white p-7 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.35)]"
            >
              <div
                className={`${display.className} text-3xl font-bold tracking-tight text-[#141414] md:text-4xl`}
              >
                {s.value}
              </div>
              <div className="mt-2 max-w-[16rem] text-[15px] leading-relaxed text-gray-500">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= WHY FOUNDERS CHOOSE US ================= */}
      <section id="why" className="mx-auto mt-6 w-full max-w-6xl px-1 sm:px-2">
        <div className="rounded-[2rem] border border-black/[0.07] bg-white p-6 shadow-[0_18px_50px_-32px_rgba(0,0,0,0.35)] sm:p-10 md:p-12">
          <Reveal as="header" className="max-w-2xl">
            <Eyebrow>Why us</Eyebrow>
            <h2
              className={`${display.className} mt-4 text-3xl font-bold tracking-tight text-[#141414] md:text-5xl`}
            >
              Why founders choose us
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-gray-500">
              Other agencies send you resumes. We send you the people worth
              interviewing, chosen by recruiters who have actually built startup
              teams.
            </p>
          </Reveal>

          {/* Varied grid: a wide feature card, a blue accent card, then two
              standard cards. Not four identical tiles. */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* card 0: wide feature, spans 2 cols on desktop */}
            <Reveal
              delay={0}
              className="md:col-span-2 flex flex-col justify-between gap-6 rounded-3xl border border-black/[0.07] bg-[#F7F8FB] p-7 md:p-9"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2a52ff]">
                01
              </span>
              <div>
                <h3
                  className={`${display.className} text-2xl font-bold tracking-tight text-[#141414] md:text-3xl`}
                >
                  We only do startups
                </h3>
                <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-gray-500">
                  You get recruiters who know startup pace, ownership, and
                  ambiguity, because we have hired for niche and blended tech and
                  non-tech roles inside fast-growing teams.
                </p>
              </div>
              {/* small dot-grid accent in the corner */}
              <div
                className="pointer-events-none h-12 w-32 self-end opacity-60"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(42,82,255,0.28) 1px, transparent 0)",
                  backgroundSize: "12px 12px",
                }}
                aria-hidden
              />
            </Reveal>

            {/* card 1: blue accent card */}
            <Reveal
              delay={0.06}
              className="flex flex-col gap-4 rounded-3xl p-7 text-white md:p-8"
              style={{ background: BLUE }}
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
                02
              </span>
              <h3 className={`${display.className} text-xl font-bold tracking-tight md:text-2xl`}>
                Matching that sharpens with every role
              </h3>
              <p className="text-[15px] leading-relaxed text-white/85">
                Our matching engine learns from every assessment, screen, and
                rejection reason, so each shortlist fits your role better than the
                last.
              </p>
            </Reveal>

            {/* card 2: standard */}
            <Reveal
              delay={0.12}
              className="flex flex-col gap-3 rounded-3xl border border-black/[0.07] bg-white p-7 shadow-[0_16px_44px_-32px_rgba(0,0,0,0.35)] md:p-8"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2a52ff]">
                03
              </span>
              <h3
                className={`${display.className} text-xl font-bold tracking-tight text-[#141414] md:text-2xl`}
              >
                You interview a shortlist, not a slush pile
              </h3>
              <p className="text-[15px] leading-relaxed text-gray-500">
                Every candidate clears a rigorous screen and is mapped to your
                specific needs before you ever see them. Your team interviews
                finalists, not filler.
              </p>
            </Reveal>

            {/* card 3: standard, spans 2 cols to balance the row */}
            <Reveal
              delay={0.18}
              className="md:col-span-2 flex flex-col gap-3 rounded-3xl border border-black/[0.07] bg-white p-7 shadow-[0_16px_44px_-32px_rgba(0,0,0,0.35)] md:p-9"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2a52ff]">
                04
              </span>
              <h3
                className={`${display.className} text-xl font-bold tracking-tight text-[#141414] md:text-2xl`}
              >
                We get startup hiring chaos
              </h3>
              <p className="max-w-2xl text-[15px] leading-relaxed text-gray-500">
                Roles evolve, priorities shift, timelines move. We are built for
                that volatility, so a changing brief speeds you up instead of
                starting you over.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== WHAT TO EXPECT ===================== */}
      <section id="how" className="mx-auto mt-6 w-full max-w-6xl px-1 sm:px-2">
        <div className="rounded-[2rem] border border-black/[0.07] bg-white p-6 shadow-[0_18px_50px_-32px_rgba(0,0,0,0.35)] sm:p-10 md:p-12">
          <Reveal as="header" className="max-w-2xl">
            <Eyebrow>What to expect</Eyebrow>
            <h2
              className={`${display.className} mt-4 text-3xl font-bold tracking-tight text-[#141414] md:text-5xl`}
            >
              A quiet process, start to shortlist
            </h2>
          </Reveal>

          <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal
                key={s.title}
                as="li"
                delay={i * 0.08}
                className="flex flex-col gap-4 rounded-3xl border border-black/[0.07] bg-[#F7F8FB] p-7 md:p-8"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-xl text-[13px] font-bold text-white"
                    style={{ background: BLUE }}
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    {s.k}
                  </span>
                </div>
                <h3
                  className={`${display.className} text-lg font-bold leading-snug tracking-tight text-[#141414]`}
                >
                  {s.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-gray-500">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ========================= FOUNDERS ========================= */}
      <section id="founders" className="mx-auto mt-6 w-full max-w-6xl px-1 sm:px-2">
        <div className="rounded-[2rem] border border-black/[0.07] bg-white p-6 shadow-[0_18px_50px_-32px_rgba(0,0,0,0.35)] sm:p-10 md:p-12">
          <Reveal as="header" className="max-w-3xl">
            <Eyebrow>Founders</Eyebrow>
            <p
              className={`${display.className} mt-4 text-3xl font-bold tracking-tight text-[#141414] md:text-5xl`}
            >
              Hiring is a <span style={{ color: BLUE }}>relationship</span>, not a funnel.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {FOUNDERS.map((f, i) => (
              <Reveal
                key={f.name}
                delay={i * 0.1}
                className="flex flex-col gap-5 rounded-3xl border border-black/[0.07] bg-[#F7F8FB] p-7 md:p-8"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`${display.className} flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white`}
                    style={{ background: BLUE }}
                    aria-hidden
                  >
                    {f.mono}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[17px] font-semibold tracking-tight text-[#141414]">
                      {f.name}
                    </div>
                    <div className="mt-0.5 text-[13px] text-gray-400">{f.pedigree}</div>
                  </div>
                </div>
                <p className="text-[15px] leading-relaxed text-gray-500">{f.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =================== FROM THE TALENT DIARIES =================== */}
      <section id="diaries" className="mx-auto mt-6 w-full max-w-6xl px-1 sm:px-2">
        <div className="rounded-[2rem] border border-black/[0.07] bg-white p-6 shadow-[0_18px_50px_-32px_rgba(0,0,0,0.35)] sm:p-10 md:p-12">
          <Reveal
            as="header"
            className="flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <Eyebrow>From the Talent Diaries</Eyebrow>
              <h2
                className={`${display.className} mt-4 text-3xl font-bold tracking-tight text-[#141414] md:text-5xl`}
              >
                Notes on hiring well
              </h2>
            </div>
            <Link
              href="/diaries"
              className="text-[15px] font-semibold text-[#2a52ff] transition-opacity hover:opacity-70"
            >
              Read all entries →
            </Link>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {DIARIES.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.06}>
                <Link
                  href="/diaries"
                  className="group flex h-full flex-col gap-4 rounded-3xl border border-black/[0.07] bg-[#F7F8FB] p-6 transition-colors hover:border-[#2a52ff]/30 hover:bg-white"
                >
                  <span className="inline-flex w-fit items-center rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#2a52ff] ring-1 ring-black/[0.05]">
                    {d.cat}
                  </span>
                  <h3
                    className={`${display.className} text-lg font-bold leading-snug tracking-tight text-[#141414] transition-colors group-hover:text-[#2a52ff]`}
                  >
                    {d.title}
                  </h3>
                  <p className="text-[14.5px] leading-relaxed text-gray-500">{d.excerpt}</p>
                  <div className="mt-auto flex items-center gap-2 pt-2 text-[12.5px] text-gray-400">
                    <span>{d.date}</span>
                    <span aria-hidden>·</span>
                    <span>{d.mins} min read</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= CLOSING CTA ======================= */}
      <section id="book" className="mx-auto mt-6 w-full max-w-6xl px-1 sm:px-2">
        <Reveal className="relative overflow-clip rounded-[2rem] border border-black/[0.07] bg-white p-8 text-center shadow-[0_22px_60px_-34px_rgba(0,0,0,0.4)] sm:p-12 md:p-16">
          {/* dot-grid accent */}
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
            aria-hidden
          />
          {/* yellow sticky-note accent */}
          <div
            className={`${hand.className} absolute right-4 top-4 hidden rotate-[6deg] rounded-sm bg-[#FFF188] px-4 py-2 text-[17px] text-[#424242] shadow-[0_12px_28px_-12px_rgba(0,0,0,0.3)] sm:right-8 sm:top-8 sm:block`}
            aria-hidden
          >
            one call, that&apos;s it
          </div>

          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2
              className={`${display.className} text-3xl font-bold tracking-tight text-[#141414] md:text-5xl lg:text-6xl`}
            >
              Tell us the role. See a shortlist in days, not weeks.
            </h2>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <a
                href="#book"
                className="rounded-xl px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
                style={{ background: BLUE }}
              >
                Book a hiring call
              </a>
              <a
                href="#book"
                className="rounded-xl border border-black/10 bg-white px-7 py-3.5 text-base font-semibold text-[#141414] transition-colors hover:border-black/20"
              >
                Submit a role
              </a>
            </div>
            <p className="max-w-md text-[14px] leading-relaxed text-gray-400">
              Built by operators who hired at Unacademy, Interview Kickstart,
              91Springboard, Awign.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ========================== FOOTER ========================== */}
      <footer className="mx-auto mt-6 w-full max-w-6xl px-1 sm:px-2">
        <div className="rounded-[2rem] border border-black/[0.07] bg-white px-6 py-7 sm:px-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <Wordmark />
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-gray-500">
              <a href="#why" className="transition-colors hover:text-[#141414]">
                Why us
              </a>
              <a href="#how" className="transition-colors hover:text-[#141414]">
                What to expect
              </a>
              <a href="#founders" className="transition-colors hover:text-[#141414]">
                Founders
              </a>
              <Link href="/diaries" className="transition-colors hover:text-[#141414]">
                Diaries
              </Link>
            </nav>
            <a
              href="mailto:contact@talentdiary.in"
              className="text-[14px] font-medium text-[#2a52ff] transition-opacity hover:opacity-70"
            >
              contact@talentdiary.in
            </a>
          </div>
          <div className="mt-6 border-t border-black/[0.06] pt-5 text-[12.5px] text-gray-400">
            © 2026 Talent Diary
          </div>
        </div>
      </footer>
    </div>
  );
}
