import { ClipboardCopy, CornerUpLeft, FileArchive, Pencil, Scissors, Trash2 } from "lucide-react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "./context-menu";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <ContextMenu>
          <ContextMenuTrigger className="flex h-32 w-full max-w-sm cursor-default select-none flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border bg-panel text-center">
            <span className="text-sm font-medium">release-notes.md</span>
            <span className="text-xs text-muted-fg">Right-click (or long-press) this file</span>
          </ContextMenuTrigger>
          <ContextMenuPopup>
            <ContextMenuItem>
              <CornerUpLeft />
              Rename
              <ContextMenuShortcut>⌘R</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              <Pencil />
              Edit in place
              <ContextMenuShortcut>⌘E</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              <Scissors />
              Cut
              <ContextMenuShortcut>⌘X</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              <ClipboardCopy />
              Copy
              <ContextMenuShortcut>⌘C</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem defaultChecked>Read only</ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">
              <Trash2 />
              Move to trash
            </ContextMenuItem>
            <ContextMenuItem variant="destructive">
              <FileArchive />
              Archive
            </ContextMenuItem>
          </ContextMenuPopup>
        </ContextMenu>
      </div>
    </div>
  );
}
