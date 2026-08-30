import { useState } from "react";
import { BookOpen, Copy, Download, Link2, MoreHorizontal, Star, Trash2 } from "lucide-react";
import {
  Menu,
  MenuCheckboxItem,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
} from "./menu";

const triggerClass =
  "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-panel text-fg transition-colors hover:bg-accent-soft";

export default function Preview() {
  const [bookmarked, setBookmarked] = useState(true);

  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <Menu>
          <MenuTrigger className={triggerClass} aria-label="Open menu">
            <MoreHorizontal className="size-4" />
          </MenuTrigger>
          <MenuPopup align="end">
            <MenuGroupLabel>Component</MenuGroupLabel>
            <MenuItem>
              <Copy />
              Copy install command
              <MenuShortcut>⌘C</MenuShortcut>
            </MenuItem>
            <MenuItem>
              <Link2 />
              Copy registry URL
            </MenuItem>
            <MenuItem>
              <Download />
              Download files
              <MenuShortcut>⌘D</MenuShortcut>
            </MenuItem>
            <MenuSeparator />
            <MenuCheckboxItem
              checked={bookmarked}
              onCheckedChange={(checked) => setBookmarked(Boolean(checked))}
            >
              <Star />
              Bookmarked
            </MenuCheckboxItem>
            <MenuItem>
              <BookOpen />
              View docs
              <MenuShortcut>⌘⇧O</MenuShortcut>
            </MenuItem>
            <MenuSeparator />
            <MenuItem variant="destructive">
              <Trash2 />
              Remove from project
            </MenuItem>
          </MenuPopup>
        </Menu>
      </div>
    </div>
  );
}
