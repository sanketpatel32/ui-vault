import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface FancyProps {
  className?: string;
}

export function FancyComponent({ className }: FancyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={cn("rounded-2xl border border-border bg-panel p-6 shadow-xs text-center max-w-sm", className)}
    >
      <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-500 mb-2">
        ✨ Fancy Micro-Interaction
      </div>
      <h4 className="text-sm font-semibold text-fg capitalize">elastic line</h4>
      <p className="mt-1 text-xs text-muted-fg leading-relaxed">
        Interactive motion primitive built with Framer Motion.
      </p>
    </motion.div>
  );
}

export default FancyComponent;
