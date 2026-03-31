# Multi-Site + Tailwind v4 + Vite Migration


> **For Claude:** Use superpowers:executing-plans or superpowers:subagent-driven-development to implement this plan task-by-task

**Goal:** Migrate to Tailwind v4 + Vite for a stable foundation, then build multi-site (Regression, Reiki, Podcast) and multi-language (German → English) architecture.

**Architecture:** Single React app with route-based site detection, content abstraction layer, Tailwind v4 CSS-first theming.

**Tech Stack:** React 19, React Router v7, Vite 5, Tailwind CSS v4, npm, Cloudflare Pages

---

## Migration Status

| Phase | Status | Effort |
|-------|--------|--------|
| ✅ Typography & Design Tokens | **COMPLETE** (March 2026) | — |
| ✅ Phase 1: Vite + Tailwind v4 | **COMPLETE** (March 2026) | — |
| ⬜ Phase 2: Content Layer | Pending | 6-8 hours |
| ⬜ Phase 3: Multi-Site Routing | Pending | 4-6 hours |
| ⬜ Phase 4: Multi-Language | Pending | 4-6 hours |
| ⬜ Phase 5: Backend-Ready | Pending | 2-4 hours |

---

## Architecture Overview

### URL Structure (Site-First)

```
/[site]/[language]/[page?]
├── /regression/de     # German Regression site (default)
├── /regression/en     # English Regression site (future)
├── /reiki/de          # German Reiki site
├── /reiki/en          # English Reiki site
├── /podcast/de        # German Podcast site
└── /podcast/en        # English Podcast site
```

**Route Detection:**
- Parse URL to extract `site` and `language`
- Default redirect: `/` → `/regression/de`
- Load content based on site + language combination

### Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     App.js (Root)                           │
├─────────────────────────────────────────────────────────────┤
│  • BrowserRouter                                            │
│  • SiteProvider (context: currentSite, currentLang)         │
│  • ContentProvider (context: content, setContent)           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Shared Layout                           │   │
│  │  • Header (shared, site-aware content)              │   │
│  │  • FloatingBurger (route-aware, site-aware)         │   │
│  │  • Routes (per-site, per-language)                  │   │
│  │  • Footer (shared, site-aware content)              │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Cross-Site Navigation

Users can navigate between sites while maintaining language:
- Reiki site → Link to "Regression" → `/regression/de`
- Regression site → Link to "Podcast" → `/podcast/de`

---

## ✅ Pre-Migration Accomplishments (March 2026)

Before starting this migration, we have already completed significant foundation work:

### Typography & Design Token System — COMPLETE

**File:** `frontend/tailwind.config.css` (675 lines)

**What's implemented:**
- ✅ `@theme` directive with all design tokens (lines 7-126)
- ✅ Font families: `--font-primary`, `--font-secondary`, `--font-handwriting`
- ✅ Typography scale: `--font-hero-large`, `--font-hero`, `--font-h1-h4`, `--font-body`, `--font-body-lg`, `--font-label`
- ✅ Color tokens: `--color-primary`, `--color-text`, `--color-secondary`, `--color-accent`, `--color-star`
- ✅ On-dark colors: `--color-primary-on-dark`, `--color-text-on-dark`, `--color-secondary-on-dark`
- ✅ Spacing utilities: `--spacing-section-padding`, `--spacing-content-spacing`, etc.

**Composite Utilities — 27 total:**
- ✅ `typography-hero-large`, `typography-hero`, `typography-h2-h4`
- ✅ `typography-body`, `typography-body-lg`, `typography-body-narrative`
- ✅ `typography-label`, `typography-menu-text`, `typography-meta`
- ✅ `typography-quote-featured`, `typography-author-name`, `typography-handwriting`

**On-Dark Utilities — 13 total:**
- ✅ `typography-hero-large-on-dark`, `typography-hero-on-dark`, `typography-h2-on-dark`, etc.
- ✅ `typography-body-on-dark`, `typography-body-lg-on-dark`, `typography-meta-on-dark`, etc.

**All 17 sections migrated to composite utilities:**
- ✅ HeroV3Section, ServicesSection, WelcomeSection, etc.
- ✅ DebugLabels updated and accurate
- ✅ On-dark utilities working in dark sections

