# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React app for "Regression" (Past Life Regression sessions by Benjamin Kurtz), deployed via Cloudflare Pages. Only the `frontend/` directory is deployed — the monorepo structure exists for future expansion but currently contains no active backend.

**Tech Stack:** React 19, React Router v7, Tailwind CSS, npm

## Deployment Rules (Critical)

### Feedback Guidelines
**WICHTIG:**
- Der Benutzer testet **immer im Browser (LIVE SITE)**, nicht auf localhost
- **Claude soll IMMER nach Änderungen pushen** — nicht warten auf User-Input
- Cloudflare deployed automatisch → Benutzer prüft live
- Es sei denn, der Benutzer sagt explizit "test locally" oder "warte mit push"

### GitHub Direct Edit Workflow
User sometimes edits `frontend/src/content/plr-de.js` directly on GitHub. When local changes conflict:
```bash
git stash push -m "WIP: description"
git pull origin main
# Fix any merge conflicts or syntax errors
git stash pop
```
Common syntax error: missing commas in array literals (check line endings in `whatIs.body`)

### Cloudflare Pages Configuration
- Root directory: `frontend`
- Build command: `npm run build`
- Build output: `build/`
- Environment variable: `CI=false` (required to prevent build failures from warnings)

### Git Workflow

**Small vs Large Changes:**

| Change Type | Workflow | Rationale |
|-------------|----------|-----------|
| **Small changes** (typos, minor copy edits, content tweaks) | Push directly to `main` → test live on production | Low risk, easy to rollback if needed |
| **Large refactorings** (component changes, new features, architectural updates) | Create branch → push → open PR → test on Cloudflare preview → merge | High risk, needs testing before production |

**Examples:**
- ✅ **Small:** Fixing a typo in `plr-de.js`, changing a color class, updating testimonial text
- ❌ **Large:** Refactoring EvidenceSection, adding new component, changing routing logic

**Standard workflow for all changes:**
1. Build locally: `npm --prefix frontend run build`
2. Commit changes with meaningful message
3. Push to remote (branch or main depending on change size)
4. Cloudflare deploys automatically
5. Test on deployed URL

**This repo uses npm only** — no yarn, no pnpm

### Dependency Changes
If `frontend/package.json` changes:
```bash
npm --prefix frontend install
npm --prefix frontend run build  # verify build succeeds
```
Then commit BOTH `package.json` and `package-lock.json`. Cloudflare runs `npm ci` and will fail if lockfile is out of sync.

**Emergency lockfile sync:** A GitHub Action (`.github/workflows/sync-lockfile.yml`) can be manually dispatched to rescue a stale lockfile.

## Commands

All commands use `--prefix frontend` — no `cd frontend` needed:

```bash
# Install/update dependencies
npm --prefix frontend install

# Development server (with HMR - auto-refresh on file changes)
npm --prefix frontend run dev

# Legacy dev server (use `dev` instead)
npm --prefix frontend start

# Production build (run before every push)
npm --prefix frontend run build

# Run tests
npm --prefix frontend test
```

## Development Workflow

### Localhost Preview + Cloudflare Deploy

**Recommended workflow for fast iteration:**

1. **Start dev server once:** `npm --prefix frontend run dev`
   - Runs on http://localhost:3000
   - **HMR (Hot Module Replacement)**: Browser auto-refreshes on file changes
   - No manual restart needed — edit files and see changes immediately

2. **Make changes** → Browser updates automatically

3. **When satisfied with changes:**
   ```bash
   npm --prefix frontend run build
   git commit -m "..."
   git push origin main
   ```
   - Cloudflare deploys automatically
   - Test live on production URL

### HMR (Hot Module Replacement)

Create React App includes HMR — when you save a file:
- Browser refreshes automatically (no F5 needed)
- React state is preserved during most changes
- CSS updates appear instantly

**If HMR stops working:**
- Check terminal — is dev server still running?
- If not: `npm --prefix frontend run dev` to restart
- Tell Claude: "sehe Änderungen nicht" → Claude will restart the server

## Architecture

### Routing
React Router is configured in `frontend/src/App.js`. Current routes:
- `/` — MainPage (landing page)
- `/transkript` — TranscriptPage (token-gated)

**Known issue:** No catch-all route (`path="*"`), so invalid URLs render blank. This should show a NotFound component.

### Content Layer
Content lives in `frontend/src/content/plr-de.js` (German only). Components import content directly:
```js
import { header, footer } from './content/plr-de'
```

