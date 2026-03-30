# 📋 Typography Refactoring Plan — Phase 4 (COMPLETE)

**Datum:** 2026-03-26
**Status:** Phase 3B Complete → Phase 4 Ready
**Ziel:** **ALLE** Typography-Tokens auf Alles-in-einem System umstellen

---

## 🚨 Problem-Entdeckung (Session 5)

Das aktuelle Token-System ist **nicht Multi-Site-Ready**:

| Issue | Current | Problem |
|-------|---------|---------|
| **Font-Familie** | Separat (`font-display` + `text-h2`) | Muss manuell geschrieben werden |
| **Farbe** | Separat (`text-h2` + `text-brand-deep`) | Muss manuell geschrieben werden |
| **Single Source of Truth** | ❌ Nein | Änderung in tailwind ≠ überall wirksam |

**Das gilt für ALLE Tokens — nicht nur author-name!**

---

## ✅ Lösung: Getrennte Token-Systeme (Industry Best Practice)

### Prinzip
**Typography-Tokens** (Größe + Line-height) + **Font-Family-Tokens** + **Color-Tokens**

Das gilt für **ALLE** Typography-Tokens:
- Hero-Tokens (`hero-large`, `hero`) → `font-display` + `text-hero`
- Headline-Tokens (`h1`, `h2`, `h3`, `h4`) → `font-display` + `text-h2`
- Body-Tokens (`body`, `body-lg`) → `font-primary` + `text-body`
- Label-Tokens (`label`, `subline`, `list`) → `font-primary` + `text-label`
- Quote-Tokens (`quote-featured`, `quote`) → `font-display` + `text-quote-featured`
- Author-Tokens (`author-name`, `role`, `date`, `description`, etc.) → `font-display` + `text-author-name`
- Metadata-Tokens (`disclaimer`, `read-more`, `source-link`, etc.) → `font-primary` + `text-read-more`

```jsx
// Vorher ❌ (gilt für ALLE Typography-Elemente)
className="font-display text-h2 text-brand-deep"
className="font-primary text-body text-brand-body"
className="font-display text-quote-featured text-white"
className="font-primary text-label text-brand-steel"

// Nachher ✅ (gilt für ALLE Typography-Elemente)
className="font-display text-h2 text-primary"     // Serif + Größe + semantische Farbe
className="font-primary text-body text-secondary"  // Sans + Größe + semantische Farbe
className="font-display text-quote-featured text-on-dark" // Serif + Größe + Dark-Mode-Farbe
className="font-primary text-label text-tertiary"  // Sans + Größe + semantische Farbe
```

**WICHTIG - Tailwind Limitation:**
Tailwind CSS fontSize Tokens unterstützen **KEIN fontFamily** — die fontFamily-Property im fontSize-Konfigurations-Objekt wird ignoriert. Deshalb müssen Font-Familie und Größe immer separat kombiniert werden.

---

## 📝 Phase 4: Kompletter Umsetzungsplan

### Step 1: tailwind.config.js — Semantic Color-Tokens (Typography bleibt!)

**Typography-Tokens bleiben unverändert** (nur Größe + Line-height, KEINE Farben!):

