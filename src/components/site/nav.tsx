"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/site/logo";
import { CALENDLY_URL } from "@/lib/site";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname?.startsWith(href);
  const cls = (href: string) =>
    `u-underline${isActive(href) ? " is-active" : ""}`;

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}${open ? " open" : ""}`}>
      <div className="wrap nav-inner">
        <a className="logo" href="/" aria-label="Talent Diary home">
          <Logo />
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a
            href="/about"
            className={cls("/about")}
            aria-current={isActive("/about") ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            Fractional Recruitment
          </a>
          <a
            href="/coaching"
            className={cls("/coaching")}
            aria-current={isActive("/coaching") ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            Career coaching
          </a>
          <a
            href="/jobs"
            className={cls("/jobs")}
            aria-current={isActive("/jobs") ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            Jobs
          </a>
        </nav>
        <div className="nav-cta">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Book a hiring call
          </a>
          <button
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
