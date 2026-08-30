import { Kbd, KbdGroup } from "./kbd";

const shortcuts: { action: string; keys: string[] }[] = [
  { action: "Open command palette", keys: ["⌘", "K"] },
  { action: "Toggle command palette (Windows)", keys: ["Ctrl", "K"] },
  { action: "Go to favorites", keys: ["G", "F"] },
  { action: "Cycle sources", keys: ["⌥", "↑", "↓"] },
  { action: "Copy install command", keys: ["C"] },
  { action: "Close preview", keys: ["Esc"] },
];

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="flex w-full max-w-sm flex-col gap-1 rounded-xl border border-border bg-panel p-3">
          <p className="px-2 pb-1 text-xs font-semibold tracking-wide text-muted-fg uppercase">
            Keyboard shortcuts
          </p>
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.action}
              className="flex items-center justify-between gap-4 rounded-lg px-2 py-2 transition-colors hover:bg-muted"
            >
              <span className="text-sm text-fg">{shortcut.action}</span>
              <KbdGroup className="shrink-0">
                {shortcut.keys.map((key, index) => (
                  <Kbd key={`${shortcut.action}-${index}`}>{key}</Kbd>
                ))}
              </KbdGroup>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
