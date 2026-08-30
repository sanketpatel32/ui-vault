// One-shot: generate src/data/components/{cossui,cultui,kiboui}.ts from research/*.json.
// Run: npx tsx scripts/gen-v06.mts
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const read = (p: string) => JSON.parse(readFileSync(join(root, p), "utf8"));

// ---------- category maps ----------
const COSS_CAT: Record<string, string> = {
  accordion: "faq",
  alert: "feedback",
  "alert-dialog": "overlays",
  autocomplete: "forms",
  avatar: "data-display",
  badge: "data-display",
  breadcrumb: "navigation",
  button: "buttons",
  calendar: "forms",
  card: "cards",
  checkbox: "forms",
  "checkbox-group": "forms",
  collapsible: "overlays",
  combobox: "forms",
  command: "overlays",
  "context-menu": "overlays",
  "date-picker": "forms",
  dialog: "overlays",
  drawer: "overlays",
  empty: "feedback",
  field: "forms",
  fieldset: "forms",
  form: "forms",
  frame: "sections-misc",
  group: "sections-misc",
  input: "forms",
  "input-group": "forms",
  kbd: "data-display",
  label: "forms",
  menu: "overlays",
  meter: "feedback",
  "number-field": "forms",
  "otp-field": "forms",
  pagination: "navigation",
  popover: "overlays",
  "preview-card": "cards",
  progress: "feedback",
  "radio-group": "forms",
  "scroll-area": "sections-misc",
  select: "forms",
  "segmented-control": "navigation",
  separator: "sections-misc",
  sheet: "overlays",
  skeleton: "feedback",
  slider: "forms",
  spinner: "feedback",
  switch: "forms",
  table: "data-display",
  tabs: "navigation",
  textarea: "forms",
  toast: "feedback",
  toggle: "forms",
  "toggle-group": "forms",
  toolbar: "navigation",
  tooltip: "overlays",
};

const CULT_CAT: Record<string, string> = {
  "hero-dithering": "hero",
  "hero-color-panels": "hero",
  "hero-heatmap": "hero",
  "hero-liquid-metal": "hero",
  "hero-static-radial-gradient": "hero",
  "bg-media": "backgrounds",
  "logo-carousel": "sections-misc",
  "tweet-grid": "testimonials",
  "gradient-heading": "text-animation",
  "neumorph-button": "buttons",
  "texture-button": "buttons",
  "bg-animate-button": "buttons",
  "border-beam-button": "buttons",
  "metal-button": "buttons",
  "cosmic-button": "buttons",
  "gradient-button-group": "buttons",
  "dynamic-island": "micro-interactions",
  onboarding: "micro-interactions",
  "family-button": "micro-interactions",
  "toolbar-expandable": "micro-interactions",
  "expandable-screen": "micro-interactions",
  expandable: "micro-interactions",
  "morph-surface": "micro-interactions",
  "side-panel": "micro-interactions",
  "family-drawer": "micro-interactions",
  "intro-disclosure": "micro-interactions",
  "minimal-card": "cards",
  "cutout-card": "cards",
  "neumorph-eyebrow": "cards",
  "texture-card": "cards",
  "shift-card": "cards",
  "mock-browser-window": "sections-misc",
  "code-block": "data-display",
  "terminal-animation": "micro-interactions",
  "texture-overlay": "backgrounds",
  "distorted-glass": "overlays",
  "bg-image-texture": "backgrounds",
  "edge-blur": "backgrounds",
  "dither-image": "backgrounds",
  "grid-beam": "backgrounds",
  "bg-animated-fractal-grid": "backgrounds",
  "canvas-fractal-grid": "backgrounds",
  "stripe-bg-guides": "backgrounds",
  lightboard: "backgrounds",
  "shader-lens-blur": "3d-webgl",
  "svg-shapes": "backgrounds",
  "svg-shapes-animated": "backgrounds",
  "svg-bands": "backgrounds",
  "direction-aware-tabs": "navigation",
  "floating-panel": "overlays",
  popover: "overlays",
  "popover-form": "overlays",
  dock: "navigation",
  "color-picker": "forms",
  "choice-poll": "forms",
  "feature-poll": "forms",
  "feature-voting": "forms",
  "vote-tally": "forms",
  "poll-widget": "forms",
  "prompt-library": "chat",
  "ai-instructions": "chat",
  timer: "micro-interactions",
  "sortable-list": "micro-interactions",
  "three-d-carousel": "3d-webgl",
  "hover-video-player": "micro-interactions",
  "youtube-video-player": "overlays",
  "feature-carousel": "features",
  "loading-carousel": "micro-interactions",
  "text-animate": "text-animation",
  typewriter: "text-animation",
  "animated-number": "numbers",
  "pixel-heading-character": "text-animation",
  "pixel-heading-word": "text-animation",
  "pixel-paragraph-words": "text-animation",
  "pixel-paragraph-words-inverse": "text-animation",
  "text-gif": "text-animation",
  "squiggle-arrow": "text-animation",
};

