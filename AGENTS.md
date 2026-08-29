# AGENTS.md — UI Vault

Personal, frontend-only React hub that aggregates UI components from the 6 free, vendorable sources into one categorized, searchable, previewable library. **The owner is the only user.** There is no backend and there never will be one.

**Registry policy (v0.3.0, owner decision 2026-08-29): the registry carries ONLY vendorable sources.** Paid/gated/gallery sources (21st.dev, shadcnStudio, UI Layouts Pro, Cue, CollectUI, The Component Gallery) were removed from `src/data/` entirely — every entry must be something we can actually show (free code + install command). Do not re-add link-out entries or link-out-only sources; if the owner asks for a paid/gated source, surface the policy before doing it.

**Read `PLAN.md` first** — it is the build checklist of record and contains the full architecture. This file is the operating guide for day-to-day work.

## Stack (fixed — do not relitigate)

- **Vite+** (`vite-plus` / `vp` unified toolchain — dev, build, lint, format, typecheck) + React 19 + TypeScript SPA; React Router v7 library mode
- Tailwind CSS v4 + a hand-rolled shadcn-style kit in `src/components/ui/` (cn(), design tokens; no shadcn CLI installed — add it only if Radix primitives become necessary)
- Motion (`motion` package), lucide-react, fuse.js
- Lint/format/typecheck run through `vp` (oxlint + oxfmt + tsgolint) — **no eslint/prettier packages**; the lint and fmt config lives in `vite.config.ts`
- Static deploy; state in localStorage only

## Commands

| Command                      | Purpose                                                      |
| ---------------------------- | ------------------------------------------------------------ |
| `npm run dev`                | Dev server via `vp dev` (runs `llms` first via predev hook)  |
| `npm run build`              | `tsc -b && vp build` (runs `llms` first)                     |
| `npm run check` / `vp check` | Format + lint + type checks together (oxfmt/oxlint/tsgolint) |
| `npm run format` / `vp fmt`  | Format everything (oxfmt — double quotes)                    |
| `npm run llms`               | Regenerate all llms.txt artifacts from `src/data/`           |
| `npm run registry:check`     | Validate registry ids/slugs/sources/licensing/loaders        |

The `vp` CLI is installed at `~/AppData/Local/vite-plus/bin/vp` (v0.3.0). In Git Bash it may not be on PATH — `export PATH="$HOME/AppData/Local/vite-plus/bin:$PATH"` — or just use the `npm run` wrappers. `vp env` is set to system-first, so system Node/npm are used.

Fresh checkout: `npm install` (or `vp install`) first.

## Golden rules

1. **Registry-first.** Every component the UI shows must exist in `src/data/components/<source>.ts`. The UI is a view over the registry — never hardcode a component into a page.
2. **Never vendor paid or gated code.** Only sources marked ✅ in the table below may have code copied into `src/showcase/`. Since v0.3.0 the registry only contains ✅ sources — link-out entries were removed at the owner's request. `npm run registry:check` enforces the licensing guard.
3. **Any registry change → run `npm run llms`.** Generated files under `public/llms*` are never hand-edited. The predev/prebuild hooks are a safety net, not an excuse to skip it.
4. **One primary category per entry**, and only slugs defined in `src/data/categories.ts` (see PLAN §4). To add a category, edit that file deliberately — never invent slugs inline.
5. **Vendored components are frozen snapshots.** Each `src/showcase/<source>/<component>/` folder records its origin URL and copy date in `src/showcase/README.md`, and keeps the upstream attribution header in the file. We do not fork or "improve" vendored code; fix by re-copying upstream.
6. **No backend.** No API routes, no server functions, no DB, no auth. Personal state (favorites, recents) lives in localStorage via `src/lib/store.ts`.
7. **Live previews are lazy-loaded** (`React.lazy` via `src/showcase/index.ts`), self-contained in `preview.tsx`, and must respect `prefers-reduced-motion`. No WebGL/Motion imports on non-preview routes.

## Sources & licensing (researched 2026-08-29)

