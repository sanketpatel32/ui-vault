// Re-implemented from Motion Primitives "Text Effect" (MIT):
// https://motion-primitives.com/docs/text-effect
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const TEXT = "Motion, done right.";

export default function Preview() {
  const [runId, setRunId] = useState(0);
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <p className="text-3xl font-semibold tracking-tight sm:text-4xl" aria-label={TEXT}>
        {TEXT.split("").map((char, i) => (
          <motion.span
            key={`${runId}-${i}`}
            aria-hidden
            className="inline-block"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: i * 0.03, duration: 0.4, ease: "easeOut" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </p>
      <button
        type="button"
        onClick={() => setRunId((r) => r + 1)}
        className="cursor-pointer rounded-lg border border-border px-3.5 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:border-accent/40 hover:text-accent"
      >
        Replay
      </button>
    </div>
  );
}
