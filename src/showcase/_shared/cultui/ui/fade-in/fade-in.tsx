import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export type FadeInProps = {
  children?: ReactNode;
  /** Delay before the fade starts (seconds). */
  delay?: number;
  /** Fade duration (seconds). */
  duration?: number;
  /** Vertical offset the element fades in from (px). */
  y?: number;
  className?: string;
};

/**
 * Minimal motion fade wrapper: fades content in on mount (re-runs when `key`
 * changes). Respects `prefers-reduced-motion` by skipping the offset/opacity
 * animation entirely.
 */
export function FadeIn({ children, delay = 0, duration = 0.5, y = 8, className }: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={prefersReducedMotion ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;
