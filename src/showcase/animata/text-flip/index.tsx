import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TextProps {
  text?: string;
  className?: string;
}

export function AnimataText({ text = "text flip", className }: TextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "text-2xl font-bold tracking-tight text-fg capitalize cursor-pointer",
        className,
      )}
    >
      {text}
    </motion.div>
  );
}

export default AnimataText;
