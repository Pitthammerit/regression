# Plan: Global Design System — Typography Refactoring

**Datum:** 2026-03-07 → 2026-03-12 (Update)
**Status:** Phase 3A in Bearbeitung
**Branch:** `typography-refactoring`

---

## Context

### Problem
Die Codebase hat **inkonsistente Typography** über 17 Sections hinweg:
- H2 Größen: 3 Varianten (Standard, Booking größer, References ohne Farbe)
- Label-Klassen: Tracking-Werte schwanken (0.15em, 0.18em, 0.2em)
- Body Text: 5 Varianten (Farbe, Größe, Line-height)
- Inline-Styles in Hero/Podcast (`style={{ fontSize: 'clamp(...)' }}`)

### Ziel
Ein **konsistentes Typography System** mit:
- Single Source of Truth (Design Tokens in `tailwind.config.js`)
- Reusable Components (`SectionHeadline`, `BodyText`, `Quote`, `Label`)
- DRY-Prinzip: Änderung an einem Ort = alle Sections aktualisiert
- Zukunftssicher für i18n (zweite Sprache)

---

## Agent-Einsatz (Plan-Phase)

### ✅ Abgeschlossen (Analyse)
| Agent | Rolle | Ergebnis |
|-------|-------|----------|
| Frontend-developer | Typography-Klassen sammeln | 17 Sections analysiert, Inkonsistenzen dokumentiert |
| Senior-architect-innovator | Plan auf Lücken prüfen | 8 kritische Lücken identifiziert |
| Feature-dev:code-reviewer | Best Practices recherchieren | Components vs Utilities, Migration Strategy |
| Explore | Patterns im Codebase finden | Serif/Sans Konventionen, Color Palette |

### 🚀 Geplant (Ausführung)
| Agent | Rolle | Phase |
|-------|-------|-------|
| Frontend-developer | `tailwind.config.js` erweitern | Phase 1 ✅ |
| Frontend-developer | Typography Components erstellen | Phase 2 (nach Freeze) |
| Frontend-developer | Demo-Page bauen | Phase 3 ✅ |
| Frontend-developer | 4 Sections kopieren | Phase 3 ✅ |
| User + Claude | Design zusammen anpassen | Phase 3A 🔄 IN BEARBEITUNG |
| Senior-architect-innovator | Design Freeze Entscheidung | Phase 3B (nächste) |
| Frontend-developer | Components erstellen (final) | Phase 4 |
| Frontend-developer | Eine Copy refactoren | Phase 5 |
| Feature-dev:code-reviewer | Review nach Phase 5 | Phase 5 |
| Frontend-developer | Rollout auf alle 17 Sections | Phase 6 |
| Senior-architect-innovator | Component Design Entscheidungen | Phase 7 |
| Frontend-developer | Design Elemente streamlinen | Phase 8 |
| Frontend-developer | Header + Footer refactoren | Phase 9 |
| Feature-dev:code-reviewer | Final Review vor Deploy | Phase 10 |

---

## Current Status (2026-03-12)

### ✅ Erledigt:

| Phase | Status | Details |
|-------|--------|---------|
| **Phase 0** | ✅ | Git Branch `typography-refactoring`, Baseline: 112.35 kB |
| **Phase 1** | ✅ | Design Tokens in tailwind.config.js (hero, section-h2, body, letterSpacing) |
| **Phase 3** | ✅ | Demo-Page mit 4 Copy-Sections erstellt, Route `/typo-demo` |
| **DebugLabel.jsx** | ✅ | 6 neue Typen: disclaimer, button, link, role, date, meta |
| **Copy-Sections** | ✅ | Alle Typography-Elemente mit korrekten DebugLabels versehen |

**Bundle Size aktuell:** 116.85 kB (+4.5 kB vs Baseline, im Rahmen)

---

## Implementation Plan

### Phase 0: Checkpoint + Baseline ✅
**Status:** Abgeschlossen

Git Branch `typography-refactoring` erstellt, Baseline gemessen.

---

### Phase 1: Design Tokens definieren ✅
**Status:** Abgeschlossen

`tailwind.config.js` mit Typography Tokens erweitert:
- Hero-Tokens: `hero-xl`, `hero-lg`
- Section-H2: `section-h2`, `section-h2-md`, `section-h2-lg`
- Body: `body-base`, `body-lg`
- LetterSpacing: `heading-tight`, `label-wide`

---

