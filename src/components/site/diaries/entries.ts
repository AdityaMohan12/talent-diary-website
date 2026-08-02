// Talent Diaries content. Real copy from the client brief (PDF), no placeholders.

export type CategoryKey =
  | "founder-notes"
  | "hiring-diaries"
  | "candidate-stories"
  | "startup-lessons"
  | "trends-insights";

export interface Category {
  key: CategoryKey;
  label: string;
  /** Sticky-note tab tint (OKLCH), used for the right-edge dividers + card labels. */
  tint: string;
  ink: string;
}

export const CATEGORIES: Category[] = [
  { key: "founder-notes", label: "Founder Notes", tint: "oklch(0.9 0.06 258)", ink: "oklch(0.42 0.16 258)" },
  { key: "hiring-diaries", label: "Hiring Diaries", tint: "oklch(0.9 0.08 152)", ink: "oklch(0.42 0.11 152)" },
  { key: "candidate-stories", label: "Candidate Stories", tint: "oklch(0.92 0.09 88)", ink: "oklch(0.46 0.1 74)" },
  { key: "startup-lessons", label: "Startup Lessons", tint: "oklch(0.9 0.07 300)", ink: "oklch(0.45 0.15 300)" },
  { key: "trends-insights", label: "Trends & Insights", tint: "oklch(0.9 0.07 24)", ink: "oklch(0.5 0.16 24)" },
];

export function category(key: CategoryKey): Category {
  return CATEGORIES.find((c) => c.key === key)!;
}

export interface Entry {
  id: string;
  number: number;
  category: CategoryKey;
  title: string;
  excerpt: string;
  /** Optional handwritten margin note shown on cards. */
  note?: string;
  readMins: number;
  date: string; // human, already formatted
  /** doodle key for the card thumbnail illustration */
  art: "desk" | "talk" | "lamp" | "rocket" | "coffee";
}

/** The featured spread entry (Entry #42 from the brief). */
export const FEATURED = {
  number: 42,
  category: "hiring-diaries" as CategoryKey,
  title: "Why Most Founders Hire Too Late",
  pull: "Every month you delay a key hire, you become the bottleneck.",
  body: "Hiring early is hard. Hiring late is harder. We break down the hidden costs of waiting too long, and how to get ahead.",
  inThisEntry: [
    "The real cost of late hiring",
    "Three signals you are hiring too late",
    "How to get ahead of the curve",
  ],
  date: "June 5, 2024",
};

export const ENTRIES: Entry[] = [
  {
    id: "first-pm",
    number: 41,
    category: "founder-notes",
    title: "How to Hire Your First PM",
    excerpt: "A practical playbook for founders hiring their first product manager.",
    note: "The right PM builds clarity, not just features.",
    readMins: 6,
    date: "May 10, 2024",
    art: "desk",
  },
  {
    id: "founder-convos",
    number: 40,
    category: "hiring-diaries",
    title: "Founder conversations we loved in April",
    excerpt: "Raw, unfiltered takeaways from our chats with founders building fast.",
    note: "So many good insights this month.",
    readMins: 5,
    date: "May 2, 2024",
    art: "talk",
  },
  {
    id: "feedback-culture",
    number: 39,
    category: "startup-lessons",
    title: "Building a feedback culture early",
    excerpt: "Why tight feedback loops become your unfair advantage as you scale.",
    note: "Feedback early. Scale faster.",
    readMins: 7,
    date: "Apr 28, 2024",
    art: "lamp",
  },
  {
    id: "say-no",
    number: 38,
    category: "candidate-stories",
    title: "The candidate who said no, then yes",
    excerpt: "What changed her mind had nothing to do with the offer letter.",
    readMins: 4,
    date: "Apr 19, 2024",
    art: "coffee",
  },
  {
    id: "ai-hiring",
    number: 37,
    category: "trends-insights",
    title: "What AI is quietly changing about hiring",
    excerpt: "The shifts worth watching, and the ones safe to ignore for now.",
    readMins: 8,
    date: "Apr 11, 2024",
    art: "rocket",
  },
];
