# UI Vault — Build Plan

> A personal, frontend-only React hub that aggregates UI components from 12 hand-picked sources (see `source.txt`) into one categorized, searchable, previewable library. No backend — all data lives in static TypeScript registry files, all personal state in localStorage.

**Status: v0.1.0 BUILT (2026-08-29) — Phases 0–6 complete. 175 entries, 26 categories, 12 sources, 10 live previews, llms.txt generated. Remaining: deploy (Phase 7) and growing the registry.**

---

## 1. What the research found (2026-08-29, via tinyfish subagents)

Full research is summarized in `AGENTS.md` → "Sources & licensing". The decisions that follow from it:

1. **Not everything can be embedded.** Only 6 sources ship free, legally vendorable code. The hub therefore has two kinds of entries:
   - **Live entries** — component code vendored into the app, rendered as a live preview.
   - **Link-out entries** — metadata card + deep link to the source (paid/gated/gallery sources).
2. **The ecosystem is homogeneous**: React + TypeScript + Tailwind CSS + Motion (Framer Motion) + shadcn-style copy-paste/CLI distribution. Building the hub on the same stack means vendored components drop in with near-zero adaptation.
3. **Every source has its own taxonomy.** We define ONE unified taxonomy (§4) and map every entry into it; the source's own category is kept as a tag (`sourceCategory`).

### Source classification

| Source                 | Type                           | License                 | Policy in this app                       |
| ---------------------- | ------------------------------ | ----------------------- | ---------------------------------------- |
| reactbits.dev          | Code (134 free)                | MIT (free tier)         | ✅ Vendor & preview                      |
| motion-primitives.com  | Code (~35 free)                | MIT (free tier)         | ✅ Vendor & preview                      |
| fancycomponents.dev    | Code (~46)                     | MIT                     | ✅ Vendor & preview                      |
| number-flow.barvian.me | Code (npm)                     | MIT                     | ✅ Vendor & preview                      |
| watermelon.sh          | Code (600+)                    | Open source, free       | ✅ Vendor & preview (curated subset)     |
| ui.aceternity.com      | Code (free tier)               | Free tier + paid Pro    | ✅ Vendor free tier only; Pro = link-out |
| 21st.dev               | Community registry (12k+)      | Freemium (2 copies/day) | 🔗 Link-out only (gated)                 |
| shadcnstudio.com       | Blocks (800+)                  | Free tier + $249 Pro    | 🔗 Link-out only                         |
| pro.ui-layouts.com     | Layout blocks (150+)           | Paid ($139+)            | 🔗 Link-out only                         |
| cuedesign.space        | Prompt/reference (92)          | Free tier + Cue+ $99    | 🔗 Link-out only                         |
| collectui.com          | Inspiration gallery (147 cats) | Free to browse          | 🔗 Link-out only                         |
| component.gallery      | Pattern reference (60/95 DS)   | Free                    | 🔗 Link-out only                         |

---

## 2. Tech stack (decided)

| Concern        | Choice                                    | Why                                                                                   |
| -------------- | ----------------------------------------- | ------------------------------------------------------------------------------------- |
| Framework      | **Vite+ (`vp` unified toolchain) + React 19 + TypeScript** | Frontend-only personal tool; VoidZero's Vite+ gives dev/build/lint/format/typecheck in one CLI (rolldown + oxc underneath). Switched from plain Vite mid-build at owner request. |
| Styling        | **Tailwind CSS v4**                       | What 11/12 sources assume; vendored code works as-is.                                 |
| Component base | **shadcn-style hand-rolled kit** (`src/components/ui`) | Same conventions (cn(), design tokens, copy-paste) without the CLI dependency; shadcn CLI can be added later if Radix primitives are needed. |
| Animation      | **Motion** (`motion` package)             | What React Bits / Motion Primitives / FancyComponents are built on.                   |
| Icons          | **lucide-react**                          | Used by every source; avoids icon duplication.                                        |
| Routing        | **React Router v7** (library mode)        | SPA with deep links to components/categories/sources.                                 |
| Search         | **fuse.js** (client-side)                 | Fuzzy search over the registry, no backend.                                           |
| State          | localStorage (favorites, recents)         | Zero backend requirement.                                                             |
| Deploy         | Static host (Vercel/Netlify/GitHub Pages) | It's a pure SPA.                                                                      |

App name (changeable): **UI Vault**.

---

## 3. Site map & routes

