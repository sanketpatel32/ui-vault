import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CardProps {
  children?: ReactNode;
  className?: string;
}

export function AnimataCard({ children, className }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative w-72 rounded-2xl border border-border bg-panel p-6 shadow-sm overflow-hidden text-center",
        className,
      )}
    >
      <div className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-500 mb-2">
        🌸 Animata Card
      </div>
      <h4 className="text-sm font-semibold text-fg capitalize">card spread</h4>
      <p className="mt-1 text-xs text-muted-fg leading-relaxed">
        Smooth micro-animated interface element.
      </p>
      {children}
    </motion.div>
  );
}

export default AnimataCard;
