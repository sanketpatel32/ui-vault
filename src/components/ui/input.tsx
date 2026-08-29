import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-lg border border-border bg-panel px-3 text-sm text-fg placeholder:text-muted-fg/70",
        "focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20",
        className,
      )}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-9 cursor-pointer rounded-lg border border-border bg-panel px-2.5 text-sm text-fg",
        "focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