const KIBO_CAT: Record<string, string> = {
  "avatar-stack": "data-display",
  cursor: "micro-interactions",
  calendar: "data-display",
  gantt: "data-display",
  kanban: "data-display",
  list: "data-display",
  table: "data-display",
  "code-block": "data-display",
  "contribution-graph": "data-display",
  sandbox: "data-display",
  snippet: "data-display",
  choicebox: "forms",
  combobox: "forms",
  dropzone: "forms",
  "mini-calendar": "forms",
  tags: "forms",
  "image-crop": "forms",
  "image-zoom": "overlays",
  "credit-card": "forms",
  ticker: "numbers",
  stories: "micro-interactions",
  reel: "micro-interactions",
  "video-player": "overlays",
  announcement: "feedback",
  banner: "feedback",
  typography: "sections-misc",
  "color-picker": "forms",
  comparison: "micro-interactions",
  deck: "micro-interactions",
  "dialog-stack": "overlays",
  editor: "forms",
  glimpse: "micro-interactions",
  marquee: "micro-interactions",
  pill: "data-display",
  "qr-code": "data-display",
  rating: "forms",
  "relative-time": "data-display",
  spinner: "feedback",
  status: "data-display",
  "theme-switcher": "buttons",
  tree: "data-display",
};

// docs slug -> real registry name (verified mismatches)
const CULT_REGNAME: Record<string, string> = {
  "bg-animated-fractal-grid": "bg-animated-fractal-dot-grid",
  "hero-color-panels": "hero-color-panel",
};

const q = (s: string) => JSON.stringify(s);

function entry(e: {
  id: string;
  name: string;
  description: string;
  source: string;
  sourceUrl: string;
  sourceCategory: string;
  category: string;
  tags: string[];
  install: string;
  featured?: boolean;
}): string {
  return [
    "  {",
    `    id: ${q(e.id)},`,
    `    name: ${q(e.name)},`,
    `    description: ${q(e.description)},`,
    `    source: ${q(e.source)},`,
    `    sourceUrl: ${q(e.sourceUrl)},`,
    `    sourceCategory: ${q(e.sourceCategory)},`,
    `    category: ${q(e.category)},`,
    `    tags: [${e.tags.map(q).join(", ")}],`,
    `    license: "mit",`,
    `    previewMode: "live",`,
    `    install: ${q(e.install)},`,
    `    previewKey: ${q(e.id)},`,
    ...(e.featured ? ["    featured: true,"] : []),
    "  },",
  ].join("\n");
}

