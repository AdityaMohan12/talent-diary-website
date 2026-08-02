// Hand-drawn line-art doodles. All decorative -> aria-hidden, stroke = currentColor.
import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export function Coffee(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" {...base} {...p}>
      <path d="M9 16h19v9a7 7 0 0 1-7 7h-5a7 7 0 0 1-7-7z" />
      <path d="M28 18h4a4 4 0 0 1 0 8h-4" />
      <path d="M15 7c-1 2 1 3 0 5M21 7c-1 2 1 3 0 5" />
    </svg>
  );
}

export function Notepad(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" {...base} {...p}>
      <rect x="10" y="7" width="20" height="26" rx="2.5" />
      <path d="M15 14h10M15 19h10M15 24h6" />
      <path d="M14 4v6M20 4v6M26 4v6" />
    </svg>
  );
}

export function People(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 40" {...base} {...p}>
      <circle cx="15" cy="13" r="5" />
      <path d="M6 31c0-6 4-9 9-9s9 3 9 9" />
      <circle cx="33" cy="15" r="4.2" />
      <path d="M26 31c0-5 3.5-8 7.5-8s7.5 3 7.5 8" />
    </svg>
  );
}

export function Plant(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" {...base} {...p}>
      <path d="M14 33h12l-1.5-9h-9z" />
      <path d="M20 24c0-6-3-10-8-11 0 6 3 9 8 11z" />
      <path d="M20 24c0-7 3-11 8-12 0 7-3 10-8 12z" />
      <path d="M20 24v-6" />
    </svg>
  );
}

export function Rocket(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" {...base} {...p}>
      <path d="M20 4c5 4 7 9 7 15l-3 5h-8l-3-5c0-6 2-11 7-15z" />
      <circle cx="20" cy="15" r="2.6" />
      <path d="M13 24l-4 3 1 5 4-3M27 24l4 3-1 5-4-3" />
      <path d="M18 33c.6 2 .6 3 2 4 1.4-1 1.4-2 2-4" />
    </svg>
  );
}

export function Lamp(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" {...base} {...p}>
      <path d="M14 11h12l4 8H10z" />
      <path d="M20 19v11" />
      <path d="M13 33h14" />
      <path d="M20 11V6" />
    </svg>
  );
}

export function Star(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M12 3l2.4 5.6L20 9.3l-4 4 1 5.7-5-2.8-5 2.8 1-5.7-4-4 5.6-.7z" />
    </svg>
  );
}

export function Check(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M4 13l5 5L20 6" />
    </svg>
  );
}

export function Pen(p: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 24" {...base} {...p} strokeWidth={1.4}>
      <path d="M6 12h92" />
      <path d="M98 6l16 6-16 6z" />
      <path d="M6 12l-2-3M6 12l-2 3" />
    </svg>
  );
}

const ART = { coffee: Coffee, desk: Notepad, talk: People, lamp: Lamp, rocket: Rocket } as const;

/** Card thumbnail illustration, keyed by entry.art. */
export function CardArt({ name }: { name: keyof typeof ART }) {
  const C = ART[name] ?? Notepad;
  return (
    <span className="db-art" aria-hidden>
      <C />
    </span>
  );
}