**Content management patterns:**
- Multi-line text: use template strings with `whitespace-pre-line` CSS class for proper line breaks
- Attribution links: add `sourceLabel` and `sourceUrl` fields to content objects
- Section IDs must match menu anchors (e.g., `#science` → `id="science"` in section component)
- **Radix UI preferred**: Use @radix-ui/react-* components for accessible primitives (AspectRatio, Accordion, etc.)

**Self-Service Content Files** (Sprint 1 — March 2026):
- `frontend/src/config/sections.config.js` — Controls section order. User can reorder sections by changing array order.
- `frontend/src/content/testimonials.list.js` — Dynamic testimonials list with automatic numbering. User can add/remove testimonials.

**How it works:**
- `sections.config.js` exports `SECTIONS_ORDER` array
- `App.js` maps section names to components and renders dynamically
- `TestimonialsSection` and `TestimonialCarousel` import from `testimonials.list.js`
- No code changes needed — user edits config files

**Limitations:** No i18n system exists. English content is not implemented. All user-facing text should move to the content layer, but many components still have hardcoded German strings (notably `Footer.jsx` and `TranscriptPage.jsx`).

### Section Components
`frontend/src/components/sections/` contains active section components used in the main application. The primary hero section is `HeroV3Section` — this is the only hero variant currently in production.

**Active Sections:**
- `HeroV3Section` — Main hero with background image
- `TestimonialsSection` — Client testimonials grid layout
- `TestimonialCarousel` — Client testimonials carousel with auto-rotation
- `PodcastSection`, `PodcastVideoSection` — Podcast integration
- `CaseStudiesSection`, `ServicesSection`, `WelcomeSection`, etc.

**Image Optimization:**
- **Keine Build-time oder CDN-Optimierung** aktiviert
- Bilder werden direkt von R2 ausgeliefert
- `LazyImage` Component verwendet native lazy loading (`loading="lazy"`)
- Vor dem Upload zu R2 sollten Bilder manuell optimiert werden (TinyPNG, Squoosh, etc.)
- `HeroV3Section` — Main hero with background image
- `TestimonialsSection` — Client testimonials grid layout
- `TestimonialCarousel` — Client testimonials carousel with auto-rotation
- `PodcastSection`, `PodcastVideoSection` — Podcast integration
- `CaseStudiesSection`, `ServicesSection`, `WelcomeSection`, etc.

**Experimental variants:** Previous hero section iterations (`HeroAlt1.jsx`, `HeroAlt2.jsx`, `HeroAlt3.jsx`, `HeroV2Section.jsx`) have been moved to `frontend/src/components/experiments/` for potential future A/B testing. These are not maintained and may become outdated.

### Transcript Token Gate
The `/transkript` route checks `?token=...` against `REACT_APP_TRANSCRIPT_TOKEN` env var. Without a valid token, it shows "Kein Zugang. Dieser Link ist nicht gültig oder abgelaufen."

## Self-Service Features (User-Managed Content)

**As of Sprint 1 (March 2026), users can now manage certain content without developer assistance:**

### Section Reordering
File: `frontend/src/config/sections.config.js`

Users can change the order of website sections by editing the `SECTIONS_ORDER` array:
```javascript
export const SECTIONS_ORDER = [
  'HeroV3Section',
  'TestimonialCarousel',  // Move this to change order
  'ServicesSection',
  // ...
]
```

**Rules for users:**
- Keep section names in quotes
- Comma-separate each line (except last)
- Don't change section names — only reorder

### Dynamic Testimonials
File: `frontend/src/content/testimonials.list.js`

Users can add, remove, or reorder testimonials:
```javascript
export const TESTIMONIALS_LIST = [
  {
    name: "Anna K.",
    context: "Health Coach, Deutschland",
    quote: "Durch Benjamins Ruhe...",
    image: "https://...",
  },
  // Add more here...
]
```

**Automatic behavior:**
- Numbering handled by array position (0, 1, 2, 3...)
- TestimonialsSection displays first testimonial as featured (full height)
- TestimonialCarousel shows all testimonials in rotating slides
- Grid layout adjusts automatically to count

**When user makes changes:**
1. They edit the config file
2. Run build: `npm --prefix frontend run build`
3. Commit and push
4. Cloudflare deploys automatically

### Dynamic Authorities (Phase 2 Complete)
File: `frontend/src/content/plr-de.js` — `evidence.authors` array

