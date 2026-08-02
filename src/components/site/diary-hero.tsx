"use client";

import { ScrollHero } from "@/components/site/scroll-hero";
import { CALENDLY_URL } from "@/lib/site";

export function DiaryHero() {
  return (
    <ScrollHero
      exitColor="var(--paper)"
      floodInk={false}
      overlay={
        <>
          <span className="eyebrow">
            <span className="tri" />
            Recruitment for startups
          </span>
          <h1>
            For startups where <span className="accent">every hire matters</span>
          </h1>
          <p className="lede">
            A shortlist of deeply vetted, startup-ready candidates in under 30 days.
            Not a flood of resumes.
          </p>
          <div className="hero-cta">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Book a hiring call
            </a>
            <a href="/contact" className="btn btn-ghost">
              Submit a role
            </a>
          </div>
          <div className="hero-pedigree">
            Built by operators who hired at <b>Unacademy</b>
            <span className="dot" />
            <b>Interview Kickstart</b>
            <span className="dot" />
            <b>91Springboard</b>
            <span className="dot" />
            <b>Awign</b>
          </div>
        </>
      }
    />
  );
}
