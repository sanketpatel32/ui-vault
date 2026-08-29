import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AnimataButton({ children = "ripple button", className, onClick }: ButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold text-accent-fg shadow-md hover:bg-accent/90 cursor-pointer capitalize",
        className
      )}
    >
      {children}
    </motion.button>
  );
}

export default AnimataButton;