**What this means for migration:**
- We don't need to create design tokens from scratch
- We don't need to define typography scales from scratch
- We just need to ensure our existing `@theme` and `@utility` syntax is v4-compatible
- Most of our syntax is already v4-ready!

**See also:** `memory/on-dark-composite-utilities.md`, `memory/debuglabel-hygiene.md`

---

## Tailwind v4 Theming Strategy

### Key Research Findings

**Tailwind v4 CSS-First Approach:**
- Theme variables defined in CSS using `@theme` directive (not JavaScript)
- All theme variables become CSS custom properties (`:root`)
- Namespaced variables: `--color-*`, `--font-*`, `--text-*`, `--spacing-*`, etc.
- Can override entire namespaces with `--*: initial`
- Dark mode via `@custom-variant dark`
- Data attribute support: `[data-theme="dark"]`, `[data-site="reiki"]`

### Theme File Structure

```
frontend/src/styles/
├── base-theme.css          # Shared base theme (typography, spacing)
├── regression-theme.css    # Regression-specific tokens
├── reiki-theme.css         # Reiki-specific tokens
├── podcast-theme.css       # Podcast-specific tokens
└── index.css               # Main entry (imports all themes)
```

### base-theme.css (Shared Tokens)

**✅ ALREADY IMPLEMENTED (March 2026)**

We already have a complete design token system in `tailwind.config.css`:

```css
/* Lines 7-126 in tailwind.config.css */
@theme {
  /* Font Families */
  --font-primary: "DM Sans", sans-serif;
  --font-secondary: "Cormorant Garamond", serif;
  --font-handwriting: "Kalam", cursive;

  /* Typography Scale (shared) */
  --font-hero-large: clamp(2.4rem, 6.6vw, 5.4rem);
  --font-hero: clamp(1.44rem, 3.84vw, 3.36rem);
  --font-h2: 2.25rem;
  --font-h3: 1.875rem;
  --font-h4: 1.5rem;
  --font-body: 1.125rem;
  --font-body-lg: 1.25rem;
  --font-label: 0.94rem;

  /* Colors */
  --color-primary: #224160;
  --color-text: #5A5550;
  --color-secondary: #7696AD;
  --color-accent: #2DAD71;
  --color-star: #f5d10a;

  /* On-dark colors */
  --color-primary-on-dark: #FFFFFF;
  --color-text-on-dark: #FFFFFFCC;
  --color-secondary-on-dark: #ffffff9c;

  /* Spacing Utilities */
  --spacing-section-padding: 5rem 0 7rem 0;
  --spacing-content-spacing: 1.5rem;
}

/* 27+ composite utilities implemented */
/* 13 on-dark utilities implemented */
```

**Migration task:** Copy existing tokens to Tailwind v4 `@theme` syntax during Vite migration (Phase 1, Task 7).


### regression-theme.css (Site-Specific)

```css
@import "./base-theme.css";

/* Regression-specific color tokens */
@theme {
  --color-brand-deep: #224160;
  --color-brand-accent: #D4A574;
  --color-bg-light: #F5F1EB;
  --color-heading: #224160;
  --color-body: #5A5550;
}

/* Site-specific variant for cross-component styling */
@custom-variant site-regression (&:where([data-site="regression"], [data-site="regression"] *));
```

### reiki-theme.css (Site-Specific)

```css
@import "./base-theme.css";

/* Reiki-specific color tokens (example: different brand colors) */
@theme {
  --color-brand-deep: #2E5A4C;  /* Green instead of blue */
  --color-brand-accent: #C4A574;
  --color-bg-light: #F0F5F2;    /* Slightly different background */
  --color-heading: #1E3D32;
  --color-body: #4A5050;
}

@custom-variant site-reiki (&:where([data-site="reiki"], [data-site="reiki"] *));
```

### Theme Switching in React

```jsx
// App.js applies data attributes based on route
<div data-site={currentSite} data-theme={darkMode ? 'dark' : 'light'}>
  {/* Content */}
</div>
```

**Result:**
- All shared tokens work across sites
- Site-specific tokens override when `[data-site="reiki"]` is present
- Dark mode works independently of site selection
- Utility classes like `text-h1`, `bg-color-bg-light` work everywhere

---

