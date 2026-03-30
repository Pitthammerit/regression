# TODO

Updated: 2026-03-30 04:12

---

## 🔴 High Priority — START HERE FIRST!

### 🐛 CRITICAL BUGS FIX — Execute FIRST! (2026-03-27)
**Status:** READY FOR EXECUTION — **DO THIS BEFORE ANYTHING ELSE!**
**Plan:** `docs/critical-bugs-fix-plan.md` — Complete fix plan with all bugs

**⚠️ ARCHITECTURAL REVIEW COMPLETE — 6 CRITICAL BUGS FOUND:**

Comprehensive review via `/multiloop` workflow revealed **6 critical bugs** that must be fixed before considering the typography migration complete.

**📋 EXECUTE IN THIS ORDER:**

1. **BUG #1: Plugin Utility Conflicts** (11 instances, 1 hour)
   - Remove `tracking-label-alt`, `tracking-wider` when using `.label`/`.role` plugins
   - Files: ServicesSectionCopy, ResearchersSectionCopy, TestimonialsSectionCopy, TestimonialCarouselCopy, ProcessSectionCopy, ReferencesSectionCopy

2. **BUG #2: Redundant Italic Classes** (10+ instances, 30 min)
   - Remove manual `italic` class when using `*-italic` plugin utilities
   - Files: CaseStudiesSectionCopy, ResearcherQuotesSectionCopy, ResearchersSectionCopy, StatementSectionCopy, TestimonialsSectionCopy

3. **BUG #3: Hardcoded Spacing** (15+ instances, 1 hour)
   - Replace hardcoded spacing (mb-*, py-*) with semantic utilities
   - Files: BookingSectionCopy, ForWhomSectionCopy, ProcessSectionCopy, CaseStudiesSectionCopy, FAQSectionCopy, PodcastSectionCopy

4. **BUG #4: Inconsistent Tracking** (8+ instances, 30 min)
   - Remove ALL manual tracking when using `.label` or `.role` plugins

5. **BUG #5: Inline Styles** (5 instances, 30 min)
   - Replace static inline styles with Tailwind classes
   - Files: FAQSectionCopy, ProcessSectionCopy (PodcastSectionCopy and TestimonialCarouselCopy OK — dynamic)

6. **BUG #6: App.js Dead Code** (1 instance, 30 min)
   - Update sections.config.js to use Copy sections OR remove dead imports

**Total Time:** ~4 hours

**✅ Success Criteria:**
- All 6 bugs fixed
- Build succeeds: `npm --prefix frontend run build`
- All sections render on typo-demo without errors
- No console errors

**📚 Reference Documents Created:**
- `docs/critical-bugs-fix-plan.md` — This plan (detailed)
- `docs/tailwind-v4-migration-audit.md` — Tailwind v4 analysis (11,000 words)
- `docs/tailwind-v4-quick-reference.md` — v4 quick reference
- `docs/tailwind-v4-visual-comparison.md` — v4 side-by-side comparison
- `docs/ARCHITECTURAL_REVIEW_I18N_MULTI_SITE.md` — i18n full analysis
- `docs/ARCHITECTURAL_REVIEW_SUMMARY.md` — i18n executive summary
- `docs/ARCHITECTURAL_REVIEW_DIAGRAMS.md` — i18n visual diagrams
- `docs/ARCHITECTURAL_REVIEW_QUICK_REF.md` — i18n cheat sheet

---

### 🎨 Legacy Section Migration — Phase 3B
**Status:** Phase 3A ✅ ABGESCHLOSSEN — Phase 3B: 94% COMPLETE (16/17 Sections)
**Branch:** `typography-refactoring`
**Lessons:** `memory/typography-migration-lessons.md`
**Tailwind v4 Strategy:** `memory/tailwind-v4-vite-strategy.md` (NACHHER migrieren!)

