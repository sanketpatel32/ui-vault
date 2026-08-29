import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TypographyProps {
  title?: string;
  children?: ReactNode;
  className?: string;
}

export function Typography({
  title = "Taxonomy & Typography",
  children,
  className,
}: TypographyProps) {
  return (
    <div className={cn("max-w-sm space-y-2 text-left", className)}>
      <h3 className="text-lg font-bold tracking-tight text-fg">{title}</h3>
      {children || (
        <p className="text-xs text-muted-fg leading-relaxed">
          The king, seeing how much happier his subjects were, realized the importance of
          typography.
        </p>
      )}
    </div>
  );
}
