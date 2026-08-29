import type { ReactNode } from "react";
import { Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AttachmentProps {
  name: string;
  size?: string;
  className?: string;
  children?: ReactNode;
}

export function Attachment({ name, size = "2.4 MB", className }: AttachmentProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-lg border border-border bg-panel px-3 py-2 text-xs",
        className,
      )}
    >
      <Paperclip size={15} className="text-muted-fg shrink-0" />
      <span className="font-medium text-fg truncate">{name}</span>
      <span className="text-[10px] text-muted-fg ml-auto">{size}</span>
    </div>
  );
}
