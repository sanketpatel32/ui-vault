# UI Vault

A personal, frontend-only catalog of UI components from 12 curated sources — one place to
browse, categorize, favorite and pick up components for real projects.

**175 entries · 26 categories · 12 sources · 10 live previews**

**Live: <https://sanketpatel32.github.io/ui-vault/>** — deployed from `main` by GitHub Actions.

## What it does

- **One registry** — every component from the 12 sources in `source.txt`, categorized into a
  unified taxonomy (text effects, backgrounds, buttons, cards, heroes, dashboards, …), each with
  description, tags, license, deep link and install command.
- **Live previews** — MIT/free components are vendored into `src/showcase/` and render live on
  their detail page (lazy-loaded, reduced-motion aware). Paid/gated sources are link-out cards.
- **Search & filter** — fuzzy search (⌘K / Ctrl-K palette), filter by source, license, type and tag;
  filter state lives in the URL so views are shareable.
- **Favorites & recents** — star anything; stored in localStorage. There is no backend.
- **llms.txt for everything** — `/llms.txt`, `/llms-full.txt`, `/llms/sources/*`, `/llms/categories/*`
  are generated from the registry on every `npm run llms` (runs automatically before dev/build).

## Sources

Vendorable (live previews): [React Bits](https://reactbits.dev) · [Motion Primitives](https://motion-primitives.com) ·
[FancyComponents](https://fancycomponents.dev) · [NumberFlow](https://number-flow.barvian.me) ·
[Watermelon UI](https://watermelon.sh) · [Aceternity UI](https://ui.aceternity.com) (free tier)

Link-out: [21st.dev](https://21st.dev) · [shadcnStudio](https://shadcnstudio.com) ·
[UI Layouts Pro](https://pro.ui-layouts.com) · [Cue](https://cuedesign.space) ·
[CollectUI](https://collectui.com) · [The Component Gallery](https://component.gallery)

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
