// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/preloader/split-reveal/images.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
"use client";

import { useCallback, useMemo } from "react";

import { preloadImages } from "./preload-images";
import { SplitRevealTask } from "./task";
import type { SplitRevealTaskContext } from "./types";

export type SplitRevealImagesProps = {
  urls: string[];
};

export function SplitRevealImages({ urls }: SplitRevealImagesProps) {
  const uniqueUrls = useMemo(() => [...new Set(urls.filter(Boolean))], [urls]);

  const run = useCallback(
    ({ report, signal }: SplitRevealTaskContext) => {
      if (signal.aborted) {
        return Promise.resolve();
      }

      return preloadImages(uniqueUrls, (next) => {
        if (!signal.aborted) {
          report(next);
        }
      });
    },
    [uniqueUrls],
  );

  return <SplitRevealTask run={run} />;
}
