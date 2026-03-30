# Color Token Usage Matrix

**Last Updated:** 2026-03-28

---

## Token × Section Matrix

| Token | Hero | Serv | Wel | ResQ | Stat | What | Res | ForW | Abt | Pro | Pod | Case | Test | Book | FAQ | Ref | PodV | **Total** |
|-------|------|------|-----|------|------|------|-----|------|-----|-----|-----|------|------|------|-----|-----|------|----------|
| `color-heading` | ✅ | ✅ | ✅ | | ✅ | ✅ | | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | | ✅ | **13** |
| `color-body` | | | | | | ✅ | | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | | | ✅ | **9** |
| `color-label` | | | | | | | | | | | | | ✅ | ✅ | ✅ | | ✅ | **5** |
| `color-accent` | | | | | | ✅ | | | | | | | | | | | | **1** |
| `color-bg-light` | | | | | | | | | | | ✅ | | | ✅ | ✅ | | ✅ | **4** |
| `color-bg-dark` | | | | ✅ | | | ✅ | | | | | | | | | | ✅ | ✅ | **4** |
| `color-border` | | | | | ✅ | | | | ✅ | | | ✅ | | ✅ | ✅ | | ✅ | **6** |
| `color-card-overlay` | | | | | | | | | | | | | | ✅ | | | ✅ | **2** |
| `on-dark-heading` | | | | ✅ | | | ✅ | | | | | | | | | | ✅ | ✅ | **4** |
| `on-dark-body` | | | | | | | ✅ | | | | | | | | | | ✅ | | **2** |
| `on-dark-label` | | | | ✅ | | | ✅ | | | | | | | | | | ✅ | ✅ | **4** |
| `on-dark-role` | | | | | | | ✅ | | | | | | | | | | ✅ | | **2** |
| `on-dark-divider` | | | | ✅ | | | ✅ | | | | | | | | | | ✅ | | **3** |
| `on-dark-quote` | | | | ✅ | | | ✅ | | | | | | | | | | | | **2** |

**Legend:**
- Hero = HeroV3Section
- Serv = ServicesSectionCopy
- Wel = WelcomeSectionCopy
- ResQ = ResearcherQuotesSectionCopy
- Stat = StatementSectionCopy
- What = WhatIsSectionCopy
- Res = ResearchersSectionCopy
- ForW = ForWhomSectionCopy
- Abt = AboutSectionCopy
- Pro = ProcessSectionCopy
- Pod = PodcastSectionCopy
- Case = CaseStudiesSectionCopy
- Test = TestimonialsSectionCopy
- Book = BookingSectionCopy
- FAQ = FAQSectionCopy
- Ref = ReferencesSectionCopy
- PodV = PodcastVideoSectionCopy

---

## Token Category Breakdown

### Light Background Tokens (9 tokens)
```
color-heading       → 13 sections
color-body          → 9 sections
color-label         → 5 sections
color-accent        → 1 section
color-bg-light      → 4 sections
color-border        → 6 sections
color-card-overlay  → 2 sections
```

### Dark Background Tokens (7 tokens)
```
on-dark-heading     → 4 sections
on-dark-body        → 2 sections
on-dark-label       → 4 sections
on-dark-role        → 2 sections
on-dark-divider     → 3 sections
on-dark-quote       → 2 sections
color-bg-dark       → 4 sections
```

---

## Section Complexity Ranking

| Rank | Section | Light Tokens | Dark Tokens | Total | Complexity |
|------|---------|--------------|-------------|-------|------------|
| 1 | PodcastVideoSectionCopy | 11 | 1 | 12 | High |
| 2 | ResearchersSectionCopy | 0 | 9 | 9 | High |
| 3 | ReferencesSectionCopy | 0 | 9 | 9 | High |
| 4 | BookingSectionCopy | 8 | 1 | 9 | Medium |
| 5 | CaseStudiesSectionCopy | 8 | 0 | 8 | Medium |
| 6 | ResearcherQuotesSectionCopy | 0 | 6 | 6 | Medium |
| 7 | AboutSectionCopy | 5 | 0 | 5 | Low |
| 8 | PodcastSectionCopy | 5 | 0 | 5 | Low |
| 9 | TestimonialsSectionCopy | 4 | 0 | 4 | Low |
| 10 | FAQSectionCopy | 4 | 0 | 4 | Low |
| 11 | ProcessSectionCopy | 3 | 0 | 3 | Low |
| 12 | HeroV3Section | 3 | 0 | 3 | Low |
| 13 | WhatIsSectionCopy | 3 | 0 | 3 | Low |
| 14 | StatementSectionCopy | 2 | 0 | 2 | Minimal |
| 15 | ServicesSectionCopy | 2 | 0 | 2 | Minimal |
| 16 | ForWhomSectionCopy | 2 | 0 | 2 | Minimal |
| 17 | WelcomeSectionCopy | 1 | 0 | 1 | Minimal |

---

## Token Co-occurrence Patterns

### Most Common Token Combinations

| Pattern | Sections | Context |
|---------|----------|---------|
| `color-heading` + `color-body` | 9 | Standard content sections |
| `on-dark-heading` + `on-dark-label` | 4 | Dark background sections |
| `color-border` + `color-heading` | 6 | Sections with borders |
| `color-bg-light` + `color-heading` | 4 | Light background sections |

---

## Unused Token Analysis

### Defined but Not Used
```
color-bg-medium  → 0 sections (could be alternative light bg)
color-star       → 0 sections (future: star ratings)
on-dark          → 2 sections (redundant with on-dark-heading)
```

### Used in Legacy Sections Only
```
brand-deep       → Used in 6 legacy sections
brand-sand       → Used in 2 legacy sections
brand-steel      → Used in 2 legacy sections
brand-muted      → Used in 3 legacy sections
```

**Note:** These will be migrated to semantic tokens in Phase 3C.

---

## Migration Progress by Token Type

| Token Type | Total | Migrated | Progress |
|------------|-------|----------|----------|
| Light Background | 9 | 9 | 100% ✅ |
| Dark Background | 7 | 7 | 100% ✅ |
| Utility | 5 | 3 | 60% ⚠️ |
| **Overall** | 21 | 19 | **90%** |

**Remaining:** Legacy brand-* tokens (will be removed after migration)

---

**END OF MATRIX**
