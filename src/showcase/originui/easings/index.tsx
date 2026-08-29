import { motion } from "motion/react";

export function OriginEasings() {
  return (
    <div className="flex flex-col gap-3 w-64 items-center">
      <motion.div
        animate={{ x: [-40, 40, -40] }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], repeat: Infinity }}
        className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center text-xs text-accent-fg font-bold"
      >
        O
      </motion.div>
      <span className="text-[11px] text-muted-fg font-mono">cubic-bezier(0.16, 1, 0.3, 1)</span>
    </div>
  );
}

export default OriginEasings;
