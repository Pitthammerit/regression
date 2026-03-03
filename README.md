# Regression App — Deployment Rules (Cloudflare Pages)

This repo deploys a React app via Cloudflare Pages.

## What gets deployed

- Only the React app inside `frontend/` is deployed.
- Anything outside `frontend/` is not part of the Cloudflare Pages build.

## Cloudflare Pages settings (keep these)

- Root directory: `frontend`
- Build command: `npm run build`
- Build output directory: `build`
- Environment variables (Cloudflare Pages):
  - `CI=false` (prevents builds from failing due to warnings in CI)

## Local workflow (designed for Claude Code)

Rules:
- Always use npm.
- Never introduce yarn or pnpm in this repo.
- If dependencies change, the lockfile must be updated and committed.

### Commands (no `cd frontend` needed)

- Install deps (only when dependencies changed):
  - `npm --prefix frontend install`

- Production build (run before every push):
  - `npm --prefix frontend run build`

- Dev server:
  - `npm --prefix frontend start`

## Dependency rule (critical)

If you modify `frontend/package.json` (add/remove/update dependencies), you must also:
- run `npm --prefix frontend install`
- commit BOTH:
  - `frontend/package.json`
  - `frontend/package-lock.json`

Cloudflare may run `npm ci`.
If `package-lock.json` is out of sync, deployment will fail.

## GitHub Action (lockfile rescue)

This repo contains a GitHub Action that can sync `frontend/package-lock.json`.
Use it if you forgot to update the lockfile and Cloudflare fails with an `npm ci` sync error.

## Routing note

If you mount this app under a sub-path (example: `/regression` on another website),
ensure React Router + asset paths are configured accordingly (basename/public path),
otherwise internal navigation may jump to the domain root.
