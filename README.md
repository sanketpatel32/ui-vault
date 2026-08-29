# UI Vault

A personal, frontend-only catalog of UI components from 12 free, vendorable open-source
libraries — one place to browse, categorize, favorite and pick up components for real projects.

**586 entries · 23 categories · 12 sources · 586 live previews (100% coverage)**

**Live: <https://sanketpatel32.github.io/ui-vault/>** — deployed from `main` by GitHub Actions.

## What it does

- **One registry** — every component from the 12 vendorable sources, categorized into a
  unified taxonomy (text effects, backgrounds, buttons, cards, forms, overlays, data display,
  chat, heroes, dashboards, …), each with description, tags, license, deep link and install
  command. Every entry ships free code — paid/gated/gallery sources are not carried as
  entries (v0.3.0 policy).
- **Live previews** — components are vendored into `src/showcase/` and render live on
  their detail page (lazy-loaded, reduced-motion aware); the rest show their install
  command and source link.
- **Search & filter** — fuzzy search (⌘K / Ctrl-K palette), filter by source, license and tag;
  filter state lives in the URL so views are shareable.
- **Favorites & recents** — star anything; stored in localStorage. There is no backend.
- **llms.txt for everything** — `/llms.txt`, `/llms-full.txt`, `/llms/sources/*`, `/llms/categories/*`
  are generated from the registry on every `npm run llms` (runs automatically before dev/build).

## Sources

All vendorable (free code + install command): [React Bits](https://reactbits.dev) ·
[Motion Primitives](https://motion-primitives.com) ·
[FancyComponents](https://fancycomponents.dev) · [NumberFlow](https://number-flow.barvian.me) ·
[Watermelon UI](https://watermelon.sh) · [Aceternity UI](https://ui.aceternity.com) (free tier) ·
[shadcn/ui](https://ui.shadcn.com) · [Magic UI](https://magicui.design) ·
[Animata](https://animata.design) · [Animate UI](https://animate-ui.com) (MIT + Commons Clause) ·
[Launch UI](https://www.launchuicomponents.com) (free sections) ·
[Origin UI](https://coss.com/origin) (MIT legacy snapshot, 599 variants)

Not carried as entries (paid/gated/gallery — see `AGENTS.md`): 21st.dev, shadcnStudio,
UI Layouts Pro, Cue, CollectUI, The Component Gallery; Launch UI Pro sections.

## Tech

[Vite+](https://viteplus.dev) (`vp` unified toolchain) · React 19 · TypeScript · Tailwind CSS v4 ·
Motion · fuse.js · React Router v7. The catalog itself is TypeScript data in `src/data/` — see
`AGENTS.md` for the full operating guide and `PLAN.md` for the build plan.

## Commands

```bash
npm install          # first time
npm run dev          # dev server (regenerates llms.txt first)
npm run build        # typecheck + production build
npm run check        # format + lint + typecheck (vp check)
npm run llms         # regenerate llms.txt artifacts
npm run registry:check
```

Deploy: it's a static SPA — `npm run build` and point any static host at `dist/`
(remember the SPA fallback to `index.html`).