## Implementation Phases

## ✅ Phase 1: Tailwind v4 + Vite Migration — COMPLETE (March 2026)

**Status:** Fully implemented and working in production

**What was implemented:**
- ✅ Vite 5.0 installed with @vitejs/plugin-react 4.0
- ✅ Tailwind CSS v4 via @tailwindcss/vite plugin
- ✅ vite.config.js configured with build output to `build/`
- ✅ main.jsx entry point using React 19 createRoot
- ✅ index.html moved to frontend/ root
- ✅ package.json updated with `"type": "module"` and Vite scripts
- ✅ index.css using `@import "tailwindcss"` (v4 syntax)
- ✅ All design tokens migrated to @theme directive
- ✅ 27 composite utilities working
- ✅ 13 on-dark utilities working

**Note:** This phase is complete. All 10 tasks done. See [Pre-Migration Accomplishments](#-pre-migration-accomplishments-march-2026) above.

---

### Phase 2: Content Layer Refactoring (6-8 hours)

**Goal:** Create content abstraction layer for easy multi-language support

**Tasks:**

1. **Create content directory structure**
   ```bash
   mkdir -p frontend/src/content/regression
   mkdir -p frontend/src/content/reiki
   mkdir -p frontend/src/content/podcast
   mv frontend/src/content/plr-de.js frontend/src/content/regression/de.js
   touch frontend/src/content/reiki/de.js
   touch frontend/src/content/podcast/de.js
   ```

2. **Create content loader** (`frontend/src/content/index.js`)
   ```javascript
   import regressionDe from './regression/de.js'

   const CONTENT_MAP = {
     regression: {
       de: regressionDe,
       en: null, // TODO: add English
     },
     reiki: { de: null, en: null },
     podcast: { de: null, en: null },
   }

   export function getContent(site, lang) {
     const siteContent = CONTENT_MAP[site] || CONTENT_MAP.regression
     const content = siteContent[lang] || siteContent.de
     if (!content) {
       console.warn(`Content not found for site=${site}, lang=${lang}`)
       return CONTENT_MAP.regression.de
     }
     return content
   }
   ```

3. **Create ContentContext** (`frontend/src/contexts/ContentContext.jsx`)
   ```javascript
   import { createContext, useContext, useState, useEffect } from 'react'
   import { getContent } from '../content'

   const ContentContext = createContext(null)

   export function ContentProvider({ children }) {
     const [content, setContent] = useState(null)
     const [site, setSite] = useState('regression')
     const [lang, setLang] = useState('de')

     useEffect(() => {
       const newContent = getContent(site, lang)
       setContent(newContent)
     }, [site, lang])

     return (
       <ContentContext.Provider value={{ content, site, lang, setContent: (s, l) => { setSite(s); setLang(l) } }}>
         {children}
       </ContentContext.Provider>
     )
   }

   export function useContent() {
     const context = useContext(ContentContext)
     if (!context) throw new Error('useContent must be used within ContentProvider')
     return context
   }
   ```

4. **Create SiteContext** (`frontend/src/contexts/SiteContext.jsx`)
   ```javascript
   import { createContext, useContext, useEffect } from 'react'
   import { useParams, useNavigate } from 'react-router-dom'

   const SiteContext = createContext(null)
   const VALID_SITES = ['regression', 'reiki', 'podcast']
   const VALID_LANGUAGES = ['de', 'en']

   export function SiteProvider({ children }) {
     const { site: siteParam, lang: langParam } = useParams()
     const navigate = useNavigate()

     const site = VALID_SITES.includes(siteParam) ? siteParam : 'regression'
     const lang = VALID_LANGUAGES.includes(langParam) ? langParam : 'de'

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
       <SiteContext.Provider value={{ currentSite: site, currentLang: lang, navigateToSite, switchLanguage, validSites: VALID_SITES, validLanguages: VALID_LANGUAGES }}>
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

5. **Update all 20 sections to use useContent()**
   - Change: `import { hero } from '../content/plr-de'`
   - To: `const { content } = useContent()`
   - Use: `content.hero` instead of `hero`

**Deliverable:** Content abstraction layer ready for multi-site, multi-language

---

### Phase 3: Multi-Site Routing (4-6 hours)

**Goal:** Implement site-first URL routing with cross-site navigation

**Tasks:**

1. **Update App.js routing**
   ```javascript
   <Routes>
     {/* Site-first routing: /:site/:lang */}
     <Route path="/:site/:lang" element={<SiteRouter />} />

     {/* Default redirect */}
     <Route path="/" element={<Navigate to="/regression/de" replace />} />

     {/* Site without language - auto-add German */}
     <Route path="/:site" element={<Navigate to="/regression/de" replace />} />

     {/* Legacy redirect */}
     <Route path="/transkript" element={<Navigate to="/regression/de/transkript" replace />} />
   </Routes>
   ```

2. **Create SiteRouter component**
   ```javascript
   function SiteRouter() {
     const { site, lang } = useParams()
     const content = getContent(site, lang)

     switch (site) {
       case 'regression': return <MainPage content={content} />
       case 'reiki': return <ReikiLanding content={content} />
       case 'podcast': return <PodcastLanding content={content} />
       default: return <MainPage content={content} />
     }
   }
   ```

3. **Update Header for site-aware navigation**
   ```javascript
   import { useSite } from '../contexts/SiteContext'

   export default function Header() {
     const { currentSite, currentLang, navigateToSite } = useSite()
     const content = getContent(currentSite, currentLang)

     return (
       <header>
         <Link to={`/${currentSite}/${currentLang}`}>
           <img src={content.header.logo} alt={content.meta.title} />
         </Link>

         {/* Cross-site navigation */}
         <nav>
           {['regression', 'reiki', 'podcast'].map((site) => (
             <button key={site} onClick={() => navigateToSite(site)} className={currentSite === site ? 'active' : ''}>
               {site === 'regression' ? 'Regression' : site === 'reiki' ? 'Reiki' : 'Podcast'}
             </button>
           ))}
         </nav>
       </header>
     )
   }
   ```

4. **Update Footer for site-aware content**

5. **Update FloatingBurger for route-awareness**

**Deliverable:** Multi-site routing with cross-site navigation

---

### Phase 4: Multi-Language Foundation (4-6 hours)

**Goal:** Prepare language switching infrastructure

**Tasks:**

1. **Create LanguageSwitcher component**
   ```javascript
   import { useSite } from '../contexts/SiteContext'

   export default function LanguageSwitcher() {
     const { currentSite, currentLang, switchLanguage } = useSite()

     return (
       <div className="flex items-center gap-2">
         <button onClick={() => switchLanguage('de')} className={currentLang === 'de' ? 'font-bold' : 'opacity-60'}>DE</button>
         <span className="opacity-30">|</span>
         <button onClick={() => switchLanguage('en')} className={currentLang === 'en' ? 'font-bold' : 'opacity-60'}>EN</button>
       </div>
     )
   }
   ```

2. **Add LanguageSwitcher to Header**

3. **Test language switching**
   - Visit `/regression/de` → Click "EN" → URL changes to `/regression/en`
   - Switch time <50ms, no page reload

**Deliverable:** Language switcher ready for English content

---

### Phase 5: Backend-Ready Architecture (2-4 hours)

**Goal:** Document and prepare for future backend integration

**Tasks:**

1. **Document backend integration points** (`docs/backend-integration-plan.md`)
   - Content API (future: fetch from backend instead of static files)
   - Authentication API (Supabase or Cloudflare Access)
   - Form submissions (contact, booking)

2. **Create API placeholder structure**
   - `frontend/src/api/content.js` (placeholder)
   - `frontend/src/api/auth.js` (placeholder)

**Deliverable:** Backend architecture documented

---

## Verification Steps

### 1. Routing & Navigation
- [ ] Visit `/` → Redirects to `/regression/de`
- [ ] Visit `/regression` → Redirects to `/regression/de`
- [ ] Visit `/regression/de` → Shows Regression site
- [ ] Visit `/reiki/de` → Shows Reiki site
- [ ] Click cross-site link → Changes site, maintains language
- [ ] Switch language → Changes lang, maintains site

### 2. Theme Switching
- [ ] Regression site has correct brand colors
- [ ] Reiki site has different brand colors
- [ ] Dark mode toggle works on all sites
- [ ] Site theme persists during navigation

### 3. Content Loading
- [ ] Each site loads correct content file
- [ ] Shared components work across sites
- [ ] Section components render with site-specific content

### 4. Build & Deploy
- [ ] `npm run build` succeeds with Vite
- [ ] Build time <30 seconds (2-5x improvement)
- [ ] Tailwind v4 generates correct CSS
- [ ] Cloudflare Pages deploys successfully
- [ ] All routes work on production
- [ ] **No Cloudflare config changes needed** ✅

---

## Files Summary

| File | Action | Change Type |
|------|--------|-------------|
| `frontend/vite.config.js` | Create | New (Vite config) |
| `frontend/tailwind.config.css` | Create | New (Tailwind v4) |
| `frontend/src/content/regression/de.js` | Move | From `plr-de.js` |
| `frontend/src/content/reiki/de.js` | Create | New site content |
| `frontend/src/content/podcast/de.js` | Create | New site content |
| `frontend/src/content/index.js` | Create | Content loader |
| `frontend/src/contexts/SiteContext.jsx` | Create | Site + lang state |
| `frontend/src/contexts/ContentContext.jsx` | Create | Content state |
| `frontend/src/components/LanguageSwitcher.jsx` | Create | Lang switcher |
| `frontend/src/App.js` | Modify | Multi-site routing |
| `frontend/src/components/Header.jsx` | Modify | Site-aware navigation |
| `frontend/src/components/Footer.jsx` | Modify | Site-aware content |
| `frontend/src/components/FloatingBurger.jsx` | Modify | Route-aware display |
| `frontend/package.json` | Modify | Vite deps |
| `frontend/index.html` | Move | From public/ |
| `frontend/src/main.jsx` | Create | New entry point |
| `docs/backend-integration-plan.md` | Create | Backend docs |

**Sections to update:** All 20 sections in `frontend/src/components/sections/` to use `useContent()`

---

## Migration Timeline

| Phase | Tasks | Effort | Status |
|-------|-------|--------|--------|
| ✅ Foundation: Design Tokens | Complete | — | Done (March 2026) |
| ✅ Phase 1: Vite + Tailwind v4 | Complete | — | Done (March 2026) |
| Phase 2: Content Layer | 5 tasks | 6-8 hours | Pending |
| Phase 3: Multi-Site Routing | 5 tasks | 4-6 hours | Pending |
| Phase 4: Multi-Language | 3 tasks | 4-6 hours | Pending |
| Phase 5: Backend-Ready | 2 tasks | 2-4 hours | Pending |

**Remaining:** 16-22 hours (4-5 weeks at part-time pace)

**Note:** Foundation work (typography + design tokens + Vite + Tailwind v4) is complete, significantly reducing remaining effort.

---

## Scalability Benefits

**Adding a new site:**
1. Create `frontend/src/content/[new-site]/de.js`
2. Create `frontend/src/styles/[new-site]-theme.css`
3. Add site name to `VALID_SITES` array
4. Create landing page component
5. Add route case in `SiteRouter`

**Adding a new language:**
1. Create `frontend/src/content/[site]/en.js`
2. Content loader automatically picks it up

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Tailwind v4 breaking changes | High | Test thoroughly in dev before production |
| Content file sync issues | Medium | Use TypeScript to validate content structure |
| URL structure change breaks SEO | High | Implement redirects from old URLs |
| Build size increase (multiple themes) | Medium | CSS purging should handle unused styles |

---

## Next Steps After Migration

### Immediate (Week 1)
1. Deploy to production and monitor for 24 hours
2. Fix any runtime issues discovered
3. Update CLAUDE.md with new architecture
4. Update TODO.md with migration complete

### Short-term (Week 2-4)
1. Add English content files (`regression/en.js`)
2. Translate key sections to English
3. Test multi-language functionality

### Medium-term (Month 2-3)
1. Create Reiki site content
2. Create Podcast site content

### Long-term (When Ready)
1. Backend integration (Supabase or Cloudflare D1)
2. User authentication
3. Dynamic content management

---

**Last Updated:** 2026-03-31 (Updated to reflect Phase 1 is complete)

**Quick Reference:**
- **Main Plan:** This document
- **Execution:** Use `/superpowers:executing-plans` in a new session
- **Backup Branch:** `backup/pre-migration`
