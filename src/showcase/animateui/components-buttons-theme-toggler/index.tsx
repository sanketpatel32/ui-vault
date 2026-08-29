import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AnimateButton({ children = "buttons theme toggler", className, onClick }: ButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-xs font-medium text-accent-fg shadow-sm hover:bg-accent/90 cursor-pointer capitalize",
        className
      )}
    >
      {children}
    </motion.button>
  );
}

export default AnimateButton;
