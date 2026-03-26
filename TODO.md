# TODO

Updated: 2026-03-26 14:50

---

## 🔴 High Priority

### 🎨 Typography Refactoring — Phase 3B (AKTUELL)
**Status:** Fonts & Farben hardcoded — muss zu Tokens migriert werden
**Branch:** `typography-refactoring`
**Ziel:** Alle Fonts und Farben über Tailwind Tokens steuern

**✅ Erledigt (Typography Größen):**
- Alle Textgrößen zu Tokens migriert (label, body, h1-h4, role, date, etc.)
- summary-large, body-narrative für Researchers
- DebugLabel Layout-Fix (kein inline-block mehr)

**❌ Offen (Fonts & Farben):**

**Font-Definition in tailwind.config.js:**
```javascript
fontFamily: {
  serif: ['Cormorant Garamond', 'Georgia', 'serif'],
  sans:  ['DM Sans', 'system-ui', 'sans-serif'],
}
```

**Aktuelle Font-Nutzung (hardcoded `font-sans` / `font-serif`):**
- `font-serif` wird für Headlines verwendet (H1-H4)
- `font-sans` wird für Body, Labels, etc. verwendet
- Problem: Font ist hardcoded in jedem Element!

**Gewünschtes System:**
1. **Primary Font (DM Sans)** — für: body, label, subline, list, hint, icon, role, date
2. **Serif Font (Cormorant Garamond)** — für: h1-h4, summary-large, body-narrative, quotes
3. **Quote Font** — ??? (Ist `quote-featured` und `quote` bereits definiert? JA — 36px und 24px)

**Spezifische Probleme zu lösen:**

1. **Brian Weiss Quote sollte Serif sein:**
   - Text: "Through past-life regression, it's possible to heal..."
   - Aktueller Font: ? (muss geprüft werden)
   - Soll: Serif (Cormorant Garamond)

2. **Brian Weiss Name/Role anders dargestellt:**
   - Name: "Brian Weiss MD"
   - Role: "Ehem. Chefarzt Psychiatrie, Mount Sinai"
   - Problem: Andere Darstellung als `author-name` Token → Hinweis auf hardcoded
   - Muss: Gleiches Token wie andere Autoren verwenden

**Nächste Schritte:**
1. [ ] Font-Classes in Tokens integrieren (font-sans, font-serif in token-Definition?)
2. [ ] Alle `font-sans` und `font-serif` hardcoded Klassen entfernen
3. [ ] Farben prüfen: `text-brand-deep`, `text-brand-body`, `text-white/80` etc.
4. [ ] Brian Weiss Quote/Name prüfen und korrigieren

---

### 🎨 Global Design System Refactoring (SPÄTER)
**Ziel:** Komplette Codebase auf Tailwind-Klassen umstellen - kein Inline-Code mehr.

**Umfang:**
- Alle Sections und Components prüfen
- Globale Klassen definieren: Textbausteine, Überschriften, Buttons, Farben
- In allen Components einsetzen (Fließtexte, Buttons, etc.)
- Kein `style={{ ... }}` mehr - nur Tailwind classes

**Phasen:**
1. Design-Token in tailwind.config.js definieren (typography, colors, spacing)
2. Typography-Komponenten erstellen (SectionHeadline, BodyText, Quote, Subtitle)
3. Button-Komponenten konsolidieren
4. Pilot-Refactoring (4 Sections)
5. Rollout auf alle Sections

**Verweis:** Siehe "🟡 Medium Priority → Global Design System Refactoring" für Details

### Menu & Navigation
- [x] Sidecar & Burger Complete (CTA timing, backdrop blur, responsive grid layout)
- [ ] Sidecar inline styles → Tailwind classes (später)
- [x] DesktopNav: Einfaches Hover-Dropdown mit Glassmorphism (-50 Zeilen)
- [x] Sidebar Menu fertig (2-col mobile, 1-col desktop)
- [x] Tailwind CSS Best Practices in CLAUDE.md dokumentiert

**Wichtig:** TODO.md wird bei jedem git push automatisch durch GitHub Action aktualisiert. **Single Source of Truth** für alle offenen Tasks.

---

## 🟡 Medium Priority

