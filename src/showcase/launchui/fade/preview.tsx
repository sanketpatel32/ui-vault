import { motion } from "motion/react";

export default function Preview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-xl border border-border bg-panel p-6 shadow-xs text-center"
    >
      <h4 className="text-sm font-semibold text-fg">Smooth Fade Transition</h4>
      <p className="mt-1 text-xs text-muted-fg">Subtle entry motion for headers and sections.</p>
    </motion.div>
  );
}