| Source                 | SourceId           | License                         | In registry?         |
| ---------------------- | ------------------ | ------------------------------- | -------------------- |
| reactbits.dev          | `reactbits`        | MIT (free tier)                 | ✅ yes               |
| motion-primitives.com  | `motionprimitives` | MIT (free tier)                 | ✅ yes               |
| fancycomponents.dev    | `fancy`            | MIT                             | ✅ yes               |
| number-flow.barvian.me | `numberflow`       | MIT (npm: `@number-flow/react`) | ✅ yes               |
| watermelon.sh          | `watermelon`       | Open source, free               | ✅ yes               |
| ui.aceternity.com      | `aceternity`       | Free tier + paid Pro            | ✅ free tier only    |
| ui.shadcn.com          | `shadcn`           | MIT                             | ✅ yes (65, v0.4.0)  |
| magicui.design         | `magicui`          | MIT (templates paid)            | ✅ yes (76, v0.4.0)  |
| animata.design         | `animata`          | MIT (codse/animata)             | ✅ yes (154, v0.4.0) |
| animate-ui.com         | `animateui`        | MIT + Commons Clause            | ✅ yes (154, v0.4.0) |
| launchuicomponents.com | `launchui`         | MIT (+ $99 Pro sections)        | ✅ free set only (16) |
| coss.com/origin        | `originui`         | MIT (legacy snapshot in coss)   | ✅ yes (31 families) |
| 21st.dev               | `21st`             | Freemium (2 copies/day)         | ❌ removed in v0.3.0 |
| shadcnstudio.com       | `shadcnstudio`     | Free tier + $249 Pro            | ❌ removed in v0.3.0 |
| pro.ui-layouts.com     | `uilayouts`        | Paid ($139+)                    | ❌ removed in v0.3.0 |
| cuedesign.space        | `cue`              | Free tier + Cue+                | ❌ removed in v0.3.0 |
| collectui.com          | `collectui`        | Free gallery                    | ❌ removed in v0.3.0 |
| component.gallery      | `componentgallery` | Free reference                  | ❌ removed in v0.3.0 |

Install commands for the vendorable sources: `npx jsrepo add react-bits/<Name>` · `npx motion-primitives@latest add <name>` · shadcn registry `@fancy` (fancycomponents.dev/r/{name}.json) · `npm i @number-flow/react` · watermelon: `npx shadcn@latest add https://registry.watermelon.sh/r/<name>.json` · aceternity: `npx aceternity-ui@latest add <name>` · shadcn: `npx shadcn@latest add <component>` · magicui: `npx shadcn@latest add @magicui/<component>` · animata: `npx shadcn@latest add https://animata.design/r/<name>.json` · animateui: `npx shadcn@latest add @animate-ui/<slug>` · launchui: `npx shadcn@latest add @launchui/<block>` · originui: `npx shadcn@latest add https://coss.com/origin/r/<family>.json`.

v0.4.0 research notes (research/*.json has the full extracted sets): Animata carries its 154 *published* components only — the repo documents 198 but 44 have no live docs page yet. Animate UI names Radix/Base UI/Headless UI variants with a suffix ("Accordion (Radix)") — ids carry the section prefix. Origin UI is family-granularity (31 families ≈ 599 variants; per-variant registry files exist at coss.com/origin/r/).

## Adding a component (the standard workflow)

1. Create/extend `src/data/components/<source>.ts` — one `UIEntry` per component. Fields: see `src/data/types.ts`. `id` format: `<sourceid>-<kebab-name>`. Write `description` for future-you (what it is, when to reach for it).
2. If the source is vendorable ✅ and a live preview is wanted: copy/re-implement the component into `src/showcase/<source>/<component>/preview.tsx` (self-contained, default export, no props), register the loader in `src/showcase/index.ts`, set `previewKey` on the entry, and record origin + date in `src/showcase/README.md`.
3. Run `npm run registry:check` (fix anything it flags), then `npm run llms`.
4. Run `vp fmt` before committing — CI-style formatting is oxfmt (double quotes, semicolons).
5. Update `PLAN.md` only if scope changed, not for routine additions.

## File map

```
src/data/        sources.ts, categories.ts, types.ts, components/*.ts (6)   ← the "backend"
src/lib/         utils (cn), registry selectors, search (fuse), store (localStorage), theme
src/components/  hub's own UI: ui/ primitives, sidebar, topbar, command-palette,
                 entry-card, preview-frame, filter-bar, badges, code-block
src/showcase/    vendored previews: <source>/<name>/preview.tsx + index.ts loaders + README
src/pages/       home, browse, category, source, component-detail, favorites, not-found
scripts/         generate-llms.ts, registry-check.ts (run via tsx)
public/llms*     GENERATED by npm run llms — do not edit
vite.config.ts   Vite+ unified config (plugins + fmt + lint)
tsconfig*.json   app / node / scripts project references
PLAN.md          build plan & phase checklist — update as phases complete
source.txt       original list of the 12 sources (provenance; keep forever)
```

## Web research

When exploring the source sites (new drops, missing entries), use the `tinyfish` CLI (`tinyfish search query`, `tinyfish fetch content get`, escalate to `tinyfish agent run` only for JS-heavy pages). Several sites (reactbits.dev, collectui.com category pages) render client-side — plain fetch returns empty; use the agent tool there.

## Housekeeping

- Windows/Git Bash environment; OneDrive path — prefer `npm` scripts over raw path juggling.
- Versioning: bump `package.json` version on each shipped batch of changes and note it in the commit message. No formal changelog needed (personal tool), but don't ship unversioned.
- After code changes there is no graphify requirement for this repo (no graphify-out/); if one is initialized later, follow the global workspace instructions.
