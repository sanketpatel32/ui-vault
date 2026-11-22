# Contributing to UI Vault

UI Vault is a personal, frontend-only React hub that aggregates UI components from
15 free, vendorable sources into one categorized, searchable, previewable library.
There is no backend and there never will be one. Before contributing, read
[AGENTS.md](AGENTS.md) (operating guide) and [PLAN.md](PLAN.md) (build plan of record).

## Ground rules (non-negotiable)

1. **Registry-first.** Every component the UI shows must exist in
   `src/data/components/<source>.ts`. The UI is a view over the registry — never
   hardcode a component into a page.
2. **Vendorable sources only.** The registry carries only free, vendorable sources
   (free code + install command). Never vendor paid or gated code. `npm run
   registry:check` enforces the licensing guard; never re-add link-out entries or
   link-out-only sources.
3. **Vendored previews are frozen snapshots.** Each `src/showcase/<source>/<component>/`
   folder must record its origin URL and copy date in `src/showcase/README.md`.
   Don't "improve" vendored code — fix by re-copying upstream, and keep the
   attribution header.
4. **One primary category per entry**, and only slugs defined in
   `src/data/categories.ts`. Never invent slugs inline.
5. **No backend.** No API routes, no server functions, no DB, no auth. Personal
   state (favorites, recents) lives in localStorage via `src/lib/store.ts`.
6. **Live previews are lazy-loaded** (`React.lazy` via `src/showcase/index.ts`),
   self-contained in `preview.tsx` (default export, no props), and should respect
   `prefers-reduced-motion`. No WebGL/Motion imports on non-preview routes.
7. **Any registry change → `npm run llms`.** Files under `public/llms*` are
   generated — never hand-edit them.

## Setup

```bash
npm install          # fresh checkout
npm run dev          # dev server via `vp dev` (regenerates llms.txt first)
```

The `vp` CLI lives at `~/AppData/Local/vite-plus/bin/vp`; in Git Bash it may need
`export PATH="$HOME/AppData/Local/vite-plus/bin:$PATH"` — or just use the
`npm run` wrappers, which is the preferred path.

## Commands

| Command                  | Purpose                                              |
| ------------------------ | ---------------------------------------------------- |
| `npm run dev`            | Dev server (`vp dev`, runs `llms` first)             |
| `npm run build`          | `tsc -b && vp build` (runs `llms` first)             |
| `npm run preview`        | Preview the production build (`vp preview`)          |
| `npm run check`          | Format + lint + type checks together (oxfmt/oxlint/tsgolint) |
| `npm run format`         | Format everything (oxfmt — double quotes)            |
| `npm run lint`           | Lint only (oxlint)                                   |
| `npm run llms`           | Regenerate all `public/llms*` artifacts from `src/data/` |
| `npm run registry:check` | Validate registry ids/slugs/sources/licensing/loaders |

**Before every commit:** run `npm run check` and, if you touched `src/data/`,
`npm run registry:check` + `npm run llms`.

## Adding a component (the standard workflow)

1. Create/extend `src/data/components/<source>.ts` — one `UIEntry` per component
   (fields: see `src/data/types.ts`; `id` format `<sourceid>-<kebab-name>`; write
   `description` for future-you).
2. If the source is vendorable and a live preview is wanted: copy/re-implement the
   component into `src/showcase/<source>/<component>/preview.tsx` (self-contained,
   default export, no props), register the loader in `src/showcase/index.ts`, set
   `previewKey` on the entry, and record origin + date in `src/showcase/README.md`.
3. Run `npm run registry:check` (fix anything it flags), then `npm run llms`.
4. Run `vp fmt` / `npm run format` before committing.
5. Update `PLAN.md` only if scope changed, not for routine additions.

## Issue tracker conventions

Every issue from the Nov 2026 full-site audit carries the `audit-2026-11` label.
The label scheme has three axes:

**Type**

| Label            | Meaning                                    |
| ---------------- | ------------------------------------------ |
| `bug`            | Something is broken or misbehaving         |
| `enhancement`    | New feature or capability                  |
| `documentation`  | Docs inaccurate, stale, or missing         |
| `accessibility`  | WCAG/ARIA/keyboard/contrast problem        |
| `ux`             | Works, but the experience is wrong         |
| `performance`    | Slow loads, big bundles, wasted work       |
| `data-registry`  | Registry data: entries, install commands, metadata |
| `security`       | Dependency/supply-chain hygiene            |

**Area** — where the issue lives: `area:home`, `area:browse`, `area:category-page`,
`area:source-page`, `area:component-detail`, `area:favorites`, `area:not-found`,
`area:search`, `area:command-palette`, `area:theme`, `area:topbar`, `area:sidebar`,
`area:app-shell`, `area:entry-card`, `area:ui-kit`, `area:showcase-previews`,
`area:lib-store`, `area:docs`, `area:build-ci`.

**Priority**

| Label | Meaning                                                        |
| ----- | -------------------------------------------------------------- |
| `P1`  | Broken for real use now (dead install commands, unreadable UI, policy violations) |
| `P2`  | Should fix soon (visible defects, stale docs on load-bearing claims, crash paths) |
| `P3`  | Nice to fix (polish, robustness, hygiene)                      |

Issues marked `good first issue` are small, self-contained fixes with the
evidence and suggested fix already written out — good starting points.

When filing a new issue, include: what you observed vs. expected, exact
steps/URL, file:line for code claims, and command output or screenshots for
behavior claims. Verify twice before filing — every issue should be reproducible.

## Commits & versioning

- Bump `package.json` version on each shipped batch of changes and note it in the
  commit message; don't ship unversioned.
- Commit message style: `feat:`, `fix:`, `docs:`, `release:` (optionally with a
  `(vX.Y.Z)` scope), e.g. `fix(v0.6.1): style compat layer so vendored previews
  render fully themed`.
- The deploy to GitHub Pages runs automatically on every push to `main`
  (`.github/workflows/deploy.yml`), including a SPA fallback (`404.html`), so
  deep links keep working. Don't add a second deploy path.

## Scope

This is a personal tool with one user (the owner). PRs that add backends, auth,
paid/gated sources, or new frameworks (eslint/prettier, shadcn CLI, etc. beyond
what AGENTS.md sanctions) are out of scope by definition.
