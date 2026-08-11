import type { Metadata } from "next";
import { preload } from "react-dom";
import { Nav } from "@/components/site/nav";
import { DiaryHero } from "@/components/site/diary-hero";
import {
  WhyUs,
  HowWeWork,
  RolesSection,
  Founders,
  WhatToExpect,
  ClosingCTA,
  SiteFooter,
} from "@/components/site/sections";

// The home page keeps its canonical, now declared here rather than inherited
// from the root layout, where it was silently applied to every other route too.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  // The hero's first frame is the largest thing above the fold, but the
  // browser cannot discover it until the client bundle boots and asks for it.
  // Preloading from the server HTML starts that fetch on the first round trip.
  preload("/diary/frames/frame_0001.jpg", { as: "image" });
  return (
    <>
      <Nav />
      <main>
        <DiaryHero />
        <WhyUs />
        <HowWeWork />
        <RolesSection />
        <Founders />
        <WhatToExpect />
        <ClosingCTA />
      </main>
      <SiteFooter />
    </>
  );
}
