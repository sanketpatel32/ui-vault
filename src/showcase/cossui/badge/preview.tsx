import { CheckCircle2, CircleAlert, GitBranch, type LucideIcon } from "lucide-react";
import { Badge, type BadgeProps } from "./badge";

type Entry = {
  variant: BadgeProps["variant"];
  label: string;
  icon?: LucideIcon;
  dot?: boolean;
};

const variants: Entry[] = [
  { variant: "default", label: "Default" },
  { variant: "secondary", label: "Secondary" },
  { variant: "outline", label: "Outline" },
  { variant: "success", label: "Passing", icon: CheckCircle2 },
  { variant: "warning", label: "Stale", dot: true },
  { variant: "info", label: "v2.4.0", icon: GitBranch },
  { variant: "error", label: "Failed", icon: CircleAlert },
  { variant: "destructive", label: "Removed" },
];

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {variants.map((entry) => (
            <Badge key={entry.variant} variant={entry.variant}>
              {entry.dot && <span className="size-1.5 rounded-full bg-current opacity-80" />}
              {entry.icon && <entry.icon />}
              {entry.label}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="secondary" size="sm">
            sm
          </Badge>
          <Badge variant="secondary">default</Badge>
          <Badge variant="secondary" size="lg">
            lg
          </Badge>
        </div>
        <p className="text-xs text-muted-fg">8 variants · status dots · icons · 3 sizes</p>
      </div>
    </div>
  );
}