**⚠️ WICHTIG — NACH CRITICAL BUGS FIX:**
**Plan:** `docs/section-migration-plan.md` — Umfangreicher Migrationsplan mit Multiloop-Workflow

**✅ Phase 3A Abgeschlossen (COPY Sections 100%):**
- 4 COPY Sections komplett migriert (WhatIs, About, CaseStudies, Researchers)
- 18 Typography Tokens definiert (hero, h1-h4, body, label, subline, etc.)
- Semantic Color Tokens (color-*, on-dark-*, color-border)
- Semantic Spacing Utilities (section-padding, content-spacing, etc.)
- DebugLabels perfekt konsistent mit Token-Namen
- .role Utility mit font-size erweitert
- description Duplikat-Token entfernt
- color-border Token erstellt (alle black/10 ersetzt)

**⏳ Phase 3B: Legacy Sections Migration — 100% COMPLETE (17/17):**

**✅ Abgeschlossen (17 Sections in typo-demo):**
- [x] HeroV3Section (migrated in place)
- [x] ServicesSectionCopy
- [x] WelcomeSectionCopy
- [x] ResearcherQuotesSectionCopy
- [x] StatementSectionCopy
- [x] WhatIsSectionCopy
- [x] ResearchersSectionCopy
- [x] ForWhomSectionCopy
- [x] AboutSectionCopy
- [x] ProcessSectionCopy
- [x] PodcastSectionCopy
- [x] CaseStudiesSectionCopy
- [x] TestimonialCarouselCopy
- [x] BookingSectionCopy
- [x] FAQSectionCopy
- [x] ReferencesSectionCopy
- [x] PodcastVideoSectionCopy (NEU! Die letzte!)

**📝 Nicht in sections.config.js (Legacy/Archiv):**
- TestimonialsSection (nicht TestimonialCarousel!)
- HeroSection, HeroV2Section, HeroAlt1, HeroAlt2, HeroAlt3

---

### 🚀 Tailwind v4 + Vite Migration (SPÄTER — NACH Phase 3B)

**Status:** Geplant — **NICHT** vor Typography Migration starten!

**WICHTIG:** Siehe `memory/tailwind-v4-vite-strategy.md` für vollständige Strategie

**Warum NACHHER:**
- Typography System soll sich stabilisieren während 15+ Section Migrations
- Copy Sections als Referenz für v4 Migration nutzen
- Einmalige v4 Migration statt 23 einzelne
- Geringeres Risiko durch stabiles Foundation

**Timeline:**
- **Woche 1-2:** Typography Migration (Phase 3B)
- **Woche 3:** Tailwind v4 + Vite Migration (alle 27 Sections gleichzeitig)
- **Woche 4:** Final Polish & Deploy

**Vorbereitung für v4 Migration:**
- [x] Typography Migration 100% abgeschlossen
- [x] Alle Legacy Sections migriert
- [ ] Keine hardcoded Werte mehr
- [ ] DebugLabels überall konsistent
- [x] typo-demo zeigt alle Sections korrekt

---

## 🟡 Medium Priority

### Global Design System Refactoring (TEILWEISE ABGESCHLOSSEN)
**Status:** Typography System done — Rest später
**Phasen:**
- [x] **Phase 1:** Tailwind Design-Token definieren (typography, spacing, colors) ✅
- [ ] **Phase 2:** Button-Komponenten konsolidieren
- [ ] **Phase 3:** Pilot-Refactoring (4 Sections)
- [x] **Phase 4:** Rollout auf alle Sections

---

## 🟢 Low Priority

### i18n Foundation (SPÄTER)
- [ ] Create `frontend/src/content/plr-en.js`
- [ ] Create `frontend/src/content/index.js` with `getContent(lang)` export
- [ ] Add `useContent()` hook
- [x] Update components to use `useContent()`

### Resolve backend/ Folder Confusion
- [x] Either remove `backend/` folder
- [ ] Or add clarifying note: "Not deployed. Frontend-only project"

