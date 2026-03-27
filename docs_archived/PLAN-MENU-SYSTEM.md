# Plan: Navigations-System Redesign

## Status: Planungsphase
**Erstellt:** 2026-03-05
**Ziel:** Vollständiges Redesign der Navigation mit eigenständiger Menü-Konfiguration

---

## Problemstellung

### Aktuelle Probleme
1. **Hardcodierte Navigation** — Menüpunkte sind in `plr-de.js` `header.nav` hardcodet
2. **Keine Spiegelung der Sections** — Sections aus `sections.config.js` werden nicht im Menü abgebildet
3. **Menü Überlauf** — Desktop-Menü hat zu viele Items in einer Zeile
4. **Keine Hierarchie** — Flaches Menü ohne Unterpunkte
5. **Verstreute Dateien** — Menä-Definition in `content/`, Header/Footer in `components/`

### Aktuelles Menü (unvollständig)
```javascript
// frontend/src/content/plr-de.js
header: {
  nav: [
    { label: "Regression", anchor: "#was-ist" },
    { label: "Für wen?", anchor: "#fuer-wen" },
    { label: "Science", anchor: "#science" },
    { label: "Über Benjamin", anchor: "#ueber" },
    { label: "Ablauf", anchor: "#prozess" },
    { label: "Erfahrungen", anchor: "#cases" },
  ],
  cta: "Intro Call",
}
```

