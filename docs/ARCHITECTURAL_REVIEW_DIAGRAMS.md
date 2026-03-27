# Architecture Review: Visual Diagrams

**Component Import Patterns & Data Flow**

---

## CURRENT ARCHITECTURE: Tight Coupling

### Component Import Pattern
```
┌─────────────────────────────────────────────────────────────┐
│  Component: ServicesSectionCopy.jsx                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  import { services } from '../../content/plr-de'  ❌        │
│                                                              │
│  export default function ServicesSectionCopy() {            │
│    return (                                                  │
│      <section>                                               │
│        {services.items.map((service) => (                   │
│          <span>{service.sub}</span>  // German text only    │
│        ))}                                                   │
│      </section>                                             │
│    )                                                        │
│  }                                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Content: plr-de.js (677 lines)                              │
├─────────────────────────────────────────────────────────────┤
│  export const services = {                                   │
│    items: [                                                  │
│      {                                                       │
│        label: "Seelenrückführung",  // German               │
│        sub: "Past Life Regression"    // English subtitle   │
│      },                                                      │
│      {                                                       │
│        label: "Hypnose",                                     │
│        sub: "Tiefenentspannung & Trancezustand"             │
│      },                                                      │
│      {                                                       │
│        label: "Energiearbeit",                               │
│        sub: "Spirituelle Integration"                        │
│      }                                                       │
│    ]                                                         │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘

PROBLEM:
❌ Component hard-coded to German content
❌ Cannot switch to English without changing component code
❌ All 47 components have this pattern
```

### Data Flow (Current)
```
User Request (German)
       │
       ▼
┌──────────────────┐
│  Browser         │
│  URL: /          │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  App.js          │
│  <MainPage />    │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  ServicesSectionCopy.jsx             │
│  import { services } from './plr-de' │
│  ❌ NO WAY TO SWITCH LANGUAGE        │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────┐
│  German Content  │
│  "Seelenrück..." │
└──────────────────┘

RESULT:
✅ Works for German
❌ Cannot add English without changing 47 components
```

---

## PROPOSED ARCHITECTURE: Loose Coupling

### Component Import Pattern
```
┌─────────────────────────────────────────────────────────────┐
│  Component: ServicesSectionCopy.jsx                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  import { useContent } from '../../hooks/useContent'  ✅     │
│                                                              │
│  export default function ServicesSectionCopy() {            │
│    const { content } = useContent()  // Dynamic content!    │
│    return (                                                  │
│      <section>                                               │
│        {content.services.items.map((service) => (           │
│          <span>{service.sub}</span>  // German OR English   │
│        ))}                                                   │
│      </section>                                             │
│    )                                                        │
│  }                                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Hook: useContent()                                          │
├─────────────────────────────────────────────────────────────┤
│  import { useContext } from 'react'                          │
│  import { ContentContext } from '../contexts/ContentContext'│
│                                                              │
│  export function useContent() {                              │
│    const { locale, content } = useContext(ContentContext)    │
│    return { locale, content }  // Returns current locale    │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Context: ContentContext                                     │
├─────────────────────────────────────────────────────────────┤
│  <ContentProvider>                                           │
│    - locale: 'de' | 'en'                                     │
│    - setLocale(locale)                                       │
│    - content: { de: {...}, en: {...} }                       │
│  </ContentProvider>                                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Content: locales/de/index.js                                 │
├─────────────────────────────────────────────────────────────┤
│  export const services = {                                   │
│    items: [                                                  │
│      { label: "Seelenrückführung", sub: "..." }             │
│    ]                                                         │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Content: locales/en/index.js                                 │
├─────────────────────────────────────────────────────────────┤
│  export const services = {                                   │
│    items: [                                                  │
│      { label: "Past Life Regression", sub: "..." }          │
│    ]                                                         │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘

BENEFIT:
✅ Component code doesn't change when adding English
✅ Content switches automatically based on locale
✅ Only 1 component changes (App.js with ContentProvider)
```

### Data Flow (Proposed)
```
User Request (German)
       │
       ▼
┌──────────────────┐
│  Browser         │
│  URL: /de/services│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  App.js          │
│  <ContentProvider│
│   locale="de">   │  ✅ Locale from URL
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  ServicesSectionCopy.jsx             │
│  const { content } = useContent()    │
│  ✅ Returns German content           │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────┐
│  German Content  │
│  "Seelenrück..." │
└──────────────────┘


User Request (English)
       │
       ▼
┌──────────────────┐
│  Browser         │
│  URL: /en/services│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  App.js          │
│  <ContentProvider│
│   locale="en">   │  ✅ Locale from URL
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  ServicesSectionCopy.jsx             │
│  const { content } = useContent()    │
│  ✅ Returns English content          │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────┐
│  English Content │
│  "Past Life..."  │
└──────────────────┘

RESULT:
✅ Works for German AND English
✅ Component code unchanged
✅ Only content files added
```

