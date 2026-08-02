// Restrained scrapbook accents: handwritten margin notes, sticky notes, a
// paperclip, washi tape. All decorative -> aria-hidden. Placement comes from
// a `className` passed per use (positions defined in globals.css).
import type { ReactNode } from "react";

export function MarginNote({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`scrap scrap-note ${className}`} aria-hidden>
      {children}
    </span>
  );
}

export function StickyNote({
  children,
  className = "",
  tone = "blue",
}: {
  children: ReactNode;
  className?: string;
  tone?: "blue" | "amber" | "green";
}) {
  return (
    <span className={`scrap scrap-sticky scrap-sticky--${tone} ${className}`} aria-hidden>
      <span className="scrap-sticky__tape" />
      {children}
    </span>
  );
}

export function Paperclip({ className = "" }: { className?: string }) {
  return (
    <span className={`scrap scrap-clip ${className}`} aria-hidden>
      <svg viewBox="0 0 24 56" fill="none" stroke="currentColor" strokeWidth={2.4}>
        <path d="M12 6v34a6 6 0 0 1-12 0V10" transform="translate(6 2)" strokeLinecap="round" />
        <path d="M6 10v30a6 6 0 0 0 12 0V8a8 8 0 0 0-16 0v30" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function WashiTape({ className = "" }: { className?: string }) {
  return <span className={`scrap scrap-washi ${className}`} aria-hidden />;
}

/* ---- Ink-sketch concept glyphs (replace the lucide icons).
   All: viewBox 0 0 24 24, fill none, stroke currentColor (inherit chip
   colour), strokeWidth 1.6, round caps/joins. Sized by chip CSS. ---- */

export function InkRocket({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 2.6c3.1 2.1 4.7 5.4 4.7 9.1 0 2.2-.5 4-1.4 5.4H8.7c-.9-1.5-1.4-3.3-1.4-5.5 0-3.7 1.6-7 4.7-9z" />
      <path d="M7.6 14.2c-1.7.5-2.9 1.7-3.3 4 1.7-.2 2.9.1 3.6.8" />
      <path d="M16.4 14.2c1.7.5 2.9 1.7 3.3 4-1.7-.2-2.9.1-3.6.8" />
      <circle cx="12" cy="10.4" r="1.9" />
      <path d="M10 18.4c.5 1.3 1.1 2.3 2 3 .9-.7 1.5-1.7 2-3" />
    </svg>
  );
}

export function InkSparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M11.5 3.2c.6 3.4 1.9 4.7 5.3 5.3-3.4.6-4.7 1.9-5.3 5.3-.6-3.4-1.9-4.7-5.3-5.3 3.4-.6 4.7-1.9 5.3-5.3z" />
      <path d="M18.2 14.4c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5z" />
      <path d="M5.3 16.1c.2 1 .6 1.4 1.6 1.6-1 .2-1.4.6-1.6 1.6-.2-1-.6-1.4-1.6-1.6 1-.2 1.4-.6 1.6-1.6z" />
    </svg>
  );
}

export function InkChecklist({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M3.4 6.2l1.6 1.7 2.6-3" />
      <path d="M3.4 13l1.6 1.7 2.6-3" />
      <path d="M11 6.1h9.4" />
      <path d="M11 13h9.4" />
      <path d="M11 19.6h6.4" />
      <path d="M3.6 19.6h2.4" />
    </svg>
  );
}

export function InkBolt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M13.4 2.5 5 13.4h5.3l-1 8 8.7-11.1h-5.4l.8-7.8z" />
    </svg>
  );
}

export function InkPhone({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M6.2 3.4c1 0 1.6.3 2 1.2.4 1 .8 2 1 2.6.2.7 0 1.3-.6 1.8l-1 .8c.9 1.9 2.4 3.4 4.3 4.3l.8-1c.5-.6 1.1-.8 1.8-.6.6.2 1.6.6 2.6 1 .9.4 1.2 1 1.2 2 0 2.1-1.7 3.9-3.8 3.5C9.4 19.8 4.2 14.6 2.7 8 2.3 5.9 4.1 4.1 6.2 3.4z" />
    </svg>
  );
}

