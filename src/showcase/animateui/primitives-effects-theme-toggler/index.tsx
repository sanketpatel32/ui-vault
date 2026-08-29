import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface EffectProps {
  children?: ReactNode;
  className?: string;
}

export function AnimateEffect({ children, className }: EffectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
      className={cn("rounded-xl border border-border bg-panel p-4 shadow-xs", className)}
    >
      {children || <span className="text-xs text-muted-fg capitalize">effects theme toggler</span>}
    </motion.div>
  );
}

export default AnimateEffect;
