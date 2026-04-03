# Multi-Site Architecture: Implementation Status & Remaining Work

> **Status:** Phase 1-4 Complete ✅ | Phase 5-6 Pending ⬜
> **Build Status:** ✅ Passing (1.66s)
> **Date:** 2026-04-01

---

## Executive Summary

**Progress:** 70% Complete (4 of 6 phases done)

**What's Working:**
- ✅ Multi-site content structure (regression-de.js, reiki-de.js)
- ✅ Site & Language contexts (SiteContext, ContentContext)
- ✅ Content loading via `useContent()` hook (19/20 sections migrated)
- ✅ Site-first URL routing (`/:site/:lang`)
- ✅ Language switcher component (compact + full variants)
- ✅ Build passes successfully

**What's Remaining:**
- ⬜ Phase 5: Site-specific theming foundation (1 hour)
- ⬜ Phase 6: English content placeholder (30 min)

**Estimated Time to Complete:** 1.5 hours

---

## Migration Status Table

| Phase | Status | Completed Date | Notes |
|-------|--------|----------------|-------|
| ✅ Foundation | **COMPLETE** | March 2026 | Vite + Tailwind v4 |
| ✅ Phase 1: Content Directory | **COMPLETE** | March 31, 2026 | regression-de.js, reiki-de.js, index.js |
| ✅ Phase 2: Contexts | **COMPLETE** | March 31, 2026 | SiteContext, ContentContext |
| ✅ Phase 3: Update Sections | **COMPLETE** | March 31, 2026 | 19/20 sections use useContent() |
| ✅ Phase 4: Multi-Site Routing | **COMPLETE** | March 31, 2026 | Routes, LanguageSwitcher |
| ⬜ Phase 5: Site Theming | **PENDING** | — | base-theme.css, data-site attribute |
| ⬜ Phase 6: English Content | **PENDING** | — | regression-en.js placeholder |

**Total Remaining:** 1.5 hours (originally 9-11 hours)

---

## Completed Implementation Details

### ✅ Phase 1: Content Directory Restructuring (COMPLETE)

**Files Created:**
- `frontend/src/content/regression-de.js` — 54,216 bytes (migrated from plr-de.js)
- `frontend/src/content/reiki-de.js` — 16,423 bytes (test content)
- `frontend/src/content/index.js` — Content loader with getContent(), getAvailableSites(), getAvailableLanguages()

**Status:**
```javascript
// Content map working correctly
const CONTENT_MAP = {
  regression: { de: regressionDe, en: null },
  reiki: { de: reikiDe, en: null },
}
```

**Backwards Compatibility:**
- index.js re-exports all content from regression-de.js
- Legacy imports still work: `import { header } from './content'`

---

### ✅ Phase 2: Site & Content Contexts (COMPLETE)

**Files Created:**
- `frontend/src/contexts/SiteContext.jsx` — Site/language state, navigation
- `frontend/src/contexts/ContentContext.jsx` — Dynamic content loading

**Implementation:**
```javascript
// SiteContext provides:
- currentSite: 'regression' | 'reiki'
- currentLang: 'de' | 'en'
- navigateToSite(targetSite)
- switchLanguage(newLang)
- validSites: ['regression', 'reiki']
- validLanguages: ['de', 'en']

// ContentContext provides:
- content: Object (all site content)
- Automatically reloads when site/lang changes
```

**Debug Logging:**
- Console.log statements in place for debugging
- Logs: siteParam, langParam, resolved site/lang, content keys

---

### ✅ Phase 3: Update Sections to use Content Context (COMPLETE)

**Sections Migrated (19/20):**
1. HeroV3Section ✅
2. WelcomeSection ✅
3. ServicesSection ✅
4. StatementSection ✅
5. WhatIsSection ✅
6. ResearchersSection ✅
7. ResearcherQuotesSection ✅
8. PodcastVideoSection ✅
9. PodcastSection ✅
10. ForWhomSection ✅
11. AboutSection ✅
12. ProcessSection ✅
13. CaseStudiesSection ✅
14. TestimonialsSection ✅
15. BookingSection ✅
16. FAQSection ✅
17. ReferencesSection ✅
18. CtaImageSection ✅
19. Footer.jsx ✅

**Pattern Applied:**
```javascript
// OLD (removed):
// import { hero } from '../../content/plr-de'

// NEW (implemented):
import { useContent } from '../../contexts/ContentContext'

const { hero } = useContent()
```

**TestimonialCarousel Special Case:**
- Receives content via props from App.jsx
- Props use `testimonials` from useContent()

---

### ✅ Phase 4: Multi-Site Routing (COMPLETE)

