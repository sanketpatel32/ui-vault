import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InputGroupProps {
  prefix?: ReactNode;
  suffix?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function InputGroup({ prefix, suffix, children, className }: InputGroupProps) {
  return (
    <div
      className={cn(
        "relative flex items-center rounded-lg border border-border bg-panel focus-within:ring-1 focus-within:ring-ring",
        className,
      )}
    >
      {prefix && <div className="pl-3 pr-1 text-muted-fg text-xs">{prefix}</div>}
      {children}
      {suffix && <div className="pr-3 pl-1 text-muted-fg text-xs">{suffix}</div>}
    </div>
  );
}
