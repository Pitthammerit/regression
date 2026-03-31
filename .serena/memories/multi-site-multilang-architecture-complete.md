# Multi-Site + Multi-Language Architecture — COMPLETE

**Date:** 2026-03-31
**Status:** ✅ COMPLETE — Deployed
**Commits:** 3539f77 → db8e5a1 (Phases 1-4)

---

## What Was Built

### Multi-Site Architecture
- **Sites:** Regression + Reiki (Podcast can be added later)
- **Languages:** German (English structure ready)
- **URL Structure:** `/:site/:lang` (e.g., `/regression/de`, `/reiki/de`)

### Content Layer
- **Flat Structure:** `regression-de.js`, `reiki-de.js` (NO subfolders)
- **Content Loader:** `getContent(site, lang)` in `index.js`
- **Dynamic Content:** `useContent()` hook in all sections

### Contexts
- **SiteContext:** Site/language from URL params
  - `useSite()`: currentSite, currentLang, navigateToSite(), switchLanguage()
  - VALID_SITES = ['regression', 'reiki']
- **ContentContext:** Content based on site/lang
  - `useContent()`: Returns content object

### Routing
- **Default:** `/` → `/regression/de`
- **Multi-site:** `/:site/:lang` → Loads site content
- **Legacy:** `/transkript` → `/regression/de/transkript`

### UI Components
- **LanguageSwitcher:** DE/EN toggle (desktop: 900px+)
  - English disabled until Phase 6

---

## File Structure

```
frontend/src/
├── content/
│   ├── regression-de.js   # Regression DE (716 lines)
│   ├── reiki-de.js        # Reiki DE (294 lines)
│   └── index.js           # getContent() loader
├── contexts/
│   ├── SiteContext.jsx     # Site/language state
│   ├── ContentContext.jsx  # Content state
│   └── NavigationContext.jsx  # Existing nav
├── components/
│   ├── LanguageSwitcher.jsx  # DE/EN toggle
│   ├── Header.jsx           # Has language switcher
│   └── sections/           # All use useContent()
└── App.jsx                 # Multi-site routes
```

---

## How It Works

1. User visits `/` → Redirects to `/regression/de`
2. SiteContext parses URL: `site='regression'`, `lang='de'`
3. ContentContext loads: `getContent('regression', 'de')`
4. All sections receive content via `useContent()` hook
5. Language switcher changes URL to `/regression/en` (when ready)

---

## Next Steps (Optional)

### Phase 5: Site-Specific Styling (1 hour)
- Create `frontend/src/styles/base-theme.css`
- Add `[data-site="regression"]` and `[data-site="reiki"]` attributes
- Define site-specific color tokens

### Phase 6: English Content (30 min)
- Create `regression-en.js` with translated content
- Enable English language switcher
- Test `/regression/en` route

### Phase 7: Backend Docs (30 min)
- Document backend integration points
- API endpoints, authentication, forms

---

## Deployment

- **Cloudflare Pages:** Auto-deploys on push
- **URL:** `[commit-hash].regression-a2m.pages.dev`
- **Latest:** `db8e5a1.regression-a2m.pages.dev`

**Test URLs:**
- `/` → Should show Regression site (German)
- `/reiki/de` → Should show Reiki site (test content)
- Language switcher visible on desktop (900px+)

---

## Revert Checkpoint

**Commit:** `54578fd`
**Use if:** Critical bugs found in production
**Command:** `git revert --no-commit db8e5a1..HEAD && git commit -m "revert: rollback to checkpoint"`

---

## Time Tracking

| Phase | Estimated | Actual |
|-------|-----------|--------|
| Phase 1: Content Directory | 30 min | ~20 min |
| Phase 2: Contexts | 2 hours | ~30 min |
| Phase 3: Sections Refactor | 3-4 hours | ~2 hours |
| Phase 4: Routing | 2 hours | ~30 min |
| **Total** | **8-10 hours** | **~3 hours** |

**Under budget!** ✅

---

**Agent Credits:**
- frontend-developer: All 4 phases
- Master Orchestrator (Claude Code): Test loops, verification