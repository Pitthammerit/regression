# Regression – Cloudflare + Claude Code Workflow + Code Notes (must-read)

This project/repository is deployed with Cloudflare Pages.
Claude Code must follow the rules below to avoid breaking production.

## 1) Cloudflare Pages deployment settings (do not change)

Cloudflare Pages builds ONLY the React app inside `frontend/`.

- Root directory: `frontend`
- Build command: `npm run build`
- Build output directory: `build`
- Environment variable in Cloudflare Pages:
  - `CI=false` (otherwise build can fail due to warnings)

Routing:
- If deep links like `/transkript` or `/transcript` must work on refresh, keep SPA fallback.
- Current state: we intentionally keep redirects out for now. If deep links ever break, add SPA fallback again.

## 2) Claude Code workflow rules (must follow)

### Rule A: Never work directly on main
- Always create a branch.
- Push the branch.
- Open a PR into `main`.
- Merge only when Cloudflare preview deploy is green.

### Rule B: This repo uses npm (no yarn, no pnpm)
Do:
- use npm only
- keep `frontend/package-lock.json` in sync

Do NOT:
- create `yarn.lock` or `pnpm-lock.yaml`
- run yarn/pnpm commands

### Rule C: If dependencies change, lockfile must be updated
If `frontend/package.json` changes, Claude must also update and commit:
- `frontend/package-lock.json`

Mandatory commands (no `cd frontend` needed):
- install/update deps:
  - `npm --prefix frontend install`
- production build check (before every push):
  - `npm --prefix frontend run build`

### Rule D: No secrets in the repo
- Do not commit `.env` files with real values.
- Put environment variables only in Cloudflare Pages settings.

## 3) Current app behavior that can confuse you (important)

### A) `/gt` shows “nothing”
Reason:
- There is no catch-all route in React Router.
- If no route matches, the app renders nothing.

Required improvement:
- Add a fallback route in `frontend/src/App.js`:
  - `path="*"` should show a NotFound page or redirect to the main page.

### B) “Kein Zugang” on `/transkript`
This is NOT Cloudflare.
This is a token gate inside the React app.

- `frontend/src/pages/TranscriptPage.jsx` checks `?token=...`
- If token is missing or wrong, it shows:
  - “Kein Zugang. Dieser Link ist nicht gültig oder abgelaufen.”

Required improvement:
- Decide one of these:
  1) Make transcript public:
     - Remove token gating completely.
  2) Keep token gating:
     - Require a share-link like:
       `/transkript?token=YOUR_TOKEN`
     - Set Cloudflare env var:
       `REACT_APP_TRANSCRIPT_TOKEN=YOUR_TOKEN`

Note:
- This token gate is not real security. It is “link friction”.
- Anyone who gets the link can share it.

## 4) Fast troubleshooting

### Cloudflare fails with lockfile sync error (`npm ci` out of sync)
Fix:
- `npm --prefix frontend install`
- commit `frontend/package-lock.json`
- push

### Cloudflare build fails due to CI warnings
Fix:
- Cloudflare Pages env var must exist:
  - `CI=false`

### Deep links break (refresh on /transkript shows error/404)
Fix:
- Add SPA fallback file:
  - `frontend/public/_redirects`
- Content:
  - `/*    /index.html   200`
- Redeploy

## 5) Definition of done for every PR
Before merging:
- `npm --prefix frontend run build` succeeds locally
- Cloudflare preview deploy is green
- If dependencies changed:
  - `frontend/package-lock.json` is included in the PR
- No new hardcoded German strings in UI components:
  - all user-facing text must live in the content layer