Users can add, remove, or reorder scientific authorities:
```javascript
export const evidence = {
  authors: [
    {
      id: "ian-stevenson",
      name: "Ian Stevenson MD",
      role: "University of Virginia, DOPS",
      lifeDates: "*1918–2007",
      portrait: "https://...",
      quote: "The evidence suggesting reincarnation is real...",
      shortVersion: "Kurztext (2-3 Sätze)...",
      longVersion: "Langtext...",
      sourceLabel: "Quelle",
      sourceUrl: "https://...",
    },
    // Add more here...
  ]
}
```

**Automatic behavior:**
- EvidenceSection (upper tier): 4-column grid with portraits + English quotes
- EvidenceSection (lower tier): Accordion cards with `shortVersion` + expandable `longVersion`
- EvidenceQuotesSection: 3 researchers with portraits + quotes (filters for `portrait !== null`)
- New authorities appear automatically in all sections

**Field naming (March 2026):**
- `lifeDates` (not `dates`) — for author lifetimes
- `shortVersion` (not `shortQuote`) — for accordion preview text
- `longVersion` — for expandable accordion content
- `sourceLabel` + `sourceUrl` — for attribution links

### Dynamic Resources (NEW — Phase 3)
File: `frontend/src/content/plr-de.js` — `evidence.resources` array

Users can add journals, books, audiobooks:
```javascript
export const evidence = {
  resources: [
    {
      type: "journal",
      name: "International Journal of Regression Therapy",
      dates: "1986–heute",
      url: "https://regressionjournal.org",
      role: "regressionjournal.org",
      portrait: "https://...",
      description: "Das Journal ist...",
      sourceLabel: "Quelle",
      sourceUrl: "https://regressionjournal.org",
    },
    {
      type: "book",
      name: "Many Lives, Many Masters",
      dates: "1988",
      authors: "Brian Weiss MD",
      url: "https://brianweiss.com/books/...",
      role: "brianweiss.com",
      portrait: "https://...",
      description: "Der internationale Bestseller...",
      sourceLabel: "Zum Buch",
      sourceUrl: "https://brianweiss.com/books/...",
    },
    // Add more resources (journals, books, audiobooks)...
  ]
}
```

**Automatic behavior:**
- EvidenceSection renders all resources with `resources.map()`
- Each resource shows: portrait, name, dates, role, description, source link
- Supports: `type: "journal" | "book" | "audiobook"` (extensible)

### Dynamic Podcasts (NEW — Phase 3)
File: `frontend/src/content/plr-de.js` — `podcasts` array

Users can add podcast episodes:
```javascript
export const podcasts = [
  {
    id: "berggesundheit-052",
    label: "IM PODCAST, FOLGE #52",
    headline: "Reinkarnation: Was, wenn der Tod nicht das Ende ist?",
    // ... more fields
  },
  // Add more episodes...
]
```

**Automatic behavior:**
- PodcastSection and PodcastVideoSection use `podcasts[0]` for backwards compatibility
- Future: `.map()` over array to show multiple episodes

### Dynamic Authorities (NEW — Phase 2)
File: `frontend/src/content/plr-de.js` — `evidence.authorities` array

Users can add, remove, or reorder scientific authorities:
```javascript
export const evidence = {
  authorities: [
    {
      id: "ian-stevenson",
      name: "Ian Stevenson MD",
      quote: "English quote for upper tier",
      shortVersion: "Kurztext (2-3 Sätze)...",
      longVersion: "Langtext...",
      sourceLabel: "Quelle",
      sourceUrl: "https://...",
      // ... more fields
    },
    // Add more here...
  ]
}
```

**Automatic behavior:**
- Upper tier (4-column grid): Shows `portrait` + `quote` (English)
- Lower tier (accordion cards): Shows `shortVersion` + expandable `longVersion`
- New authorities appear automatically in both sections

**What NOT to tell users to edit:**
- Component files (`frontend/src/components/`)
- App.js structure
- Tailwind config (colors should only be changed with developer assistance)

## EvidenceSection Architecture (March 2026 — Phase 3 Complete)

**Current status:** Phase 3 implemented — all content now dynamic (authors + resources).

**Two Evidence Sections:**
1. **EvidenceSection** (`id="science"`) — Main section with:
   - Upper tier: 4-author portrait grid with English quotes
   - Lower tier: Accordion cards with `shortVersion`/`longVersion`
   - Bottom: Resources (journal + books)

2. **EvidenceQuotesSection** (`id="evidence-quotes"`) — Compact quotes section:
   - 3 researchers with portraits (filters for `portrait !== null`)
   - Dark background (`bg-brand-deep`)
   - English quotes only

