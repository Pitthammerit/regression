# Benjamin Kurtz Academy — PRD

## Original Problem Statement
Umfangreiches Redesign und neue Funktionen für eine bestehende React Single-Page Website (Seelenrückführung & Regression Sessions). Die Anforderungen wurden in Nachricht #207/#220 definiert.

## Target Audience
Menschen, die sich für Seelenrückführung, Hypnose und Energiearbeit interessieren; Klienten von Benjamin Kurtz.

## Tech Stack
- **Frontend:** React, Tailwind CSS (keine Backend-Komponente)
- **Medien:** Cloudflare R2 (Video, Bilder, Logos), Podigee CDN (Podcast-MP3)
- **Bibliotheken:** react-player (YouTube), lucide-react (Icons)

## Architecture
```
/app/frontend/src/
  App.js                          ← Sektionsreihenfolge
  components/
    Header.jsx
    Footer.jsx
    ui/
      CtaButton.jsx
      CustomVideoPlayer.jsx
      LazyImage.jsx
      PodcastPlayer.jsx
      SectionLabel.jsx
      SectionWrapper.jsx          ← Patched: passes data-testid via ...rest
      Slider.jsx
    sections/
      HeroV3Section.jsx           ← Active hero
      ServicesSection.jsx         ← NEW (Feb 2026)
      WelcomeSection.jsx
      StatementSection.jsx
      WhatIsSection.jsx
      PodcastSection.jsx
      ForWhomSection.jsx
      AboutSection.jsx
      ProcessSection.jsx
      CaseStudiesSection.jsx
      TestimonialsSection.jsx
      BookingSection.jsx
  content/
    plr-de.js                     ← All German copy
  utils/
    media.js
```

## Section Order (in App.js)
Hero → Services → Welcome → Statement → WhatIs → Podcast → ForWhom → About → Process → CaseStudies → Testimonials → Booking

---

## What's Been Implemented

### Session 1–3 (Previous Sessions)
- React SPA with all base sections
- In-page Podcast Player (HTML5 audio, Podigee CDN)
- Hero video from Cloudflare R2 (replaced Vimeo)
- Favicon
- WelcomeSection with quote, image, signature
- Multiple layout iterations per user feedback

### Session 5 (Feb 2026) — Further Refinements

7 further changes implemented and tested:

1. **Hero further redesign:** "DEINE SEELE" + "erinnert sich." now on ONE line (large + small inline); "Bist du bereit zuzuhören?" as right-aligned second line; subline removed; scroll arrow bigger and centered directly below video
2. **ServicesSection:** Minimal padding (pt-2 pb-8), sits immediately below video
3. **Section reorder:** Statement moved after Podcast (YouTube video). New order: Hero → Services → Welcome → WhatIs → Podcast → Statement → ForWhom → About → Process → CaseStudies → Testimonials → Booking
4. **ProcessSection:** Tree icons completely removed; only big transparent background numbers remain
5. **CaseStudies headline:** "Geschichten aus der Praxis — wenn Seelen sich erinnern" (updated)
6. **Tanja anonymity note:** Added "(Transparentnahme wurde auf Bitte zur Anonymität geändert)" to her result text
7. **TestimonialsSection:** New header with "EVIDENZBASIERT" label + "Was die Forschung sagt" big serif title
8. **Global CTA behavior:** All CtaButton instances now dispatch `booking:open` custom event + smooth scroll to #booking; BookingSection listens via useEffect and auto-opens calendar accordion
**All 8 requested changes implemented and tested (100% pass rate):**

1. **Hero Redesign:** Subline moved directly under "erinnert sich." headline; "Bist du bereit zuzuhören?" as centered italic serif text below video with clickable scroll arrow; `hero.heroCta` field added to plr-de.js
2. **ServicesSection (NEW):** Elegant horizontal 3-column layout (Seelenrückführung / Hypnose / Energiearbeit) with vertical dividers; placed before WelcomeSection
3. **StatementSection:** Reduced inner vertical padding from py-20 → py-10
4. **Section reorder:** PodcastSection moved after WhatIsSection; ServicesSection added before WelcomeSection
5. **ProcessSection Redesign:** Big transparent background numbers (1/2/3, 176px, opacity 7%); custom tree SVG icons in circles: Step 1=roots only, Step 2=roots+trunk, Step 3=full tree; larger body text (text-base)
6. **CaseStudiesSection Avatars:** Circular (w-12 h-12 rounded-full) person silhouettes before each accordion item; female/male SVG bodies matching gender data
7. **BookingSection Accordion:** "Intro-Call buchen" button now opens inline accordion (no external navigation); calendar embed placeholder shown; ready for embed code injection via REACT_APP_CALENDAR_EMBED env var
8. **Header CTA:** "Intro Call" (was done in previous session)

---

## Prioritized Backlog

### P0 — Immediate / Pending user action
- **Calendar Embed Integration:** User needs to provide the embed code/URL. Once provided, set `REACT_APP_CALENDAR_EMBED` in frontend/.env to the URL. The BookingSection iframe is already wired up.

### P1 — Upcoming
- None currently identified by user

### P2 — Future / Backlog
- **Podcast Chapters:** Podigee supports chapters but they haven't been added by Benjamin to the episode. Once added, the agent can implement chapter display in the PodcastPlayer. Currently blocked on user action.

---

## Environment Variables
| Variable | Location | Purpose |
|---|---|---|
| REACT_APP_BACKEND_URL | frontend/.env | Preview/production URL |
| REACT_APP_CALENDAR_EMBED | frontend/.env | Calendar iframe URL (set when provided) |

## Key External Assets (Cloudflare R2)
- Hero video: `pub-d53492a253b841429ca6f2f9281daf17.r2.dev/video/...`
- Logo: via `r2(logos.dark)` in utils/media.js
- Images: `pub-d53492a253b841429ca6f2f9281daf17.r2.dev/images/...`
