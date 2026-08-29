import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface OriginButtonProps {
  children?: ReactNode;
  variant?: "default" | "secondary" | "outline" | "ghost";
  className?: string;
  onClick?: () => void;
}

export function OriginButton({
  children = "Origin Button",
  variant = "default",
  className,
  onClick,
}: OriginButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn("text-xs font-medium cursor-pointer", className)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default OriginButton;