export function InkCalendarCheck({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M4.3 6.2c0-.9.6-1.5 1.5-1.5h12.4c.9 0 1.5.6 1.5 1.5v12c0 .9-.6 1.5-1.5 1.5H5.8c-.9 0-1.5-.6-1.5-1.5z" />
      <path d="M4.5 9.3h15" />
      <path d="M8 3v3.2" />
      <path d="M16 3v3.2" />
      <path d="M8.4 14.3l2 2.1 3.4-3.8" />
    </svg>
  );
}

export function InkHandshake({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M11.8 7.2 9.3 9.6c-.7.7-.7 1.7 0 2.3.6.6 1.6.6 2.3 0l1.4-1.4 3.2 3.1c.8.8.8 1.9.1 2.5-.6.6-1.5.6-2.2 0" />
      <path d="M13.9 16.1c.7.7.7 1.7 0 2.3-.6.6-1.6.6-2.2 0l-.6-.6" />
      <path d="M11.1 17.8c.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0l-2.6-2.6c-.7-.7-.7-1.7 0-2.3" />
      <path d="M3 8.4 6.7 5c.8-.7 1.9-.7 2.6 0l2.5 2.2" />
      <path d="M21 8.4 17.3 5c-.5-.5-1.2-.6-1.8-.4" />
      <path d="M3 8.4l1.8 4M21 8.4l-1.8 4" />
    </svg>
  );
}

/* ---- Physical journal hardware ---- */

/* Satin bookmark ribbon hanging from a spine, forked tail + sheen. */
export function BookmarkRibbon({
  className = "",
  sway = false,
}: {
  className?: string;
  sway?: boolean;
}) {
  return (
    <span className={`scrap scrap-ribbon ${sway ? "scrap-ribbon--sway" : ""} ${className}`} aria-hidden>
      <svg viewBox="0 0 28 132" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="tdRibbonSheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--blue-deep)" />
            <stop offset="0.42" stopColor="var(--blue)" />
            <stop offset="0.55" stopColor="var(--on-blue)" stopOpacity="0.55" />
            <stop offset="0.68" stopColor="var(--blue)" />
            <stop offset="1" stopColor="var(--blue-deep)" />
          </linearGradient>
        </defs>
        <path d="M2 0h24v118l-12-9-12 9z" fill="url(#tdRibbonSheen)" />
        <path d="M2 0h7v118l-7 5.3z" fill="var(--blue-press)" opacity="0.30" />
        <path d="M12.4 0h1.4v110.5h-1.4z" fill="var(--on-blue)" opacity="0.40" />
      </svg>
    </span>
  );
}

/* Pressed blue wax house-seal with an embossed bookmark notch. */
export function WaxSeal({ className = "" }: { className?: string }) {
  return (
    <span className={`scrap scrap-seal ${className}`} aria-hidden>
      <svg viewBox="0 0 76 76" fill="none">
        <defs>
          <radialGradient id="tdSealWax" cx="0.38" cy="0.34" r="0.78">
            <stop offset="0" stopColor="var(--blue)" />
            <stop offset="0.6" stopColor="var(--blue-deep)" />
            <stop offset="1" stopColor="var(--blue-press)" />
          </radialGradient>
        </defs>
        <path d="M38 3c7 .5 9.5-2 13.5 1.5C56 8 60 8 62.5 12.5 65 17 69 18 69.5 24c.5 6 3 8-0.5 13 -3 4.5 0 8.5-4 12.5 -3.5 3.5-3 7.5-8.5 9.5 -5 1.8-6 5.5-11.5 5.5 -6 0-8 3-13-1 -4.5-3.5-8.5-2-11-7 -2.3-4.6-6.5-5-7-11 -.5-6-3.5-8 0-13 3-4.3 1-8.5 5.5-12 4.2-3.3 4-7.5 9.5-9.5C36 4 33 3 38 3z" fill="url(#tdSealWax)" />
        <circle cx="38" cy="38" r="23" fill="none" stroke="var(--blue-press)" strokeWidth="2" opacity="0.5" />
        <circle cx="38" cy="38" r="23" fill="none" stroke="var(--on-blue)" strokeWidth="1" opacity="0.18" />
        <path d="M31 27h16v22l-8-6-8 6z" fill="var(--blue-press)" opacity="0.55" />
        <path d="M31 27h16v22l-8-6-8 6z" fill="none" stroke="var(--on-blue)" strokeWidth="1.2" opacity="0.45" />
        <ellipse cx="28" cy="24" rx="9" ry="6" fill="var(--on-blue)" opacity="0.16" />
      </svg>
    </span>
  );
}