---

## TYPOGRAPHY TOKEN COMPARISON

### Current: Single Tokens (German-Optimized)
```
┌─────────────────────────────────────────────────────────────┐
│  tailwind.config.js                                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  fontSize: {                                                 │
│    'h1': ['3rem', { lineHeight: '1.1' }],                   │
│    'h2': ['2.25rem', { lineHeight: '1.2' }],                │
│    'body': ['1.125rem', { lineHeight: '1.75' }],            │
│  }                                                           │
│                                                              │
│  maxWidth: {                                                 │
│    'content': '72rem',  // Optimized for German              │
│  }                                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  German Text                                                 │
├─────────────────────────────────────────────────────────────┤
│  "Seelenrückführung · Hypnose · Energiearbeit —             │
│   online und im Präsenz bei dir."                            │
│                                                              │
│  Length: ~75 characters                                      │
│  Width:  Fills 72rem nicely ✅                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  English Text (Same Token)                                   │
├─────────────────────────────────────────────────────────────┤
│  "Past Life Regression · Hypnosis · Energy Work —           │
│   online and in-person."                                     │
│                                                              │
│  Length: ~50 characters (35% shorter!)                       │
│  Width:  Too much whitespace ❌                              │
└─────────────────────────────────────────────────────────────┘

PROBLEM:
❌ English text feels "loose" with German-optimized tokens
❌ Inconsistent visual weight across languages
```

### Proposed: Language-Aware Tokens
```
┌─────────────────────────────────────────────────────────────┐
│  tailwind.config.js                                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  fontSize: {                                                 │
│    // German-optimized                                       │
│    'h1': ['3rem', { lineHeight: '1.1' }],                   │
│    'body': ['1.125rem', { lineHeight: '1.75' }],            │
│                                                              │
│    // English-optimized                                      │
│    'h1-en': ['2.75rem', { lineHeight: '1.15' }],            │
│    'body-en': ['1.125rem', { lineHeight: '1.65' }],         │
│  }                                                           │
│                                                              │
│  maxWidth: {                                                 │
│    'content-de': '72rem',   // German needs wider           │
│    'content-en': '64rem',   // English can be narrower      │
│  }                                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┴─────────────────┐
            ▼                                   ▼
┌─────────────────────────────────┐  ┌─────────────────────────────────┐
│  German Text                    │  │  English Text                    │
├─────────────────────────────────┤  ├─────────────────────────────────┤
│  className="text-h1             │  │  className="text-h1-en"          │
│              max-w-content-de"   │  │              max-w-content-en"   │
│                                 │  │                                 │
│  "Seelenrückführung..."         │  │  "Past Life Regression..."       │
│                                 │  │                                 │
│  ✅ Optimal visual weight       │  │  ✅ Optimal visual weight        │
└─────────────────────────────────┘  └─────────────────────────────────┘

BENEFIT:
✅ Consistent visual weight across languages
✅ Optimal typography for each language
✅ No layout breaks or excessive whitespace
```

---

## COMPONENT REFACTORING COMPARISON

