# Multi-Site Architecture: Regression + Reiki

> **For Claude:** Use `/multiloop` skill to execute this plan with code review and testing loops.

**Goal:** Build multi-site (Regression, Reiki) and multi-language (German → English) architecture on top of completed Vite + Tailwind v4 foundation.

**Scope:** Phase 1 focuses on Regression + Reiki only. Podcast site can be added later following the same pattern.

**Architecture:** Single React app with route-based site detection, content abstraction layer, Tailwind v4 CSS-first theming.

**Tech Stack:** React 19, React Router v7, Vite 5, Tailwind CSS v4, npm, Cloudflare Pages

---

## Migration Status

| Phase | Status | Effort |
|-------|--------|--------|
| ✅ Foundation | **COMPLETE** (March 2026) | — |
| ✅ Vite + Tailwind v4 | **COMPLETE** (March 2026) | — |
| ⬜ Phase 1: Content Directory | Pending | 30 min |
| ⬜ Phase 2: Contexts | Pending | 2 hours |
| ⬜ Phase 3: Update Sections | Pending | 3-4 hours |
| ⬜ Phase 4: Multi-Site Routing | Pending | 2 hours |
| ⬜ Phase 5: Site Theming | Pending | 1 hour |
| ⬜ Phase 6: English Placeholder | Pending | 30 min |

**Total remaining:** 9-11 hours

---

## ✅ Foundation Status (Phase 0 — COMPLETE)

**Completed March 2026:**
- ✅ Vite 5.0 with @vitejs/plugin-react 4.0
- ✅ Tailwind CSS v4 via @tailwindcss/vite plugin
- ✅ vite.config.js configured with build output to `build/`
- ✅ main.jsx entry point using React 19 createRoot
- ✅ index.html moved to frontend/ root
- ✅ package.json with `"type": "module"` and Vite scripts
- ✅ index.css using `@import "tailwindcss"` (v4 syntax)
- ✅ All design tokens in @theme directive
- ✅ 27 composite utilities working
- ✅ 13 on-dark utilities working

**Current State:**
- Single-site (Regression only)
- Single-language (German only)
- Content in `frontend/src/content/plr-de.js` (677 lines)
- 21 active sections in `frontend/src/components/sections/`
- 62 files import directly from `plr-de.js`
- No SiteContext or ContentContext exists

---

## URL Structure (Site-First)

```
/[site]/[language]/[page?]
├── /regression/de     # German Regression site (default)
├── /regression/en     # English Regression site (future)
├── /reiki/de          # German Reiki site
└── /reiki/en          # English Reiki site
```

**Note:** Podcast can be added later by creating `podcast-de.js` and adding to `VALID_SITES`.

---

## Implementation Phases

### Phase 1: Content Directory Restructuring (30 min)

**Goal:** Create flat content directory structure with regression-de.js and reiki-de.js

**Files:**
- Create: `frontend/src/content/regression-de.js`
- Create: `frontend/src/content/reiki-de.js`
- Create: `frontend/src/content/index.js`
- Modify: `frontend/src/content/plr-de.js` → delete after migration

**Content Structure:**
```
frontend/src/content/
├── regression-de.js    # All Regression site content (German)
├── reiki-de.js         # All Reiki site content (German - test content)
├── regression-en.js    # English content (Phase 6)
└── index.js            # Content loader
```

**Step 1: Copy and rename plr-de.js**

Run: `cp frontend/src/content/plr-de.js frontend/src/content/regression-de.js`
Expected: New file created as regression-de.js

**Step 2: Create Reiki content file with test content**