```js
fontSize: {
  // ============================================
  // HERO HEADLINES — Nur Größe + Line-height
  // ============================================
  'hero-large': ['clamp(2.4rem, 6.6vw, 5.4rem)', {
    lineHeight: '1',
    letterSpacing: '-0.02em',
  }],
  'hero': ['clamp(1.44rem, 3.84vw, 3.36rem)', {
    lineHeight: '1.1',
  }],

  // ============================================
  // HEADLINES (H1-H4) — Nur Größe + Line-height
  // ============================================
  'h1': ['3rem', { lineHeight: '1.1' }],
  'h2': ['2.25rem', { lineHeight: '1.2' }],
  'h3': ['1.875rem', { lineHeight: '1.2' }],
  'h4': ['1.5rem', { lineHeight: '1.2' }],

  // ============================================
  // BODY TEXT — Nur Größe + Line-height
  // ============================================
  'body': ['1.125rem', { lineHeight: '1.75' }],
  'body-lg': ['1.25rem', { lineHeight: '1.625' }],

  // ============================================
  // LABELS — Nur Größe + Line-height
  // ============================================
  'label': ['0.8125rem', {
    lineHeight: '1.5',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
  }],
  'subline': ['1rem', { lineHeight: '1.5' }],
  'list': ['1rem', { lineHeight: '1.5' }],

  // ============================================
  // QUOTES — Nur Größe + Line-height
  // ============================================
  'quote-featured': ['2.25rem', { lineHeight: '1.1' }],
  'quote': ['1.5rem', { lineHeight: '1.2' }],

  // ============================================
  // AUTHOR-SPECIFIC — Nur Größe + Line-height
  // ============================================
  'author-name': ['2rem', { lineHeight: '1.2' }],
  'description': ['1.625rem', { lineHeight: '1.6' }],
  'summary-large': ['1.625rem', { lineHeight: '1.6' }],
  'body-narrative': ['1.125rem', { lineHeight: '1.75' }],
  'role': ['0.875rem', {
    lineHeight: '1.5',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  }],
  'date': ['0.875rem', { lineHeight: '1.5' }],

  // ============================================
  // METADATA — Nur Größe + Line-height
  // ============================================
  'disclaimer': ['0.75rem', { lineHeight: '1.5' }],
  'read-more': ['0.875rem', { lineHeight: '1.5' }],
  'button-text': ['0.875rem', { lineHeight: '1.5' }],
  'source-link': ['0.875rem', { lineHeight: '1.5' }],
  'hint': ['0.875rem', { lineHeight: '1.5' }],
  'icon': ['1rem', { lineHeight: '1' }],
},
```

**Semantic Color-Tokens:**

```js
colors: {
  // ============================================
  // SEMANTIC TEXT COLORS (für Typography)
  // ============================================
  'text-primary': '#224160',      // Main text (headlines) on light
  'text-secondary': '#5A5550',    // Body text on light
  'text-tertiary': '#7696AD',     // Labels, metadata on light

  'text-on-dark': '#FFFFFF',      // Main text on dark backgrounds
  'text-on-dark-muted': 'rgba(255, 255, 255, 0.8)',
  'text-on-dark-faded': 'rgba(255, 255, 255, 0.6)',
},
```

### Step 2: Components — ALLE umstellen (nicht nur Authors!)

**Alle Typography-Verwendungen in allen Components:**

```jsx
// Vorher ❌
<h2 className="font-display text-h2 text-brand-deep">
<p className="font-primary text-body text-brand-body">
<blockquote className="font-display text-quote-featured text-white">
<div className="font-primary text-label text-brand-steel">

// Nachher ✅
<h2 className="font-display text-h2 text-primary">
<p className="font-primary text-body text-secondary">
<blockquote className="font-display text-quote-featured text-on-dark">
<div className="font-primary text-label text-tertiary">
```

**Pattern:**
| Content Type | Font Token | Size Token | Color Token |
|--------------|------------|------------|-------------|
| Headlines (light) | `font-display` | `text-h2` | `text-primary` |
| Body (light) | `font-primary` | `text-body` | `text-secondary` |
| Labels (light) | `font-primary` | `text-label` | `text-tertiary` |
| Headlines (dark) | `font-display` | `text-h2` | `text-on-dark` |
| Body (dark) | `font-primary` | `text-body` | `text-on-dark-muted` |
| Quotes (dark) | `font-display` | `text-quote-featured` | `text-on-dark-muted` |

**Das gilt für ALLE Sections:**
- ResearchersSection, ResearcherQuotesSection
- WhatIsSectionCopy, AboutSectionCopy, CaseStudiesSectionCopy, ResearchersSectionCopy
- HeroV3Section, TestimonialsSection, TestimonialCarousel
- WelcomeSection, ProcessSection, ServicesSection, CaseStudiesSection
- StatementSection, PodcastSection, PodcastVideoSection
- Alle anderen Sections!

---

## 🎯 Komplette Token-Spezifikation

### Typography-Tokens (Größe + Line-height nur!)

