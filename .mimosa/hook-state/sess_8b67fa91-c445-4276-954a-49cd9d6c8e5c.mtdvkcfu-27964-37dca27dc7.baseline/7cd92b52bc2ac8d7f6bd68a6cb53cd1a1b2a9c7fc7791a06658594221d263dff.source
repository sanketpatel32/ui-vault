import type { ComponentType } from "react";

/**
 * Lazy loaders for vendored live previews, keyed by UIEntry.previewKey.
 * One folder per component under src/showcase/<source>/<name>/preview.tsx.
 */
export const showcaseLoaders: Record<string, () => Promise<{ default: ComponentType }>> = {
  "reactbits-blur-text": () => import("./reactbits/blur-text/preview"),
  "reactbits-shiny-text": () => import("./reactbits/shiny-text/preview"),
  "reactbits-count-up": () => import("./reactbits/count-up/preview"),
  "motionprimitives-text-effect": () => import("./motionprimitives/text-effect/preview"),
  "motionprimitives-glow-effect": () => import("./motionprimitives/glow-effect/preview"),
  "fancy-letter-swap": () => import("./fancy/letter-swap/preview"),
  "fancy-typewriter": () => import("./fancy/typewriter/preview"),
  "aceternity-moving-border": () => import("./aceternity/moving-border/preview"),
  "numberflow-numberflow": () => import("./numberflow/numberflow/preview"),
  "numberflow-group": () => import("./numberflow/group/preview"),
};