### Phase 2: Typography Components erstellen (ERST nach Design Freeze!)
**Status:** Wartet auf Phase 3B

Components werden erst NACH Design Freeze erstellt.

---

### Phase 3: Demo-Page erstellen ✅
**Status:** Abgeschlossen

4 Copy-Sections erstellt:
- `WhatIsSectionCopy.jsx`
- `AboutSectionCopy.jsx`
- `CaseStudiesSectionCopy.jsx`
- `ResearchersSectionCopy.jsx`

Demo-Page: `frontend/src/pages/demos/TypographyDemoPage.jsx` mit Route `/typo-demo`

---

### Phase 3A: Design Exploration 🔄 IN BEARBEITUNG
**Ziel:** Das perfekte Typography-Design finden

#### ✅ Erledigt (Session 1):
- DebugLabel.jsx mit 6 neuen Typen
- Alle Copy-Sections mit DebugLabels versehen

#### ❌ Noch zu tun (Session 2):

**1. tailwind.config.js - 6 neue Design Tokens:**
```javascript
fontSize: {
  // Neue Tokens für Phase 3A
  'disclaimer': ['0.75rem', { lineHeight: '1.5' }],      // 12px - Disclaimer-Texte
  'button-text': ['0.875rem', { lineHeight: '1.5' }],    // 14px - Button-Texte
  'source-link': ['0.875rem', { lineHeight: '1.5' }],    // 14px - Quellen-Links

  // Author-specific (Researchers)
  'author-name': ['2rem', { lineHeight: '1.2' }],        // 32px - Autoren-Namen
  'author-short': ['1.625rem', { lineHeight: '1.6' }],   // 26px - Kurzbeschreibungen
  'featured-quote': ['2.25rem', { lineHeight: '1.1' }],  // 36px - Große Zitate
}
```

**2. Copy-Sections mit neuen Tokens aktualisieren:**
- **CaseStudiesSectionCopy.jsx**: `font-sans text-xs...` → `text-disclaimer`
- **ResearchersSectionCopy.jsx**:
  - Button: `font-sans text-sm...` → `text-button-text`
  - Link: `font-sans text-sm...` → `text-source-link`
  - Featured Quote: `text-[36px] md:text-[42px]...` → `text-featured-quote`
  - Author Name: `text-2xl md:text-3xl...` → `text-author-name`
  - Short Version: `text-[26px] md:text-[28px]...` → `text-author-short`

**3. TypographyDemoPage.jsx - Akkordeon-Tabelle vervollständigen (gruppiert):**

Fehlende Elemente (8): disclaimer, button, link, role, date, meta, name, lead

Gruppierung (4 Gruppen):
- Gruppe 1: **Basiselemente** (Label, H2, H3, Body, Sub, Quote)
- Gruppe 2: **Spezialelemente** (Disclaimer, Teaser, Lead, Meta)
- Gruppe 3: **UI-Elemente** (Button, Link)
- Gruppe 4: **Metadaten** (Role, Date, Name, Tag)

---

### Phase 3B: Design Freeze (Nächste!)
**Ziel:** Finales Design festlegen

User-Entscheidung nach Phase 3A Completion:
- ✅ "Design ist perfekt" → Weiter zu Phase 4 (Components erstellen)
- 🔄 "Noch Änderungen nötig" → Weiter mit Phase 3A Iterationen

---

### Phase 4: Components erstellen (final)
**Ziel:** Typography Components basierend auf gefrorenem Design

Erst NACH Design Freeze:
- `frontend/src/components/typography/` Ordner erstellen
- Components: SectionHeadline, BodyText, Quote, Label, Name, Role, Date, Meta, Disclaimer, Button, Link, Teaser, Tag

---

### Phase 5: Pilot-Refactoring (eine Copy)
**Ziel:** Eine Copy-Section mit Components refactoren

WhatIsSectionCopy.jsx mit Components refactoren → Visueller Test → Code-Review

---

### Phase 6: Rollout auf alle 17 Sections
**Ziel:** Alle Sections mit Components refactoren

Reihenfolge: Einfach → Mittel → Komplex
17 einzelne Commits, nach JEDEM Commit: User testet visuell

---

### Phase 7: Component Design Entscheidungen
**Ziel:** Klären welche Components wir brauchen und wie diese aussehen

Bestehende: ✅ CtaButton, SectionLabel, SectionWrapper, LazyImage, BurgerButton
Neu benötigt: Card, Tag, Badge, Divider