```
/                        Home — stats (N components, M sources), favorites, recently viewed, category grid
/browse                  All entries + filters (category, source, license, type live/link-out, tags) + search
/c/:category             Category page (reuses browse view, pre-filtered)
/source/:sourceId        Source page — what it is, license, install command, its entries, outbound link
/component/:id           Detail page — live preview OR link-out card, install command w/ copy,
                         tags, source, license, related entries
/favorites               Saved entries (localStorage)
```

Global chrome: left sidebar (category tree grouped by section), top bar (search ⌘K, source dropdown, dark-mode toggle). Dark mode is default — most source components are designed dark-first.

---

## 4. Unified category taxonomy

Four groups → categories. Slugs are permanent IDs. Lives in `src/data/categories.ts`.

**Group: Components**

| Slug                 | Name                      | Examples from research                                         |
| -------------------- | ------------------------- | -------------------------------------------------------------- |
| `text-animation`     | Text & Typography Effects | SplitText, BlurText, Decrypted Text, Text Morph, Letter Swap   |
| `backgrounds`        | Backgrounds & Gradients   | Aurora Background, Silk, Hyperspeed, Iridescence, Dither       |
| `3d-webgl`           | 3D & WebGL                | GitHub Globe, Lanyard, Meta Balls, 3D Book Carousel            |
| `buttons`            | Buttons & Actions         | Moving Border, Star Border, Magnet, Click Spark, Slide-to-Book |
| `cards`              | Cards & Bento             | 3D Card Effect, Bento Grid, Spotlight, Tilt, Stacking Cards    |
| `navigation`         | Navigation                | Floating Dock, Dynamic Island Nav, Sidebars, Tabs, Breadcrumbs |
| `forms`              | Forms & Inputs            | OTP input, file upload, sliders, date pickers, toggles, search |
| `overlays`           | Overlays                  | Morphing Dialog, Drawer, Popover, Tooltip, Command Bar         |
| `feedback`           | Loading & Feedback        | Spinners, progress, skeletons, empty states, toasts            |
| `data-display`       | Data Display              | Tables, charts, badges, avatars, stats/KPI                     |
| `numbers`            | Numbers & Counters        | NumberFlow, NumberFlowGroup, Number Ticker, Animated Number    |
| `micro-interactions` | Micro-interactions & Fun  | Gravity, Elastic Line, Gooey Filter, Cursor, Screensaver       |

**Group: Blocks (page sections)**
`hero` · `features` · `pricing` · `testimonials` · `cta` · `faq` · `footers` · `navbars` · `sections-misc` (team, blog, contact, stats, logo clouds, announcements)

**Group: Templates**
`dashboards` · `landing-pages` · `auth` (login/signup) · `full-templates`

**Group: Inspiration**
`galleries` (CollectUI, Component Gallery, Cue — reference-only patterns & screenshots)

Rules: an entry has exactly ONE primary category + any number of tags. The source's own category name is preserved as the `sourceCategory` field. New categories require editing `categories.ts` deliberately — never invent slugs inline.

---

## 5. Data model (the "backend")

`src/data/` — static, typed, tree-shakeable. This registry IS the product; the UI is a view over it.

```ts
// src/data/types.ts
type SourceId =
  | "aceternity"
  | "reactbits"
  | "motionprimitives"
  | "fancy"
  | "numberflow"
  | "watermelon"
  | "21st"
  | "shadcnstudio"
  | "uilayouts"
  | "cue"
  | "collectui"
  | "componentgallery";

type License = "mit" | "free" | "freemium" | "paid";
type PreviewMode = "live" | "linkout";

interface Source {
  id: SourceId;
  name: string;
  url: string;
  tagline: string;
  license: License;
  previewMode: PreviewMode;
  stack: string[]; // ['react','tailwind','motion',...]
  install?: string; // e.g. "npx motion-primitives@latest add text-effect"
  notes?: string; // pricing/gating caveats
}

interface UIEntry {
  id: string; // kebab, prefixed by source: "reactbits-blur-text"
  name: string;
  description: string; // 1–2 sentences, written for future-you
  source: SourceId;
  sourceUrl: string; // deep link to the component on the source site
  sourceCategory: string; // the source's own category (verbatim)
  category: string; // one slug from §4
  tags: string[]; // free-form: 'gsap','webgl','scroll','hover',...
  license: License;
  previewMode: PreviewMode;
  install?: string; // per-component install/copy command
  previewKey?: string; // lazy-import key into src/showcase/ (live entries only)
  featured?: boolean; // homepage "start here" picks
}
```

Registry files: one file per source (`src/data/components/<source>.ts`), merged by `src/data/index.ts`. Seed target for v1: **~150–200 entries** (flagships from research + top categories), grown over time.

---

## 6. File structure

