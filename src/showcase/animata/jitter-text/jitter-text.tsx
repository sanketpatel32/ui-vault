// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/jitter-text.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import { motion } from "motion/react";
import { cn } from "@/showcase/_shared/animata/lib/utils";

interface JitteryTextProps {
  text: string;
  duration?: number;
  className?: string;
}

export default function JitterText({ text, duration, className }: JitteryTextProps) {
  const animationDuration = duration || 0.6;
  return (
    <div>
      <motion.span
        className={cn("inline-block", className)}
        animate={{
          y: [1.5, 1, -1, 1.5, -1.5, 1, -0.5, 0],
          x: [0, -1, 1.5, -1.5, 1, -1, 0.5, 0],
          rotate: [0.5, -1.5, 1, -1.5, 1, -1, 1, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatDelay: 0.5,
          repeatType: "reverse",
          ease: "easeInOut",
          duration: animationDuration,
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}
