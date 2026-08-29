import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface OriginProps {
  children?: ReactNode;
  className?: string;
}

export function OriginComponent({ children, className }: OriginProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-panel p-5 shadow-xs text-center max-w-sm",
        className,
      )}
    >
      <div className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-[10px] font-semibold text-accent mb-2">
        Origin UI
      </div>
      <h4 className="text-sm font-semibold text-fg capitalize">input Family</h4>
      <p className="mt-1 text-xs text-muted-fg leading-relaxed">
        High-density, accessible UI component variant collection.
      </p>
      {children}
    </div>
  );
}

export default OriginComponent;