| Token | Größe | Verwendung | Font-Token |
|-------|------|------------|------------|
| **Hero** |
| `hero-large` | clamp(2.4-5.4rem) | Hero Haupt-Headline | `font-display` |
| `hero` | clamp(1.44-3.36rem) | Hero Sub-Headline | `font-display` |
| **Headlines** |
| `h1` | 48px | Main headline | `font-display` |
| `h2` | 36px | Section headline | `font-display` |
| `h3` | 30px | Subsection headline | `font-display` |
| `h4` | 24px | Small headline | `font-display` |
| **Body** |
| `body` | 18px | Base body text | `font-primary` |
| `body-lg` | 20px | Large body text | `font-primary` |
| **Labels** |
| `label` | 13px | Labels, Metadata | `font-primary` |
| `subline` | 16px | Sublines (italic) | `font-primary` |
| `list` | 16px | List items | `font-primary` |
| **Quotes** |
| `quote-featured` | 36px | Große Zitate | `font-display` |
| `quote` | 24px | Standard Zitate | `font-display` |
| **Author** |
| `author-name` | 32px | Autoren-Namen | `font-display` |
| `description` | 26px | Kurzbeschreibungen | `font-display` |
| `summary-large` | 26px | Summary | `font-primary` |
| `body-narrative` | 18px | Narrative | `font-display` |
| `role` | 14px | Role (UPPERCASE) | `font-primary` |
| `date` | 14px | Date | `font-primary` |
| **Metadata** |
| `disclaimer` | 12px | Disclaimer | `font-primary` |
| `read-more` | 14px | Buttons | `font-primary` |
| `button-text` | 14px | Button-Texte | `font-primary` |
| `source-link` | 14px | Quellen-Links | `font-primary` |
| `hint` | 14px | Hint/Helper | `font-primary` |
| `icon` | 16px | Icons | `font-primary` |

### Color-Tokens (Semantic)

| Token | Farbe | Verwendung |
|-------|------|------------|
| `text-primary` | #224160 | Headlines on light |
| `text-secondary` | #5A5550 | Body text on light |
| `text-tertiary` | #7696AD | Labels on light |
| `text-on-dark` | #FFFFFF | Main text on dark |
| `text-on-dark-muted` | #FFFFFF/80 | Reduced on dark |
| `text-on-dark-faded` | #FFFFFF/60 | More reduced on dark |

---

## 📋 Phase 4: Ausführungsplan

### 1. tailwind.config.js umschreiben
- [ ] **ALLE** fontSize Tokens mit fontFamily erweitern
- [ ] **ALLE** fontSize Tokens mit color erweitern
- [ ] Modifiers für light/dark backgrounds (falls nötig)

### 2. ALLE Components migrieren (nicht nur Copy-Sections!)
- [ ] ResearchersSection, ResearcherQuotesSection
- [ ] WhatIsSectionCopy, AboutSectionCopy, CaseStudiesSectionCopy, ResearchersSectionCopy
- [ ] HeroV3Section, TestimonialsSection, TestimonialCarousel
- [ ] WelcomeSection, ProcessSection, ServicesSection, CaseStudiesSection
- [ ] StatementSection, PodcastSection, PodcastVideoSection
- [ ] Alle anderen Sections mit Typography!

### 3. fontFamily.primary/display als deprecated markieren
- [ ] Legacy-Aliases bleiben für Abwärtskompatibilität
- [ ] Components nutzen keine `font-primary`/`font-display` mehr

### 4. Farben aus Components entfernen
- [ ] `text-white`, `text-brand-deep`, `text-brand-body`, etc. aus Components
- [ ] Alles im Token!

---

## 🚀 Multi-Site-Use

Nach Phase 4: **ALLE** Tokens sind Copy-Paste Ready!

```js
// Client-ABC tailwind.config.js
fontSize: {
  'h1': ['3rem', {
    fontFamily: ['Poppins', 'sans-serif'], // Andere Font!
    color: '#FF0000', // Andere Farbe!
  }],
  'body': ['1.125rem', {
    fontFamily: ['Inter', 'sans-serif'], // Andere Font!
    color: '#333333', // Andere Farbe!
  }],
  // ... alle anderen Tokens
}
```

Components bleiben **unverändert** → Änderung nur in tailwind.config.js ✅

---

## Files to Modify

- `frontend/tailwind.config.js` — **ALLE** Tokens mit fontFamily + color
- `frontend/src/components/sections/*.jsx` — **ALLE** Sections umstellen
- `docs/typography-refactoring-plan.md` — Update mit Phase 4

---

**Nächster Schritt:** User-Approval → Phase 4 starten

**Letztes Update:** 2026-03-26 (Session 5)
**Status:** Plan für **ALLE** Typography-Tokens bereit
