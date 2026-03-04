# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React app for "Regression" (Past Life Regression sessions by Benjamin Kurtz), deployed via Cloudflare Pages. Only the `frontend/` directory is deployed — the monorepo structure exists for future expansion but currently contains no active backend.

**Tech Stack:** React 19, React Router v7, Tailwind CSS, npm

## Deployment Rules (Critical)

### Feedback Guidelines
**WICHTIG:** Wenn der Benutzer Feedback gibt, bezieht es sich auf der **LIVE SITE** (Production), nicht auf localhost — es sei denn, der Benutzer sagt explizit "test locally" oder ähnlich.

### Cloudflare Pages Configuration
- Root directory: `frontend`
- Build command: `npm run build`
- Build output: `build/`
- Environment variable: `CI=false` (required to prevent build failures from warnings)

### Git Workflow
- **Never work directly on `main`** — always create a branch, push, and open a PR
- Only merge after Cloudflare preview deploy is green
- This repo uses **npm only** — no yarn, no pnpm

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

# Development server
npm --prefix frontend start

# Production build (run before every push)
npm --prefix frontend run build

# Run tests
npm --prefix frontend test
```

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

## Known Issues from Code Review

1. **Footer** (`frontend/src/components/Footer.jsx`): Contains hardcoded German strings and imports `plr-de.js` directly. Should receive footer data via props/context from a content provider.

2. **TranscriptPage** (`frontend/src/pages/TranscriptPage.jsx`): Mixes UI, hardcoded German strings, and transcript data. Transcript content should be extracted to `frontend/src/content/transcripts/<episode>.de.js`.

3. **No i18n system**: A minimal implementation would need:
   - `frontend/src/content/plr-en.js`
   - `frontend/src/content/index.js` exporting `getContent(lang)`
   - A `useContent()` hook
   - Components should call `useContent()` instead of importing `plr-de.js` directly

4. **backend/ folder**: Misleading — no backend is currently deployed. Remove or add a clarifying note.

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
