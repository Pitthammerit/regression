# Section Migration Plan — Phase 3B

**Created:** 2026-03-27
**Branch:** `typography-refactoring`
**Status:** Ready for Execution
**Framework:** `/multiloop` skill — Orchestrated Workflow

⚡ **HOW TO USE THIS PLAN:**

```
Invoke the multiloop skill with your target section:

/multiloop migrate [section name]

Examples:
/multiloop migrate BookingSection
/multiloop migrate ReferencesSection
/multiloop migrate ForWhomSection

The skill will orchestrate the entire migration workflow automatically.
```

---

## 🚀 REFINED WORKFLOW (2026-03-27 — Based on User Feedback)

### ✅ PROVEN PATTERN (Copy → Test → Migrate → DebugLabels LAST)

```
1. Copy erstellen        → SectionNameCopy.jsx
2. typo-demo import      → Add to TypographyDemoPage
3. User sieht original   → Compare with original
4. Migrieren             → Typography tokens (NO DebugLabels yet!)
5. Visual test           → User checks /typo-demo
6. Korrekturen           → If needed, iterate
7. ✅ User approves      → Visual appearance perfect
8. DebugLabels hinzufügen → Add AFTER approval (final step)
9. Fertig                → Next section
```

### ⚠️ KEY CHANGES FROM PREVIOUS PLAN:

| Before | Now (Refined) |
|--------|---------------|
| DebugLabels during migration | **DebugLabels AFTER visual approval** |
| Focus on perfection first | **Visual correct → THEN add labels** |
| Add debugMode prop early | **Add debugMode prop only when needed** |

### 📋 SUCCESS CRITERIA (per section):

- [ ] 0 hardcoded **typography** values (font-size, font-family, text-color)
- [ ] All tokens from `tailwind.config.js` (Single Source of Truth)
- [ ] Visual appearance matches original (or better)
- [ ] Build succeeds
- [ ] **THEN**: DebugLabels added (only after user approves)

### 🎯 NEXT SECTIONS (Priority Order):

1. ✅ HeroV3Section
2. ✅ ServicesSection
3. ✅ WelcomeSection
4. ✅ ResearcherQuotesSection
5. ✅ StatementSection
6. ✅ WhatIsSection
7. ✅ ForWhomSection
8. ✅ AboutSection
9. ✅ ProcessSection
10. ✅ PodcastSection
11. ✅ CaseStudiesSection
12. ✅ TestimonialCarousel
13. ✅ BookingSection
14. ✅ FAQSection
15. ✅ ReferencesSection
16. ✅ ResearchersSection
17. ⬜ **PodcastVideoSection** ← **LAST ONE! — ONLY SECTION REMAINING**

---

## QUICK LINKS (Wähle was du brauchst):

