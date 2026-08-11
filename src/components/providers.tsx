"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/**
 * LazyMotion + the `m` components in reveal.tsx load the small domAnimation
 * feature set instead of framer's full runtime. Not strict mode: the /style
 * exploration pages still import `motion` directly, and they are allowed to
 * pay for it on their own route.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
