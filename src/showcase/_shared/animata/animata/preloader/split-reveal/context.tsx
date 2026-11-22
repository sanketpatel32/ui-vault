// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/preloader/split-reveal/context.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
"use client";

import { createContext, use } from "react";

import type { SplitRevealContextValue, SplitRevealInternalContextValue } from "./types";

export const SplitRevealContext = createContext<SplitRevealContextValue | null>(null);
export const SplitRevealInternalContext = createContext<SplitRevealInternalContextValue | null>(
  null,
);

export function useSplitReveal() {
  const context = use(SplitRevealContext);
  if (!context) {
    throw new Error("SplitReveal primitives must be used within <SplitReveal>.");
  }
  return context;
}

export function useSplitRevealInternal() {
  const context = use(SplitRevealInternalContext);
  if (!context) {
    throw new Error("SplitReveal.Task and SplitReveal.Images must be used within <SplitReveal>.");
  }
  return context;
}