| Brauchst du... | Gehe zu... |
|----------------|-----------|
| **Schnellstart** | [Session Start Prompt](#part-1-session-start-prompt) |
| **Welche Section zuerst?** | [Priority List](#sections-priority-list) |
| **Wo stehen wir?** | [Progress Tracker](#progress-tracking) |
| **Token Nachschlagen** | [Token Mapping Cheat Sheet](#token-mapping-cheat-sheet) |
| **Vollständiger Workflow** | [Multiloop Framework](#part-2-multiloop-orchestration-framework) |
| **Quality Checklist** | [Execution Checklist](#section-by-section-execution-checklist) |
| **Nach 2-3 Sections** | [Learning Loop & Batch Mode](#part-3-learning-loop-after-2-3-sections) |
| **⚠️ Common Pitfalls** | [Why Hardcoded Values Persist](#common-pitfalls-why-hardcoded-values-persist) |
| **📚 Reference Plans** | [Typography Plans](#reference-plans) |

---

## 🎨 COLOR TOKENS QUICK REFERENCE (KURZVERSION)

**⚠️ WICHTIG: Nur diese Farben in neuen Migrationen verwenden!**

### Text auf Hell Background
```jsx
className="text-color-heading"  // #224160 (dunkelblau)
className="text-color-body"     // #5A5550 (warmgrau)
className="text-color-label"    // #7696AD (mittelblau)
className="text-color-accent"   // #2DAD71 (grün)
```

### Text auf Dunkel Background
```jsx
className="text-on-dark-heading"  // #ffffff
className="text-on-dark-body"     // #FFFFFFCC (80%)
className="text-on-dark-role"     // #ffffff9c (60%)
className="text-on-dark-quote"    // #ffffff
className="text-on-dark-divider"  // #ffffff33 (20%)
```

### ❌ NICHT verwenden (Legacy!)
```jsx
// ❌ FALSCH - Das sind Legacy Farben:
text-brand-deep    // → stattdessen: text-color-heading
text-brand-body    // → stattdessen: text-color-body
text-brand-steel   // → stattdessen: text-color-label
text-brand-green   // → stattdessen: text-color-accent
text-white         // → stattdessen: text-on-dark-heading
text-white/80      // → stattdessen: text-on-dark-body
```

### Vollständige Referenz: [Token Mapping Cheat Sheet](#token-mapping-cheat-sheet)

---

## EXECUTIVE SUMMARY

**Ziel:** Alle ~15 Legacy Sections auf das neue Typography System migrieren mit 100% Perfektion.

**Ausgangslage:**
- ✅ Phase 3A abgeschlossen: 4 COPY Sections 100% migriert
- ✅ Typography System komplett (18 Tokens, Semantic Colors, Spacing)
- ✅ DebugLabel-System etabliert und validiert
- ✅ typo-demo Seite als Test-Umgebung
- ⏳ ~15 Legacy Sections warten auf Migration

**Autonomous Workflow:**
1. Migrate 1 section → User Feedback → Optimize
2. Repeat 2-3 times for pattern learning
3. Switch to batch mode (3-5 sections per batch)

**Success Criteria:**
- 0 hardcoded typography values
- 100% Single Source of Truth (tailwind.config.js)
- All DebugLabels present and correct
- Visual regression: 0%
- Code review: Approved

**Zeitschätzung:** 12-18 Stunden über 4 Sessions

---

## ⚠️ COMMON PITFALLS: Why Hardcoded Values Persist

**Critical Learning from typography-refactoring-phase4-plan.md (Session 5):**

The current token system is **NOT Single Source of Truth**. Here's why hardcoded values are easily missed:

### The Problem: 3 Separate Classes Required

```
// Typisches Typography-Element mit 3 separaten Klassen:
className="font-display text-h2 text-color-heading"
//           ↑           ↑       ↑
//           Font-Familie Größe   Farbe (semantic!)

// ❌ VORHER (Legacy - NICHT verwenden):
className="font-display text-h2 text-brand-deep"

// ✅ JETZT (Semantic - KORREKT):
className="font-display text-h2 text-color-heading"

// Wenn eine dieser Klassen vergessen wird → Hardcoded-Wert bleibt!
```

### Hidden Hardcoded Values (Often Missed)

| Category | Examples | Why Easily Missed |
|----------|----------|-------------------|
| **Font-Family** | `font-display`, `font-primary` | Separate from size token |
| **Colors (Light - ⚠️ LEGACY)** | `text-brand-deep`, `text-brand-body`, `text-brand-steel` | Separate from size token - DON'T USE! |
| **Colors (Light - ✅ CORRECT)** | `text-color-heading`, `text-color-body`, `text-color-label` | Use semantic tokens instead |
| **Colors (Dark)** | `text-white`, `text-white/80`, `text-white/60` | Separate from size token - use on-dark-* |
| **Opacity** | `text-white/80`, `text-white/60` | Often in dark backgrounds |
| **Font Styles** | `italic`, `uppercase` | Modifiers, not tokens |
| **Line Heights** | `leading-tight`, `leading-snug` | Not in token system |
| **Letter Spacing** | `tracking-tight`, `tracking-wide` | Not in token system |

### ⚠️ CRITICAL: Legacy Colors vs Semantic Colors

**Legacy Colors (DO NOT USE in new migrations):**
```jsx
// ❌ WRONG - These are LEGACY colors (only exist in old unmigrated sections)
className="text-brand-deep"   // Use color-heading instead
className="text-brand-body"   // Use color-body instead
className="text-brand-steel"  // Use color-label instead
className="text-brand-green"  // Use color-accent instead
className="text-brand-sand"   // Use color-bg-light instead
```

**Semantic Colors (✅ USE THESE):**
```jsx
// ✅ CORRECT - Semantic color tokens for light backgrounds
className="text-color-heading"  // #224160 (dark blue)
className="text-color-body"     // #5A5550 (warm gray)
className="text-color-label"    // #7696AD (medium blue)
className="text-color-accent"   // #2DAD71 (green)

// ✅ CORRECT - Semantic color tokens for dark backgrounds (bg-brand-deep)
className="text-on-dark-heading"  // #ffffff
className="text-on-dark-body"     // #FFFFFFCC (80% opacity)
className="text-on-dark-quote"    // #ffffff
className="text-on-dark-role"     // #ffffff9c (60% opacity)
className="text-on-dark-date"     // #ffffff9c (60% opacity)
className="text-on-dark-label"    // #ffffff9c (60% opacity)
className="text-on-dark-accent"   // #ffffff
className="text-on-dark-divider"  // #ffffff33 (20% opacity)
```

### Plugin Utilities vs Tokens

**Tailwind Plugin Utilities (Separate from fontSize tokens):**

These are standalone utility classes created via `addUtilities()` in tailwind.config.js. They combine multiple CSS properties into reusable patterns:

```jsx
// Typography style utilities (plugin, not fontSize tokens)
className=".label"           // uppercase + tracking-wide + line-height-1.5
className=".role"            // uppercase + tracking-wide-alt + line-height-1.5
className=".subline-italic"  // italic
className=".hint-italic"     // italic
className=".disclaimer-italic" // italic

// Spacing utilities (plugin, not spacing tokens)
className=".section-padding"           // pt-20 pb-28 (5rem / 7rem)
className=".section-block-spacing"     // mb-16 (4rem)
className=".label-heading-spacing"     // mb-0.7rem
className=".name-role-spacing"         // mb-0.25rem
className=".role-date-spacing"         // mb-0.25rem
className=".block-label-spacing"       // mb-0.75rem
className=".content-spacing"           // mb-1.5rem
className=".content-spacing-md"        // mb-1rem
className=".content-spacing-lg"        // mb-2rem

// Grid gap utilities (plugin)
className=".grid-gap-lg"      // gap-2rem
className=".grid-gap-xl"      // gap-4rem

// Transition utilities (plugin)
className=".transition-fast"    // duration-200ms
className=".transition-normal"  // duration-300ms
className=".transition-slow"    // duration-500ms
```

**When to use Plugin Utilities:**
- ✅ Use `.label` or `.role` when you need uppercase + letter-spacing combo
- ✅ Use `.section-padding` for standard section padding
- ✅ Use `.content-spacing` for standard element spacing
- ✅ Use `.label-heading-spacing` for the gap between label and heading
- ❌ DON'T combine `.label` with `text-label` fontSize token (use only one)

**3 Separate Token Systems:**
```jsx
// System 1: Font Family (fontFamily config)
className="font-display"   // Cormorant Garamond (serif)
className="font-primary"   // DM Sans (sans-serif)
className="font-sans"      // DM Sans (system-ui, sans-serif)

// System 2: Font Size (fontSize config with lineHeight/letterSpacing)
className="text-h2"        // 2.25rem with line-height-1.2
className="text-body"      // 1.125rem with line-height-1.75
className="text-label"     // 0.94rem with letter-spacing-0.2em

// System 3: Plugin Utilities (addUtilities - combine multiple properties)
className=".label"         // uppercase + tracking-wide + line-height-1.5 (NOT fontSize!)
className=".role"          // uppercase + tracking-wide-alt + line-height-1.5

// System 4: Colors (colors config)
className="text-color-heading"  // Semantic color for light backgrounds
className="text-on-dark-body"   // Semantic color for dark backgrounds
```

### Current Token System Limitations

**Tailwind fontSize tokens DON'T support:**
- ❌ fontFamily (the fontFamily property in fontSize config is IGNORED)
- ❌ color (must be separate class)

**That's why EVERY typography element needs:**
```jsx
// Headline on light background (✅ KORREKT)
<className="font-display text-h2 text-color-heading">
//           ↑           ↑       ↑
//           Family      Size    Color (semantic!)

// ❌ VORHER (Legacy):
<className="font-display text-h2 text-brand-deep">

// Body on light background (✅ KORREKT)
<className="font-primary text-body text-color-body">

// ❌ VORHER (Legacy):
<className="font-primary text-body text-brand-body">

// Quote on dark background (✅ KORREKT)
<className="font-display text-quote-featured text-on-dark-quote">

// ❌ VORHER (mit text-white):
<className="font-display text-quote-featured text-white">

// Label on light background (✅ KORREKT)
<className="font-primary text-label text-color-label">

// ❌ VORHER (Legacy):
<className="font-primary text-label text-brand-steel">
```

### Grep Search Patterns for Hidden Values

```bash
# Font families (easily missed!)
grep -n "font-\(display\|primary\|sans\|serif\)" FILE.jsx

# ⚠️ LEGACY colors (should be replaced with semantic tokens!)
grep -n "text-brand-\(deep\|body\|steel\|green\|muted\|dark\|cream\|sand\)" FILE.jsx

# White with opacity (easily missed!)
grep -n "text-white/\(80\|60\|70\|50\|90\)" FILE.jsx

# Plain white (often forgotten on dark backgrounds)
grep -n "text-white\"" FILE.jsx

# Italic modifier (easily missed!)
grep -n "italic" FILE.jsx

# Uppercase (often in labels, easily missed!)
grep -n "uppercase" FILE.jsx

# Plugin utilities (check usage)
grep -n "\.label\|\.role\|\.section-padding\|\.content-spacing" FILE.jsx
```

### Migration Checklist Addition

**BEFORE declaring a section "complete":**
- [ ] NO `font-display` or `font-primary` without corresponding size token
- [ ] NO `text-brand-*` colors (⚠️ these are LEGACY - replace with semantic tokens!)
  - Replace `text-brand-deep` → `text-color-heading` or `text-on-dark-heading`
  - Replace `text-brand-body` → `text-color-body` or `text-on-dark-body`
  - Replace `text-brand-steel` → `text-color-label` or `text-on-dark-label`
  - Replace `text-brand-green` → `text-color-accent` or `text-on-dark-accent`
- [ ] NO `text-white` or `text-white/*` without `on-dark` alternative
  - Replace `text-white` → `text-on-dark-heading` or `text-on-dark-quote`
  - Replace `text-white/80` → `text-on-dark-body`
  - Replace `text-white/60` → `text-on-dark-role` or `text-on-dark-date`
- [ ] All italic styles accounted for
- [ ] All uppercase styles accounted for
- [ ] Plugin utilities used correctly (`.label`, `.role`, spacing utilities)

---

## 📚 REFERENCE PLANS

**Important Typography Plans (Keep for Reference):**

| Plan | Purpose | Why Useful |
|------|---------|------------|
| **typography-refactoring-plan.md** | Phase 3A Learnings | DebugLabel system, Token naming evolution, COPY sections patterns |
| **typography-refactoring-phase4-plan.md** | ⚠️ CRITICAL — Single Source of Truth Problem | Explains WHY 3-class pattern is needed, Tailwind limitations |
| **typography-refactoring-original-plan.md** | Original planning | Historical context |
| **typography-refactoring-phase4-plan.md** | Never implemented (but correct approach) | Semantic color tokens proposal |

**Key Learnings from typography-refactoring-phase4-plan.md:**

This plan identified the **root cause** of inconsistent typography:
- Typography tokens (size) + Font-family + Colors are ALWAYS separate
- True Single Source of Truth would require: fontSize tokens WITH fontFamily AND color
- **Tailwind limitation:** fontSize tokens CANNOT include fontFamily (ignored by Tailwind)
- **Solution:** Semantic color tokens + consistent 3-class pattern

**Note:** Phase 4 was never implemented, but the analysis explains why the current system requires vigilance.

---

## PART 1: SESSION START PROMPT (Für nächste Session)

**Copy this prompt at the start of the next migration session:**

```
Du bist in der Typography Refactoring Phase 3B — Section Migration.

⚡ CRITICAL: INVOKE /multiloop SKILL FIRST ⚡

BEFORE YOU DO ANYTHING:
1. INVOKE: /multiloop migrate [section name from Priority List]
   - Example: /multiloop migrate BookingSection
   - This activates the full orchestrated workflow
2. Read memory/typography-editor-attempt.md — Learn from failures
3. Read memory/section-migration-systematic-approach.md — Learn the patterns
4. Read docs/section-migration-plan.md — This file
5. Read docs/typography-refactoring-plan.md — COPY sections patterns
6. Read docs/typography-refactoring-phase4-plan.md — ⚠️ CRITICAL: Why hardcoded values persist
7. Check Progress Tracker (which sections are done?)
8. Verify current tokens in tailwind.config.js

THEN:
1. Select the NEXT section from Priority List (Batch 1 first)
2. The /multiloop skill will orchestrate the entire migration workflow
3. Ask user for feedback after EACH section
4. Learn from feedback and improve approach
5. After 2-3 successful migrations, ask user to switch to batch mode

TARGET: 100% perfection — no hardcoded values, all from tailwind.config.js

Use Serena MCP for file operations and Knowledge Graph for entity tracking.
```

---

## PART 2: MULTILOOP ORCHESTRATION FRAMEWORK

⚡ **HOW TO USE THIS FRAMEWORK:**

```
INVOKE THE SKILL — Don't manually follow these steps!

/multiloop migrate [SECTIONNAME]

Examples:
/multiloop migrate BookingSection
/multiloop migrate ReferencesSection
/multiloop migrate ForWhomSection

The multiloop skill will automatically:
1. Load all context (memory files, tokens, patterns)
2. Decompose the migration into subtasks
3. Launch specialized subagents (Analyzer, Implementer, Reviewer, Validator)
4. Collect reports and verify results
5. Loop back if issues found
6. Present unified results to you

⚠️ DO NOT manually execute these phases — let /multiloop orchestrate everything!
```

---

### Phase 1: LOAD CONTEXT (Required - 5 min)

**Master Orchestrator Action:** Load all context before any migration work.

```markdown
## LOAD CONTEXT Checklist:

### 1. Memory Files (Read with Read tool)
- ✅ memory/typography-editor-attempt.md — What failed, why, solutions
- ✅ memory/section-migration-systematic-approach.md — Element types table, 6-step process
- ✅ memory/MEMORY.md — Project overview and principles
- ✅ docs/typography-refactoring-plan.md — COPY sections patterns, token naming evolution
- ✅ docs/typography-refactoring-phase4-plan.md — ⚠️ CRITICAL: Why 3-class pattern is required

### 2. Token System (Read with Read tool)
- ✅ frontend/tailwind.config.js — Current tokens (color-heading, on-dark-*, etc.)
- ✅ Verify which tokens exist and which patterns are used

### 3. Reference Sections (Read with Read tool)
- ✅ frontend/src/components/sections/WhatIsSectionCopy.jsx — Simple pattern
- ✅ frontend/src/components/sections/AboutSectionCopy.jsx — Medium pattern
- ✅ frontend/src/components/sections/ResearchersSectionCopy.jsx — Complex pattern

### 4. Current Progress
- ✅ This file — Progress Tracker (which sections are done, what's next)

### 5. Environment Check (Bash tool)
```bash
# Check dev server
curl -s http://localhost:3000/typo-demo > /dev/null && echo "✅ Dev server running" || echo "❌ Start dev server"

# Check branch
git branch --show-current
```

OUTPUT: Context loaded, system ready, target section identified
```

---

### Phase 2: DECOMPOSE (Required - 10-15 min)

**Master Orchestrator Action:** Break migration into explicit subtasks.

```markdown
## DECOMPOSE Template for Each Section:

### Target Section: [SECTIONNAME]

#### 2.1 Read Legacy Section (Serena MCP: read_file)
- File: frontend/src/components/sections/[SECTIONNAME].jsx
- Full content read
- All typography elements identified

#### 2.2 Hardcoded Values Search (Grep tool)
```bash
# Font sizes
grep -n "text-\(xs\|sm\|base\|lg\|xl\|2xl\|3xl\|4xl\|5xl\|6xl\|7xl\|8xl\)" frontend/src/components/sections/[SECTIONNAME].jsx

# Font families
grep -n "font-\(sans\|serif\|mono\)" frontend/src/components/sections/[SECTIONNAME].jsx

# Colors (legacy)
grep -n "text-\(heading\|body\|label\|brand-\)" frontend/src/components/sections/[SECTIONNAME].jsx

# Spacings
grep -n "\(mb\|mt\|py\|px\|gap\|p\|m\)-[0-9]" frontend/src/components/sections/[SECTIONNAME].jsx
```

#### 2.3 Create Token Mapping (Table format)
| Hardcoded Value | Line | Element Type | Should Be Token | Token Exists? |
|-----------------|------|--------------|-----------------|---------------|
| text-3xl | 15 | Section heading | text-h2 | ✅ |
| font-serif | 23 | Quote text | font-display + italic | ✅ |
| text-heading | 31 | Heading on light | text-color-heading | ✅ |
| mb-8 | 45 | Block spacing | content-spacing-lg | ✅ |

#### 2.4 Identify Missing Tokens
- If token missing → Add to tailwind.config.js FIRST
- If utility missing → Add to tailwind.config.js FIRST
- DO NOT proceed without all tokens

#### 2.5 Estimate Complexity
```
Complexity Score = (Unique Typography Patterns × 2) + (Responsive Variants) + (Special Cases)

Simple: < 10 Punkte (30-45 min)
Medium: 10-20 Punkte (45-60 min)
Complex: > 20 Punkte (60-90 min)
```

#### 2.6 Define Subtasks (for ASSIGN phase)
1. [HIGH] Typography Analyzer — Find ALL hardcoded values
2. [HIGH] Migration Implementer — Replace with tokens, add DebugLabels
3. [MEDIUM] Code Review Expert — Verify against principles
4. [LOW] Migration Validator — Grep verification

DEPENDENCIES:
- Task 2 depends on Task 1 (need analysis first)
- Task 3 depends on Task 2 (review changes after implementation)
- Task 4 depends on Task 2 (verify after implementation)

OUTPUT: Analysis document with all findings, mappings, and subtask definitions
```

---

### Phase 3: ASSIGN (Launch Subagents)

**Master Orchestrator Action:** Launch specialized agents with clear templates.

```markdown
## ASSIGN Template:

### Task 1: Typography Analyzer (feature-dev:code-explorer)
Launch with:
```
Agent: feature-dev:code-explorer
Task: Find ALL hardcoded typography values in [SECTIONNAME].jsx and categorize by type (size, family, color, spacing)
Inputs:
  - File: frontend/src/components/sections/[SECTIONNAME].jsx
  - Context: memory/section-migration-systematic-approach.md (element types table)
Constraints:
  - Report every hardcoded value with line number
  - Categorize by: font size, font family, color, spacing
  - Identify element type using recognition criteria (position, context, visual)
Expected Output:
  - Categorized list of all hardcoded typography values
  - Line numbers for each finding
  - Element type identification (H1, H2, body, label, etc.)
  - Recommended token for each value
Priority: HIGH
Deadline: 5 minutes
```

### Task 2: Migration Implementer (frontend-developer)
Launch with:
```
Agent: frontend-developer
Task: Migrate [SECTIONNAME].jsx to use design tokens from tailwind.config.js, add DebugLabel wrappers
Inputs:
  - File: frontend/src/components/sections/[SECTIONNAME].jsx
  - Analysis: From Task 1 (hardcoded values list)
  - Context: memory/section-migration-systematic-approach.md (token mappings)
Constraints:
  - Replace ALL hardcoded typography values with tokens
  - Add DebugLabel wrapper to EVERY typography element
  - Set DebugLabel type to exact token name
  - Add debugMode prop to component signature
  - Import DebugLabel component
  - Use Serena replace_content tool for replacements
Expected Output:
  - Migrated [SECTIONNAME].jsx with 0 hardcoded typography values
  - All typography elements wrapped in DebugLabel
  - Component accepts debugMode prop
Priority: HIGH
Deadline: 10 minutes
```

### Task 3: Code Review Expert (feature-dev:code-reviewer)
Launch with:
```
Agent: feature-dev:code-reviewer
Task: Review [SECTIONNAME].jsx migration against project principles and success criteria
Inputs:
  - File: frontend/src/components/sections/[SECTIONNAME].jsx (after migration)
  - Context: memory/MEMORY.md (principles), docs/typography-refactoring-plan.md (tokens)
Review Checklist:
  - DRY: No code duplication, reusable patterns
  - KISS: Simple and clear, no unnecessary complexity
  - YAGNI: Only current requirements implemented
  - SOC: Component has single responsibility
  - Single Source of Truth: All typography from tailwind.config.js
  - Tailwind Best Practices: Design tokens used, brackets for non-standard values
  - 0 Hardcoded Typography Values: No text-*, font-*, colors remaining
Expected Output:
  - List of issues found (if any)
  - Severity: critical/high/medium/low
  - Specific file:line references
  - Recommendations for fixes
  - Approval or rejection with reasoning
Priority: HIGH
Deadline: 5 minutes
```

### Task 4: Migration Validator (test-writer-fixer)
Launch with:
```
Agent: test-writer-fixer
Task: Verify [SECTIONNAME].jsx migration completeness using grep tests
Inputs:
  - File: frontend/src/components/sections/[SECTIONNAME].jsx (after migration)
  - Context: Token Mapping Cheat Sheet (below)
Tests to Run:
  1. No hardcoded font sizes: grep for text-xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl
  2. All tokens present: grep for text-h2|h3|h4|body|label|subline|list|quote|author|summary|narrative|date
  3. No legacy font-family: grep for font-sans
  4. All DebugLabels present: count DebugLabel components
  5. Build test: npm --prefix frontend run build
Expected Output:
  - Test results (pass/fail for each)
  - List of remaining hardcoded values (if any)
  - Build output (success or errors)
Priority: MEDIUM
Deadline: 5 minutes
```

PARALLELIZATION:
- Task 1 runs first (provides analysis)
- Task 2 runs after Task 1 (needs analysis)
- Task 3 and Task 4 run in parallel after Task 2 (both review implementation)
```

---

### Phase 4: COLLECT (Structured Reports)

**Master Orchestrator Action:** Wait for all agents to return structured reports.

```markdown
## COLLECT Template:

### Expected Report from Each Agent:

**Typography Analyzer Report:**
- Summary: Found X hardcoded typography values
- Findings: Categorized list (font_sizes, font_families, colors, spacing)
- Time spent: X minutes

**Migration Implementer Report:**
- Summary: Migrated SECTIONNAME with X replacements
- Changes: Lines added/removed, tokens used, debuglabels added
- Time spent: X minutes

**Code Review Expert Report:**
- Summary: APPROVED with X minor suggestions
- Review: Principles check (DRY, KISS, YAGNI, SOC, SSOT, Tailwind)
- Issues: List with severity (critical/high/medium/low)
- Time spent: X minutes

**Migration Validator Report:**
- Summary: All tests PASSED
- Tests: Build, hardcoded values, tokens present, font-family, DebugLabels
- Time spent: X minutes

SYNTHESIS CRITERIA:
- ✅ All 4 reports received
- ✅ Analyzer found all values
- ✅ Implementer replaced all values
- ✅ Code review approved (no critical/high issues)
- ✅ Validator all tests pass

IF ANY CRITERIA FAILS → LOOP BACK to Phase 3
```

---

### Phase 5: VERIFY & LOOP BACK (CRITICAL!)

**Master Orchestrator Action:** Test and review ALL changes. Loop back if issues found.

```markdown
## VERIFY Template:

### 5.1 Build Verification (Bash tool)
```bash
npm --prefix frontend run build
```
- ✅ Build succeeds? → Proceed
- ❌ Build fails? → LOOP BACK to Phase 3 with fix requirements

### 5.2 typo-demo Testing (Manual)
1. Add section to TypographyDemoPage.jsx:
```javascript
import SECTIONNAMECopy from '../../components/sections/SECTIONNAMECopy'

// In render():
<SECTIONNAMECopy debugMode={true} />
```

2. Check browser:
- ✅ typo-demo loads without errors?
- ✅ DebugLabels appear with correct token names?
- ✅ Responsive behavior works?
- ✅ Visual appearance matches original?

IF ANY CHECK FAILS → LOOP BACK to Phase 3

### 5.3 Grep Verification (Bash tool)

```bash
# Check: No hardcoded font sizes
grep -n "text-\(xs\|sm\|base\|lg\|xl\|2xl\|3xl\|4xl\|5xl\|6xl\|7xl\|8xl\)" frontend/src/components/sections/SECTIONNAMECopy.jsx
# Expected: (no matches)

# Check: All typography tokens present
grep -n "text-\(h1\|h2\|h3\|h4\|body\|body-lg\|label\|subline\|list\|quote\|quote-featured\|author-name\|description\|summary-large\|body-narrative\|date\|disclaimer\|read-more\|source-link\|hint\|icon\)" frontend/src/components/sections/SECTIONNAMECopy.jsx
# Expected: Multiple matches (all tokens in use)

# ⚠️ Check: Font families are ALWAYS paired with size tokens
# (This is CORRECT - not a bug! See "Common Pitfalls" section)
grep -n "font-\(display\|primary\)" frontend/src/components/sections/SECTIONNAMECopy.jsx

# ⚠️ Check: Brand colors (should be used via semantic color tokens)
grep -n "text-brand-\(deep\|body\|steel\|green\|muted\)" frontend/src/components/sections/SECTIONNAMECopy.jsx

# ⚠️ Check: Plain white on dark backgrounds (may need on-dark variants)
grep -n "text-white\"" frontend/src/components/sections/SECTIONNAMECopy.jsx
grep -n "text-white'" frontend/src/components/sections/SECTIONNAMECopy.jsx

# ⚠️ Check: White with opacity (common on dark backgrounds)
grep -n "text-white/\(80\|60\|70\|50\|90\)" frontend/src/components/sections/SECTIONNAMECopy.jsx

# Check: Italic modifier (often missed in quotes/sublines)
grep -n "italic" frontend/src/components/sections/SECTIONNAMECopy.jsx

# Check: Uppercase (often in labels)
grep -n "uppercase" frontend/src/components/sections/SECTIONNAMECopy.jsx
```

**Expected Results:**
- ✅ No hardcoded font sizes (text-xs, text-sm, etc.)
- ✅ Typography tokens present (text-h2, text-body, etc.)
- ✅ Font families present (font-display, font-primary) - CORRECT!
- ✅ Brand colors used correctly (text-brand-deep for headings on light)
- ⚠️ Plain white may be correct on dark backgrounds (verify visually)
- ⚠️ White with opacity may be correct (verify visually)
- ✅ Italic/uppercase accounted for in style or utility

**IMPORTANT:**
- Font-family and colors MUST be separate from size tokens (Tailwind limitation)
- `font-display text-h2 text-brand-deep` is CORRECT pattern
- See "Common Pitfalls" section for WHY this is required

### 5.4 LOOP BACK Protocol

WHEN TO LOOP:
- ❌ Build fails
- ❌ typo-demo has errors
- ❌ Hardcoded values found
- ❌ DebugLabels missing or incorrect
- ❌ Code review finds blocking issues

HOW TO LOOP:
1. Document the issue (what exactly needs fixing)
2. Return to Phase 3 (ASSIGN)
3. Launch frontend-developer with fix requirements
4. Re-run Phase 5 (VERIFY) after fix
5. Repeat until ALL checks pass

LOOP EXIT:
✅ Build succeeds
✅ typo-demo passes
✅ Grep finds 0 hardcoded values
✅ Code review approves (no blocking issues)

ONLY THEN proceed to Phase 6
```

---

### Phase 6: SYNTHESIZE (Combine Reports)

**Master Orchestrator Action:** Create unified deliverable.

```markdown
## SYNTHESIZE Template:

### Migration Report for SECTIONNAME

**Date:** YYYY-MM-DD
**Complexity:** Simple/Medium/Complex
**Status:** ✅ Success

## Changes Made:
- **Files modified:** SECTIONNAME.jsx
- **Lines added:** [count]
- **Lines removed:** [count]
- **Tokens used:** [list]
- **DebugLabels added:** [count]

## Agent Contributions:
- **Typography Analyzer:** Found X hardcoded values
- **Migration Implementer:** Replaced all values with tokens
- **Code Review Expert:** Approved migration
- **Migration Validator:** All tests passed

## Validation Results:
- ✅ Build: PASS
- ✅ typo-demo: PASS
- ✅ Code Review: APPROVED
- ✅ Hardcoded values: 0 REMAINING

## QA Checklist:
- ✅ No hardcoded font sizes
- ✅ No hardcoded font families
- ✅ No hardcoded colors
- ✅ All DebugLabels present
- ✅ All DebugLabels correct
- ✅ Component accepts debugMode prop
- ✅ Responsive preserved
- ✅ Build succeeds

OUTPUT: Markdown report saved to docs/migration-reports/SECTIONNAME-YYYY-MM-DD.md
```

---

### Phase 7: PERSIST (Update Memory)

**Master Orchestrator Action:** Update all tracking files.

```markdown
## PERSIST Template:

### 1. Create Migration Log (Write tool)
File: memory/migration-SECTIONNAME-YYYY-MM-DD.md
Content: See [Migration Log Template](#migration-log-template) below

### 2. Update Progress Tracker (Edit tool)
File: docs/section-migration-plan.md (this file)
Update: [Master Migration Tracker](#progress-tracking) below
Change SECTIONNAME status: ⬜ Pending → ✅ Complete
Add: Migration log link

### 3. Update MEMORY.md (Edit tool) — if significant learnings
File: memory/MEMORY.md
Add: Link to new migration log

### 4. Create Git Diff (Bash tool)
```bash
git diff frontend/src/components/sections/SECTIONNAME.jsx > docs/diffs/SECTIONNAME-migration.diff
```

OUTPUT: All persistence complete, history recorded
```

---

### Phase 8: PRESENT (Return to User)

**Master Orchestrator Action:** Present unified result with next steps.

```markdown
═══════════════════════════════════════════════════════════
          MIGRATION COMPLETE: SECTIONNAME
═══════════════════════════════════════════════════════════

✅ Build: SUCCESS
✅ typo-demo: PASSED
✅ Code Review: APPROVED
✅ Hardcoded values: 0 REMAINING

📊 CHANGES:
• Lines added: [count]
• Lines removed: [count]
• Tokens used: [list]
• DebugLabels: [count] added

🤖 AGENT CONTRIBUTIONS:
• Typography Analyzer: Found [X] values
• Migration Implementer: Replaced all values
• Code Review Expert: Approved
• Migration Validator: All tests passed

📝 DOCUMENTATION:
• Migration log: memory/migration-SECTIONNAME-YYYY-MM-DD.md
• Diff: docs/diffs/SECTIONNAME-migration.diff
• Progress tracker: Updated

═══════════════════════════════════════════════════════════

🎯 NEXT STEPS:

1. Review the migration in typo-demo (debugMode=true)
2. Compare visually with original section
3. Provide feedback on visual appearance
4. If perfect: Commit changes and move to next section
5. If issues: Describe what needs adjustment

⏭️ NEXT SECTION: [Next section from Priority List]

Would you like me to:
a) Commit this migration and continue to next section?
b) Make adjustments based on your feedback?
c) Show you the visual comparison?

═══════════════════════════════════════════════════════════
```

---

## PART 3: LEARNING LOOP (After 2-3 Sections)

**After 2-3 successful migrations, optimize the process:**

```markdown
## LEARNING LOOP PROTOCOL

### Trigger: After 2-3 sections successfully migrated

### Action: Review and Optimize

#### Review Questions:
1. What patterns repeated across sections?
2. Which tokens were most commonly used?
3. What element types were most common?
4. What mistakes were made and corrected?
5. What could be automated?

#### Optimization Actions:

**Pattern Recognition:**
- Create reusable patterns for common elements
- Document new element types discovered
- Add new tokens if needed (semantic vs general)

**Process Optimization:**
- Simplify checklist if steps prove unnecessary
- Add new verification steps if issues found
- Adjust time estimates based on actual data

**Batch Mode Transition:**
- After 2-3 successful single sections
- Ask user: "Ready for batch mode? (3-5 sections at once)"
- If yes: Modify workflow to process multiple sections
- Each section still gets individual verification

#### Batch Mode Workflow:

Phase 1 (LOAD): Same as single (load context once)

Phase 2 (DECOMPOSE): Analyze ALL sections in batch
- Create analysis document for each section
- Identify common patterns across sections

Phase 3 (ASSIGN): Process sections in parallel
- Launch multiple frontend-developer agents (one per section)
- Each works on different section simultaneously

Phase 4 (COLLECT): Collect all reports
- One report per section
- Synthesize into batch summary

Phase 5 (VERIFY): Verify each section individually
- Build test once (for all)
- typo-demo test each section
- Grep verification per section

Phase 6 (SYNTHESIZE): Batch summary
- Combined report for all sections
- Statistics: total lines changed, tokens used, etc.

Phase 7 (PERSIST): Update all logs
- One migration log per section
- One batch summary document
- Progress tracker update for all sections

Phase 8 (PRESENT): Batch presentation
- Show summary of all sections
- Ask for feedback on each
- Commit all if approved

#### Batch Commit Protocol:
```bash
# Stage all migrated sections
git add frontend/src/components/sections/*Copy.jsx

# Commit with batch message
git commit -m "feat(typo): Batch migration - [list sections]

- Migrated X sections to typography system
- 0 hardcoded values remaining
- All sections use design tokens
- DebugLabels added for verification

Sections:
- SECTION1Copy: Simple (30min)
- SECTION2Copy: Medium (45min)
- SECTION3Copy: Simple (30min)

Progress: X/27 sections complete

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```
```

---

## SECTION-BY-SECTION EXECUTION CHECKLIST

**Use this checklist for EACH section migrated:**

### ⚠️ CRITICAL: COPY-WORKFLOW (First Step!)
**ABSOULTE PRIORITY: Original-Section NICHT verändern!**

**NEUER WORKFLOW (Live-Feedback-Schleife):**
1. **Copy erstellen** → `SectionNameCopy.jsx`
2. **Copy in typo-demo importieren** (VOR Migration!)
3. **Im typo-demo sehen** — Original bleibt intakt
4. **DANN migrieren** — Typography tokens anwenden
5. **Live im Browser testen** — Visuelle Prüfung
6. **User gibt Feedback** — Korrekturen wenn nötig
7. **Wenn perfekt → DebugLabels hinzufügen** (AM ENDE!)
8. **Fertig**

**Warum:**
- User sieht live die Arbeit im Browser
- Kann sofort Feedback geben (visuell)
- Original bleibt intakt für Vergleich
- typo-demo ist sichere Umgebung
- **DebugLabels kommen ZULETZT** — erst wenn Design perfekt!

**Workflow:**
```
Copy erstellen → typo-demo import → User sieht original
       ↓
   User sagt "go ahead"
       ↓
   Migrieren mit Tokens
       ↓
   User gibt Feedback im Browser
       ↓
   Korrekturen bis perfekt
       ↓
   DebugLabels hinzufügen → fertig
```

### Pre-Migration
- [ ] Copy erstellt (SectionNameCopy.jsx)
- [ ] Memory files read (typography-editor-attempt, section-migration-systematic-approach)
- [ ] Token system verified (tailwind.config.js)
- [ ] Reference sections reviewed (WhatIs, About, Researchers Copy)
- [ ] typo-demo environment tested (dev server running)
- [ ] Target section identified (from Priority List)

### Analysis (Phase 2)
- [ ] Legacy section fully read (COPY version!)
- [ ] All hardcoded values found (grep search complete)
- [ ] Token mapping created (table format)
- [ ] Complexity estimated (simple/medium/complex)
- [ ] Missing tokens identified (and created if needed)
- [ ] Subtasks defined (ready for ASSIGN phase)

### ⚠️ CRITICAL: PRESERVE ALL FUNCTIONALITY!
**Bevor du etwas entfernst: FRAGEN!**

- [ ] **Alle Animationen erhalten?**
  - Scroll animations (scrollFade, etc.)
  - Hover effects (opacity, transition, etc.)
  - Custom animations (animate-[...], keyframes)
  - VideoPlayer events (onVideoEnded, etc.)
- [ ] **Alle Interaktionen erhalten?**
  - Scroll handlers (scrollIntoView, etc.)
  - Click handlers (button clicks, etc.)
  - Form inputs (wenn vorhanden)
  - Accordions, Toggles, etc.
- [ ] **Alle IDs und Anchors erhalten?**
  - Section IDs (id="hero", id="services", etc.)
  - Anchor links (#hero, #services, etc.)
  - data-testid attributes (für Tests)
- [ ] **Alle Custom Components erhalten?**
  - CustomVideoPlayer, LazyImage, etc.
  - Third-party components (Radix UI, etc.)

**Rule: IM ZWEIFEL → FRAGEN! Design-Preservation > Token-Cleanliness!**

### Migration (Phase 3)
- [ ] Typography Analyzer agent launched
- [ ] Analyzer report received (all values found)
- [ ] Migration Implementer agent launched
- [ ] All hardcoded values replaced
- [ ] **NO DebugLabels YET** — come after visual approval
- [ ] Code Review Expert agent launched
- [ ] Code review received (approved or issues listed)
- [ ] Migration Validator agent launched
- [ ] Validation report received (all tests pass)

### Verification (Phase 5)
- [ ] Build succeeds (npm run build)
- [ ] typo-demo loads without errors
- [ ] Section renders in typo-demo
- [ ] **Visual appearance correct** — User approves
- [ ] Responsive behavior preserved
- [ ] Grep finds 0 hardcoded font sizes
- [ ] Grep finds all expected tokens
- [ ] Grep finds 0 legacy font-family (font-sans)
- [ ] Code review approves (no blocking issues)

### ⭐ NEW: DebugLabels (Phase 5.5 — AFTER visual approval!)
**ONLY add DebugLabels when user confirms visual appearance is perfect!**

- [ ] User approved visual appearance
- [ ] DebugLabel component imported
- [ ] Component signature updated (debugMode prop)
- [ ] All typography elements wrapped in DebugLabel
- [ ] DebugLabel type matches token name exactly
- [ ] typo-demo tested with debugMode=true (labels visible)
- [ ] typo-demo tested with debugMode=false (labels hidden)
- [ ] Build succeeds after DebugLabels added

### Post-Migration (Phases 6-8)
- [ ] Migration report created
- [ ] Git diff saved
- [ ] Migration log saved to memory
- [ ] Progress tracker updated
- [ ] Results presented to user
- [ ] User feedback collected
- [ ] Adjustments made (if needed)
- [ ] Final approval received

### After Approval
- [ ] Changes committed to git
- [ ] Commit message follows convention
- [ ] typo-demo tested again after commit
- [ ] Ready for next section

---

## SECTIONS PRIORITY LIST

**⚠️ WICHTIG: Reihenfolge folgt sections.config.js — Sections werden in der Reihenfolge migriert, wie sie auf der Mainpage erscheinen.**

### Priority Order (nach sections.config.js)

| # | Section | Complexity | Est. Time | Status |
|---|---------|------------|-----------|--------|
| 1 | **HeroV3Section** | Complex | 90-120 min | ✅ Complete |
| 2 | ServicesSection | Medium | 45-60 min | ✅ Complete |
| 3 | WelcomeSection | Medium | 45-60 min | ✅ Complete |
| 4 | ResearcherQuotesSection | Complex | 75-90 min | ✅ Complete |
| 5 | StatementSection | Simple | 30-45 min | ✅ Complete |
| 6 | WhatIsSection | Simple | 30-45 min | ✅ Complete |
| 7 | ResearchersSection | Complex | 90-120 min | ✅ Complete |
| 8 | PodcastVideoSection | Medium | 60-90 min | ⬜ **PENDING — LAST!** |
| 9 | ForWhomSection | Medium | 45-60 min | ✅ Complete |
| 10 | AboutSection | Medium | 45-60 min | ✅ Complete |
| 11 | ProcessSection | Medium | 60-90 min | ✅ Complete |
| 12 | PodcastSection | Medium | 60-90 min | ✅ Complete |
| 13 | CaseStudiesSection | Complex | 90-120 min | ✅ Complete |
| 14 | TestimonialCarousel | Complex | 90-120 min | ✅ Complete |
| 15 | BookingSection | Simple | 30-45 min | ✅ Complete |
| 16 | FAQSection | Medium | 45-60 min | ✅ Complete |
| 17 | ReferencesSection | Simple | 30-45 min | ✅ Complete |

**Nicht in sections.config.js (Experimente/Archiv):**
- HeroSection, HeroV2Section, HeroAlt1, HeroAlt2, HeroAlt3 (werden zuletzt migriert, wenn überhaupt)

**Warum diese Reihenfolge:**
- Folgt der User-Experience auf der Landing Page
- Sections oben haben mehr Sichtbarkeit → höheres Risiko bei Fehlern
- Realistische Test-Reihenfolge (User scrollt von oben nach unten)

**Geschätzte Gesamtzeit:** 15-20 Stunden über 4-5 Sessions

---

## PROGRESS TRACKING

### Master Migration Tracker

```markdown
## Phase 3A: COPY Sections (✅ COMPLETE)
| Section | Status | Date | Migration Log |
|---------|--------|------|---------------|
| WhatIsSectionCopy | ✅ Complete | 2026-03-27 | [link] |
| AboutSectionCopy | ✅ Complete | 2026-03-27 | [link] |
| CaseStudiesSectionCopy | ✅ Complete | 2026-03-27 | [link] |
| ResearchersSectionCopy | ✅ Complete | 2026-03-27 | [link] |

## Phase 3B: Legacy Sections (🚧 94% COMPLETE — 16/17 Sections)

**Reihenfolge: sections.config.js (Main Page Order)**

| # | Section | Status | Date | In typo-demo? |
|---|---------|--------|------|---------------|
| 1 | HeroV3Section | ✅ Complete | 2026-03-27 | ✅ Yes (migrated in place) |
| 2 | ServicesSection | ✅ Complete | 2026-03-27 | ✅ Yes (Copy) |
| 3 | WelcomeSection | ✅ Complete | 2026-03-27 | ✅ Yes (Copy) |
| 4 | ResearcherQuotesSection | ✅ Complete | 2026-03-27 | ✅ Yes (Copy) |
| 5 | StatementSection | ✅ Complete | 2026-03-27 | ✅ Yes (Copy) |
| 6 | WhatIsSection | ✅ Complete | 2026-03-27 | ✅ Yes (Copy) |
| 7 | ResearchersSection | ✅ Complete | 2026-03-27 | ✅ Yes (Copy) |
| 8 | PodcastVideoSection | ⬜ Pending | - | ❌ NO — **LAST ONE!** |
| 9 | ForWhomSection | ✅ Complete | 2026-03-27 | ✅ Yes (Copy) |
| 10 | AboutSection | ✅ Complete | 2026-03-27 | ✅ Yes (Copy) |
| 11 | ProcessSection | ✅ Complete | 2026-03-27 | ✅ Yes (Copy) |
| 12 | PodcastSection | ✅ Complete | 2026-03-27 | ✅ Yes (Copy) |
| 13 | CaseStudiesSection | ✅ Complete | 2026-03-27 | ✅ Yes (Copy) |
| 14 | TestimonialCarousel | ✅ Complete | 2026-03-27 | ✅ Yes (Copy) |
| 15 | BookingSection | ✅ Complete | 2026-03-27 | ✅ Yes (Copy) |
| 16 | FAQSection | ✅ Complete | 2026-03-27 | ✅ Yes (Copy) |
| 17 | ReferencesSection | ✅ Complete | 2026-03-27 | ✅ Yes (Copy) |

## Progress Summary
- Total Sections (Main Page): 17
- Completed: 16 (94.1%)
- In Progress: 0 (0%)
- Pending: 1 (5.9%) — **PodcastVideoSection ONLY!**

## Next Section
**PodcastVideoSection** (#8 in sections.config.js) — DIE LETZTE!
Estimated time: 60-90 min
Complexity: Medium (Video component)
```

---

## TOKEN MAPPING CHEAT SHEET (AKTUELL - aus tailwind.config.js)

### Typography Tokens (Größe + Line-height)
| Token | CSS Wert | Font-Family | Verwendung |
|-------|----------|-------------|------------|
| **Hero** |
| `hero-large` | clamp(2.4-5.4rem) | `font-display` | Hero Haupt-Headline |
| `hero` | clamp(1.44-3.36rem) | `font-display` | Hero Sub-Headline |
| **Headlines** |
| `h1` | 48px | `font-display` | Main headline |
| `h2` | 36px | `font-display` | Section headline |
| `h3` | 30px | `font-display` | Subsection headline |
| `h4` | 24px | `font-display` | Small headline |
| **Body** |
| `body` | 18px | `font-primary` | Base body text (ALLE!) |
| `body-lg` | 20px | `font-primary` | Large body text |
| **Labels** |
| `label` | ~15px | `font-primary` | Labels (uppercase, tracking) |
| `subline` | 16px | `font-primary` | Sublines |
| `list` | 16px | `font-primary` | List items |
| **Quotes** |
| `quote-featured` | 36px | `font-display` | Große Zitate |
| `quote` | 24px | `font-display` | Standard Zitate |
| **Author** |
| `author-name` | 32px | `font-display` | Autoren-Namen |
| `description` | 26px | `font-display` | Kurzbeschreibungen |
| `summary-large` | 26px | `font-primary` | Summary |
| `body-narrative` | 18px | `font-display` | Narrative (Serif!) |
| **Metadata** |
| `date` | 14px | `font-primary` | Date |
| `disclaimer` | 12px | `font-primary` | Disclaimer (italic) |
| `read-more` | 14px | `font-primary` | Buttons |
| `button-text` | 14px | `font-primary` | Button-Texte |
| `source-link` | 14px | `font-primary` | Quellen-Links |
| `hint` | 14px | `font-primary` | Hint (italic) |
| `icon` | 16px | `font-primary` | Icons |

### Colors (AKTUELL - aus tailwind.config.js)

**⚠️ CRITICAL: Nur diese Farben verwenden! Alle `brand.*` und `transcript.*` sind LEGACY!**

---

#### 1. General Purpose (Backgrounds)
| Token | Wert | Verwendung |
|-------|------|------------|
| `color-bg-light` | #EDE7DC | Heller Hintergrund |
| `color-bg-medium` | #E5DFD5 | Mittlerer Hintergrund |
| `color-bg-dark` | #224160 | Dunkler Hintergrund |

---

#### 2. Semantic Names (✅ NUR diese verwenden für Text auf Hell!)
| Token | Wert | Verwendung |
|-------|------|------------|
| `text-color-heading` | #224160 | Headlines auf Hell |
| `text-color-body` | #5A5550 | Body auf Hell |
| `text-color-label` | #7696AD | Labels auf Hell |
| `text-color-accent` | #2DAD71 | Akzente (Grün) |

---

#### 3. ON-DARK (✅ NUR diese verwenden für Text auf Dunkel!)
| Token | Wert | Verwendung |
|-------|------|------------|
| `text-on-dark` | #FFFFFF | Weiß auf Dunkel |
| `text-on-dark-heading` | #ffffff | Headlines auf Dunkel |
| `text-on-dark-quote` | #ffffff | Zitate auf Dunkel |
| `text-on-dark-body` | #FFFFFFCC (80%) | Body auf Dunkel |
| `text-on-dark-role` | #ffffff9c (60%) | Rollen auf Dunkel |
| `text-on-dark-date` | #ffffff9c (60%) | Daten auf Dunkel |
| `text-on-dark-label` | #ffffff9c (60%) | Labels auf Dunkel |
| `text-on-dark-accent` | #ffffff | Akzente auf Dunkel |
| `text-on-dark-divider` | #ffffff33 (20%) | Trennlinien auf Dunkel |

---

#### ❌ LEGACY (NICHT verwenden in neuen Migrationen!)
| Token | Wert | Stattdessen verwenden... |
|-------|------|--------------------------|
| `text-brand-deep` | #224160 | → `text-color-heading` (Hell) oder `text-on-dark-heading` (Dunkel) |
| `text-brand-body` | #5A5550 | → `text-color-body` (Hell) oder `text-on-dark-body` (Dunkel) |
| `text-brand-steel` | #7696AD | → `text-color-label` (Hell) oder `text-on-dark-label` (Dunkel) |
| `text-brand-green` | #2DAD71 | → `text-color-accent` (Hell) oder `text-on-dark-accent` (Dunkel) |
| `text-brand-muted` | #5A5550 | → `text-color-body` |
| `text-brand-dark` | #1A2433 | → `text-on-dark` |
| `text-brand-cream` | #F0EBE1 | → `text-color-bg-light` (als Background) |
| `text-brand-sand` | #EDE7DC | → `text-color-bg-light` (als Background) |

---

### Common Patterns (3-Class Pattern - MIT KORREKTEN FARBEN!)

| Context | Pattern | Example |
|---------|---------|---------|
| **Headline (Light)** | `font-display` + `text-h2` + `text-color-heading` | Section titles |
| **Body (Light)** | `font-primary` + `text-body` + `text-color-body` | Paragraphs |
| **Label (Light)** | `font-primary` + `text-label` + `text-color-label` | Metadata labels |
| **Quote (Dark)** | `font-display` + `text-quote` + `text-on-dark-quote` | Testimonials |
| **Author Name (Dark)** | `font-display` + `text-author-name` + `text-on-dark-heading` | Researcher names |
| **Role (Dark)** | `font-primary` + `text-list` + `text-on-dark-role` | Researcher roles |
| **Date (Dark)** | `font-primary` + `text-date` + `text-on-dark-date` | Researcher dates |

### Spacings (Utilities)
| Hardcoded | Utility | Usage |
|-----------|---------|-------|
| `mb-16` | `.section-block-spacing` | Section Block Abstand |
| `mb-8` | `.content-spacing-lg` | Großer Content Abstand |
| `mb-6` | `.content-spacing` | Standard Content Abstand |
| `mb-4` | `.content-spacing-md` | Kleiner Content Abstand |
| `py-20 md:py-28` | `.section-padding` | Section Padding |
| `mb-2` | `.label-heading-spacing` | Label zu Heading Abstand |
| `mb-1` | `.name-role-spacing` | Name zu Role Abstand |
| `mb-1` | `.role-date-spacing` | Role zu Date Abstand |
| `mb-3` | `.block-label-spacing` | Block zu Label Abstand |

### ⚠️ IMPORTANT: Separate Classes Required

**Tailwind limitation:** fontSize tokens CANNOT include fontFamily or color.

**Therefore EVERY typography element needs:**
```jsx
// ✅ CORRECT - 3 separate classes
className="font-display text-h2 text-brand-deep"

// ❌ WRONG - expecting single token to do everything
className="text-h2"  // Missing font-family and color!
```

**This is why hardcoded values persist:**
1. Font-family class forgotten → falls back to default
2. Color class forgotten → falls back to default
3. Both easily missed in migration!

---

## MIGRATION LOG TEMPLATE

```markdown
# Migration Log: SECTIONNAME

**Date:** YYYY-MM-DD HH:MM
**Migrated By:** [Agent Name]
**Complexity:** Simple/Medium/Complex
**Status:** ✅ Success / ❌ Failed / ⚠️ Issues

## Section Analysis

### Hardcoded Values Found:
- **Font Sizes:** [list with line numbers]
- **Font Families:** [list with line numbers]
- **Colors:** [list with line numbers]
- **Spacings:** [list with line numbers]
- **Other:** [list with line numbers]

### Token Mapping:
| Hardcoded | Token | Verified? |
|-----------|-------|-----------|
| [value] | [token] | ✅/❌ |

### Missing Tokens Identified:
- [List any tokens that needed to be created]

## Migration Changes

### Files Modified:
- `frontend/src/components/sections/SECTIONNAME.jsx`

### Changes Made:
1. [List specific changes]
2. [List specific changes]
3. [List specific changes]

### Lines Changed:
- Added: [count] lines
- Removed: [count] lines
- Modified: [count] lines

## Validation Results

### Build: ✅ Pass / ❌ Fail
```
[Build output or errors]
```

### typo-demo: ✅ Pass / ❌ Fail
- Section renders: ✅ / ❌
- DebugLabels work: ✅ / ❌
- Responsive works: ✅ / ❌

### Code Review: ✅ Approved / ❌ Rejected
- DRY: ✅ / ❌ [comments]
- KISS: ✅ / ❌ [comments]
- YAGNI: ✅ / ❌ [comments]
- SOC: ✅ / ❌ [comments]
- SSOT: ✅ / ❌ [comments]

### Hardcoded Values Check:
- Font Sizes: [count] remaining
- Font Families: [count] remaining
- Colors: [count] remaining
- Spacings: [count] remaining

## Issues Found

### Critical:
- [List any critical issues]

### Medium:
- [List any medium issues]

### Low:
- [List any low issues]

## Lessons Learned

### What Went Well:
- [What worked well in this migration]

### What Could Be Improved:
- [What could be improved for next migration]

### Recommendations:
- [Recommendations for future migrations]

## Git Information

### Commit:
- Hash: [commit hash]
- Message: [commit message]
- Branch: [branch name]

### Rollback Command (if needed):
```bash
git revert [commit-hash]
git push origin main
```

## Next Steps

- [ ] Add to App.js
- [ ] Test on live site
- [ ] Archive legacy version
- [ ] Update progress tracker
```

---

## ROLLBACK PROCEDURES

### Quick Rollback (< 5 min)
```bash
# Discard changes to specific file
git checkout HEAD -- frontend/src/components/sections/SECTIONNAME.jsx

# Or revert last commit
git revert HEAD
```

### Complete Rollback (< 10 min)
```bash
# Reset to before migration started
git reset --hard [pre-migration-commit]

# Force push (if already pushed)
git push origin [branch] --force
```

### Selective Rollback (< 15 min)
```bash
# Keep some changes, discard others
git checkout HEAD -- frontend/src/components/sections/BADSECTION.jsx
git add frontend/src/components/sections/BADSECTION.jsx
git commit -m "rollback: Revert BADSECTION migration"
```

---

## SUCCESS CRITERIA

### Per-Section Success
- ✅ Alle hardcoded Typography Werte ersetzt
- ✅ Alle DebugLabels korrekt platziert
- ✅ Build succeeds ohne Errors
- ✅ typo-demo Testing bestanden
- ✅ Code Review bestanden
- ✅ 0 hardcoded Werte verbleiben

### Overall Success (Phase 3B)
- ✅ Alle 15+ Legacy Sections migriert
- ✅ 100% Typography Token Coverage
- ✅ 0 hardcoded Werte in Typography
- ✅ DebugLabels überall konsistent
- ✅ Keine Visual Regressions
- ✅ Performance erhalten

---

## NEXT SESSION START PROMPT (FINAL)

**Copy this for the NEXT migration session:**

```
═══════════════════════════════════════════════════════════
   TYPOGRAPHY SECTION MIGRATION — AUTONOMOUS EXECUTION
═══════════════════════════════════════════════════════════

⚡ ONE COMMAND TO START — INVOKE /multiloop ⚡

INSTEAD of manually following phases below, simply invoke:

/multiloop migrate [section name]

Example:
/multiloop migrate BookingSection

That's it! The /multiloop skill will orchestrate everything below.

─────

OR... if you want to understand what /multiloop does:

YOU ARE NOW IN AUTONOMOUS MIGRATION MODE.

PHASE 0: SESSION START
⚠️ FIRST: INVOKE /multiloop migrate [section name]
1. Read memory/typography-editor-attempt.md
2. Read memory/section-migration-systematic-approach.md
3. Read docs/section-migration-plan.md (this file)
4. Read docs/typography-refactoring-plan.md — COPY sections patterns
5. Read docs/typography-refactoring-phase4-plan.md — ⚠️ Why hardcoded values persist
6. Verify current tokens in tailwind.config.js
7. Check Progress Tracker (which sections are done?)
8. Select next section from Priority List

PHASE 1: LOAD CONTEXT
- Load all memory files
- Verify token system
- Check environment

PHASE 2: DECOMPOSE
- Analyze target section
- Find all hardcoded values
- Create token mapping
- Define subtasks

PHASE 3: ASSIGN
- Launch Typography Analyzer
- Launch Migration Implementer
- Launch Code Review Expert
- Launch Migration Validator

PHASE 4: COLLECT
- Gather all agent reports
- Verify all criteria met

PHASE 5: VERIFY & LOOP BACK
- Run build test
- Run typo-demo test
- Run grep verification
- Loop back if issues found

PHASE 6: SYNTHESIZE
- Create migration report
- Combine all results

PHASE 7: PERSIST
- Save migration log
- Update progress tracker
- Create git diff

PHASE 8: PRESENT
- Show results to user
- Ask for feedback
- Next steps

═══════════════════════════════════════════════════════════

TARGET: 100% PERFECTION
- 0 hardcoded typography values
- All from tailwind.config.js
- All DebugLabels present
- Visual regression: 0%

AFTER 2-3 SECTIONS:
- Review patterns
- Optimize workflow
- Switch to batch mode (3-5 sections)

═══════════════════════════════════════════════════════════

START NOW: Which section is next in Priority List?
```

---

## Migration Logs

### WelcomeSection ✅ Complete (2026-03-27)

**Complexity:** Medium
**Time:** ~15 min
**Status:** SUCCESS

**Changes Made:**
- Created WelcomeSectionCopy.jsx (Copy-Workflow)
- Replaced `ring-brand-sand` → `ring-color-bg-light` (semantic)
- Greeting → `text-h1` (48px)
- Opening quote `"` → `text-quote-featured` (36px)
- Body quotes → `text-quote-featured` (36px)
- All colors → semantic tokens

**Critical Preserved:**
- ✅ SectionWrapper, LazyImage, Signature
- ✅ `id="welcome"` anchor

**QA:** ✅ Build succeeds, typo-demo updated (7 Sections)

---

### ServicesSection ✅ Complete (2026-03-27)

**Complexity:** Simple
**Time:** ~15 min
**Status:** SUCCESS

**Changes Made:**
- Created ServicesSectionCopy.jsx (Copy-Workflow)
- Replaced `text-xs` → `text-label`
- Replaced `tracking-[0.18em]` → `tracking-label-alt`
- Replaced `text-label` → `text-color-label`
- Replaced `mb-1.5` → `block-label-spacing`
- Replaced `text-xl md:text-2xl` → `text-h4`
- Replaced `text-heading` → `text-color-heading`
- Replaced `font-sans` → `font-primary`
- Replaced `font-serif` → `font-display`
- Added DebugLabel wrappers (2 elements)

**Critical Preserved:**
- ✅ `id="services"` — Hero scroll target (scrolling now works!)

**QA:**
- ✅ Build succeeds
- ✅ Code review: APPROVED
- ✅ typo-demo updated (6 Sections)

---

### HeroV3Section ✅ Complete (2026-03-27)

**Complexity:** Medium
**Time:** ~30 min
**Status:** SUCCESS

**Changes Made:**
- Replaced `font-serif` → `font-display` (lines 19, 33)
- Replaced inline `style={{ fontSize: 'clamp(2.4rem, 6.6vw, 5.4rem)' }}` → `text-hero-large` (line 21)
- Replaced inline `style={{ fontSize: 'clamp(1.44rem, 3.84vw, 3.36rem)' }}` → `text-hero` (lines 26, 33)
- Replaced `text-heading` → `text-color-heading` (lines 21, 26, 33, 61)
- Replaced hardcoded `size={80}` → `w-20 h-20` Tailwind classes (line 61)
- Replaced inline `style={{ animation: ... }}` → `animate-[scrollFade_2s_ease-in-out_infinite]` (line 61)
- Added DebugLabel wrappers (3 elements)
- Added debugMode prop to component

**Tokens Used:**
- `text-hero-large` — Main headline (first line)
- `text-hero` — Secondary headline (second line + CTA)
- `text-color-heading` — Dark blue color
- `font-display` — Cormorant Garamond serif

**QA:**
- ✅ Build succeeds
- ✅ No inline styles remaining
- ✅ No hardcoded values
- ✅ All DebugLabels present and correct
- ✅ typo-demo updated

**Lessons Learned:**
- Hero sections have more than just typography (animations, icon sizes)
- Use `w-20 h-20` instead of `size={80}` for lucide-react icons
- Use `animate-[...]` for custom animations instead of inline styles

---

### StatementSection ✅ Complete (2026-03-27)

**Complexity:** Simple
**Time:** ~10 min
**Status:** SUCCESS

**Changes Made:**
- Created StatementSectionCopy.jsx (Copy-Workflow)
- Replaced `font-serif` → `font-display`
- Replaced `text-2xl md:text-3xl lg:text-4xl` (featured line) → `text-h3`
- Replaced `text-xl md:text-2xl lg:text-3xl` (normal lines) → `text-h4`
- Replaced `text-heading` → `text-color-heading` (semantic)
- Replaced `text-body` → `text-color-body` (semantic)

**Tokens Used:**
- `text-h3` — Featured line (30px) + italic
- `text-h4` — Normal lines (24px)
- `text-color-heading` — Dark blue semantic color
- `text-color-body` — Warm gray semantic color
- `font-display` — Cormorant Garamond serif

**Critical Preserved:**
- ✅ SectionWrapper with `id="statement"` (scroll target)
- ✅ Map over `statement.lines` from content layer
- ✅ Border styling (border-black/10)

**QA:**
- ✅ Build succeeds
- ✅ No hardcoded values remaining
- ✅ typo-demo updated (9 Sections)

---

**Last updated:** 2026-03-27 16:30
**Status:** Phase 3B: 94% COMPLETE (16/17 Sections)
**Next action:** Migrate PodcastVideoSection — THE LAST ONE!
