import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full rounded-2xl border border-border bg-panel p-6 shadow-xs space-y-3"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
          🍉 Watermelon UI
        </div>
        <h3 className="text-xl font-bold tracking-tight text-fg capitalize">pricing blocks</h3>
        <p className="text-xs text-muted-fg leading-relaxed">
          Modern marketing block crafted with Tailwind CSS and responsive design primitives.
        </p>
        <div className="pt-2 flex justify-center gap-2">
          <Button size="sm">Explore Template</Button>
          <Button variant="outline" size="sm">
            Live Demo
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
