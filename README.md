<div align="center">

# UI Vault

**3157 free React components from 33 open-source libraries — one searchable, previewable catalog.**

[**Live catalog →**](https://sanketpatel32.github.io/ui-vault/)

3157 entries · 25 categories · 33 sources · 766 live previews

</div>

## What it is

A frontend-only SPA that pulls vendorable components (free code + an install command, no paid/gated sources — that's the v0.3.0 policy) into one place:

- **Live previews** — 766 components render right on the site; the rest show their install command and a link to the source.
- **Search & filters** — fuzzy search (`Ctrl+K`), filter by source, license and tag; views are shareable URLs.
- **Favorites** — starred items persist in your browser. No backend, no accounts.
- **llms.txt** — machine-readable indexes (`/llms.txt`, `/llms/sources/*`, `/llms/categories/*`) regenerated from the registry on every build.

## Sources

33 vendorable libraries including React Bits, shadcn/ui, Magic UI, Animata, Animate UI, Aceternity (free tier), Origin UI, COSS UI, Cult UI, Kibo UI, assistant-ui, beUI, Kokonut UI, Arc UI, EasyUI, Amicro, Its Hover, Remocn, pdfcn, Bklit UI and more — the full list with licenses lives on the site sidebar and in `llms.txt`.

## Commands

```bash
npm install            # first time
npm run dev            # dev server
npm run build          # typecheck + production build → dist/
npm run check          # format + lint + typecheck
npm run registry:check # validate the component registry
npm run llms           # regenerate llms.txt artifacts
```

Deploy: static SPA — `npm run build`, serve `dist/` with an SPA fallback to `index.html`.

## Tech

Vite+ · React 19 · TypeScript · Tailwind CSS v4 · Motion · fuse.js · React Router v7.

The catalog is TypeScript data in `src/data/`. **Contributing:** see [AGENTS.md](AGENTS.md) (operating guide — read it before editing the registry), [PLAN.md](PLAN.md) (build checklist) and [CONTRIBUTING.md](CONTRIBUTING.md).
