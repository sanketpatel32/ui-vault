import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface AnimataProps {
  className?: string;
}

export function AnimataComponent({ className }: AnimataProps) {
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
      <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500 mb-2">
        ✨ Animata Component
      </div>
      <h4 className="text-sm font-semibold text-fg capitalize">soft blur in</h4>
      <p className="mt-1 text-xs text-muted-fg leading-relaxed">
        Interactive animated component crafted with Tailwind CSS & Motion.
      </p>
    </motion.div>
  );
}

export default AnimataComponent;