### 🎨 Global Design System Refactoring (NEU — 2026-03-05)
**Status:** PLAN GEPRÜFT, WARTET AUF USER-APPROVAL
**Dokumentation:** [Design-System Plan](/Users/benjaminkurtz/.claude/plans/virtual-puzzling-backus.md)

**Problem:** Kein konsistentes Design-System. Farben, Schriftgrößen und Typografie sind über alle Components hinweg hartcodiert und inkonsistent.

**Phasen:**
- [ ] **Phase 0:** FAQ Sofort-Anpassung (Fragen-Farbe = Menü-Grauton)
- [x] **Phase 1:** Tailwind Design-Token definieren (typography, spacing)
- [ ] **Phase 2:** Typography-Komponenten erstellen (SectionHeadline, BodyText, Quote, Subtitle)
- [ ] **Phase 3:** Button-Komponenten konsolidieren
- [ ] **Phase 4:** Pilot-Refactoring (4 Sections: About, FAQ, Researchers, Process)
- [ ] **Phase 5:** User-Feedback einholen
- [ ] **Phase 6:** Rollout auf alle verbleibenden 13 Sections

**Open Questions für User:**
1. Tailwind Presets vs CSS Custom Properties für Multi-Site-Support?
2. Typography-Komponenten (`<SectionHeadline>`) vs Utility-Classes (`text-section-h2`)?
3. Welche 4 Sections für Pilot-Phase? (Aktuell: About, FAQ, Researchers, Process)

---

### i18n Foundation (SPÄTER — wenn alle Sections fertig)
- [ ] Create `frontend/src/content/plr-en.js`
- [ ] Create `frontend/src/content/index.js` with `getContent(lang)` export
- [ ] Add `useContent()` hook
- [ ] Update components to use `useContent()` instead of direct imports

### Resolve backend/ Folder Confusion
- [ ] Either remove `backend/` folder
- [ ] Or add clarifying note: "Not deployed. Frontend-only project right now."

---

## 🟢 Low Priority

### CMS Admin (Ungeklärt)
- [ ] Klären: Was soll das CMS Admin können?
- [ ] Klären: Welche Inhalte sollen editierbar sein?
- [ ] Klären: Soll ein eigenes Admin-Panel gebaut werden?

### Textbausteine & Inspiration
- [ ] "How to remember and heal your past lives" — mögliche Subline für Section
- [ ] Weitere Text-Ideen sammeln

### Add SPA Fallback for Deep Links
- [ ] Create `frontend/public/_redirects` with: `/*    /index.html   200`

### Type Safety (Optional)
- [ ] Add PropTypes to key components
- [ ] Consider TypeScript migration

---

## ✅ Completed

### Session 2026-03-06: Desktop Nav + Sidecar Animation Fixes (abgeschlossen)
- [x] DesktopNav: MutationObserver entfernt (27 Zeilen)
- [x] DesktopNav: Radix UI Native Positioning verwendet
- [x] DesktopNav: Viewport direkt unter List platziert (kein Wrapper)
- [x] DesktopNav: Dropdowns erscheinen korrekt unter Nav Items
- [x] NavigationContext: isBurgerClosing State hinzugefügt
- [x] App.js: FloatingBurger mit slideOut Animation (0.5s)
- [x] SidecarMenu: shouldAnimateOut mit isBurgerClosing kombiniert
- [x] Alle Close-Wege konsistent animiert (Floating Burger, Menüpunkte, Backdrop)
- [x] Build erfolgreich ✅
- [x] Deployt zu Cloudflare ✅
- [x] -21 Zeilen netto (-51 entfernt, +30 hinzugefügt)

### Session 2026-03-06: NavigationContext Refactoring (abgeschlossen)

