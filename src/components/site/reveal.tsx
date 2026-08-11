"use client";

// `m` instead of `motion`: the components are identical, but `m` draws its
// animation features from the LazyMotion provider in providers.tsx rather than
// bundling framer's full runtime into every page.
import { m, useReducedMotion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEW = { once: true, amount: 0.2, margin: "0px 0px -8% 0px" } as const;

type Tag = keyof React.JSX.IntrinsicElements;

/* Single block (headlines, single columns). Keeps the original API + delay. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const MotionTag = m[as as "div"];
  return (
    <MotionTag
      className={className}
      style={style}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{
        duration: reduce ? 0.3 : 0.6,
        ease: EASE,
        delay: reduce ? 0 : delay,
      }}
    >
      {children}
    </MotionTag>
  );
}

/* Parent: ONE in-view trigger; children cascade in document order. */
const groupV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

export function Stagger({
  children,
  className,
  as = "div",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  style?: React.CSSProperties;
}) {
  const MotionTag = m[as as "div"];
  return (
    <MotionTag
      className={className}
      style={style}
      variants={groupV}
      initial="hidden"
      whileInView="show"
      viewport={VIEW}
    >
      {children}
    </MotionTag>
  );
}

/* Child: plain rise, or `settle` for the <=1deg diary de-rotation.
   `tilt` sets the settle sign/size. Reduced motion -> opacity only. */
export function RevealItem({
  children,
  className,
  settle = false,
  tilt = -0.8,
  as = "div",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  settle?: boolean;
  tilt?: number;
  as?: Tag;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const MotionTag = m[as as "div"];
  const v: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.3, ease: EASE } },
      }
    : settle
      ? {
          hidden: { opacity: 0, y: 14, rotate: tilt },
          show: {
            opacity: 1,
            y: 0,
            rotate: 0,
            transition: { duration: 0.66, ease: EASE },
          },
        }
      : {
          hidden: { opacity: 0, y: 14 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: EASE },
          },
        };
  return (
    <MotionTag className={className} style={style} variants={v}>
      {children}
    </MotionTag>
  );
}

/* Toggles `is-in` on first scroll-in so the CSS draw-in primitives (.ink / .hl)
   fire ONCE. Reduced motion is handled in CSS (those classes neutralize to their
   final state), so this stays simple. */
function InViewToggle({
  children,
  className = "",
  as = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "mark" | "u" | "span";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.6,
    margin: "0px 0px -10% 0px",
  });
  const Tag = as as "mark";
  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`${className}${inView ? " is-in" : ""}`}
    >
      {children}
    </Tag>
  );
}

/* Ink underline (one load-bearing noun per H2). Wraps a `.ink` element.
   Defaults to <u class="ink"> so <InkReveal>word</InkReveal> just works. */
export function InkReveal({
  children,
  className = "ink",
  as = "u",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "mark" | "u" | "span";
}) {
  return (
    <InViewToggle as={as} className={className}>
      {children}
    </InViewToggle>
  );
}

/* Highlighter swipe (one phrase per page). Wraps a `.hl` mark. */
export function Hilite({
  children,
  className,
  as = "mark",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "mark" | "u" | "span";
}) {
  return (
    <InViewToggle as={as} className={className}>
      {children}
    </InViewToggle>
  );
}
