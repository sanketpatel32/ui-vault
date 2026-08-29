import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  children?: ReactNode;
  className?: string;
}

export function PricingCard({
  title,
  price,
  period = "/month",
  children,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-panel p-5 shadow-sm max-w-xs space-y-3",
        className,
      )}
    >
      <div>
        <h4 className="text-xs font-semibold text-muted-fg uppercase tracking-wider">{title}</h4>
        <div className="text-2xl font-bold text-fg mt-1">
          {price} <span className="text-xs font-normal text-muted-fg">{period}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
