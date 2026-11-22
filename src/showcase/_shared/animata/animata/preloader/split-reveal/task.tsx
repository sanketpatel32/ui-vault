// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/preloader/split-reveal/task.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
"use client";

import { useEffect, useId } from "react";

import { useSplitRevealInternal } from "./context";
import type {
  SplitRevealTaskDefinition,
  SplitRevealTaskGenerator,
  SplitRevealTaskRun,
} from "./types";

export type SplitRevealTaskProps = {
  run?: SplitRevealTaskRun;
  generator?: SplitRevealTaskGenerator;
};

export function SplitRevealTask({ run, generator }: SplitRevealTaskProps) {
  const id = useId();
  const { registerTask } = useSplitRevealInternal();

  useEffect(() => {
    const task: SplitRevealTaskDefinition = {
      run,
      generator,
    };

    if (!task.run && !task.generator) {
      return;
    }

    return registerTask(id, task);
  }, [id, registerTask, run, generator]);

  return null;
}
