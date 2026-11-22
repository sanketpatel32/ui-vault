// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/preloader/split-reveal/execute-task.ts (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { SplitRevealProgressReporter, SplitRevealTaskDefinition } from "./types";

export async function executeTask(
  task: SplitRevealTaskDefinition,
  report: SplitRevealProgressReporter,
  signal: AbortSignal,
) {
  const ctx = { report, signal };

  if (task.run) {
    await task.run(ctx);
    return;
  }

  if (task.generator) {
    if (signal.aborted) {
      return;
    }

    const iterator = task.generator(ctx);
    let result = await iterator.next();

    while (!result.done) {
      if (signal.aborted) {
        await iterator.return?.();
        return;
      }
      if (result.value) {
        report(result.value);
      }
      result = await iterator.next();
    }
  }
}
