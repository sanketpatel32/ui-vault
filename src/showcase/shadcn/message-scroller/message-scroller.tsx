import type { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface MessageScrollerProps {
  children: ReactNode;
  className?: string;
}

export function MessageScroller({ children, className }: MessageScrollerProps) {
  return (
    <ScrollArea
      className={cn("h-48 w-full max-w-sm rounded-xl border border-border bg-panel p-3", className)}
    >
      <div className="space-y-3">{children}</div>
    </ScrollArea>
  );
}
