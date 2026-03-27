# TODO

Updated: 2026-03-27 15:59

---

## 🔴 High Priority — START HERE FIRST!

### 🎨 Legacy Section Migration — Phase 3B (FAST FERTIG!)
**Status:** Phase 3A ✅ ABGESCHLOSSEN — Phase 3B: 94% COMPLETE (16/17 Sections)
**Branch:** `typography-refactoring`
**Lessons:** `memory/typography-migration-lessons.md`
**Tailwind v4 Strategy:** `memory/tailwind-v4-vite-strategy.md` (NACHHER migrieren!)

**⚠️ WICHTIG — BEIM NÄCHSTEN START ZUERST LESEN:**
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
- [ ] Typography Migration 100% abgeschlossen
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
- [ ] Update components to use `useContent()`

### Resolve backend/ Folder Confusion
- [x] Either remove `backend/` folder
- [ ] Or add clarifying note: "Not deployed. Frontend-only project"

### Add SPA Fallback for Deep Links
- [ ] Create `frontend/public/_redirects` with: `/*    /index.html   200`

---

## ✅ Completed Today (2026-03-27)

### 🎉 TYPOGRAPHY REFACTORING PHASE 3B — 100% COMPLETE!
- [x] Alle 17 Legacy Sections migriert
- [x] PodcastVideoSectionCopy erstellt (die letzte!)
- [x] **Typography Refactoring ABGESCHLOSSEN!**

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

---

**Wichtig:** TODO.md wird bei jedem git push automatisch durch GitHub Action aktualisiert.
**WICHTIG:** Beim nächsten Start ZUERST `docs/legacy-section-migration-plan.md` lesen!