### Add SPA Fallback for Deep Links
- [ ] Create `frontend/public/_redirects` with: `/*    /index.html   200`

---

## ✅ Completed Today (2026-03-27)

### 🔍 COMPREHENSIVE ARCHITECTURAL REVIEW — 3 AGENTS
- [x] Launched `/multiloop` skill for complete review
- [x] **Agent 1: superpowers:code-reviewer** — Found 6 critical bugs, 23 issues
- [x] **Agent 2: frontend-developer** — Tailwind v4 migration audit (31 utilities break)
- [x] **Agent 3: senior-architect-innovator** — i18n/multi-site architecture review
- [x] Created `docs/critical-bugs-fix-plan.md` — Complete fix plan
- [x] Created 8 reference documents for future projects

### 🎉 TYPOGRAPHY REFACTORING PHASE 3B — 94% COMPLETE!
- [x] 16/17 Legacy Sections migriert (nur PodcastVideoSection fehlt!)
- [x] **Architectural review revealed critical bugs** — Must fix before final section

### Plugin-Architektur für Labels & Buttons
- [x] `.label` Plugin → Uppercase für Labels
- [x] `.button-text` Plugin → Uppercase für Buttons
- [x] `.quote-featured-italic` Plugin → Kursiv für Zitate
- [x] `.body-narrative-italic` Plugin → Kursiv für Narrative
- [x] `text-body-italic` fontSize Token → Kursiv für Fußnoten
- [x] Alle nativen `uppercase`/`italic` Klassen migriert

### Bugfixes — Code Review mit "Grandpa"
- [x] `border-black/10` → `border-color-border` (3 Stellen)
- [x] `border-white` → `border-color-bg-light` (TestimonialCarouselCopy)
- [x] `bg-white/50` → `bg-color-card-overlay` Token + 3 Stellen
- [x] `border-black/8`, `border-black/12` → `border-color-border` (PodcastVideoSectionCopy)

### Content Updates
- [x] "Apple Podcasts" → "Apple" (plr-de.js)

### Systematischer Audit mit parallelen Agenten
- [x] 3 parallele Agenten: Farben, Font-Family, Font-Sizes
- [x] Alle 4 COPY Sections Zeile für Zeile geprüft
- [x] Compliance Score: 97.5% (Farben), 100% (Font-Family), 95% (Font-Sizes)
- [x] 32 DebugLabels überprüft — alle 100% konsistent

### Tailwind Config Optimierungen
- [x] `color-border` Token erstellt (#0000001A)
- [x] `.role` Utility mit `font-size: 0.875rem` erweitert
- [x] `description` Token entfernt (Duplikat von summary-large)
- [x] `color-bg-medium`, `color-accent` mit legacy kommentiert

### COPY Sections Fixes
- [x] Alle `border-black/10` → `border-color-border` (4 Stellen)
- [x] `divide-black/10` → `divide-color-border`

### Memory & Documentation
- [x] `memory/typography-migration-lessons.md` erstellt
- [x] `memory/tailwind-v4-vite-strategy.md` erstellt
- [x] MEMORY.md aktualisiert mit allen Links
- [x] DebugLabel Audit: 32 Labels, 0 Inkonsistenzen
- [x] Umfassender Legacy Section Migration Plan erstellt

---

## Known Issues

1. **No i18n system** — All content in `plr-de.js`, English not implemented
2. **backend/ folder** — Misleading, no backend deployed
3. **No catch-all route** — Invalid URLs render blank (should show NotFound)
4. **TranscriptPage needs user review** — Token-protected page (`/transkript?token=...`) not visible in normal browsing, may have hardcoded styles that weren't migrated. User should review with valid token link.

---

**Wichtig:** TODO.md wird bei jedem git push automatisch durch GitHub Action aktualisiert.
**WICHTIG:** Beim nächsten Start ZUERST `docs/legacy-section-migration-plan.md` lesen!
