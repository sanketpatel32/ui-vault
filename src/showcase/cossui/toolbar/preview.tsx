import { useState } from "react";
import { Baseline, Bold, Italic, Link2, List, ListOrdered, Strikethrough } from "lucide-react";
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarInput, ToolbarSeparator } from "./toolbar";

const baseClass =
  "inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-fg outline-none transition-colors hover:bg-accent-soft focus-visible:ring-2 focus-visible:ring-accent/40 [&_svg]:size-4 [&_svg]:pointer-events-none";
const activeClass = "bg-accent-soft text-accent";

type ToggleKey = "bold" | "italic" | "underline" | "strike" | "bullet" | "ordered";

const toggles: { key: ToggleKey; label: string; hint: string; icon: typeof Bold }[] = [
  { key: "bold", label: "Bold", hint: "Ctrl+B", icon: Bold },
  { key: "italic", label: "Italic", hint: "Ctrl+I", icon: Italic },
  { key: "underline", label: "Underline", hint: "Ctrl+U", icon: Baseline },
  { key: "strike", label: "Strikethrough", hint: "Ctrl+Shift+X", icon: Strikethrough },
  { key: "bullet", label: "Bulleted list", hint: "Ctrl+Shift+8", icon: List },
  { key: "ordered", label: "Numbered list", hint: "Ctrl+Shift+7", icon: ListOrdered },
];

export default function Preview() {
  const [active, setActive] = useState<Set<ToggleKey>>(new Set(["bold"]));

  const toggle = (key: ToggleKey) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <Toolbar className="flex-wrap">
          <ToolbarGroup>
            {toggles.map((item) => (
              <ToolbarButton
                key={item.key}
                title={`${item.label} (${item.hint})`}
                aria-label={item.label}
                aria-pressed={active.has(item.key)}
                className={`${baseClass} ${active.has(item.key) ? activeClass : ""}`}
                onClick={() => toggle(item.key)}
              >
                <item.icon />
              </ToolbarButton>
            ))}
          </ToolbarGroup>
          <ToolbarSeparator className="h-5" />
          <ToolbarGroup>
            <ToolbarButton
              title="Insert link (Ctrl+K)"
              aria-label="Insert link"
              className={baseClass}
            >
              <Link2 />
            </ToolbarButton>
            <ToolbarInput
              aria-label="Link URL"
              placeholder="Paste URL and press ↵"
              className="h-8 w-44 rounded-md border border-border bg-panel px-2.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            />
          </ToolbarGroup>
        </Toolbar>
      </div>
    </div>
  );
}
