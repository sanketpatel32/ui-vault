import { motion } from "motion/react";

export function AceternityBackground() {
  return (
    <div className="relative flex h-52 w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-zinc-950 p-6 shadow-2xl">
      <div className="absolute inset-0 bg-linear-to-tr from-purple-500/20 via-transparent to-blue-500/20" />
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-purple-500/30 blur-3xl"
      />
      <div className="relative z-10 text-center">
        <h4 className="text-xl font-bold tracking-tight text-white capitalize">background beams</h4>
        <p className="mt-1 text-xs text-zinc-400">Atmospheric futuristic beam illumination</p>
      </div>
    </div>
  );
}

export default AceternityBackground;
