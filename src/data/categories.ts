import type { Category, CategoryGroup } from "./types";

export const GROUP_LABELS: Record<CategoryGroup, string> = {
  components: "Components",
  blocks: "Blocks",
  templates: "Templates",
  inspiration: "Inspiration",
};

export const categories: Category[] = [
  // ---- Components ----
  {
    slug: "text-animation",
    name: "Text & Typography",
    group: "components",
    description: "Animated text reveals, scrambles, gradients and typographic effects.",
  },
  {
    slug: "backgrounds",
    name: "Backgrounds",
    group: "components",
    description: "Shader, gradient and generative backgrounds for heroes and panels.",
  },
  {
    slug: "3d-webgl",
    name: "3D & WebGL",
    group: "components",
    description: "Globes, physics and Three.js scenes that drop into a page.",
  },
  {
    slug: "buttons",
    name: "Buttons & Actions",
    group: "components",
    description: "Buttons with borders, magnets and sparks — actions that feel alive.",
  },
  {
    slug: "cards",
    name: "Cards & Bento",
    group: "components",
    description: "Spotlight, tilt, bento and stacking card treatments.",
  },
  {
    slug: "navigation",
    name: "Navigation",
    group: "components",
    description: "Navbars, docks, sidebars, tabs, breadcrumbs and scroll progress.",
  },
  {
    slug: "forms",
    name: "Forms & Inputs",
    group: "components",
    description: "Inputs, selects, OTP, uploads, sliders, toggles and date pickers.",
  },
  {
    slug: "overlays",
    name: "Overlays",
    group: "components",
    description: "Dialogs, drawers, popovers, tooltips, toasts and command bars.",
  },
  {
    slug: "feedback",
    name: "Loading & Feedback",
    group: "components",
    description: "Spinners, progress, skeletons, empty states and notifications.",
  },
  {
    slug: "data-display",
    name: "Data Display",
    group: "components",
    description: "Tables, charts, stats, badges and avatars for showing data.",
  },
  {
    slug: "numbers",
    name: "Numbers & Counters",
    group: "components",
    description: "Animated numbers, tickers and odometers.",
  },
  {
    slug: "micro-interactions",
    name: "Micro-interactions",
    group: "components",
    description: "Cursor tricks, physics toys and small moments of delight.",
  },

  // ---- Blocks ----
  {
    slug: "hero",
    name: "Hero Sections",
    group: "blocks",
    description: "Above-the-fold sections that set the tone of a page.",
  },
  {
    slug: "features",
    name: "Feature Sections",
    group: "blocks",
    description: "Feature grids, bento layouts and product story sections.",
  },
  {
    slug: "pricing",
    name: "Pricing",
    group: "blocks",
    description: "Pricing tables, plan comparisons and checkout prompts.",
  },
  {
    slug: "testimonials",
    name: "Testimonials & Social Proof",
    group: "blocks",
    description: "Quotes, marquees, logos and proof sections.",
  },
  {
    slug: "cta",
    name: "CTA Sections",
    group: "blocks",
    description: "Big closing calls-to-action and conversion moments.",
  },
  {
    slug: "faq",
    name: "FAQ",
    group: "blocks",
    description: "Frequently-asked-question sections and accordion groups.",
  },
  {
    slug: "footers",
    name: "Footers",
    group: "blocks",
    description: "Multi-column footers, sitemaps and newsletter captures.",
  },
  {
    slug: "navbars",
    name: "Navbars",
    group: "blocks",
    description: "Full page-header blocks with menus and actions.",
  },
  {
    slug: "sections-misc",
    name: "Other Sections",
    group: "blocks",
    description: "Team, blog, contact, stats, onboarding and everything else.",
  },

  // ---- Templates ----
  {
    slug: "dashboards",
    name: "Dashboards",
    group: "templates",
    description: "Complete admin and analytics app layouts.",
  },
  {
    slug: "landing-pages",
    name: "Landing Pages",
    group: "templates",
    description: "Full marketing page compositions.",
  },
  {
    slug: "auth",
    name: "Login & Signup",
    group: "templates",
    description: "Auth screens, OTP flows and onboarding.",
  },
  {
    slug: "full-templates",
    name: "Full Site Templates",
    group: "templates",
    description: "Multi-page, production-shaped site starters.",
  },

  // ---- Inspiration ----
  {
    slug: "galleries",
    name: "Galleries & Reference",
    group: "inspiration",
    description: "Curated screenshots and design-system patterns — reference, not code.",
  },
];