// ---------- COSS UI ----------
{
  const d = read("research/cossui.json");
  const comps = d.components.filter((c: any) => c.category === "Components");
  const hooks = d.components.filter((c: any) => c.category === "Hooks");
  const parts = d.components.filter((c: any) => c.category === "Particles");
  const fams = new Map<string, any[]>();
  for (const p of parts) {
    const base = p.slug.replace(/-\d+$/, "");
    if (!fams.has(base)) fams.set(base, []);
    fams.get(base)!.push(p);
  }
  const lines: string[] = [
    "// Generated by scripts/gen-v06.mts from research/cossui.json (coss.com/ui registry).",
    "// 55 components + 2 hooks + 54 particle families (508 registry particles, cataloged per family).",
    'import type { UIEntry } from "../types";',
    "",
    "export const cossui: UIEntry[] = [",
  ];
  for (const c of comps) {
    const isDatePicker = c.slug === "date-picker"; // no standalone registry item; docs install the parts
    lines.push(
      entry({
        id: `cossui-${c.slug}`,
        name: c.name,
        description: c.description,
        source: "cossui",
        sourceUrl: c.url,
        sourceCategory: "Components",
        category: COSS_CAT[c.slug] ?? "sections-misc",
        tags: ["coss", "base-ui"],
        install: isDatePicker
          ? "npx shadcn@latest add @coss/calendar @coss/popover @coss/button"
          : `npx shadcn@latest add @coss/${c.slug}`,
        featured: ["frame", "combobox", "calendar", "sheet"].includes(c.slug),
      }),
    );
  }
  for (const h of hooks) {
    lines.push(
      entry({
        id: `cossui-${h.slug}`,
        name: h.name,
        description: h.description,
        source: "cossui",
        sourceUrl: h.url,
        sourceCategory: "Hooks",
        category: "micro-interactions",
        tags: ["coss", "hook"],
        install: `npx shadcn@latest add @coss/${h.slug}`,
      }),
    );
  }
  const partPlan: Record<string, string> = {}; // folder -> registry name to vendor (for vendor script)
  for (const [base, variants] of [...fams.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const sorted = variants.sort((a: any, b: any) =>
      a.slug.localeCompare(b.slug, undefined, { numeric: true }),
    );
    const pick =
      sorted.find((v: any) => v.slug.endsWith("-2")) ??
      sorted.find((v: any) => v.slug.endsWith("-1")) ??
      sorted[0];
    partPlan[`particles-${base.replace(/^p-/, "")}`] = pick.slug;
    const baseName = base.replace(/^p-/, "");
    const pretty = baseName
      .split("-")
      .map((w: string) => w[0].toUpperCase() + w.slice(1))
      .join(" ");
    lines.push(
      entry({
        id: `cossui-particles-${baseName}`,
        name: `${pretty} Particles`,
        description: `${sorted.length} pre-styled ${pretty.toLowerCase()} particles from the COSS registry — e.g. "${pick.description}". Every variant installs individually; the preview shows ${pick.slug.replace(/^p-/, "")}.`,
        source: "cossui",
        sourceUrl: "https://coss.com/ui/particles",
        sourceCategory: "Particles",
        category: COSS_CAT[baseName] ?? "sections-misc",
        tags: ["coss", "particle", "variants"],
        install: `npx shadcn@latest add @coss/${pick.slug}`,
      }),
    );
  }
  lines.push("];", "");
  writeFileSync(join(root, "src/data/components/cossui.ts"), lines.join("\n"));
  writeFileSync(join(root, ".vcache/v06-coss-particles.json"), JSON.stringify(partPlan, null, 1));
  console.log(
    `cossui.ts: ${comps.length} components + ${hooks.length} hooks + ${fams.size} particle families`,
  );
}

// ---------- Cult UI ----------
{
  const d = read("research/cultui.json");
  const lines: string[] = [
    "// Generated by scripts/gen-v06.mts from research/cultui.json (cult-ui.com registry).",
    'import type { UIEntry } from "../types";',
    "",
    "export const cultui: UIEntry[] = [",
  ];
  for (const c of d.components) {
    const reg = CULT_REGNAME[c.slug] ?? c.slug;
    lines.push(
      entry({
        id: `cultui-${c.slug}`,
        name: c.name,
        description: c.description,
        source: "cultui",
        sourceUrl: c.url,
        sourceCategory: c.category,
        category: CULT_CAT[c.slug] ?? "sections-misc",
        tags: ["cult", "motion"],
        install: `npx shadcn@latest add https://cult-ui.com/r/${reg}.json`,
        featured: [
          "dynamic-island",
          "dock",
          "three-d-carousel",
          "grid-beam",
          "typewriter",
        ].includes(c.slug),
      }),
    );
  }
  lines.push("];", "");
  writeFileSync(join(root, "src/data/components/cultui.ts"), lines.join("\n"));
  console.log(`cultui.ts: ${d.components.length} components`);
}

// ---------- Kibo UI ----------
{
  const d = read("research/kiboui.json");
  const lines: string[] = [
    "// Generated by scripts/gen-v06.mts from research/kiboui.json (kibo-ui.com registry).",
    'import type { UIEntry } from "../types";',
    "",
    "export const kiboui: UIEntry[] = [",
  ];
  for (const c of d.components) {
    lines.push(
      entry({
        id: `kiboui-${c.slug}`,
        name: c.name,
        description: c.description,
        source: "kiboui",
        sourceUrl: c.url,
        sourceCategory: c.category,
        category: KIBO_CAT[c.slug] ?? "sections-misc",
        tags: ["kibo"],
        install: `npx kibo-ui add ${c.slug}`,
        featured: ["gantt", "kanban", "editor", "stories", "code-block"].includes(c.slug),
      }),
    );
  }
  lines.push("];", "");
  writeFileSync(join(root, "src/data/components/kiboui.ts"), lines.join("\n"));
  console.log(`kiboui.ts: ${d.components.length} components`);
}
