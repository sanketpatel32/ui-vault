import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-panel/50 px-6 py-16 text-center">
      {icon && (
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
          {icon}
        </span>
      )}
      <p className="font-medium text-fg">{title}</p>
      <p className="max-w-sm text-sm leading-relaxed text-muted-fg">{description}</p>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
