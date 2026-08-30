import type { License, UIEntry } from "@/data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const LICENSE_LABEL: Record<License, string> = {
  mit: "MIT",
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

const LICENSE_COLOR: Record<License, string> = {
  mit: "bg-emerald-400",
  free: "bg-sky-400",
  freemium: "bg-amber-400",
  paid: "bg-rose-400",
};

export function LicenseBadge({ license, className }: { license: License; className?: string }) {
  return (
    <Badge
      variant="outline"
      className={cn("bg-transparent font-medium text-muted-fg", className)}
      title={`License: ${LICENSE_LABEL[license]}`}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", LICENSE_COLOR[license])} />
      {LICENSE_LABEL[license]}
    </Badge>
  );
}

/** Shown only when the component is actually vendored and renders live here. */
export function PreviewBadge({ entry, className }: { entry: UIEntry; className?: string }) {
  if (!entry.previewKey) return null;
  return (
    <Badge
      className={cn("border-accent/30 bg-accent-soft text-accent", className)}
      title="Vendored — renders live in UI Vault"
    >
      Preview
    </Badge>
  );
}
