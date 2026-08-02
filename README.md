# Talent Diary

Website for **Talent Diary**, a startup-specialist recruitment agency (fractional recruitment, career coaching, and a jobs board).

**Live:** https://talentdiary.in

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** (theme lives in `src/app/globals.css`) · **Framer Motion 12**
- Hosted on **Vercel**

> This is Next.js 16 — some APIs differ from older versions. See `AGENTS.md`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Deploy

Hosted on Vercel. With the Vercel CLI:

```bash
vercel deploy --prod
```

Production auto-aliases to `talentdiary.in` (and `www` 308-redirects to the bare domain via `vercel.json`).

## Project structure

- `src/app/` — routes
  - `page.tsx` — homepage
  - `about/` — Fractional Recruitment
  - `coaching/` — Career coaching (services, testimonials, enquiry form)
  - `jobs/` — open roles list · `jobs/[slug]/` — full JD page per role
  - `contact/` — founder + talent forms (reached via CTAs; not in the nav)
  - `globals.css` — Tailwind theme + the "diary / scrapbook" styles
  - `icon.svg`, `favicon.ico` — favicons
- `src/components/site/` — `nav`, `sections`, `diary-hero`, `scraps` (doodles),
  `reveal` (scroll animations), `forms/` (founder / talent / coaching + `cv-field`)
- `src/lib/` — data + config (see below)
- `apps-script/talent-diary-sync.gs` — Google Apps Script backend for form submissions

## Editing common things

| What | Where |
| --- | --- |
| Job roles + full JDs | `src/lib/roles.ts` (`ROLES`; each gets a page at `/jobs/<slug>`) |
| Booking / apply links | `src/lib/site.ts` (`CALENDLY_URL`, `COACHING_CALENDLY_URL`, `APPLY_FORM_URL`) |
| Founders + their LinkedIn | `src/components/site/sections.tsx` (`FOUNDERS`) |
| Coaching testimonials | `src/app/coaching/page.tsx` (`TESTIMONIALS`) |
| Form → Sheet endpoint | `src/lib/forms.ts` (`SUBMIT_ENDPOINT`) |

## Forms → Google Sheets + Drive

Every form (founder requirements, talent network, coaching enquiry) POSTs to a
**Google Apps Script web app** that appends a row to a Google Sheet (one tab per
form type: `founder` / `talent` / `coaching`) and saves any uploaded CV to a
Drive folder.

To wire it to your own Google account:

1. Create a Google Sheet → **Extensions → Apps Script** → paste `apps-script/talent-diary-sync.gs`.
2. Set `SHEET_ID` and `FOLDER_ID` at the top of the script (your Sheet ID and a Drive folder ID).
3. **Deploy → New deployment → Web app** (Execute as: **Me**, Who has access: **Anyone**) → copy the `/exec` URL.
4. Put that URL in `SUBMIT_ENDPOINT` (`src/lib/forms.ts`) and redeploy the site.

## Design notes

The site uses a "diary / scrapbook" look: ruled paper, paperclips, hand-drawn
doodles, ink highlights. Body copy rests on a lined-paper system
(`line-height: 2rem` matched to the rule pitch), so **avoid setting an inline
`line-height` on those paragraphs** or the text drifts off the lines.
