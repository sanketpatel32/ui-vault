import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ComponentProps {
  className?: string;
}

export function AnimateComponent({ className }: ComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("rounded-xl border border-border bg-panel p-4 shadow-xs text-center", className)}
    >
      <h4 className="text-xs font-semibold text-fg capitalize">radix switch</h4>
      <p className="mt-1 text-[11px] text-muted-fg">Animate UI interactive component</p>
    </motion.div>
  );
}

export default AnimateComponent;