/* A divider/index tab clipped onto a page edge. Caveat label via CSS. */
export function IndexTab({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span className={`scrap scrap-tab ${className}`} aria-hidden>
      <span className="scrap-tab__body">{children}</span>
    </span>
  );
}

/* ============ Hand-drawn DOODLE library ============
   Loose single-weight pen marks. Colour + size + rotation come from the
   wrapper className (CSS), not the SVG, so a cluster reads as one hand. */

export function Doodle({
  children,
  className = "",
  tone = "ink",
}: {
  children: ReactNode;
  className?: string;
  tone?: "ink" | "blue";
}) {
  return (
    <span className={`scrap scrap-doodle scrap-doodle--${tone} ${className}`} aria-hidden>
      {children}
    </span>
  );
}

export function DoodleCoffee({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M9.5 21.5c-.3 7 1 12.4 4.2 14.9 2.8 2.2 11.4 2.3 14.4.2 3.4-2.4 4.8-7.9 4.6-15.2-7.8-.7-15.6-.6-23.2.1z" />
      <path d="M33 24.6c3-1 5.6-.4 6.2 2.3.6 2.8-1.4 4.9-5.4 5.1" />
      <path d="M16.5 14.2c-1.1-1.6-1-3 .3-4.2" />
      <path d="M22.4 14.4c-1.3-1.8-1.2-3.4.3-4.8" />
      <path d="M28.2 14.1c-1.1-1.6-1-3 .3-4.2" />
    </svg>
  );
}

export function DoodleBooks({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M8 36.5h28.5l-1-6.5H9z" />
      <path d="M10.5 30 12 23l27 2.2-1 6.6z" />
      <path d="M14.2 23.3 16.8 17l25.2 4.8-1.7 6.2" />
      <path d="M12.6 33.2h3M14 26.5l2.8.2M18 19.6l2.7.5" />
    </svg>
  );
}

export function DoodlePeople({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 40" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="14" cy="13" r="5" />
      <path d="M5 33c.4-6 4.2-9.2 9-9.2s8.6 3.2 9 9.2" />
      <circle cx="33" cy="10.5" r="4.4" />
      <path d="M29 30c.4-5.6 3.9-8.6 8.5-8.6 4.5 0 8 3 8.4 8.6" />
      <circle cx="42.5" cy="15.5" r="3.8" opacity=".8" />
    </svg>
  );
}

export function DoodlePlant({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M13 33h14l-1.6 11.5c-.1 1-.8 1.5-1.8 1.5h-7.2c-1 0-1.7-.5-1.8-1.5z" />
      <path d="M12 33h16" />
      <path d="M20 33c-.4-5 .3-8.7 2-11" />
      <path d="M20 26c-3.4-1.4-5.3-4.2-5.6-8.6 4.2.4 6.6 2.8 7.2 7.2" />
      <path d="M20.5 22c.6-4.4 3-7.4 7.4-9-.2 4.6-2.2 7.6-6 9.2" />
    </svg>
  );
}

export function DoodleBulb({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M20 7c6 0 10.5 4.3 10.5 10 0 3.8-1.9 6.4-3.9 8.6-1.3 1.4-1.8 2.6-1.8 4.4h-9.6c0-1.8-.5-3-1.8-4.4-2-2.2-3.9-4.8-3.9-8.6C9.5 11.3 14 7 20 7z" />
      <path d="M15.6 34.6h8.8M16.8 38.4h6.4" />
      <path d="M20 2.6v3M33.6 9 31.4 11M6.4 9l2.2 2M35.5 20h-2.7M7.2 20H4.5" />
    </svg>
  );
}

export function DoodleStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M16 3.5l3.4 8.1 8.8.6-6.7 5.6 2.2 8.6L16 20.3l-7.9 6.7 2.2-8.6-6.7-5.6 8.8-.6z" />
    </svg>
  );
}

export function DoodleArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 40" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 9c14-3 27 0 38 12" />
      <path d="M34 18.5 43.2 21 45 11.5" />
    </svg>
  );
}

export function DoodleNotepad({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M9 8.5h22c1 0 1.7.7 1.7 1.7v29.6c0 1-.7 1.7-1.7 1.7H9c-1 0-1.7-.7-1.7-1.7V10.2c0-1 .7-1.7 1.7-1.7z" />
      <path d="M13 6v5M20 6v5M27 6v5" />
      <path d="M12.5 20.5l1.8 1.9 3-3.4M19.5 19.6h8" />
      <path d="M12.5 29l1.8 1.9 3-3.4M19.5 28.1h8" />
      <path d="M12.5 36.5h13" />
    </svg>
  );
}