```
/
├── AGENTS.md               # agent guide (canonical operating manual)
├── PLAN.md                 # this file — checklist of record
├── README.md               # human-facing intro
├── source.txt              # original inspiration list (provenance — keep forever)
├── package.json            # scripts: dev/build/lint/check/fmt/llms/registry:check (vp-powered)
├── vite.config.ts          # Vite+ unified config: plugins + fmt + lint (oxlint) settings
├── tsconfig.json           # references: app / node / scripts
├── scripts/
│   ├── generate-llms.ts    # builds all llms.txt artifacts from the registry (tsx)
│   └── registry-check.ts   # validates ids, categories, licensing policy, preview loaders
├── src/
│   ├── main.tsx  App.tsx   # router + layout shell (sidebar, topbar, ⌘K palette)
│   ├── data/               # types.ts, sources.ts, categories.ts, components/*.ts (12), index.ts
│   ├── lib/                # utils (cn), registry (queries), search (fuse), store (favorites/recents), theme
│   ├── components/         # hub's own UI: ui/ primitives, sidebar, topbar, command-palette,
│   │                       # entry-card, preview-frame, filter-bar, badges…
│   ├── showcase/           # vendored live previews — <source>/<name>/preview.tsx + index.ts loaders
│   ├── pages/              # home, browse, category, source, component-detail, favorites, not-found
│   └── index.css           # Tailwind v4 + tokens (light/dark) + showcase keyframes
└── public/                 # GENERATED by npm run llms — do not hand-edit
    ├── llms.txt  llms-full.txt
    └── llms/{sources,categories}/*.md
```

---

## 7. llms.txt strategy ("llm.txt for everything")

Machine-readable docs for the whole site, **generated — never hand-edited** — so they can't drift from the registry.

| Artifact                           | Content                                                                                                  |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `public/llms.txt`                  | Site index (llmstxt.org format): what the hub is, all 12 sources + licenses, all categories, links below |
| `public/llms/sources/<id>.md`      | One page per source: entries, install commands, licensing policy                                         |
| `public/llms/categories/<slug>.md` | One page per category: every entry, source, links                                                        |
| `public/llms-full.txt`             | Everything concatenated in one file                                                                      |

`npm run llms` regenerates all of them from `src/data/` (fast, pure Node, no deps). **Rule: any registry change is followed by `npm run llms` + commit** — enforced in AGENTS.md and wired as a `predev`/`prebuild` npm hook so it can't be forgotten.

---

## 8. Build phases — the checklist

### Phase 0 — Scaffold ✅-able in one sitting

- [x] `npm create vite@latest . -- --template react-ts`
- [x] Tailwind v4 (`@tailwindcss/vite`), `src/index.css` with theme tokens (dark default)
- [x] shadcn/ui init (`npx shadcn@latest init`); add: button, badge, card, dialog, command, dropdown-menu, input, tabs, tooltip, separator, sheet, scroll-area, sonner
- [x] Deps: `react-router`, `motion`, `lucide-react`, `fuse.js`, `clsx`, `tailwind-merge`
- [x] ESLint + Prettier; `engines.node >= 20`
- [x] App shell renders: sidebar + topbar + router with stub pages
- [x] Init git; first commit

### Phase 1 — Data layer (the real work)

- [x] `types.ts`, `sources.ts` (all 12, from research table §1), `categories.ts` (§4)
- [x] Registry seed files per source — flagships + top categories (~150–200 entries):
  - [x] reactbits (~25: SplitText, BlurText, Glitch, Decrypted, Circular Text, Meta Balls, Silk, Liquid Chrome, Hyperspeed, Iridescence, Ballpit, Dither, Lanyard, Star Border, Magnet, Click Spark, Elastic Mesh…)
  - [x] motionprimitives (~15: Text Effect/Scramble/Morph, Border Trail, Spotlight, Tilt, Magnetic, Dock, Infinite Slider, Morphing Dialog, Progressive Blur, Glow, Scroll Progress, Cursor)
  - [x] fancy (~15: Letter Swap, Scramble Hover, Text Highlighter, Gravity, Elastic Line, Image/Pixel Trail, Gooey/Pixelate filters, Marquee Along Path, Screensaver, Stacking Cards, Typewriter, Number Ticker, CSS Box, Media Between Text)
  - [x] aceternity free (~15: 3D Pin, 3D Card, Hero Parallax, Lamp, Macbook Scroll, Moving Border, Background Beams, Aurora, Wavy, Infinite Moving Cards, Tracing Beam, Text Generate, Floating Dock, Bento Grid, GitHub Globe)
  - [x] numberflow (4: NumberFlow, NumberFlowGroup, Input stepper, Countdown/Activity recipes)
  - [x] watermelon (curated ~15 from Hero/Footer families + micro-interactions)
  - [x] Link-out seeds: 21st.dev (~20 top by category), shadcnstudio (~15 blocks), uilayouts (~10 heroes + templates), cue (~10), collectui (~15 top categories), componentgallery (~15 largest patterns)
