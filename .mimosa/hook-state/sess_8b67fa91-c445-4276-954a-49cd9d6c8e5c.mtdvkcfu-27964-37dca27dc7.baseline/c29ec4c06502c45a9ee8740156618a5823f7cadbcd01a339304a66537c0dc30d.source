import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "ghost" | "subtle";
type Size = "sm" | "md" | "icon";

const variants: Record<Variant, string> = {
  default: "bg-accent text-accent-fg shadow-sm hover:bg-accent/90 active:bg-accent/80",
  outline: "border border-border bg-transparent hover:bg-muted hover:border-accent/40",
  ghost: "bg-transparent hover:bg-muted",
  subtle: "bg-muted text-fg hover:bg-accent-soft hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-9 px-4 text-sm gap-2",
  icon: "h-9 w-9 p-0",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = "default", size = "md", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-lg font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
