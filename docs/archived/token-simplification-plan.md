# Token Simplification Migration Plan

**Created:** 2026-03-29
**Status:** Planning
**Branch:** typography-refactoring

---

## Migration Summary

### Color Tokens: 9 → 5 tokens

**Removed:**
- `on-dark-heading` → use `on-dark` instead
- `on-dark-quote` → use `on-dark` instead
- `on-dark-label` → migrate to `on-dark-meta`

**Renamed:**
- `on-dark-role` → `on-dark-meta`

**Final Token Set:**
```javascript
'on-dark':         '#FFFFFF',
'on-dark-body':    '#FFFFFFCC',
'on-dark-meta':    '#ffffff9c',  // was: on-dark-role, includes on-dark-label
'on-dark-accent':  '#ffffff',
'on-dark-divider': '#ffffff33',
```

### Font Families: 4 → 3 tokens

**Removed:**
- `sans` → duplicate of `primary`, migrate all instances to `font-primary`

**Renamed:**
- `display` → `secondary` (user preference)

**Final Token Set:**
```javascript
primary: ['DM Sans', 'system-ui', 'sans-serif'],
secondary: ['Cormorant Garamond', 'Georgia', 'serif'],
handwriting: ['Kalam', 'cursive'],
```

---

## Affected Files

### tailwind.config.js (1 file)
- Remove `on-dark-heading`, `on-dark-quote`, `on-dark-label`
- Rename `on-dark-role` to `on-dark-meta`
- Remove `sans` font family
- Rename `display` to `serif`

### Color Token Migrations (4 files)
1. `frontend/src/pages/TranscriptPage.jsx` — 6 instances of `on-dark-heading`
2. `frontend/src/components/ui/ExpandToggleButton.jsx` — `on-dark-label`, `on-dark-heading`
3. `frontend/src/components/ui/SectionLabel.jsx` — `on-dark-label`
4. `frontend/src/pages/demos/TypographyDemoPage.jsx` — 2 instances of `on-dark-role`

### Font Family Migrations (43 files)

**font-sans → font-primary (28 files):**
- All sections in `frontend/src/components/sections/` (including *Copy variants)
- All hardcoded sections in `frontend/src/components/hardcoded-sections/`
- UI components, pages, demos

**font-display → font-serif (~15 files with 30+ instances):**
- TranscriptPage.jsx
- ResearcherQuotesSection.jsx (hardcoded + Copy)
- ResearchersSection.jsx (hardcoded + Copy)
- SidecarMenu.jsx
- TopicCard.jsx
- PodcastVideoSectionCopy.jsx
- PodcastSection.jsx
- CtaImageSection.jsx

---

## Migration Checklist

### Phase 1: Update tailwind.config.js
- [ ] Remove `on-dark-heading` token
- [ ] Remove `on-dark-quote` token
- [ ] Remove `on-dark-label` token
- [ ] Rename `on-dark-role` to `on-dark-meta`
- [ ] Remove `sans` font family
- [ ] Rename `display` to `secondary`

### Phase 2: Migrate Color Tokens
- [ ] TranscriptPage.jsx: `on-dark-heading` → `on-dark`
- [ ] ExpandToggleButton.jsx: `on-dark-label` → `on-dark-meta`, `on-dark-heading` → `on-dark`
- [ ] SectionLabel.jsx: `on-dark-label` → `on-dark-meta`
- [ ] TypographyDemoPage.jsx: `on-dark-role` → `on-dark-meta`

### Phase 3: Migrate font-sans → font-primary
- [ ] All sections/*.jsx files
- [ ] All hardcoded-sections/*.jsx files
- [ ] UI components
- [ ] Pages and demos

### Phase 4: Migrate font-display → font-secondary
- [ ] TranscriptPage.jsx
- [ ] ResearcherQuotesSection files
- [ ] ResearchersSection files
- [ ] SidecarMenu.jsx
- [ ] TopicCard.jsx
- [ ] Podcast sections
- [ ] CtaImageSection.jsx

### Phase 5: Verification
- [ ] Build succeeds: `npm --prefix frontend run build`
- [ ] No console errors
- [ ] Visual regression check on deployed site
- [ ] Update MEMORY.md with new token structure

---

## Execution Order

1. **HIGH:** Update tailwind.config.js (source of truth)
2. **HIGH:** Migrate color tokens (4 files, low risk)
3. **HIGH:** Migrate font-sans → font-primary (28 files)
4. **MEDIUM:** Migrate font-display → font-serif (15 files)
5. **MEDIUM:** Run build and verify
6. **LOW:** Update documentation and memory