### Fehlende Menüpunkte
- Welcome (#welcome)
- Statement (#statement)
- Podcast Video (#podcast-video)
- Podcast Audio (#podcast)
- FAQ (#faq)
- References/Literatur (#references)

---

## Sections Mapping

| Section | ID | Label (DE) | Label (EN) |
|---------|-----|-----------|-----------|
| HeroV3Section | `hero` | Start | Home |
| ServicesSection | `services` | Angebote | Services |
| WelcomeSection | `welcome` | Willkommen | Welcome |
| ResearcherQuotesSection | `evidence-quotes` | Forscherzitate | Researcher Quotes |
| StatementSection | `statement` | Statement | Statement |
| WhatIsSection | `was-ist` | Was ist Regression? | What is Regression? |
| ResearchersSection | `science` | Science | Science |
| PodcastVideoSection | `podcast-video` | Podcast Video | Podcast Video |
| ForWhomSection | `fuer-wen` | Für wen? | For Whom? |
| AboutSection | `ueber` | Über Benjamin | About Benjamin |
| ProcessSection | `prozess` | Prozess | Process |
| PodcastSection | `podcast` | Podcast Audio | Podcast Audio |
| CaseStudiesSection | `cases` | Fallbeispiele | Case Studies |
| TestimonialCarousel | - | Erfahrungen | Testimonials |
| BookingSection | `booking` | Buchung | Booking |
| FAQSection | `faq` | FAQ | FAQ |
| ReferencesSection | `references` | Literatur | References |

---

## Lösungsvorschläge (4 Varianten)

### Variante 1: Vollflächiger Burger (Empfohlen)

**Konzept:**
- Desktop & Mobile: Nur Logo + Burger-Icon im Header
- Bei Klick: Vollflächiges Overlay mit dunkelblauem Hintergrund
- Hierarchische Navigation mit Hauptkategorien + Unterpunkten
- Stil: Groß, reduziert, elegant

**Hauptkategorien:**
1. **Regression** → `#was-ist`
2. **Science** →
   - Forscher → `#evidence-quotes`
   - Autoren → `#science`
   - Literatur → `#references`
3. **Podcast** →
   - Video → `#podcast-video`
   - Audio → `#podcast`
4. **Erfahrungen** →
   - Fallbeispiele → `#cases`
   - Klienten → `#testimonials`
5. **Über** →
   - Benjamin → `#ueber`
   - Prozess → `#prozess`
   - Für wen? → `#fuer-wen`
6. **FAQ** → `#faq`

**Design-Spezifikationen:**
- Hintergrund: `bg-brand-deep` (dunkelblau)
- Text: `text-white`
- Hauptkategorien: `font-serif text-3xl md:text-5xl`
- Unterpunkte: `font-sans text-lg md:text-xl text-white/60`
- Hover: `text-brand-green` oder Unterstreichung
- Animation: Fade-in + Slide-in von oben

**Vorteile:**
- + Skaliert beliebig viele Punkte
- + Sehr mobilfreundlich
- + Reduziert kognitive Last
- + Elegantes, modernes Design

**Nachteile:**
- - Ein Klick mehr notwendig
- - UX-Gewöhnung erforderlich

---

### Variante 2: Hybrid (Desktop Inline + Mobile Nested)

**Konzept:**
- Desktop: 4-5 Hauptpunkte inline, Rest im Burger
- Mobile: Vollflächiger Burger mit Unterpunkten
- Klick auf Hauptpunkt → Dropdown oder Accordion

**Desktop Inline Punkte:**
1. Regression → `#was-ist`
2. Science → [Dropdown]
3. Erfahrungen → `#cases`
4. Über → [Dropdown]
5. [Burger für den Rest]

**Mobile Vollbild:**
- Gleiche Struktur wie Variante 1

**Vorteile:**
- + Schneller Zugang zu wichtigsten Punkten
- + Vertraute Desktop-UX

**Nachteile:**
- - Immernoch Überlauf bei Desktop
- - Komplexere State-Logic

---

### Variante 3: Vollständig Nested (Mega Menu)

**Konzept:**
- Desktop: Hover auf Kategorie → Mega Menu Dropdown
- Mobile: Accordion mit expandierbaren Unterpunkten

**Hauptkategorien im Header:**
1. **Regression**
2. **Science** (3 Unterpunkte)
3. **Erfahrungen** (2 Unterpunkte)
4. **Über** (3 Unterpunkte)
5. **Podcast** (2 Unterpunkte)
6. **FAQ**

**Mega Menu Design:**
- Vollbreite Dropdown-Box
- Spaltenlayout für Unterpunkte
- Rich Content (Icons, Beschreibungen möglich)

**Vorteile:**
- + Sehr informativ
- + Industry Standard für komplexe Sites

**Nachteile:**
- - Überengineering für diese Seite
- - Schwierig zu pflegen

---

### Variante 4: Slim Nav + Anchor Strip

**Konzept:**
- Header: Nur Logo + CTA (Intro Call)
- Scroll-Indicator: Vertikale oder horizontale Anchor-Leiste
- Bei Scroll: Aktiver Section wird hervorgehoben

**Anchor Strip (horizontal):**
```
│ ● Regression ● Science ● Erfahrungen ● FAQ │
```

**Anchor Strip (vertikal, rechts fixiert):**
```
        ┆
      ○ Regression
      ● Science  (aktiv)
      ○ Erfahrungen
        ┆
```

**Vorteile:**
- + Minimalistisch
- + Scroll-Progress sichtbar

**Nachteile:**
- - Weniger offensichtlich für Nicht-Techniker
- - Mobile Platzproblem

---

## Architektur-Entwurf

### Dateistruktur

```
frontend/src/
├── content/
│   ├── menu.js              ← NEU: Zentrale Menü-Konfiguration
│   ├── menu.de.js           ← FÜR SPÄTER: Deutsch-Sprache
│   ├── menu.en.js           ← FÜR SPÄTER: Englisch-Sprache
│   └── plr-de.js            ← EXISTIERT: Header nav wird entfernt
├── config/
│   └── sections.config.js   ← EXISTIERT: Sections-Order
├── components/
│   ├── Header.jsx           ← REFACTOR: Nutzt menu.js
│   ├── Footer.jsx           ← REFACTOR: Nutzt menu.js
│   └── navigation/
│       ├── FullScreenMenu.jsx      ← NEU: Variante 1
│       ├── HybridMenu.jsx          ← NEU: Variante 2
│       ├── MegaMenu.jsx            ← NEU: Variante 3
│       └── AnchorStrip.jsx         ← NEU: Variante 4
```

### menu.js Struktur

```javascript
// frontend/src/content/menu.js
export const menu = {
  // Header-Konfiguration
  header: {
    logo: {
      src: "...",
      alt: "Benjamin Kurtz Academy"
    },
    cta: {
      label: "Intro Call",
      anchor: "#booking"
    },
    // Variante-Auswahl
    variant: "fullscreen", // | "hybrid" | "mega" | "anchor"
  },

  // Menü-Struktur (nested)
  items: [
    {
      id: "regression",
      label: "Regression",
      anchor: "#was-ist",
      order: 10,
    },
    {
      id: "science",
      label: "Science",
      order: 20,
      children: [
        {
          id: "science-quotes",
          label: "Forscherzitate",
          anchor: "#evidence-quotes",
          order: 21,
        },
        {
          id: "science-authors",
          label: "Autoren",
          anchor: "#science",
          order: 22,
        },
        {
          id: "science-references",
          label: "Literatur",
          anchor: "#references",
          order: 23,
        },
      ],
    },
    {
      id: "podcast",
      label: "Podcast",
      order: 30,
      children: [
        {
          id: "podcast-video",
          label: "Video-Gespräch",
          anchor: "#podcast-video",
          order: 31,
        },
        {
          id: "podcast-audio",
          label: "Audio",
          anchor: "#podcast",
          order: 32,
        },
      ],
    },
    {
      id: "experiences",
      label: "Erfahrungen",
      order: 40,
      children: [
        {
          id: "experiences-cases",
          label: "Fallbeispiele",
          anchor: "#cases",
          order: 41,
        },
        {
          id: "experiences-testimonials",
          label: "Klientenstimmen",
          anchor: "#testimonials",
          order: 42,
        },
      ],
    },
    {
      id: "about",
      label: "Über",
      order: 50,
      children: [
        {
          id: "about-benjamin",
          label: "Benjamin Kurtz",
          anchor: "#ueber",
          order: 51,
        },
        {
          id: "about-process",
          label: "Prozess",
          anchor: "#prozess",
          order: 52,
        },
        {
          id: "about-forwhom",
          label: "Für wen?",
          anchor: "#fuer-wen",
          order: 53,
        },
      ],
    },
    {
      id: "faq",
      label: "FAQ",
      anchor: "#faq",
      order: 60,
    },
  ],

  // Footer-spezifische Menüpunkte
  footer: {
    // Gleich wie Header, aber flach (keine children)
    items: [
      { label: "Regression", anchor: "#was-ist" },
      { label: "Science", anchor: "#science" },
      { label: "Für wen?", anchor: "#fuer-wen" },
      { label: "Über Benjamin", anchor: "#ueber" },
      { label: "Ablauf", anchor: "#prozess" },
      { label: "Erfahrungen", anchor: "#cases" },
      { label: "FAQ", anchor: "#faq" },
      { label: "Literatur", anchor: "#references" },
    ],
  },

  // Social Links (Footer)
  social: [
    { label: "Spotify", url: "..." },
    { label: "Apple Podcasts", url: "..." },
    { label: "YouTube", url: "..." },
  ],

  // Legal Links (Footer)
  legal: [
    { label: "Terms", url: "..." },
    { label: "Privacy", url: "..." },
    { label: "Imprint", url: "..." },
  ],
};
```

### Automatische Synchronisation mit sections.config.js

**Option A: Manuelles Mapping**
- `sections.config.js` definiert Reihenfolge
- `menu.js` definiert Label und Hierarchie
- Beide Dateien werden manuell gepflegt

**Option B: Generiert aus sections.config.js**
- `menu.js` wird aus `sections.config.js` + Metadaten generiert
- Build-Skript oder Helper-Funktion
- Vorteil: Single Source of Truth
- Nachteil: Weniger flexibel bei Hierarchien

**Empfehlung:** Option A (manuelles Mapping) für mehr Flexibilität

---

## Implementierungsplan

### Phase 1: menu.js erstellen (30 Min)
- [ ] `frontend/src/content/menu.js` erstellen
- [ ] Menu-Struktur definieren (nested items)
- [ ] Alle 17 Sections mappen
- [ ] Footer-Items extrahieren

### Phase 2: FullScreenMenu Component (2 Std)
- [ ] `FullScreenMenu.jsx` erstellen
- [ ] Vollflächiges Overlay mit Animation
- [ ] Nested Navigation mit Accordion
- [ ] Hover/Click States
- [ ] Responsive (Desktop + Mobile)

### Phase 3: Header Refactor (1 Std)
- [ ] `Header.jsx` für `menu.js` refactorn
- [ ] `menu.variant` auslesen
- [ ] Burger-Button Overlay toggle
- [ ] CTA-Button aus `menu.header.cta`

### Phase 4: Footer Refactor (30 Min)
- [ ] `Footer.jsx` für `menu.js` refactorn
- [ ] `menu.footer.items` nutzen
- [ ] Social + Legal aus `menu`

### Phase 5: Alternative Varianten (Optional)
- [ ] HybridMenu Component (falls gewünscht)
- [ ] MegaMenu Component (falls gewünscht)
- [ ] AnchorStrip Component (falls gewünscht)

### Phase 6: Testing & Deploy
- [ ] Alle Menüpunkte testen
- [ ] Mobile + Desktop
- [ ] Build lokal
- [ ] Deploy zu Cloudflare

---

## Zusammenfassung: Was erstellt werden soll

### 1. Neue Datei: `frontend/src/content/menu.js`
- Zentrale Menü-Konfiguration
- Nested Struktur (Hauptkategorien + Unterpunkte)
- Section-to-Anchor Mapping
- Footer-Items, Social, Legal

### 2. Neue Component: `frontend/src/components/navigation/FullScreenMenu.jsx`
- Vollflächiges Burger Menu Overlay
- Dunkelblauer Hintergrund (`bg-brand-deep`)
- Weiße Schrift (`text-white`)
- Hauptkategorien groß (`font-serif text-3xl+`)
- Unterpunkte eingerückt (`text-white/60`)
- Animation: Fade-in + Slide-in
- Click → Smooth Scroll → Menu Close

### 3. Refactor: `frontend/src/components/Header.jsx`
- Import von `menu` statt `header`
- Burger-Button Icon (Menu / X)
- Overlay Toggle State
- `menu.header.variant` für Switch zwischen Varianten

### 4. Refactor: `frontend/src/components/Footer.jsx`
- Import von `menu` statt `footer`
- `menu.footer.items` für horizontale Nav
- Social + Legal aus `menu`

### 5. Optional: Varianten
- `HybridMenu.jsx` — Desktop Inline + Mobile Vollbild
- `MegaMenu.jsx` — Hover Dropdown mit Rich Content
- `AnchorStrip.jsx` — Scroll-Progress Indicator

---

## Nächste Schritte

1. **Entscheidung:** Welche Variante soll implementiert werden?
   - Empfehlung: Variante 1 (Vollflächiger Burger)
   - Grund: Skaliert am besten, modernste UX

2. **Architektur-Review:** Subagent prüft Struktur
   - `frontend-developer` für Component-Design
   - `senior-architect-innovator` für Data-Flow

3. **Design-Review:** Subagent für UX/UI
   - `silicon-valley-creative-director` für Visual Design

4. **Implementation:** Claude implementiert
   - menu.js erstellen
   - FullScreenMenu Component
   - Header/Footer Refactor

5. **Testing & Deploy**
   - Lokal testen
   - Build verifizieren
   - Deploy zu Cloudflare

---

## Offene Fragen

1. **Variante-Auswahl:** Welche der 4 Varianten soll umgesetzt werden?
2. **i18n-Timing:** Soll `menu.de.js` / `menu.en.js` jetzt oder später erstellt werden?
3. **Auto-Sync:** Soll `menu.js` aus `sections.config.js` generiert werden?
4. **Animation:** Welche Animation für Overlay-Open/Close?
5. **Accessibility:** ARIA-Labels für Screen-Reader?

---

**Bitte um Feedback zu diesem Plan, bevor mit der Implementation begonnen wird.**
