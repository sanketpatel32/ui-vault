import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface FancyTextProps {
  text?: string;
  className?: string;
}

export function FancyText({ text = "scramble hover", className }: FancyTextProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("text-2xl font-bold tracking-tight text-fg font-mono capitalize cursor-pointer", className)}
    >
      {text}
    </motion.span>
  );
}

export default FancyText;