Create `frontend/src/content/reiki-de.js`:
```javascript
// Reiki site content - German with test structure
export const meta = {
  title: "Reiki — Benjamin Kurtz",
  description: "Reiki Sessions mit Benjamin Kurtz. Energiearbeit und Heilung.",
};

export const header = {
  nav: [
    { label: "Was ist Reiki?", anchor: "#was-ist" },
    { label: "Anwendung", anchor: "#anwendung" },
    { label: "Über Benjamin", anchor: "#ueber" },
  ],
  cta: "Termin buchen",
};

export const hero = {
  label: "BENJAMIN KURTZ ACADEMY",
  headlineLine1: "Reiki Energie",
  headlineLine2: "zum Heilen.",
  heroCta: "Lass die Energie fliessen",
  subline: "Reiki · Energiearbeit · Heilung — online und vor Ort.",
  ctaPrimary: "Termin vereinbaren",
  ctaSecondary: "Mehr erfahren →",
  videoUrl: "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/video/riverside_benjamin_raw-video-cfr_benjamin_kurtz's%20st_0016%20trim.mp4",
  posterUrl: "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/video-thumbnails/welcome_regresson_video_thumbnail.jpg",
  vimeoEmbedUrl: "https://player.vimeo.com/video/1168643769",
};

export const welcome = {
  headline: "Hi, ich bin Benjamin.\nSchön, dass du hier bist.",
  quoteLines: [
    "Hier erfährst du, was Reiki ist, wie Energiearbeit wirkt, und wie sie dir helfen kann.",
    "Reiki ist eine japanische Heilmethode, die durch Handauflegen Energie überträgt.",
    "Ich freue mich, dich auf dieser Reise zu begleiten.",
  ],
  author: "Benjamin",
  imageUrl: "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/images/2%20s%20350px.png",
  signatureUrl: "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/images/signature_benjamin_black.png",
};

// Reiki-specific test content
export const services = {
  items: [
    { label: "Reiki Session", sub: "Energiearbeit & Heilung" },
    { label: "Fernheilung", sub: "Reiki auf Distanz" },
    { label: "Ausgleich", sub: "Chakra-Arbeit" },
  ],
  location: "online & vor Ort",
};

// Copy structure from regression-de.js for testing
// TODO: Replace with actual Reiki content
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

Run: Manual file creation
Expected: Reiki test content file created

**Step 3: Create content loader index**

Create `frontend/src/content/index.js`:
```javascript
import regressionDe from './regression-de.js'
// import regressionEn from './regression-en.js' // TODO: Phase 6
import reikiDe from './reiki-de.js'

const CONTENT_MAP = {
  regression: {
    de: regressionDe,
    en: null, // TODO: Add English in Phase 6
  },
  reiki: {
    de: reikiDe,
    en: null,
  },
  // podcast: can be added later following the same pattern
}

/**
 * Get content for a specific site and language
 * @param {string} site - Site ID ('regression' | 'reiki' | 'podcast')
 * @param {string} lang - Language code ('de' | 'en')
 * @returns {object} Content object
 */
export function getContent(site, lang) {
  const siteContent = CONTENT_MAP[site] || CONTENT_MAP.regression
  const content = siteContent[lang] || siteContent.de

  if (!content) {
    console.warn(`Content not found for site=${site}, lang=${lang}`)
    return CONTENT_MAP.regression.de
  }

  return content
}

/**
 * Get all available sites
 * @returns {string[]} Array of site IDs
 */
export function getAvailableSites() {
  return Object.keys(CONTENT_MAP)
}

/**
 * Get available languages for a site
 * @param {string} site - Site ID
 * @returns {string[]} Array of language codes
 */
export function getAvailableLanguages(site) {
  return Object.keys(CONTENT_MAP[site] || CONTENT_MAP.regression).filter(
    lang => CONTENT_MAP[site]?.[lang] !== null
  )
}
```

Run: Manual file creation
Expected: Content loader created with exports

**Step 4: Delete old plr-de.js**

Run: `rm frontend/src/content/plr-de.js`
Expected: Old file removed

**Step 5: Commit**

```bash
git add frontend/src/content/
git commit -m "feat: restructure content directory for multi-site support