### Session 2026-03-06: FAQ Navigation Enhancement (abgeschlossen)
- [x] FAQ menuItems array in plr-de.js erstellt (Top 4 Fragen)
- [x] menu.js: FAQ mit children submenu ausgestattet
- [x] FAQSection.jsx: URL hash support (#faq-0, #faq-1, etc.)
- [x] Auto-expand accordion bei Hash-Navigation
- [x] Desktop: FAQ dropdown mit 4 Fragen
- [x] Sidecar: FAQ kinder angezeigt statt direkter Link
- [x] Build erfolgreich ✅
- [x] Deployt zu Cloudflare ✅

### Session 2026-03-06: Navigation System Redesign (abgeschlossen)
- [x] Sidecar: slide-in-from-right Animation (Transcript-Stil)
- [x] Sidecar: Close animation (slideOutToRight)
- [x] Burger: X→Burger animation beim Schließen
- [x] Burger: z-index Fix (inline style, zIndex: 100)
- [x] Burger: Position ganz rechts (Header px-8, Sidecar py-4)
- [x] DesktopNav: Radix UI Advanced Animation (data-motion)
- [x] DesktopNav: Dropdown unter Trigger positioniert
- [x] DesktopNav: Flexible Dropdown Breite (min-w-[200px] w-auto)
- [x] Sidecar: Tighter spacing für alle Items ohne Scroll

### Session 2026-03-05: Menu Demo Page + Styling Fixes (abgeschlossen)
- [x] MenuDemoPage.jsx repariert (Syntaxfehler behoben)
- [x] 3 Header-Varianten implementiert (V1=Original, V2=Burger+Inline, V3=Nested)
- [x] FAQ Hover: Grau (`text-brand-steel/80`) statt grün
- [x] FAQ Animation verlangsamt (`duration-500/600` mit `ease-out`)
- [x] FAQ Antworten: Blau (`text-brand-deep`) mit `text-lg`
- [x] Build erfolgreich ✅
- [x] Deployt zu Cloudflare ✅

### Session 2026-03-05: Menu Configuration System (abgeschlossen)
- [x] `frontend/src/content/menu.js` erstellt - zentrale Menü-Konfiguration
- [x] Nested Struktur für Hauptkategorien + Unterpunkte
- [x] 3 Header-Varianten als Demo-Komponenten erstellt
- [x] MenuDemoPage mit Variant-Switcher implementiert

### Session 2026-03-05: Evidence & Podcast Data Structure (abgeschlossen)
- [x] **Portrait URLs Fix:** Brian Weiss + Roger Woolger URLs korrigiert (`.r2` fehlte)
- [x] **Books Resources:** 3 Bücher zu `evidence.resources` hinzugefügt (Many Lives Many Masters, Other Lives Other Selves, Life Before Life)
- [x] **Podcasts Array:** `podcast` Objekt → `podcasts` Array umgewandelt (für zukünftige Episoden)
- [x] Updated PodcastSection + PodcastVideoSection mit `podcasts[0]`
- [x] **EvidenceSection Code Review:** Keine hartgecodeten Strings gefunden ✅

### Session 2026-03-05: Automatic TODO.md Sync System (abgeschlossen)
- [x] Created `scripts/update-todo.js` - Parses commits and marks completed tasks
- [x] Created `scripts/add-todo.js` - Adds new tasks with duplicate detection
- [x] Created `.github/workflows/update-todo.yml` - GitHub Action for auto-sync
- [x] Created comprehensive documentation: `docs/TODO-SYNC-WORKFLOW.md`
- [x] Switched Git remote from HTTPS to SSH (bypasses workflow scope issue)
- [x] Git Workflow training: Commit, Push, Branches in VS Code
- [x] Updated CLAUDE.md with deployment rules and feedback guidelines

### EvidenceSection — Phase 2: Self-Service Authorities (2026-03-05)
- [x] Rename `shortQuote` → `shortVersion` in `evidence.authorities` array
- [x] Add `sourceUrl` and `sourceLabel` to Ian Stevenson, Brian Weiss, Jim Tucker
- [x] Replace hardcoded Roger card with dynamic `.map()` over `authorities` array
- [x] Ensure `shortVersion` exists for all authorities
- [x] Move hardcoded "Mehr/Weniger lesen" strings to content layer (`evidence.accordion`)
- [x] Remove hardcoded portrait URLs from component
- [x] Build successful ✅

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

### Hardcoded Strings Cleanup (VERIFIED 2026-03-05)
- [x] **Footer:** Alle Strings aus `footerContent` und `data` — SAUBER
- [x] **TranscriptPage:** Alle Strings aus `transcriptPage` und `episode52` — SAUBER
- [x] **NotFoundPage:** Alle Strings aus `notFound` — SAUBER