**Routes Implemented:**
```javascript
<Route path="/:site/:lang" element={<SitePage />} />
<Route path="/" element={<Navigate to="/regression/de" replace />} />
<Route path="/:site" element={<Navigate to="/regression/de" replace />} />
<Route path="/transkript" element={<TranscriptPage />} />
<Route path="/menu-demo" element={<MenuDemoPage />} />
<Route path="/typo-demo" element={<TypographyDemoPage />} />
<Route path="*" element={<NotFound />} />
```

**LanguageSwitcher Component:**
- Compact variant: "DE" text only (for FloatingBurger)
- Full variant: "DE | EN" with both options
- English disabled (isEnglishEnabled = false)
- Alert: "English coming soon!" on EN click

**Integration Points:**
- FloatingBurger uses compact LanguageSwitcher
- Header doesn't currently use full LanguageSwitcher (can be added)

---

## Remaining Implementation

### ⬜ Phase 5: Site-Specific Styling (1 hour)

**Goal:** Prepare foundation for site-specific theming

**Tasks:**
1. Create `frontend/src/styles/base-theme.css`
2. Add `data-site` attribute to root div in App.jsx
3. Update `frontend/src/index.css` to import base-theme.css

**Step 1: Create base-theme.css**
```css
/* frontend/src/styles/base-theme.css */
@import "tailwindcss";

/* Import existing theme config */
@import "../../tailwind.config.css";

/* Base styles shared across sites */
body {
  @apply bg-color-bg-light font-primary text-color-text;
}

/* Site-specific data attributes for future theming */
[data-site="regression"] {
  /* Default brand colors from tailwind.config.css */
}

[data-site="reiki"] {
  /* Reiki-specific colors (can be added later) */
  /* Example: --color-primary: #2E5A4C; */ /* Green for Reiki */
}
```

**Step 2: Add data-site attribute to App.jsx**
```javascript
// In MainPage component, update root div:
<div
  data-site={currentSite}
  className="bg-color-bg-light bg-paper min-h-screen font-primary text-color-text"
>
  {/* ... */}
</div>
```

**Step 3: Update index.css**
```css
@import "./styles/base-theme.css";
```

**Verification:**
- Browser DevTools: `/regression/de` → `<div data-site="regression">`
- Browser DevTools: `/reiki/de` → `<div data-site="reiki">`

---

### ⬜ Phase 6: English Content Placeholder (30 min)

**Goal:** Create English content structure for future translation

**Tasks:**
1. Create `frontend/src/content/regression-en.js`
2. Update `frontend/src/content/index.js` to import regression-en.js
3. Enable English in LanguageSwitcher

**Step 1: Create regression-en.js**
```javascript
// English content for Regression site
// TODO: Translate all sections from de.js

export const meta = {
  title: "Past Life Regression Sessions — Benjamin Kurtz",
  description: "Past Life Regression Sessions with Benjamin Kurtz. Hypnosis, soul work, and energy work — online or in person.",
}

export const header = {
  nav: [
    { label: "Regression", anchor: "#what-is" },
    { label: "For Whom?", anchor: "#for-whom" },
    { label: "Science", anchor: "#science" },
    { label: "About Benjamin", anchor: "#about" },
    { label: "Process", anchor: "#process" },
    { label: "Experiences", anchor: "#cases" },
  ],
  cta: "Intro Call",
}

export const hero = {
  label: "BENJAMIN KURTZ ACADEMY",
  headlineLine1: "Your soul",
  headlineLine2: "remembers.",
  heroCta: "Are you ready to listen?",
  subline: "Past Life Regression · Hypnosis · Energy Work — online and in person.",
  ctaPrimary: "Book Intro Call",
  ctaSecondary: "Listen to Podcast Episode →",
  videoUrl: "...",
  posterUrl: "...",
  vimeoEmbedUrl: "...",
}

// TODO: Translate remaining sections from de.js
export const welcome = {
  headline: "Hi, I'm Benjamin.\nGlad you're here.",
  quoteLines: ["Placeholder: Translate from German"],
  author: "Benjamin",
  imageUrl: "...",
  signatureUrl: "...",
}

// Export all other content objects as placeholders
export const services = {}
export const statement = {}
export const whatIs = {}
export const podcasts = []
export const researchers = {}
export const references = {}
export const faq = {}
export const researcherQuotes = {}
export const forWhom = {}
export const about = {}
export const process = {}
export const caseStudies = {}
export const testimonials = {}
export const booking = {}
export const footer = {}
```

**Step 2: Update content index**
```javascript
import regressionDe from './regression-de.js'
import regressionEn from './regression-en.js' // ADD
import reikiDe from './reiki-de.js'

const CONTENT_MAP = {
  regression: {
    de: regressionDe,
    en: regressionEn, // CHANGE: null → regressionEn
  },
  reiki: {
    de: reikiDe,
    en: null,
  },
}
```