/* The branded blue PEN lying diagonally. Hardware, fixed blue. Rotation via CSS. */
export function BrandPen({ className = "" }: { className?: string }) {
  return (
    <span className={`scrap scrap-pen ${className}`} aria-hidden>
      <svg viewBox="0 0 240 40" fill="none">
        <path d="M6 20 24 12.5v15z" fill="var(--blue-press)" />
        <path d="M24 12.5 33 11v18l-9-1.5z" fill="var(--on-blue)" opacity=".9" />
        <rect x="33" y="11" width="168" height="18" rx="9" fill="var(--blue)" />
        <rect x="33" y="11" width="168" height="6.4" rx="3.2" fill="var(--on-blue)" opacity=".22" />
        <text x="58" y="24.3" fill="var(--on-blue)" opacity=".9" fontFamily="var(--display)" fontWeight="800" fontSize="10" letterSpacing="2.4">TALENT&#160;DIARY</text>
        <rect x="197" y="9.5" width="9" height="21" rx="3" fill="var(--blue-deep)" />
        <rect x="206" y="12.5" width="26" height="15" rx="7.5" fill="var(--blue-deep)" />
        <circle cx="231" cy="20" r="4" fill="var(--blue-press)" />
        <path d="M205 11.5c8-2 14 0 14 5.5v9" stroke="var(--on-blue)" strokeOpacity=".7" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/* Spiral-notebook COIL edge: binding rings + punched holes. */
export function SpiralCoil({
  className = "",
  rings = 7,
}: {
  className?: string;
  rings?: number;
}) {
  const step = 100 / (rings + 1);
  return (
    <span className={`scrap scrap-coil ${className}`} aria-hidden>
      <svg viewBox="0 0 26 220" fill="none" preserveAspectRatio="none">
        {Array.from({ length: rings }).map((_, i) => {
          const cy = step * (i + 1) * 2.2;
          return (
            <g key={i}>
              <ellipse cx="13" cy={cy} rx="4.2" ry="3.4" fill="var(--paper-2)" stroke="var(--hairline-strong)" strokeWidth="1" />
              <path d={`M4 ${cy - 7}c-3 2-3 12 0 14 5 3 17 3 19-1 1.5-3 1.5-9-1-12`} stroke="var(--ink-soft)" strokeWidth="1.7" fill="none" strokeLinecap="round" opacity=".55" />
            </g>
          );
        })}
      </svg>
    </span>
  );
}

/* Sketchy hand-drawn underline (double-pass pen). Drawn-in via parent .is-in. */
export function SketchUnderline({ className = "" }: { className?: string }) {
  return (
    <svg className={`scrap-uline ${className}`} viewBox="0 0 120 12" fill="none" preserveAspectRatio="none" aria-hidden>
      <path className="scrap-uline__p" d="M2 7.2c18-3.4 44-4.2 71-2.2 16 1.2 30 1 45-1.4" />
      <path className="scrap-uline__p scrap-uline__p--2" d="M5 9.6c22-2 50-2.6 78-1 12 .7 24 .5 33-.9" />
    </svg>
  );
}

/* Torn / deckled ruled-paper seam that straddles a colour boundary so the
   journal continues across the change. Placed at the top (flipped) or foot of a
   section; the tear fill is set per placement via the --seam-paper CSS var. */
export function SeamStrip({
  className = "",
  variant = "top",
}: {
  className?: string;
  variant?: "top" | "foot";
}) {
  return (
    <div className={`scrap-seam scrap-seam--${variant} ${className}`} aria-hidden>
      <svg className="scrap-seam__tear" viewBox="0 0 1440 40" preserveAspectRatio="none">
        <path d="M0 14 C 80 6, 150 22, 240 16 S 430 4, 540 18 740 26, 880 14 1120 4, 1260 18 1380 24, 1440 14 V40 H0 Z" />
      </svg>
      <svg className="scrap-seam__rules" viewBox="0 0 1440 40" preserveAspectRatio="none">
        <line x1="0" y1="14" x2="1440" y2="14" />
        <line x1="0" y1="24" x2="1440" y2="24" />
        <line x1="0" y1="34" x2="1440" y2="34" />
      </svg>
    </div>
  );
}
