import { Bell } from "lucide-react";
import { ScrollArea } from "./scroll-area";

type Notification = { id: number; title: string; time: string };

const notifications: Notification[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title:
    i % 3 === 0
      ? `New component vendored: source-${12 - i}`
      : i % 3 === 1
        ? `Preview refreshed for entry-${31 - i}`
        : `License check passed for kit-${7 - (i % 5)}`,
  time: `${(i + 1) * 3} min ago`,
}));

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 px-1 pb-2 text-sm font-semibold">
            <Bell className="size-4 text-muted-fg" />
            Notifications
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-fg">
              {notifications.length}
            </span>
          </div>
          <ScrollArea className="h-72 rounded-xl border border-border bg-panel">
            <div className="flex flex-col gap-1 p-2">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted"
                >
                  <span className="truncate text-sm text-fg">{n.title}</span>
                  <span className="shrink-0 text-xs text-muted-fg">{n.time}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
