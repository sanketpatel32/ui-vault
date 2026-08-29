import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface AceternityProps {
  className?: string;
}

export function AceternityComponent({ className }: AceternityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-2xl border border-border bg-panel p-6 shadow-xs text-center max-w-sm",
        className,
      )}
    >
      <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-500 mb-2">
        ⚡ Aceternity UI
      </div>
      <h4 className="text-sm font-semibold text-fg capitalize">text generate effect</h4>
      <p className="mt-1 text-xs text-muted-fg leading-relaxed">
        Futuristic animated UI component.
      </p>
    </motion.div>
  );
}

export default AceternityComponent;
