import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function AceternityCard() {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative flex h-44 w-72 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-panel p-5 shadow-xl"
      )}
    >
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-[10px] font-semibold text-accent">
          ✨ Aceternity
        </div>
        <h4 className="text-base font-bold text-fg capitalize">hero parallax</h4>
      </div>
      <p className="text-xs text-muted-fg leading-relaxed">
        Next-generation animated UI component with Framer Motion.
      </p>
    </motion.div>
  );
}

export default AceternityCard;
