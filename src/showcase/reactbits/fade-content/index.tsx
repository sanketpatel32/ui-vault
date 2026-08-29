import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ReactBitsProps {
  className?: string;
}

export function ReactBitsComponent({ className }: ReactBitsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className={cn("rounded-2xl border border-border bg-panel p-6 shadow-xs text-center max-w-sm", className)}
    >
      <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-500 mb-2">
        ⚡ ReactBits Animation
      </div>
      <h4 className="text-sm font-semibold text-fg capitalize">fade content</h4>
      <p className="mt-1 text-xs text-muted-fg leading-relaxed">
        Lightweight animated React component from ReactBits.
      </p>
    </motion.div>
  );
}

export default ReactBitsComponent;
