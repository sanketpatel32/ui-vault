import * as React from "react";
import { cn } from "@/lib/utils";

// Minimal shim: the watermelon "input-group" registry dependency has no published item
// (checked 2026-08-29). API follows the shadcn input-group conventions the dashboards use.
export const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-9 w-full items-center rounded-md border border-border bg-transparent text-sm shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/50",
        className,
      )}
      {...props}
    />
  ),
);
InputGroup.displayName = "InputGroup";

export const InputGroupInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full min-w-0 bg-transparent px-3 py-1 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
InputGroupInput.displayName = "InputGroupInput";

export const InputGroupAddon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { align?: "inline-start" | "inline-end" }
>(({ className, align, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "flex items-center gap-1.5 px-3 text-muted-foreground [&>svg]:size-4",
      align === "inline-end" && "ml-auto",
      className,
    )}
    {...props}
  />
));
InputGroupAddon.displayName = "InputGroupAddon";
