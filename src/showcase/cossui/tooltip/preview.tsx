import { Bold, Italic, Underline, Link2 } from "lucide-react";
import { Tooltip, TooltipPopup, TooltipTrigger } from "./tooltip";

const buttonClass =
  "inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-panel text-fg transition-colors hover:bg-accent-soft";

const items = [
  { icon: Bold, label: "Bold", hint: "Ctrl B", side: "top" },
  { icon: Italic, label: "Italic", hint: "Ctrl I", side: "right" },
  { icon: Underline, label: "Underline", hint: "Ctrl U", side: "bottom" },
  { icon: Link2, label: "Insert link", hint: "Ctrl K", side: "left" },
] as const;

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-panel p-1.5">
          {items.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger className={buttonClass} aria-label={item.label}>
                <item.icon className="size-4" />
              </TooltipTrigger>
              <TooltipPopup side={item.side} className="gap-1.5">
                <span>{item.label}</span>
                <span className="opacity-60">{item.hint}</span>
              </TooltipPopup>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
}
