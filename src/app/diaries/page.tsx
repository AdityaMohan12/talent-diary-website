import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { DiariesHero } from "@/components/site/diaries/diaries-hero";
import { DiariesHub } from "@/components/site/diaries/diaries-hub";
import { SiteFooter } from "@/components/site/sections";

export const metadata: Metadata = {
  title: "Talent Diaries | Notes from startup hiring",
  description:
    "Field notes from inside startup hiring. Founder notes, hiring diaries, candidate stories and startup lessons, written by operators.",
};

export default function DiariesPage() {
  return (
    <>
      <Nav />
      <main>
        <DiariesHero />
        <DiariesHub />
      </main>
      <SiteFooter />
    </>
  );
}
