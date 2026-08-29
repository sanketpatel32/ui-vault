import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TextProps {
  text?: string;
  className?: string;
}

export function AnimateText({ text = "texts counting number", className }: TextProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("text-xl font-bold tracking-tight text-fg capitalize", className)}
    >
      {text}
    </motion.span>
  );
}

export default AnimateText;
