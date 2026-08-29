import type { License, PreviewMode } from "@/data";
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
    <Badge className={className} title={`License: ${LICENSE_LABEL[license]}`}>
      <span className={cn("h-1.5 w-1.5 rounded-full", LICENSE_COLOR[license])} />
      {LICENSE_LABEL[license]}
    </Badge>
  );
}

export function TypeBadge({ mode, className }: { mode: PreviewMode; className?: string }) {
  return (
    <Badge
      className={cn(
        mode === "live" ? "border-accent/30 bg-accent-soft text-accent" : undefined,
        className,
      )}
      title={
        mode === "live" ? "Free code — can be previewed live in UI Vault" : "Link-out to source"
      }
    >
      {mode === "live" ? "Live preview" : "Link-out"}
    </Badge>
  );
}
