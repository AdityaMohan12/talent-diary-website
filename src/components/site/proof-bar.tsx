"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { BookmarkRibbon, BrandPen } from "@/components/site/scraps";

function Stat({
  target,
  prefix = "",
  suffix = "",
  label,
  ariaLabel,
  index,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  ariaLabel: string;
  index: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <div className="stat" ref={ref}>
      <div className="stat__no" aria-hidden="true">
        {index}
      </div>
      <div className="num" aria-label={ariaLabel}>
        {prefix}
        {val}
        {suffix}
      </div>
      <div className="lbl">{label}</div>
    </div>
  );
}

export function ProofBar() {
  return (
    <section className="proof on-blue" aria-label="Track record">
      <BookmarkRibbon sway className="scrap--proof-ribbon" />
      <BrandPen className="scrap--proof-pen" />
      <div className="wrap">
        <p className="eyebrow proof-head">
          <span className="tri" aria-hidden="true" />
          <span className="no">Entry No. 00</span>
          <span className="slash" aria-hidden="true">
            /
          </span>{" "}
          Track record
        </p>
      </div>
      <div className="wrap proof-inner">
        <Stat
          index="01"
          target={60}
          suffix="k+"
          label="startup candidates in our network"
          ariaLabel="60k+"
        />
        <Stat
          index="02"
          target={30}
          prefix="<"
          label="days average time to fill"
          ariaLabel="under 30"
        />
        <Stat
          index="03"
          target={100}
          suffix="%"
          label="of profiles deeply vetted before they reach you"
          ariaLabel="100%"
        />
      </div>
    </section>
  );
}
