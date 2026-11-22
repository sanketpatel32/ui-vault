// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/preloader/split-reveal/shutter.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
"use client";

import type { ComponentProps } from "react";

import { cn } from "@/showcase/_shared/animata/lib/utils";

import { useSplitReveal } from "./context";

export function SplitRevealShutter({
  side,
  className,
  style,
  ...props
}: ComponentProps<"div"> & { side: "top" | "bottom" }) {
  const { backgroundColor } = useSplitReveal();

  return (
    <div
      className={cn(
        "absolute inset-x-0 h-1/2 will-change-transform",
        side === "top" ? "top-0" : "bottom-0",
        className,
      )}
      style={{ backgroundColor, ...style }}
      data-split-reveal-shutter={side}
      {...props}
    />
  );
}
