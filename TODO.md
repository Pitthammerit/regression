# TODO

Updated: 2026-03-05 01:49

**Wichtig:** TODO.md wird bei jedem git push aktualisiert. **Single Source of Truth** für alle offenen Tasks.

---

## 🔵 In Arbeit

### EvidenceSection — Phase 2 (Current Focus)
- [ ] **Important:** Rename `shortQuote` → `shortVersion` in `evidence.authorities` array (conflict with `quote` field for English quotes in upper tier)
- [ ] Add `sourceUrl` and `sourceLabel` to Ian Stevenson, Brian Weiss, Jim Tucker
- [ ] Replace hardcoded Roger card with dynamic `.map()` over `authorities` array
- [ ] Ensure `shortVersion` exists for all authorities
- [ ] Test responsive layout for all 4 authority cards
- [ ] User-Feedback zu Phase 1 Akkordeon-Layout einholen

### CMS Admin (Ungeklärt)
- [ ] Klären: Was soll das CMS Admin können?
- [ ] Klären: Welche Inhalte sollen editierbar sein?
- [ ] Klären: Soll ein eigenes Admin-Panel gebaut werden?

---

## 🔴 High Priority

### Menu & Navigation
- [ ] Alle Sections IDs mit Menu Anchors abgleichen
- [ ] Smooth Scroll für alle Menu-Links testen

### Sprint 3: i18n Foundation
- [ ] Create `frontend/src/content/plr-en.js`
- [ ] Create `frontend/src/content/index.js` with `getContent(lang)` export
- [ ] Add `useContent()` hook
- [ ] Update components to use `useContent()` instead of direct imports

---

## 🟡 Medium Priority

### Resolve backend/ Folder Confusion
- [ ] Either remove `backend/` folder
- [ ] Or add clarifying note: "Not deployed. Frontend-only project right now."

---

## 🟢 Low Priority


### Textbausteine & Inspiration (Sammeln für zukünftige Sections)
- [ ] "How to remember and heal your past lives" — mögliche Subline für Section
- [ ] Weitere Text-Ideen sammeln (dieser Bereich wird erweitert)

### Add SPA Fallback for Deep Links
- [ ] Create `frontend/public/_redirects` with: `/*    /index.html   200`
- [ ] Enables deep links like `/transkript` to work on refresh

### Phase 3: Type Safety (Optional)
- [ ] Add PropTypes to key components
- [ ] Consider TypeScript migration for larger refactors

---

## ✅ Completed

### Session 2026-03-05: EvidenceSection Phase 1 + Menu Updates
- [x] EvidenceSection: Akkordeon-Card für Roger Woolger (hardcoded)
- [x] EvidenceSection: Mobile-Layout (16:9 Foto über Text, Name ÜBER Foto)
- [x] EvidenceSection: Desktop-Layout (2:3 Foto links, Text rechts)
- [x] EvidenceSection: "Mehr lesen" / "Weniger lesen" Toggle mit Chevron-Icon
- [x] EvidenceSection: Aufklapp-Bereich mit Langtext + Quellen-Link
- [x] Menu: "Was ist das?" → "Regression"
- [x] Menu: Neu — "Science" mit `#science` Anchor
- [x] EvidenceSection: ID `evidence` → `science`
- [x] Journal: Neues Bild `paste-1772670904056.png` mit orig. Aspect Ratio
- [x] Journal: Titel → "International Journal of Regression Therapy"
- [x] Journal: Erweiterte Beschreibung (seit 1986, EARTh, Open Access 2021)
- [x] Journal: Quellen-Link `https://regressionjournal.org`
- [x] Content Layer: `sourceLabel` + `sourceUrl` Pattern
- [x] Content Layer: `whitespace-pre-line` für Multi-line Text
- [x] Git Workflow: GitHub Direct Edit mit Stash/Merge
- [x] Syntax Fix: Fehlendes Komma in `whatIs.body`
- [x] CLAUDE.md: Updated mit EvidenceSection Architecture (WIP)
- [x] Session Summary: SESSION-2026-03-05.md erstellt
- [x] Memory: .claude-memory.md für 6.6. erstellt
- [x] TODO.md: Updated als single source of truth

### Sprint 2: Code Quality — Hardcoded Values Eliminated (2026-03-04)
- [x] TranscriptPage.jsx: Replaced all inline styles with Tailwind classes
- [x] NotFound.jsx: Replaced `bg-[#F0EBE1]` with `bg-brand-cream`
- [x] App.js: Replaced arbitrary `bg-[#F0EBE1]` with `bg-brand-cream`
- [x] PodcastVideoSection.jsx: Moved all hardcoded strings to content layer
- [x] Footer.jsx: Moved hardcoded logo URL to branding config
- [x] Created `frontend/src/content/branding.js` with logo, favicon, ogImage

### Sprint 1: Config-Based Section System + Dynamic Testimonials (2026-03-04)
- [x] Created `frontend/src/config/sections.config.js` with SECTIONS_ORDER array
- [x] Updated App.js to use dynamic section rendering from config
- [x] Created `frontend/src/content/testimonials.list.js` with automatic numbering
- [x] Updated TestimonialsSection to use TESTIMONIALS_LIST dynamically
- [x] Updated TestimonialCarousel to use TESTIMONIALS_LIST with fallback

### Sprint 0: TestimonialCarousel CI-Farben + No Hardcoding (2026-03-04)
- [x] Changed carousel dots to use Tailwind classes (brand-deep, brand-steel)
- [x] Replaced hardcoded star color with text-amber-400
- [x] CLAUDE.md updated: Added "No Hardcoding" principle

### TranscriptPage: Separated UI from Content (2026-03-04)
- [x] Created `frontend/src/content/transcripts/episode52.de.js` with transcript data
- [x] Moved UI strings to `frontend/src/content/plr-de.js` (transcriptPage export)
- [x] Simplified TranscriptPage to be a renderer component only

### Clean Up Unused Section Variants (2026-03-04)
- [x] Moved unused hero variants to `frontend/src/components/experiments/`
- [x] Only production components in `sections/`

### Hardcoded Strings Cleanup (VERIFIED 2026-03-05)
- [x] **Footer:** Alle Strings aus `footerContent` und `data` — SAUBER
- [x] **TranscriptPage:** Alle Strings aus `transcriptPage` und `episode52` — SAUBER
- [x] **NotFoundPage:** Alle Strings aus `notFound` — SAUBER
