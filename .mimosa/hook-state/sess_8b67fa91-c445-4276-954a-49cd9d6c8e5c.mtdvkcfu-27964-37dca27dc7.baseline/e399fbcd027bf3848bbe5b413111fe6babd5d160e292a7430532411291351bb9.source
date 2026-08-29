import { Star } from "lucide-react";
import { favorites, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function StarButton({ id, className }: { id: string; className?: string }) {
  const active = useStore(favorites).includes(id);
  return (
    <button
      type="button"
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={active}
      className={cn(
        "inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors",
        active ? "text-amber-400" : "text-muted-fg/60 hover:text-amber-300",
        className,
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        favorites.toggle(id);
      }}
    >
      <Star size={15} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