### Current: 47 Components to Change
```
┌─────────────────────────────────────────────────────────────┐
│  Adding English = Re-migrating ALL sections                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  HeroV3Section.jsx          ❌ Change import                 │
│  ServicesSection.jsx         ❌ Change import                 │
│  WelcomeSection.jsx          ❌ Change import                 │
│  WhatIsSection.jsx           ❌ Change import                 │
│  AboutSection.jsx            ❌ Change import                 │
│  ProcessSection.jsx          ❌ Change import                 │
│  CaseStudiesSection.jsx      ❌ Change import                 │
│  TestimonialsSection.jsx     ❌ Change import                 │
│  FAQSection.jsx              ❌ Change import                 │
│  ... + 38 more sections      ❌ Change import                 │
│                                                              │
│  Total: 47 component files to change                        │
│  Time: 16-24 hours                                        │
│  Risk: High (regressions, bugs)                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Proposed: Only 1 File to Change
```
┌─────────────────────────────────────────────────────────────┐
│  Adding English = Add content files only!                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Step 1: Create English content                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │  locales/en/                                        │     │
│  │  ├─ index.js      ✅ ADD (export all content)       │     │
│  │  ├─ hero.js       ✅ ADD (English hero content)     │     │
│  │  ├─ services.js   ✅ ADD (English services content) │     │
│  │  └─ ...                                        │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Step 2: Update App.js (1 file)                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │  App.js                                             │     │
│  │  ✅ ADD <ContentProvider> wrapper                  │     │
│  │  ✅ ADD locale routing (/de/*, /en/*)              │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Step 3: Components (unchanged!)                            │
│  ┌────────────────────────────────────────────────────┐     │
│  │  HeroV3Section.jsx          ✅ NO CHANGE             │     │
│  │  ServicesSection.jsx         ✅ NO CHANGE             │     │
│  │  WelcomeSection.jsx          ✅ NO CHANGE             │     │
│  │  ... + 44 more               ✅ NO CHANGE             │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Total: 1 file to change (App.js) + add content             │
│  Time: 4-6 hours                                           │
│  Risk: Low (isolated change)                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## MIGRATION EFFORT COMPARISON

### Approach 1: Current Architecture (Re-migration)
```
┌─────────────────────────────────────────────────────────────┐
│  Timeline: Adding English to Current Architecture           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Week 1: Create English Content                             │
│  ├─ Translate plr-de.js → plr-en.js (677 lines)   16-24h   │
│  └─ Review translations                                   │
│                                                              │
│  Week 2-3: Update All Components                            │
│  ├─ Change imports in 47 components                16-24h   │
│  ├─ Test each component with English content             │
│  └─ Fix bugs, regressions                                 │
│                                                              │
│  Week 3-4: Re-migrate Typography                            │
│  ├─ Audit tokens for English suitability           8-12h    │
│  ├─ Create English-specific tokens (h1-en, etc.)   12-16h   │
│  ├─ Update 17 migrated sections with new tokens    16-20h   │
│  └─ Test both languages across all breakpoints            │
│                                                              │
│  Week 4: Add Locale Routing                                 │
│  ├─ Implement locale detection                    4-6h     │
│  ├─ Add language switcher UI                        4-6h     │
│  └─ Test routing, URL changes                            │
│                                                              │
│  TOTAL: 80-112 hours (3-4 weeks)                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Approach 2: Zero-Re Migration (Recommended)
```
┌─────────────────────────────────────────────────────────────┐
│  Timeline: Adding English with Zero-Re Migration            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Week 1: Content Abstraction Layer                          │
│  ├─ Create ContentProvider, useContent hook        8-12h   │
│  ├─ Update App.js with provider wrapper                   │
│  └─ Test with existing German content (no regressions)     │
│                                                              │
│  Week 1-2: Component Refactoring (Batches)                  │
│  ├─ Update 2-3 components per day                  6-8h     │
│  └─ Test each batch with German content                   │
│                                                              │
│  Week 2: Language-Aware Typography                          │
│  ├─ Add English-specific tokens                     12-16h   │
│  ├─ Test with sample English text                         │
│  └─ Adjust tokens based on visual review                   │
│                                                              │
│  Week 2-3: English Content                                  │
│  ├─ Translate content to English                   16-24h   │
│  ├─ Create locales/en/ directory structure                │
│  └─ Review translations                                   │
│                                                              │
│  Week 3: Locale Routing & Switcher                          │
│  ├─ Add locale routing to App.js                    4-6h     │
│  ├─ Create LanguageSwitcher component                     │
│  └─ Test routing, URL changes                              │
│                                                              │
│  Week 3: Testing & Polish                                   │
│  ├─ Manual visual testing                         8-12h    │
│  ├─ Automated screenshots (optional)                      │
│  └─ Performance optimization                              │
│                                                              │
│  TOTAL: 54-78 hours (1-2 weeks)                             │
│  SAVINGS: 26-34 hours (42% reduction)                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## ARCHITECTURAL DECISION TREE

```
Should we fix the architecture NOW or LATER?
                    │
        ┌───────────┴───────────┐
        │                       │
    Fix NOW                Fix LATER
        │                       │
        │                       │
    ┌───┴────┐            ┌────┴───┐
    │        │            │        │
  Cost    Benefit      Cost    Benefit
    │        │            │        │
  $4-6k   ✅ Saves     $0      ❌ Costs
 (46-78h)  26-34h             $8-12k
           (42%)               (80-112h)

        │                       │
    ┌───┴────┐            ┌────┴───┐
    │        │            │        │
  Pros     Cons         Pros     Cons
    │        │            │        │
✅ Easy  ⏳ Takes  ✅ Free  ❌ Re-do
to add   1-2 weeks   right  everything
more           now          later
langs
✅ Less
tech
debt
✅ Future
-proof

RECOMMENDATION: Fix NOW (Zero-Re Migration)
```

---

**Document Purpose:** Visual diagrams to accompany architectural review
**Last Updated:** 2026-03-27
**Related Documents:**
- `docs/ARCHITECTURAL_REVIEW_I18N_MULTI_SITE.md` (Full report)
- `docs/ARCHITECTURAL_REVIEW_SUMMARY.md` (Executive summary)