**Content structure in `plr-de.js`:**
```javascript
export const evidence = {
  authorBigLabel: "EVIDENZBASIERT",
  authorHeadline: "Was die Forschung sagt",
  accordion: {
    readMore: "Mehr lesen",
    readLess: "Weniger lesen",
  },
  authors: [
    {
      id: "ian-stevenson",
      name: "Ian Stevenson MD",
      role: "University of Virginia, DOPS",
      lifeDates: "*1918–2007",
      portrait: "https://...",
      quote: "The evidence suggesting reincarnation is real...",
      shortVersion: "Über 2.500 dokumentierte Kinderfälle...",
      longVersion: "Ian Stevenson gilt als Begründer...",
      sourceLabel: "Quelle",
      sourceUrl: "https://...",
    },
    // ... 3 more authors (Jim Tucker, Brian Weiss, Roger Woolger)
  ],
  resources: [
    {
      type: "journal",
      name: "International Journal of Regression Therapy",
      dates: "1986–heute",
      // ... journal fields
    },
    {
      type: "book",
      name: "Many Lives, Many Masters",
      dates: "1988",
      // ... book fields
    },
    // ... more resources (books, audiobooks)
  ],
}
```

**Implemented (Phase 2 — 2026-03-05):**
- ✅ All 4 authorities render dynamically from `evidence.authors` array
- ✅ `shortQuote` → `shortVersion` renamed for clarity
- ✅ `quote` field added to Ian Stevenson and Jim Tucker (English quotes for upper tier)
- ✅ `sourceLabel` + `sourceUrl` added to all authorities
- ✅ Accordion strings moved to content layer (`evidence.accordion.readMore/readLess`)
- ✅ Self-Service: Users can now add authorities by editing `plr-de.js`

**Implemented (Phase 3 — 2026-03-05):**
- ✅ `evidence.resources` array created (journal + books)
- ✅ EvidenceSection renders resources with `resources.map()`
- ✅ `podcasts` array created (extensible for future episodes)
- ✅ PodcastSection/PodcastVideoSection updated to use `podcasts[0]`
- ✅ Portrait URLs fixed (Brian Weiss + Roger Woolger)

**Accordion state:** Uses `useState` with `expandedId` pattern — only one card expanded at a time
**Responsive:** Mobile = photo above text, name above photo; Desktop = photo left, text right
**Images:** Uses native `LazyImage` component with R2 CDN URLs
**Section IDs:** `id="science"` (EvidenceSection), `id="evidence-quotes"` (EvidenceQuotesSection)

**Implemented pattern:**
- Upper tier: 4-column grid with portraits + English quotes (unchanged)
- Lower tier: Accordion card for Roger Woolger (single hardcoded example)

**Content structure in `plr-de.js` (authorities array):**
```javascript
{
  id: "roger-woolger",
  name: "Roger Woolger PhD",
  dates: "*1944–2011",
  role: "Jungian Analytiker, Regressionstherapeut, Lehrer",
  portrait: "https://...",
  quote: "The body never lies...", // English quote for upper tier
  shortVersion: "Kurztext (2-3 Sätze)...",
  longVersion: "Langtext (mehrere Absätze)...",
  sourceLabel: "Quelle",
  sourceUrl: "https://..."
}
```

**Implemented (Phase 2 — 2026-03-05):**
- ✅ All 4 authorities render dynamically from `evidence.authorities` array
- ✅ `shortQuote` → `shortVersion` renamed for clarity
- ✅ `quote` field added to Ian Stevenson and Jim Tucker (English quotes for upper tier)
- ✅ `sourceLabel` + `sourceUrl` added to all authorities
- ✅ Accordion strings moved to content layer (`evidence.accordion.readMore/readLess`)
- ✅ Self-Service: Users can now add authorities by editing `plr-de.js` → appears automatically

**Accordion state:** Uses `useState` with `expandedId` pattern — only one card expanded at a time
**Responsive:** Mobile = photo above text, name above photo; Desktop = photo left, text right
**Images:** Uses native `LazyImage` component with R2 CDN URLs
**Section ID:** `id="science"` — matches menu anchor `#science`

## Known Issues from Code Review

1. **No i18n system**: A minimal implementation would need:
   - `frontend/src/content/plr-en.js`
   - `frontend/src/content/index.js` exporting `getContent(lang)`
   - A `useContent()` hook
   - Components should call `useContent()` instead of importing `plr-de.js` directly

2. **backend/ folder**: Misleading — no backend is currently deployed. Remove or add a clarifying note.

**Resolved (2026-03-05):**
- ~~Footer hardcoded strings~~ — All strings now from `footerContent` and `data` props
- ~~TranscriptPage hardcoded strings~~ — All strings now from `transcriptPage` and `episode52` content files