**Step 3: Enable English in LanguageSwitcher**
```javascript
// In LanguageSwitcher.jsx, change:
const isEnglishEnabled = true // CHANGE: false → true
```

**Verification:**
- Visit `/regression/de` → German content
- Click "EN" → URL changes to `/regression/en`
- Verify English placeholder content loads

---

## Verification Steps (After Phase 5 & 6)

### 1. Routing & Navigation
- [ ] Visit `/` → Redirects to `/regression/de`
- [ ] Visit `/regression` → Redirects to `/regression/de`
- [ ] Visit `/regression/de` → Shows Regression site (German)
- [ ] Visit `/regression/en` → Shows Regression site (English placeholder)
- [ ] Visit `/reiki/de` → Shows Reiki site (test content)
- [ ] Switch language → URL changes, content updates

### 2. Content Loading
- [ ] Each site loads correct content file
- [ ] `useContent()` hook returns correct content
- [ ] All sections render with context content
- [ ] Header and Footer use context content

### 3. Site Attributes
- [ ] Root div has `data-site` attribute
- [ ] Language switcher appears in Header/FloatingBurger
- [ ] Site-specific CSS classes work (when implemented)

### 4. Build & Deploy
- [x] `npm run build` succeeds with Vite
- [x] Build time <30 seconds (currently 1.66s ✅)
- [x] Tailwind v4 generates correct CSS
- [ ] Cloudflare Pages deploys successfully
- [ ] All routes work on production

---

## Current File Structure

```
frontend/src/
├── content/
│   ├── regression-de.js    ✅ 54,216 bytes
│   ├── reiki-de.js         ✅ 16,423 bytes
│   ├── index.js            ✅ Content loader
│   └── regression-en.js    ⬜ TODO (Phase 6)
├── contexts/
│   ├── SiteContext.jsx     ✅ Site/lang state
│   ├── ContentContext.jsx  ✅ Content state
│   └── NavigationContext.jsx ✅ Navigation state
├── components/
│   ├── LanguageSwitcher.jsx ✅ DE/EN switcher
│   ├── Header.jsx          ✅ Uses useContent()
│   ├── Footer.jsx          ✅ Uses useContent()
│   └── sections/
│       └── *.jsx           ✅ 19/20 use useContent()
├── styles/
│   └── base-theme.css      ⬜ TODO (Phase 5)
├── App.jsx                 ✅ Multi-site routing
└── index.css               ⬜ TODO: Import base-theme (Phase 5)
```

---

## Build Output

```
✓ 1825 modules transformed
build/index.html                   1.43 kB │ gzip:   0.71 kB
build/assets/index-D44TWXt6.css   64.49 kB │ gzip:  11.30 kB
build/assets/index-B07M4Z03.js   462.68 kB │ gzip: 129.08 kB

✓ built in 1.66s
```

**Warnings:** (Non-blocking)
- Dynamic import warnings for SiteContext/ContentContext (expected in development)

---

## Next Steps (Execution Order)

1. **Phase 5: Site-Specific Styling** (1 hour)
   - Create `frontend/src/styles/base-theme.css`
   - Add `data-site` attribute to App.jsx MainPage
   - Update `frontend/src/index.css` import
   - Test: Check `data-site` attribute in DevTools
   - Commit

2. **Phase 6: English Content Placeholder** (30 min)
   - Create `frontend/src/content/regression-en.js`
   - Update `frontend/src/content/index.js`
   - Enable English in LanguageSwitcher.jsx
   - Test: Visit `/regression/en`, verify content loads
   - Commit

3. **Final Verification** (30 min)
   - Run 3 test loops (smoke, content, quality)
   - Deploy to Cloudflare Pages
   - Test all routes on production

**Total Time:** 2 hours

---

## Execution Notes

**Use `/multiloop` skill for Phase 5 & 6**

**Zero Tolerance Code Quality Policy:**
- 3 test loops after EACH phase
- No "good enough" — either perfect or broken
- Commit after each phase with descriptive message

**Test Loops (3x after each phase):**

```
LOOP 1: Smoke Test
- [ ] Build succeeds: `npm run build`
- [ ] Dev server starts: `npm run dev`
- [ ] No console errors
- [ ] All routes load

LOOP 2: Content Verification
- [ ] All sections render correctly
- [ ] Language switcher works (de ↔ en)
- [ ] Site switcher works (regression ↔ reiki)
- [ ] Header/Footer display correct data

LOOP 3: Code Quality Review
- [ ] No direct imports from content files
- [ ] No hardcoded strings in components
- [ ] No duplicate code (DRY check)
- [ ] No unnecessary complexity (KISS check)
- [ ] All DebugLabels accurate
- [ ] No console warnings
```

---

**Last Updated:** 2026-04-01
**Next Session:** Complete Phase 5 & 6, then full deployment verification
