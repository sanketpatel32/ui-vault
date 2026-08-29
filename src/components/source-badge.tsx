import type { SourceId } from "@/data";
import { sourceById } from "@/lib/registry";
import { cn } from "@/lib/utils";

export function SourceBadge({
  source,
  className,
  showName = true,
}: {
  source: SourceId;
  className?: string;
  showName?: boolean;
}) {
  const s = sourceById.get(source);
  if (!s) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-fg",
        className,
      )}
    >
      <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
      {showName && s.name}
    </span>
  );
}