---

### Phase 8: Design Elemente streamlinen
**Ziel:** Alle Design-Elemente in Components, nichts mehr hardcoded

Buttons → <CtaButton />, Cards → <Card />, Tags → <Tag />, Dividers → <Divider />

---

### Phase 9: Header + Footer Typography
**Ziel:** Auch Header und Footer nutzen das konsistente Typography System

Header.jsx, Footer.jsx, DesktopNav.jsx, SidecarMenu.jsx refactoren

---

### Phase 10: Final Verification & Deploy
**Ziel:** Alles zusammen prüfen und deployen

Lighthouse Audit → Bundle Size Check → Visueller Check → Deploy → User-Test

---

## Neue Naming-Konvention (Final)

### Basiselemente (universell):
| Bisher | Neu | Verwendung |
|--------|-----|------------|
| Label | `label` | Sektions-Labels (tracking, uppercase) |
| H2 | `h2` | Hauptsektionstitel |
| H3 | `h3` | Unterüberschriften (allgemein) |
| Body | `body` | Haupttext (allgemein) |
| Sub | `role` | Job-Titel, Positionen, Rollen |
| Sub (für Daten) | `date` | Jahreszahlen, Lebensdaten, Zeiträume |
| Sub (allgemein) | `sub` | Andere Nebentexte |
| Quote | `quote` | Zitate |

### Generische Element-Namen:
| Element | Klassen-Name | DebugLabel-Typ | Verwendung |
|---------|--------------|----------------|------------|
| "* Namen wurde geändert" | `disclaimer` | `disclaimer` | Footnotes, Hinweise |
| "Mehr lesen/Weniger lesen" | `button` | `button` | Alle Button-Texte |
| "Quelle →" | `link` | `link` | Alle Quellen-Links |
| Item Tag | `tag` | `label` | Tags, Kategorien |
| Item Name | `name` | `h3` | Titel, Namen allgemein |
| Item Teaser | `teaser` | `sub` | Teaser-Texte |
| Section Labels | `label` | `label` | Inline-Labels |
| Section Text | `body` | `body` | Body-Texte |
| Subline unter H2 | `subline` | `sub` | Sublines |
| **Job-Titel, Positionen** | `role` | `role` | Rollen, Titel |
| **Jahreszahlen, Daten** | `date` | `date` | Daten, Zeiträume |
| Kurzbeschreibungen | `lead` | `body` | Lead-Paragraphen |
| Metadaten allgemein | `meta` | `body` | Meta-Informationen |

---

## Files zu modifizieren (Phase 3A Session 2)

| File | Action | Lines |
|------|--------|-------|
| `frontend/tailwind.config.js` | 6 Tokens hinzufügen | fontSize Objekt |
| `frontend/src/components/sections/CaseStudiesSectionCopy.jsx` | Disclaimer → `text-disclaimer` | Disclaimer Zeile |
| `frontend/src/components/sections/ResearchersSectionCopy.jsx` | Button, Link, Quotes, Names → Tokens | Multiple Zeilen |
| `frontend/src/pages/demos/TypographyDemoPage.jsx` | 8 Tabellenzeilen + Gruppierung | Akkordeon 2 Tabelle |

---

## User-Entscheidungen (Festgelegt)

1. **Checkpoint:** Git Branch `typography-refactoring` ✅
2. **4 Sections für Demo:** WhatIs, About, CaseStudies, Researchers ✅
3. **Bundle Size:** 5-10% okay (langfristig: Multilingual, CMS, Template) ✅
4. **Rollout:** Sehr langsam — einzeln mit User-Test nach jeder Section ✅
5. **Design Tokens sofort verwenden** ✅ (Session 2)
6. **Tabelle gruppiert** ✅ (4 Gruppen)
7. **Sofort implementieren** ✅ (Kein Warten auf Design Freeze)

---

## Verification Checklist Phase 3A

Nach Abschluss Session 2:

- [ ] Build erfolgreich: `npm --prefix frontend run build`
- [ ] Alle 22 Elemente in TypographyDemoPage Tabelle sichtbar
- [ ] 4 Gruppen korrekt angezeigt
- [ ] Live-Vorschau funktioniert für alle Elemente
- [ ] Debug-Toggle zeigt alle Labels korrekt
- [ ] Browser: `http://localhost:3000/typo-demo` lädt ohne Errors
- [ ] Bundle Size im akzeptablen Bereich (<125 kB gzip)