## Deep Links

If deep links like `/transkript` break on refresh, add SPA fallback via `frontend/public/_redirects`:
```
/*    /index.html   200
```

## Development Principles

### No Hardcoding (CRITICAL)
- **Never hardcode colors, spacing, or styling values** — always use Tailwind CSS classes
- **All design tokens must be in `tailwind.config.js`** — brand colors, spacing, etc.
- **Inline styles are only for dynamic values** (e.g., `width: ${percent}%`)
- When adding colors: add to `tailwind.config.js` first, then use as Tailwind class
- Example: `className="bg-brand-deep text-brand-steel"` NOT `style={{ color: '#2D3F4E' }}`

### Component-Based Development
- **No hardcoded content** in components — always use the content layer or create content objects
- Prefer importing existing components over duplicating code
- If a user provides a component, use it. If you suggest creating one, create it.
- Keep components pure — receive data via props, not direct imports of content files

### Language & Communication
- **Ask the user in German** — default to German for questions and explanations
- **Write all code in English** — variable names, comments, file names
- **User-facing text goes in content layer** — currently German (`plr-de.js`), with goal of bilingual support

### Bilingual Goal
The website should become bilingual (German/English). When adding features or refactoring:
1. Keep the content layer structure i18n-ready
2. Don't mix languages in components
3. Future: Create `plr-en.js` and implement language switching mechanism

## Multiagent Orchestration

For complex tasks, use specialized agents in this workflow:

```
1. Planning Phase
   ├─ Plan agent: Design implementation approach for features
   └─ silicon-valley-creative-director: For UX/design decisions

2. Implementation Phase
   ├─ frontend-developer: Build React components, Tailwind styling
   ├─ senior-architect-innovator: Architectural decisions (i18n, content layer)
   └─ backend-architect: If backend features are added

3. Quality Phase
   ├─ feature-dev:code-reviewer: Review code before commits
   └─ test-writer-fixer: Ensure tests pass

4. Deployment Phase
   ├─ devops-automator: Handle Cloudflare deployment
   └─ version-control-orchestrator: Manage branches, commits, PRs

5. Polish Phase (after UI/UX changes)
   └─ whimsy-injector: Add delightful touches proactively
```

**When to use multiple agents:**
- Simple typo fixes: Single agent, direct edit
- New feature: Plan → Implement → Review → Deploy sequence
- Refactoring: senior-architect-innovator → frontend-developer → code-reviewer
- Design changes: silicon-valley-creative-director → frontend-developer → whimsy-injector

### Subagent Loop Pattern

For complex multi-file changes, use this standardized loop:

```
┌─────────────────────────────────────────────────────────────┐
│                    SUBAGENT LOOP                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. EXPLORE (optional, for unknown codebases)               │
│     └─ Launch 1-3 Explore agents to understand patterns    │
│                                                              │
│  2. PLAN (required for non-trivial tasks)                   │
│     └─ Plan agent designs implementation approach          │
│                                                              │
│  3. IMPLEMENT (always with subagent)                        │
│     └─ frontend-developer / senior-architect-innovator     │
│                                                              │
│  4. REVIEW (always with subagent)                           │
│     └─ feature-dev:code-reviewer validates changes         │
│                                                              │
│  5. LOOP BACK if issues found                               │
│     └─ Fix → Re-review → Verify                            │
│                                                              │
│  6. COMMIT (version-control-orchestrator)                   │
│     └─ Create meaningful commit messages                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Loop Exit Conditions:**
- ✅ Code reviewer approves
- ✅ Build succeeds
- ✅ Tests pass
- ✅ No console errors

**Example: Multi-file Refactor**
```js
// 1. EXPLORE: Find all components using pattern X
// 2. PLAN: Design refactoring approach
// 3. IMPLEMENT: frontend-developer makes changes
// 4. REVIEW: code-reviewer validates
// 5. LOOP: If issues → fix → re-review
// 6. COMMIT: version-control-orchestrator
```

## Task Tracking

### TODO.md Maintenance
A `TODO.md` file must be kept at the repository root and updated **after every iteration or commit**.

**Update rules:**
- **Rewrite** — don't append. Keep the file lean and current.
- Remove completed items entirely.
- Add new items at the top.
- Update status of in-progress items.
- Include context for items (e.g., "Footer: extract hardcoded strings to content layer")

After each significant change, run:
```bash
# Check if TODO.md needs updating
cat TODO.md
# If changed, commit it with the work
```
