# Typography Refactoring Plan

**Datum:** 2026-03-25 (Update Session 3)
**Status:** Phase 3A (In Bearbeitung)
**Branch:** `typography-refactoring`

---

## Ziel

Komplettes Typography Refactoring für alle 17 Sections mit **Design Tokens als Single Source of Truth**.

**Prinzipien (User-Feedback 2026-03-25):**
- **Keine Abstraktion!** DebugLabels zeigen exakte Tailwind-Token-Namen
- **Simplizität:** Ein Token für alles, wenn möglich (nicht viele Varianten)
- **Transparenz:** Jedes Element zeigt genau welchen Token es verwendet
- **Single Source of Truth:** Eine Änderung in tailwind.config.js = überall wirksam

---

## Design Tokens (tailwind.config.js) — AKTUELL

### Neue Token-Namen (Session 3):

| Token | CSS Wert | Verwendung | DebugLabel |
|-------|----------|------------|------------|
| **Hero Headlines** |
| `hero-large` | clamp(2.4rem, 6.6vw, 5.4rem) | Hero Haupt-Headline | HERO-LARGE |
| `hero` | clamp(1.44rem, 3.84vw, 3.36rem) | Hero Sub-Headline | HERO |
| **Headlines (H1-H4)** |
| `h1` | 3rem (48px) | Main headline | H1 |
| `h2` | 2.25rem (36px) | Section headline | H2 |
| `h3` | 1.875rem (30px) | Subsection headline | H3 |
| `h4` | 1.5rem (24px) | Small headline | H4 |
| **Body Text** |
| `body` | 1.125rem (18px) | Base body text (ALLE!) | BODY |
| `body-lg` | 1.25rem (20px) | Large body text (selten) | BODY-LG |
| **Labels** |
| `label` | 0.75rem (12px) | Labels, Metadata | LABEL |
| **Sublines & Lists** |
| `subline` | 1rem (16px) | Sublines (italic) | SUBLINES |
| `list` | 1rem (16px) | List items (credentials) | LIST |
| **Quotes** |
| `quote-featured` | 2.25rem (36px) | Große Zitate | QUOTE-FEATURED |
| `quote` | 1.5rem (24px) | Standard Zitate | QUOTE |
| **Author-specific** |
| `author-name` | 2rem (32px) | Autoren-Namen | NAME |
| `description` | 1.625rem (26px) | Kurzbeschreibungen | LEAD |
| **Metadata** |
| `disclaimer` | 0.75rem (12px) | Disclaimer-Texte | DISCLAIMER |
| `read-more` | 0.875rem (14px) | Mehr lesen Buttons | READ-MORE |
| `button-text` | 0.875rem (14px) | Button-Texte | BUTTON |
| `source-link` | 0.875rem (14px) | Quellen-Links | LINK |

### Farben (Session 3):

| Farbe | Wert | Verwendung |
|-------|------|------------|
| `brand.body` | #5A5550 | Body Text (helles grau-braun) |
| `brand.muted` | #5A5550 | Same as body |
| `brand.deep` | #224160 | Headlines |
| `brand.steel` | #7696AD | Labels, Metadata |

---

## Änderungen Session 3 (2026-03-25)

### ✅ Erledigt:

1. **Tokens umbenannt** (alte Namen → neue Namen):
   - `hero-xl` → `hero-large`
   - `hero-lg` → `hero`
   - `section-h2*` → `h2`, `h3`, `h4`
   - `body-base` → `body`
   - `author-short` → `description`
   - `featured-quote` → `quote-featured`

2. **Neue Tokens erstellt**:
   - `subline` (16px, italic)
   - `list` (16px)
   - `read-more` (14px)

3. **Copy-Sections aktualisiert**:
   - **WhatIsSectionCopy**: H3 → H2, `text-brand-muted` → `text-brand-body`
   - **AboutSectionCopy**: `meta` → `list`, `text-brand-muted` → `text-brand-body`
   - **CaseStudiesSectionCopy**: `sub` → `subline`, `lg:text-h1` entfernt, `md:text-body-lg` entfernt
   - **ResearchersSectionCopy**: SectionLabel mit `light={true}`

4. **Farbe geändert**:
   - `brand.body`: #1A1814 → #5A5550 (heller)

5. **Größe geändert**:
   - `subline`: 14px → 16px
   - `list`: 14px → 16px

6. **Demo-Page aktualisiert**:
   - Beide Tabellen mit neuen Tokens
   - Element-Vergleich-Tabelle korrigiert

---

## Noch zu tun (Session 4)

### ❌ Offene Punkte:

1. **Role + Date Tokens** (ResearchersSectionCopy):
   - Aktuell: `text-sm` hardcoded
   - Soll: `text-list` (16px) nutzen oder neue Tokens erstellen?

2. **Inklusive Labels konsolidieren**:
   - SectionLabel Komponente (12px, tracking-[0.2em])
   - Inner Labels (14px, tracking-[0.15em])
   - Soll: Alle gleich (12px mit tracking-[0.2em])?

3. **Design Freeze**:
   - User entscheidet über alle Typography-Elemente
   - Inkonsistenzen dokumentieren
   - Finales System für Phase 4

---

## Copy-Sections Status

| Section | DebugLabels | Tokens | Status |
|---------|--------------|--------|--------|
| WhatIsSectionCopy | ✅ | label, h2, body | ✅ Komplett |
| AboutSectionCopy | ✅ | label, h3, body, list | ✅ Komplett |
| CaseStudiesSectionCopy | ✅ | label, h2, subline, h4, body, disclaimer | ✅ Komplett |
| ResearchersSectionCopy | ✅ | label, h3, quote-featured, author-name, description, read-more, body, source-link, role, date | ⚠️ Role/Date hardcoded |

---

## Files

- `frontend/tailwind.config.js` — Design Tokens (Single Source of Truth)
- `frontend/src/components/ui/DebugLabel.jsx` — DebugLabel Component
- `frontend/src/pages/demos/TypographyDemoPage.jsx` — Demo Page
- `frontend/src/components/sections/*Copy.jsx` — Experimentier-Sections

---

**Letztes Update:** 2026-03-25 21:00 (Session 3)
**Nächste Session:** Role/Date Tokens klären → Design Freeze → Phase 4
