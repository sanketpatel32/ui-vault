import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface OriginBadgeProps {
  children?: ReactNode;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

export function OriginBadge({
  children = "Origin Badge",
  variant = "default",
  className,
}: OriginBadgeProps) {
  return (
    <Badge variant={variant} className={cn("text-xs font-semibold", className)}>
      {children}
    </Badge>
  );
}

export default OriginBadge;
