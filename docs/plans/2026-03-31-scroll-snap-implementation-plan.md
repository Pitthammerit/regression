# Scroll-Snap Implementation Plan

> **Status:** Pending Review
> **Created:** 2026-03-31
> **Approach:** CSS-Only (Ansatz A)

---

## Overview

**Ziel:** Section-to-Section Scroll Snap — beim Scrollen wird automatisch zur nächsten Section gescrollet.

**Technik:** CSS-only (`scroll-snap-type`, `scroll-snap-align`)

**Herausforderung:** Lange Read Sections (About, WhatIs, Researchers, FAQ, etc.) dürfen den User nicht "festhalten" beim Lesen.

**Lösung:** `scroll-snap-stop: normal` — User kann "durchbrechen" bei schnellem Scroll, aber bei langsamen Scroll-Gesten snappt es zur nächsten Section.

---

## Files to Modify

1. `frontend/src/index.css` — Scroll-Snap Container setup
2. `frontend/src/components/ui/SectionWrapper.jsx` — Snap align属性
3. `frontend/src/components/sections/PodcastVideoSection.jsx` — Heading: hero-large → hero
4. `frontend/tailwind.config.css` — Neue Utility für Snap-Verhalten

---

## Implementation Steps

### Step 1: Neue Utilities in tailwind.config.css

```css
/* Scroll Snap Utilities */
@utility snap-section {
  scroll-snap-align: start;
  scroll-snap-stop: normal;
}

@utility snap-force {
  scroll-snap-stop: always;
}

@utility snap-none {
  scroll-snap-align: none;
}
```

**Werte:**
- `snap-section` — Default für alle Sections (kann durchbrochen werden)
- `snap-force` — Für "lockende" Sections (Hero, Welcome?)
- `snap-none` — Falls irgendwo kein Snap gewünscht

### Step 2: index.css — Scroll Container

```css
/* Scroll Snap Container */
html {
  scroll-snap-type: y proximity; /* oder y mandatory */
  scroll-behavior: smooth;
}

/* Sections rasten am oberen Rand ein */
section {
  scroll-snap-align: start;
  scroll-snap-stop: normal;
}
```

**Proximity vs Mandatory:**
- `y proximity` — Snappt nur wenn Section "nah dran" ist (weniger aggressiv)
- `y mandatory` — IMMER zur nächsten Section (aggressiver)

**Empfehlung:** Start mit `proximity`, kann auf `mandatory` geändert werden.

### Step 3: SectionWrapper bekommt snap-section

```jsx
// SectionWrapper.jsx
<section
  id={id}
  className={`py-16 md:py-20 snap-section ${dark ? 'bg-color-primary text-white' : ''} ${className}`}
  {...rest}
>
```

### Step 4: PodcastVideoSection Heading korrigieren

```jsx
// Von:
<DebugLabel type="typography-hero-large" debugMode={debugMode}>
  <h2 className="typography-hero-large leading-tight">
    {podcast.headline}
  </h2>
</DebugLabel>

// Zu:
<DebugLabel type="typography-hero" debugMode={debugMode}>
  <h2 className="typography-hero leading-tight">
    {podcast.headline}
  </h2>
</DebugLabel>
```

---

## Lange Read Sections — Klassifizierung

| Section | Typ | Snap-Verhalten |
|---------|-----|----------------|
| Hero | kurz | `snap-section` (default) |
| Welcome | mittel | `snap-section` (default) |
| WhatIs | **lange Read** | `snap-section` mit `normal` |
| ForWhom | **lange Read** | `snap-section` mit `normal` |
| Researchers | **lange Read + Accordion** | `snap-section` + Accordion-Handling |
| Researcher Quotes | **lange Read** | `snap-section` mit `normal` |
| PodcastVideo | kurz | `snap-section` (default) |
| Podcast | kurz | `snap-section` (default) |
| CaseStudies | **lange Read + Accordion** | `snap-section` + Accordion-Handling |
| FAQ | **lange Read + Accordion** | `snap-section` + Accordion-Handling |
| References | **lange Read** | `snap-section` mit `normal` |
| About | **lange Read** | `snap-section` mit `normal` |
| Booking | kurz | `snap-section` (default) |
| Services | kurz | `snap-section` (default) |
| Process | **lange Read** | `snap-section` mit `normal` |
| Statement | **lange Read** | `snap-section` mit `normal` |

**Alle** bekommen `snap-section` mit `scroll-snap-stop: normal` — das bedeutet:
- Langsames Scroll → Snappt zur nächsten Section
- Schnelles Scroll/Swipe → User kann "durchbrechen" und weiterlesen

---

## Konflikt: Accordion-Scroll vs Snap-Snap

Problem: Wenn Accordion aufgeht, ändert sich die Höhe. Snap könnte User "zurückziehen".

**Lösung:** Keine Änderung nötig mit `scroll-snap-stop: normal` — das ist sanft genug.

Wenn Probleme auftreten, können wir in `useAccordionScroll` temporär deaktivieren:

```javascript
// useAccordionScroll.js — Optionaler Fix
export function useAccordionScroll(openId, setOpenId) {
  const toggleExpand = (id) => {
    const wasClosed = openId !== id

    if (wasClosed) {
      // Optional: Snap während Animation deaktivieren
      document.documentElement.style.scrollSnapType = 'none'
    }

    setOpenId(id)

    if (wasClosed) {
      setTimeout(() => {
        // Scroll to position
        window.scrollTo({ top: calculatedPosition, behavior: 'smooth' })

        // Snap reaktivieren nach Scroll + Puffer
        setTimeout(() => {
          document.documentElement.style.scrollSnapType = ''
        }, 800)
      }, 500)
    }
  }
  // ...
}
```

**Erst ohne implementieren** — nur wenn nötig!

---

## Deployment & Testing

### Test-Cases:

1. **Normaler Scroll** — Langsam scrollen → sollte snappen
2. **Schneller Swipe** — Schnell scrollen → sollte durchbrechen können
3. **Lange Read (About)** — Lesen können ohne "gefangen" zu sein
4. **Accordion öffnen** — Researchers/FAQ/CaseStudies — Scroll sollte korrekt bleiben
5. **Hero Video-Ende** — `scrollPresets.normal('#welcome')` sollte funktionieren
6. **Mobile** — Sections sind länger, Snap sollte nicht frustrierend sein

### Rollback-Plan:

Wenn Snap nicht funktioniert → `scroll-snap-type: none` in index.css setzen.

---

## Execution Order

1. ✅ Utilities in tailwind.config.css hinzufügen
2. ✅ index.css Scroll-Container setup
3. ✅ SectionWrapper bekommt `snap-section`
4. ✅ PodcastVideoSection heading korrigieren
5. ✅ Build & testen
6. ✅ Wenn nötig: Accordion-Scroll Fix implementieren

---

## Notes

- Dieser Plan verwendet **Ansatz A (CSS-Only)**
- `scroll-snap-stop: normal` erlaubt User das "Durchbrechen" bei schnellem Scroll
- `scroll-snap-type: y proximity` ist weniger aggressiv als `mandatory`
- Accordion-Konflikt wird erst bei Bedarf adressiert

---

**Awaiting user review before implementation.**