- [x] `lib/registry.ts`: selectors (byCategory, bySource, byTag, search, stats, related)
- [x] `lib/search.ts`: fuse.js index
- [x] Unit-check script (`npm run registry:check`): unique ids, valid category slugs, valid source ids, live entries have previewKey

### Phase 2 — Browse experience

- [x] Home page: stats, category grid, featured picks, recently viewed (localStorage)
- [x] Browse page: responsive card grid; filters (category, source, license, live/link-out); tag chips; fuzzy search; URL-synced filter state (`/browse?cat=hero&src=reactbits`)
- [x] Sidebar: grouped category tree with counts; collapse on mobile (Sheet)
- [x] Entry card: name, source badge (color-coded per source), license dot (green=MIT/free, amber=freemium, red=paid), category, short description, ⭐ favorite toggle

### Phase 3 — Detail & source pages

- [x] Component detail: live preview (lazy-mounted in a sandboxed preview frame with light/dark + width controls) OR link-out card with big outbound button
- [x] Install command block with copy button (npm / CLI tab)
- [x] "Open at source" (deep link), tags, related entries (shared category/tag)
- [x] Source pages: the §1 table content per source + their entries
- [x] Favorites page (localStorage persistence)

### Phase 4 — Live showcase vendoring (the fun part)

- [x] `showcase/` conventions: one folder per component, `preview.tsx` default-exports a self-contained demo, `React.lazy` mount, no cross-folder imports
- [x] Vendor batch 1 — zero-dep Motion ones (motionprimitives ~10, reactbits text ~10)
- [x] Vendor batch 2 — fancycomponents (~10, incl. matter-js ones: Gravity, Elastic Line)
- [x] Vendor batch 3 — numberflow (`@number-flow/react`), aceternity free picks (~10 incl. one shader)
- [x] Vendor batch 4 — watermelon curated blocks (hero, footer)
- [x] Guard: every vendored file carries upstream LICENSE attribution header; keep `showcase/README.md` listing origin URL + commit/date per component
- [x] Performance: route-level + preview-level lazy loading; no Motion/WebGL on non-preview routes

### Phase 5 — llms.txt generation

- [x] `scripts/generate-llms.mjs` → all artifacts in §7
- [x] Wire `predev`/`prebuild` npm hooks + `npm run llms`
- [x] Regenerate root `llms.txt` seed into `public/` (replacing the hand-written one)
- [x] Footer link to `/llms.txt` (humans too can read it)

### Phase 6 — Polish

- [x] ⌘K command palette (browse + jump-to-component)
- [x] Dark/light/system toggle; reduced-motion respected (`useReducedMotion` in previews)
- [x] Responsive pass (mobile sidebar → Sheet; grid 1→2→3 cols)
- [x] A11y: keyboard nav, focus states, aria labels on interactive previews
- [x] Empty/error states; 404 with a fun component
- [x] README.md (for humans)

### Phase 7 — Ship

- [x] `npm run build` clean; bundle-size budget (< 300KB initial JS gz — actual: 119 KB)
- [ ] Deploy to static host (Vercel or GitHub Pages); it's a SPA → configure fallback to index.html
- [ ] Verify llms.txt artifacts resolve in production
- [ ] Final commit: mark Phase 0–7 done in this file

---

## 9. Non-goals / constraints (do not drift)

- **No backend, ever.** No API, no DB, no auth. Static build + localStorage.
- **Never vendor paid/gated code.** 21st.dev, Cue+, Aceternity Pro, ui-layouts Pro, shadcnstudio Pro are link-out metadata only. When in doubt, link out.
- **Don't scrape builds a crawler** — the registry is hand-curated from research/docs, not auto-scraped.
- **Vendored components are frozen snapshots** — we don't maintain forks; we record origin + date.

## 10. Later ideas (out of scope for v1)

- One-click "copy install command" per source registry (shadcn.json deep integration)
- Screenshot/thumbnail capture for link-out entries (Playwright batch script)
- Tag taxonomy page generated from tag frequency
- Import CollectUI's 147-category structure as an "inspiration browse" mirror
- Optional "new drops" checker that diffs source sites via tinyfish and flags registry candidates
