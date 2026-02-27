# PRD — Benjamin Kurtz Academy Landing Page

**Erstellt:** Februar 2026
**Status:** Iteration 1 complete — production-ready

---

## Problem Statement
Single-page React landing page for Benjamin Kurtz Academy — a German-language marketing site for Past Life Regression (Seelenrückführung) sessions. Builds trust, explains the service, and converts visitors to book an Intro-Call.

---

## Architecture

**Stack:** React (CRA) · Tailwind CSS v3 · Lucide React · Google Fonts (Cormorant Garamond + DM Sans)
**Hosting:** Emergent Platform (frontend only, no backend)
**Media:** Cloudflare R2 (`pub-d53492a253b841429ca6f2f9281daf17.r2.dev`)
**Booking:** `https://www.benjaminkurtz.de/bookings/wakeup` (direct link, future: Fluent Forms iframe)

---

## Design System

| Token | Hex | Usage |
|---|---|---|
| brand-deep | #224160 | Headlines, buttons, nav |
| brand-steel | #7696AD | Labels, captions |
| brand-green | #2DAD71 | Accent (sparingly) |
| brand-body | #1A1814 | Body text |
| brand-muted | #5A5550 | Secondary text |
| brand-dark | #1A2433 | Footer bg |
| brand-cream | #F0EBE1 | Page background |
| brand-sand | #EDE7DC | Cards, dividers |

**Fonts:** `font-serif` = Cormorant Garamond · `font-sans` = DM Sans
**Section padding:** py-16 md:py-20 (all sections via SectionWrapper)
**Background:** Single unified parchment texture (#F0EBE1 + SVG noise)

---

## Core Requirements (Static)

- All text from `src/content/plr-de.js` — never hardcoded
- No color hex in components — always use brand tokens
- Single parchment background — no alternating section colors (footer exception)
- CTA buttons always scroll to `#booking`

---

## File Structure

```
src/
├── content/plr-de.js       — all German copy
├── utils/media.js          — Cloudflare R2 helper + logos
├── components/
│   ├── ui/CtaButton.jsx
│   ├── ui/SectionWrapper.jsx   — py-16 md:py-20 default padding
│   ├── ui/SectionLabel.jsx
│   ├── ui/CustomVideoPlayer.jsx
│   ├── ui/LazyImage.jsx
│   ├── Header.jsx          — sticky, CTA visible only after 300px scroll
│   ├── Footer.jsx          — dark bg, 3-column
│   └── sections/
│       ├── HeroV3Section.jsx        — Editorial hero (final design)
│       ├── HeroAlt1.jsx             — Archive: V1 two-column
│       ├── HeroAlt2.jsx             — Archive: V2 centered
│       ├── HeroAlt3.jsx             — Archive: V3 original (re-export)
│       ├── StatementSection.jsx     — centered philosophical quote
│       ├── PodcastSection.jsx       — YouTube embed + links
│       ├── WhatIsSection.jsx        — 2-col + skeptic accordion
│       ├── ForWhomSection.jsx       — 8 topic cards 4×2 grid
│       ├── AboutSection.jsx         — sticky photo + bio + credentials (text-lg)
│       ├── ProcessSection.jsx       — 3-step flow
│       ├── CaseStudiesSection.jsx   — 3-case accordion
│       ├── TestimonialsSection.jsx  — dark authority quotes (text-xl/2xl) + client cards
│       └── BookingSection.jsx       — direct link / iframe (env-controlled)
└── App.js
```

---

## Environment Variables (frontend/.env)

```
REACT_APP_R2_BASE_URL=https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev
REACT_APP_BOOKING_URL=https://www.benjaminkurtz.de/bookings/wakeup
REACT_APP_FLUENT_FORMS_URL=   ← TBD
REACT_APP_BOOKING_MODE=link   ← set to 'embed' to activate iframe
```

---

## What's Been Implemented

### Phase 1 — Initial Build (Feb 2026)
- [x] Full React app bootstrapped with CRA
- [x] Tailwind CSS v3 configured with all brand tokens
- [x] Google Fonts (Cormorant Garamond + DM Sans) in index.html
- [x] All 10 page sections built with German content
- [x] Sticky header with mobile hamburger menu
- [x] Skeptic accordion in WhatIs section
- [x] CaseStudies 3-part accordion (Marina, Tanja, Javi)
- [x] Booking section with env-controlled link/iframe mode
- [x] Cloudflare R2 image helper (logos + photo paths)
- [x] Custom Vimeo glass player (click-to-play)
- [x] Custom YouTube player (no branding)
- [x] LazyImage component for optimized loading

### Iteration 1 Fixes (Feb 2026)
- [x] **Hero redesign (V3):** "DEINE SEELE." small/muted → "ERINNERT SICH." dominant large → "Bist du bereit zuzuhören?" left-aligned
- [x] **Video layout:** off-center, right-shifted with portrait anchors
- [x] **Hero CTA:** Only podcast link visible in hero (no primary CTA button)
- [x] **Scroll indicator:** animated ChevronDown at bottom-right
- [x] **Header scroll CTA:** "Intro-Call buchen" button appears only after 300px scroll (opacity transition)
- [x] **Section spacing:** Reduced from py-24 md:py-32 → py-16 md:py-20
- [x] **Body typography:** text-lg leading-relaxed (About, WhatIs, ForWhom, Podcast)
- [x] **Quote typography:** Testimonials blockquotes → text-xl md:text-2xl
- [x] **About sticky image:** md:sticky md:top-28 on portrait column
- [x] **Alternative Hero archives:** HeroAlt1/2/3.jsx saved
- [x] App.js cleaned up (no more comparison dividers)

---

## Prioritized Backlog

### P0 — Needs user action
- [ ] Fix Vimeo video privacy: vimeo.com → video 1168643769 → Settings → Privacy → Allow embeds
- [ ] Upload logo to R2: `RTR2/logos/BK Academy 300 px black.png` (currently using logos/ path)

### P1 — Next dev tasks
- [ ] Add real client testimonials (replace placeholder text in plr-de.js)
- [ ] Implement Fluent Forms iframe when URL is ready (set REACT_APP_BOOKING_MODE=embed)
- [ ] SEO: og:image, og:title, structured data
- [ ] Favicon with BK Academy favicon from R2

### P2 — Future
- [ ] English language version (i18n)
- [ ] Analytics integration (GA4 or Plausible)
- [ ] Accessibility audit (ARIA labels, keyboard nav)
- [ ] Performance optimization (lazy-load embeds below fold)
- [ ] Cloudflare R2 video streaming for Hero (when video uploaded)
