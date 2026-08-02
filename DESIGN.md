# Talent Diary — Design

## Strategy
Committed blue. Warm near-white paper, near-black ink, one confident brand blue that drenches two bookend bands (proof bar + closing CTA) and carries every numeral, the play-mark, and primary buttons. Type-and-color led, no stock photography (tech-brand exception, applied deliberately because PFD flagged uncanny stock faces as an L1 trust risk for this audience).

## Theme
Light. Scene: a founder at their desk in daylight, mid-workday, quickly trust-screening a recruiting partner before a call. Warm paper, confident ink, bold blue.

## Color (OKLCH)
- `--paper`: oklch(0.985 0.004 250)   /* warm near-white, tinted toward brand hue */
- `--ink`: oklch(0.205 0.012 258)     /* near-black, faintly blue */
- `--ink-soft`: oklch(0.44 0.014 258) /* secondary text */
- `--hairline`: oklch(0.9 0.006 258)
- `--blue`: oklch(0.53 0.21 258)       /* brand blue, vivid and confident */
- `--blue-deep`: oklch(0.42 0.17 258)  /* hover / text-on-paper blue */
- `--blue-tint`: oklch(0.95 0.03 258)  /* faint blue wash panels */
- `--on-blue`: oklch(0.98 0.01 250)    /* paper-white text on blue drench */

## Typography
- Display / headings: **Bricolage Grotesque** (variable). Tight leading, semibold to bold. Not a reflex serif.
- Body / UI: **Hanken Grotesk** (variable). Warm neutral grotesk, not Inter.
- Numerals (proof bar): Bricolage Grotesque, huge, with tabular-nums. Largest non-headline type on the page.
- Scale: fluid clamp(), >=1.25 between steps.

## Layout
- Max width ~1180px, generous fluid gutters via clamp().
- Asymmetric, left-aligned hero with a built-from-CSS shortlist demo panel on the right.
- Differentiators: bold numbered editorial list (01-04), large blue index numerals, hairline separators. Not identical icon cards.
- How it works: horizontal 3-step sequence on a faint blue-tint panel, distinct from the differentiator rhythm.
- Founders: large pulled belief-quote, then two founder blocks with monograms + pedigree tags.
- Proof bar and Closing CTA: full-bleed blue drench bands that bookend the page.

## Motion
- Staggered hero load-in, scroll-reveal (IntersectionObserver, fade + translateY, ease-out-expo ~600ms).
- Numerals count up on first reveal.
- Respect prefers-reduced-motion (all reveals resolve to final state instantly).
- Never animate layout properties.

## Brand mark
"TALENT DIARY" wordmark with a small blue play/triangle mark integrated on the first T. Blue is the identity color (identity-preservation: the brand already owns it).
