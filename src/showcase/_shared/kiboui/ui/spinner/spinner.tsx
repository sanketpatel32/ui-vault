import type { LucideProps } from "lucide-react";

import { cn } from "@/lib/utils";

export type SpinnerProps = LucideProps;

const Spinner = ({
  className,
  size = 24,
  strokeWidth,
  absoluteStrokeWidth,
  ...props
}: SpinnerProps) => {
  const effectiveStrokeWidth = absoluteStrokeWidth
    ? (strokeWidth ?? 2) * (24 / Number(size))
    : (strokeWidth ?? 2);

  return (
    <svg
      aria-hidden="true"
      className={cn("animate-spin text-foreground", className)}
      fill="none"
      height={size}
      role="status"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={effectiveStrokeWidth}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Loading</title>
      <circle className="opacity-20" cx="12" cy="12" r="10" />
      <path d="M22 12a10 10 0 0 0-10-10" />
    </svg>
  );
};

export { Spinner };
