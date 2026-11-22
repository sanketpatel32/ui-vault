// https://skullet.lochie.me — MIT (github.com/lochie/skullet). Cataloged 2026-11-22 at v0.0.3 (early — expect churn).
import type { UIEntry } from "../types";

export const skullet: UIEntry[] = [
  {
    id: "skullet-skeleton",
    name: "Skeleton",
    description:
      "Auto-skeleton wrapper: lays your real component out unseen while data is loading and draws a matching skeleton over it — a bar per text line, a block per image/control — so nothing shifts when content arrives. Pass data + sample (or loading), optional id to remember the shape; reveal transitions instant/crossfade/cascade. Draws in a shadow root with its own CSS (not Tailwind). React/Vue/Svelte/vanilla exports.",
    source: "skullet",
    sourceUrl: "https://skullet.lochie.me",
    sourceCategory: "Components",
    category: "feedback",
    tags: ["skullet", "skeleton", "loading"],
    license: "mit",
    previewMode: "live",
    install: "npm install skullet",
  },
];
