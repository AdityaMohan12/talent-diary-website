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

export default function Home() {
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