- Copy plr-de.js to regression-de.js
- Add reiki-de.js with test content
- Create content/loader index.js
- Add getContent() helper
- Remove old plr-de.js"
```

**🔥 PHASE 1 COMPLETE — RUN 3 TEST LOOPS 🔥**

---

### Phase 2: Site & Content Contexts (2 hours)

**Goal:** Create React contexts for site/language and content management

**Files:**
- Create: `frontend/src/contexts/SiteContext.jsx`
- Create: `frontend/src/contexts/ContentContext.jsx`
- Modify: `frontend/src/App.jsx`

**Step 1: Create SiteContext**

Create `frontend/src/contexts/SiteContext.jsx`:
```javascript
import { createContext, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const SiteContext = createContext(null)

const VALID_SITES = ['regression', 'reiki']
const VALID_LANGUAGES = ['de', 'en']

// Note: podcast site can be added later by adding to VALID_SITES
// and creating podcast-de.js following the same pattern

export function SiteProvider({ children }) {
  const { site: siteParam, lang: langParam } = useParams()
  const navigate = useNavigate()

  // Validate and default to regression/de
  const site = VALID_SITES.includes(siteParam) ? siteParam : 'regression'
  const lang = VALID_LANGUAGES.includes(langParam) ? langParam : 'de'

  // Redirect invalid URLs
  useEffect(() => {
    if (!VALID_SITES.includes(siteParam) || !VALID_LANGUAGES.includes(langParam)) {
      navigate(`/${site}/${lang}`, { replace: true })
    }
  }, [siteParam, langParam, navigate, site, lang])

  const navigateToSite = (targetSite) => {
    if (!VALID_SITES.includes(targetSite)) return
    navigate(`/${targetSite}/${lang}`)
  }

  const switchLanguage = (newLang) => {
    if (!VALID_LANGUAGES.includes(newLang)) return
    navigate(`/${site}/${newLang}`)
  }

  return (
    <SiteContext.Provider value={{
      currentSite: site,
      currentLang: lang,
      navigateToSite,
      switchLanguage,
      validSites: VALID_SITES,
      validLanguages: VALID_LANGUAGES,
    }}>
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const context = useContext(SiteContext)
  if (!context) throw new Error('useSite must be used within SiteProvider')
  return context
}
```

Run: Manual file creation
Expected: SiteContext created with hooks

**Step 2: Create ContentContext**

Create `frontend/src/contexts/ContentContext.jsx`:
```javascript
import { createContext, useContext, useState, useEffect } from 'react'
import { getContent } from '../content'
import { useSite } from './SiteContext'

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null)
  const { currentSite, currentLang } = useSite()

  useEffect(() => {
    const newContent = getContent(currentSite, currentLang)
    setContent(newContent)
  }, [currentSite, currentLang])

  return (
    <ContentContext.Provider value={ content }>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (!context === null) throw new Error('useContent must be used within ContentProvider')
  return context
}
```

Run: Manual file creation
Expected: ContentContext created with hooks

**Step 3: Update App.jsx with contexts**

Modify `frontend/src/App.jsx`:
```javascript
// Add imports
import { SiteProvider } from './contexts/SiteContext'
import { ContentProvider } from './contexts/ContentContext'
import { useContent } from './contexts/ContentContext'

// Update MainPage to use content context
function MainPageContent() {
  const { content } = useContent()
  const [debugMode, setDebugMode] = useState(false)

  // Update sectionMap to use content from context
  const sectionMap = {
    'HeroV3Section': <HeroV3Section debugMode={debugMode} />,
    // ... other sections
  }

  // Update Footer to use content from context
  const footerData = content?.footer || {}

  return (
    <div className="bg-color-bg-light bg-paper min-h-screen font-primary text-color-text">
      {/* ... */}
      <Footer data={footerData} debugMode={debugMode} />
    </div>
  )
}

function MainPage() {
  return (
    <ContentProvider>
      <MainPageContent />
    </ContentProvider>
  )
}

// Update App component
export default function App() {
  return (
    <NavigationProvider>
      <SiteProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/regression/de" replace />} />
            {/* Other routes */}
          </Routes>
        </BrowserRouter>
      </SiteProvider>
    </NavigationProvider>
  )
}
```

**Step 4: Test context setup**

Run: `npm --prefix frontend run dev`
Expected: Dev server starts, no errors

**Step 5: Commit**

```bash
git add frontend/src/contexts/
git add frontend/src/App.jsx
git commit -m "feat: add SiteContext and ContentContext

- SiteContext: manages site/language from URL params
- ContentContext: loads content based on site/lang
- Add useSite() and useContent() hooks
- Update App.jsx with context providers"
```

---

### Phase 3: Update Sections to use Content Context (3-4 hours)

**Goal:** Refactor all 21 sections to use `useContent()` instead of direct imports

**Files:**
- Modify: All files in `frontend/src/components/sections/` (21 files)

**Pattern for each section:**
1. Remove direct content import
2. Add `import { useContent } from '../../contexts/ContentContext'`
3. Add `const { contentKey } = useContent()` inside component
4. Test in dev server

**List of sections to update (19 active + TestimonialCarousel):**
- WelcomeSection.jsx
- StatementSection.jsx
- WhatIsSection.jsx
- ResearchersSection.jsx
- ReferencesSection.jsx
- FAQSection.jsx
- ResearcherQuotesSection.jsx
- PodcastVideoSection.jsx
- PodcastSection.jsx
- ForWhomSection.jsx
- AboutSection.jsx
- ProcessSection.jsx
- CaseStudiesSection.jsx
- TestimonialsSection.jsx
- TestimonialCarousel.jsx (special case: receives content via props)
- BookingSection.jsx
- CtaImageSection.jsx
- SimpleCtaSection.jsx
- HeroV3Section.jsx
- ServicesSection.jsx

**Example (HeroV3Section):**
```javascript
// OLD import:
// import { hero } from '../../content/plr-de'

// NEW import:
import { useContent } from '../../contexts/ContentContext'

export default function HeroV3Section({ debugMode = false }) {
  const { hero } = useContent() // Get hero from context
  // ...
}
```

**Step 4: Update TestimonialCarousel props**

Modify `App.jsx`:
```javascript
'TestimonialCarousel': (
  <TestimonialCarousel
    clients={content?.testimonials?.clients || []}
    label={content?.testimonials?.clientLabel || ''}
    subtitle={content?.testimonials?.clientSubtitle || ''}
    debugMode={debugMode}
  />
),
```

**Step 5: Update Header.jsx and Footer.jsx**

- Header: Use `useContent()` for navigation content
- Footer: Already uses data prop, just ensure prop gets content from context

**Step 6: Commit after each section, then final commit**

```bash
git add frontend/src/components/
git commit -m "refactor: migrate all sections to useContent()

- All 21 sections now use useContent() hook
- Remove direct imports from content files
- Header and Footer updated
- TestimonialCarousel props updated"
```

---

### Phase 4: Multi-Site Routing (2 hours)

**Goal:** Implement site-first URL routing with cross-site navigation

**Files:**
- Modify: `frontend/src/App.jsx`
- Create: `frontend/src/components/LanguageSwitcher.jsx`
- Modify: `frontend/src/components/Header.jsx`

**Step 1: Update App.jsx routing**

Modify `frontend/src/App.jsx` Routes section:
```javascript
<Routes>
  {/* Site-first routing: /:site/:lang */}
  <Route path="/:site/:lang" element={<MainPage />} />

  {/* Site without language - auto-add German */}
  <Route path="/:site" element={<Navigate to="/regression/de" replace />} />

  {/* Legacy transcript route */}
  <Route path="/transkript" element={<Navigate to="/regression/de/transkript" replace />} />

  {/* Default redirect */}
  <Route path="/" element={<Navigate to="/regression/de" replace />} />

  {/* Demo pages */}
  <Route path="/menu-demo" element={<MenuDemoPage />} />
  <Route path="/typo-demo" element={<TypographyDemoPage />} />

  {/* 404 */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

Run: `npm --prefix frontend run dev`
Expected: Visiting `/` redirects to `/regression/de`

**Step 2: Create LanguageSwitcher component**

Create `frontend/src/components/LanguageSwitcher.jsx`:
```javascript
import { useSite } from '../contexts/SiteContext'

export default function LanguageSwitcher({ className = '' }) {
  const { currentLang, switchLanguage } = useSite()

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={() => switchLanguage('de')}
        className={`text-sm font-medium transition-colors ${
          currentLang === 'de'
            ? 'text-color-primary'
            : 'text-color-text/60 hover:text-color-primary'
        }`}
        aria-label="Deutsch"
      >
        DE
      </button>
      <span className="text-color-text/30">|</span>
      <button
        onClick={() => switchLanguage('en')}
        className={`text-sm font-medium transition-colors ${
          currentLang === 'en'
            ? 'text-color-primary'
            : 'text-color-text/60 hover:text-color-primary'
        }`}
        aria-label="English"
        disabled={currentLang === 'en'} // Disable until English content exists
      >
        EN
      </button>
    </div>
  )
}
```

Run: Manual file creation
Expected: Component created

**Step 3: Add LanguageSwitcher to Header**

Modify `frontend/src/components/Header.jsx`:
```javascript
import LanguageSwitcher from './LanguageSwitcher'

export default function Header({ debugMode = false }) {
  // ...
  return (
    <header ...>
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-8 xl:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" ...>...</a>

          {/* Desktop Nav */}
          <div className="hidden 900:flex items-center flex-1 justify-center -ml-[20%]">
            <DesktopNav debugMode={debugMode} />
          </div>

          {/* NEW: Language switcher */}
          <div className="hidden 900:flex">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
```

**Step 4: Test routing**

Run: `npm --prefix frontend run dev`

Test URLs:
- `/` → redirects to `/regression/de`
- `/reiki` → redirects to `/reiki/de`
- `/regression/en` → shows Regression site (English placeholder)

**Step 5: Commit**

```bash
git add frontend/src/App.jsx
git add frontend/src/components/LanguageSwitcher.jsx
git add frontend/src/components/Header.jsx
git commit -m "feat: implement multi-site routing

- Site-first URL structure: /:site/:lang
- Add LanguageSwitcher component to Header
- Default redirect: / → /regression/de
- Support for regression and reiki sites
- Legacy /transkript route preserved"
```

---

### Phase 5: Site-Specific Styling (1 hour)

**Goal:** Prepare for site-specific theming with Tailwind v4 CSS variables

**Files:**
- Create: `frontend/src/styles/base-theme.css`
- Modify: `frontend/src/App.jsx`

**Step 1: Extract base theme tokens**

Create `frontend/src/styles/base-theme.css`:
```css
/* Shared theme tokens for all sites */
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

/* Podcast site can be added later following the same pattern */
```

Run: Manual file creation
Expected: Base theme file created

**Step 2: Add data-site attribute to App**

Modify `frontend/src/App.jsx` MainPageContent:
```javascript
import { useSite } from './contexts/SiteContext'

function MainPageContent() {
  const { currentSite } = useSite()
  const { content } = useContent()
  const [debugMode, setDebugMode] = useState(false)

  return (
    <div
      data-site={currentSite}
      className="bg-color-bg-light bg-paper min-h-screen font-primary text-color-text"
    >
      {/* ... */}
    </div>
  )
}
```

**Step 3: Update index.css import**

Modify `frontend/src/index.css`:
```css
@import "./styles/base-theme.css";
```

**Step 4: Test site-specific attributes**

Run: `npm --prefix frontend run dev`

Check browser DevTools:
- `/regression/de` → `<div data-site="regression">`
- `/reiki/de` → `<div data-site="reiki">`

**Step 5: Commit**

```bash
git add frontend/src/styles/
git add frontend/src/App.jsx
git add frontend/src/index.css
git commit -m "feat: add site-specific theming foundation

- Create base-theme.css with shared tokens
- Add data-site attribute to root div
- Prepare for site-specific color overrides"
```

---

### Phase 6: English Content Placeholder (30 min)

**Goal:** Create English content structure for future translation

**Files:**
- Create: `frontend/src/content/regression-en.js`

**Step 1: Create English content file**

Create `frontend/src/content/regression-en.js`:
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
  videoUrl: "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/video/riverside_benjamin_raw-video-cfr_benjamin_kurtz's%20st_0016%20trim.mp4",
  posterUrl: "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/video-thumbnails/welcome_regresson_video_thumbnail.jpg",
  vimeoEmbedUrl: "https://player.vimeo.com/video/1168643769",
}

// TODO: Translate remaining sections from de.js
export const welcome = {
  headline: "Hi, I'm Benjamin.\nGlad you're here.",
  quoteLines: [
    "Placeholder: Translate from German",
  ],
  author: "Benjamin",
  imageUrl: "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/images/2%20s%20350px.png",
  signatureUrl: "https://pub-d53492a253b841429ca6f2f9281daf17.r2.dev/images/signature_benjamin_black.png",
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

Run: Manual file creation
Expected: English content placeholder created

**Step 2: Update content index**

Modify `frontend/src/content/index.js`:
```javascript
import regressionDe from './regression-de.js'
import regressionEn from './regression-en.js'
// ... existing imports
```

**Step 3: Test language switching**

Run: `npm --prefix frontend run dev`

Test:
1. Visit `/regression/de` → German content
2. Click "EN" in Header → URL changes to `/regression/en`
3. Verify English placeholder content loads

**Step 4: Commit**

```bash
git add frontend/src/content/
git commit -m "feat: add English content placeholder

- Create regression-en.js with translated hero/header
- Add English to content loader
- Language switcher now works
- TODO: Translate remaining sections"
```

---

## Verification Steps

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
- [ ] All 21 sections render with context content
- [ ] Header and Footer use context content

### 3. Site Attributes
- [ ] Root div has `data-site` attribute
- [ ] Language switcher appears in Header
- [ ] Site-specific classes work (when implemented)

### 4. Build & Deploy
- [ ] `npm run build` succeeds with Vite
- [ ] Build time <30 seconds
- [ ] Tailwind v4 generates correct CSS
- [ ] Cloudflare Pages deploys successfully
- [ ] All routes work on production

---

## Files Summary

| File | Action | Change Type |
|------|--------|-------------|
| `frontend/src/content/regression-de.js` | Copy | From `plr-de.js` |
| `frontend/src/content/reiki-de.js` | Create | Reiki test content |
| `frontend/src/content/regression-en.js` | Create | English content (Phase 6) |
| `frontend/src/content/index.js` | Create | Content loader |
| `frontend/src/contexts/SiteContext.jsx` | Create | Site + lang state |
| `frontend/src/contexts/ContentContext.jsx` | Create | Content state |
| `frontend/src/components/LanguageSwitcher.jsx` | Create | Lang switcher |
| `frontend/src/styles/base-theme.css` | Create | Shared theme |
| `frontend/src/App.jsx` | Modify | Multi-site routing |
| `frontend/src/components/Header.jsx` | Modify | Site-aware nav |
| `frontend/src/components/Footer.jsx` | Modify | Content via props |
| `frontend/src/components/sections/*.jsx` | Modify | useContent() (21 files) |

**Total new files:** 7
**Total modified files:** 24 (21 sections + App.jsx + Header.jsx + Footer.jsx)

**Note:** `plr-de.js` is deleted after copying to `regression-de.js`

---

## Timeline

| Phase | Tasks | Effort | Status |
|-------|-------|--------|--------|
| ✅ Foundation | Vite + Tailwind v4 | Complete | Done |
| Phase 1 | Content directory | 30 min | Pending |
| Phase 2 | Contexts | 2 hours | Pending |
| Phase 3 | Update sections | 3-4 hours | Pending |
| Phase 4 | Routing | 2 hours | Pending |
| Phase 5 | Site theming | 1 hour | Pending |
| Phase 6 | English content | 30 min | Pending |

**Total remaining:** 9-11 hours

**Note:** Podcast site can be added later following the same pattern as Reiki

---

## Execution Notes

**🔥 ZERO TOLERANCE CODE QUALITY POLICY 🔥**

This is not a "move fast and break things" operation. This is a "ship excellence or don't ship" operation.

**Execution Strategy:**
1. **Autonomous building** — Each phase executes end-to-end with minimal hand-holding
2. **Triple-loop testing** — 3 full test cycles after EVERY phase (not just "it works")
3. **Code review rigor** — Each change reviewed against DRY, KISS, YAGNI, SOC principles
4. **Revert checkpoint ready** — Commit `f2c2e72` is the safe fallback point

**Testing Loops (3x after each phase):**

```
LOOP 1: Smoke Test
- [ ] Build succeeds: `npm run build`
- [ ] Dev server starts: `npm run dev`
- [ ] No console errors
- [ ] All routes load (/, /regression/de, /reiki/de)

LOOP 2: Content Verification
- [ ] All sections render with correct content
- [ ] Language switcher works (de ↔ en)
- [ ] Site switcher works (regression ↔ reiki)
- [ ] Header/Footer display correct data
- [ ] No broken images or links

LOOP 3: Code Quality Review
- [ ] No direct imports from content files (all use useContent())
- [ ] No hardcoded strings in components
- [ ] No duplicate code (DRY check)
- [ ] No unnecessary complexity (KISS check)
- [ ] All DebugLabels accurate
- [ ] No console warnings
```

**Failure Protocol:**
- If ANY test fails → STOP → Fix → Re-run ALL 3 loops from scratch
- No "good enough" — either perfect or broken
- If blocked >15 min → Revert to checkpoint `f2c2e72`, reassess approach

**Commit Discipline:**
- After EACH phase: commit with descriptive message
- After ALL 3 test loops pass: merge to main
- Commit messages must explain WHY, not just WHAT

**Use `/multiloop` skill for Phases 2-5** (complex multi-file changes)

---

**Content file naming:** All content files use kebab-case: `regression-de.js`, `reiki-de.js`, `regression-en.js`

**Podcast site:** Can be added later by creating `podcast-de.js` and adding `podcast` to `VALID_SITES`

---

**Last Updated:** 2026-04-01

**Next Steps:**
1. User gives "go" signal
2. Start with Phase 1 (Content directory restructuring)
3. Use `/multiloop` for ALL phases
4. 3 test loops after EACH phase — zero exceptions
5. Deploy and verify on Cloudflare Pages
