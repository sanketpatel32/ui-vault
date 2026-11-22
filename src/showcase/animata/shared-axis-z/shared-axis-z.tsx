// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/shared-axis-z.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
"use client";

import { useMemo } from "react";

import TextAnimator, {
  type TextAnimationPhaseSpec,
  type TextAnimationSpec,
} from "@/showcase/_shared/animata/animata/text/text-animator";

const BASE_SPEC: TextAnimationSpec = {
  id: "shared-axis-z",
  target: "whole",
  enter: {
    durationMs: 520,
    staggerMs: 0,
    easing: "cubic-bezier(0.2, 0, 0, 1)",
    from: {
      opacity: 0,
      scale: 0.9,
      blurPx: 2,
    },
    to: {
      opacity: 1,
      scale: 1,
      blurPx: 0,
    },
  },
  exit: {
    durationMs: 360,
    staggerMs: 0,
    easing: "cubic-bezier(0.4, 0, 1, 1)",
    from: {
      opacity: 1,
      scale: 1,
      blurPx: 0,
    },
    to: {
      opacity: 0,
      scale: 1.06,
      blurPx: 1,
    },
  },
  swap: {
    mode: "sequential",
    microDelayMs: 20,
  },
};

const DEFAULT_SAMPLES: readonly string[] = [
  "Recedes, then returns.",
  "Steps forward, then back.",
  "A subtle shift in depth.",
];

export interface SharedAxisZProps {
  /** Text(s) to animate. String = single, array = cycle through. */
  text?: string | string[];
  /** Override enter phase (merged with default). */
  enter?: Partial<TextAnimationPhaseSpec>;
  /** Override exit phase (merged with default). */
  exit?: Partial<TextAnimationPhaseSpec>;
  /** Global speed multiplier. Defaults to the runtime default (0.72) when omitted. */
  speed?: number;
  /** Hold time between enter and exit in ms. Defaults to the runtime default (550) when omitted. */
  holdMs?: number;
  /** Gap between cycles in ms. Defaults to the runtime default (320) when omitted. */
  gapMs?: number;
  /** Y-travel multiplier for all transforms. Defaults to the runtime default (0.58) when omitted. */
  yTravel?: number;
  className?: string;
}

export default function SharedAxisZ({
  text,
  enter,
  exit,
  speed,
  holdMs,
  gapMs,
  yTravel,
  className,
}: SharedAxisZProps = {}) {
  const spec = useMemo<TextAnimationSpec>(
    () => ({
      ...BASE_SPEC,
      enter: {
        ...BASE_SPEC.enter,
        ...enter,
        from: { ...BASE_SPEC.enter.from, ...enter?.from },
        to: { ...BASE_SPEC.enter.to, ...enter?.to },
      },
      exit: {
        ...BASE_SPEC.exit,
        ...exit,
        from: { ...BASE_SPEC.exit.from, ...exit?.from },
        to: { ...BASE_SPEC.exit.to, ...exit?.to },
      },
    }),
    [enter, exit],
  );
  const samples = useMemo(() => {
    if (text == null) return [...DEFAULT_SAMPLES];
    return Array.isArray(text) ? text : [text];
  }, [text]);
  return (
    <TextAnimator
      spec={spec}
      samples={samples}
      speed={speed}
      holdMs={holdMs}
      gapMs={gapMs}
      yTravel={yTravel}
      className={className}
    />
  );
}
