import { useState } from "react";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem, ToggleGroupSeparator } from "./toggle-group";

export default function Preview() {
  const [align, setAlign] = useState<string[]>(["left"]);
  const [formatting, setFormatting] = useState<string[]>(["bold"]);

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-6 p-6">
        <div className="grid gap-2">
          <span className="text-center text-xs text-muted-fg">Single select (default)</span>
          <ToggleGroup value={align} onValueChange={(value) => setAlign(value)}>
            <ToggleGroupItem aria-label="Align left" value="left">
              <AlignLeftIcon />
            </ToggleGroupItem>
            <ToggleGroupItem aria-label="Align center" value="center">
              <AlignCenterIcon />
            </ToggleGroupItem>
            <ToggleGroupItem aria-label="Align right" value="right">
              <AlignRightIcon />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="grid gap-2">
          <span className="text-center text-xs text-muted-fg">
            Multiple select (outline, with separator)
          </span>
          <ToggleGroup
            multiple
            variant="outline"
            value={formatting}
            onValueChange={(value) => setFormatting(value)}
          >
            <ToggleGroupItem aria-label="Bold" value="bold">
              <BoldIcon />
            </ToggleGroupItem>
            <ToggleGroupItem aria-label="Italic" value="italic">
              <ItalicIcon />
            </ToggleGroupItem>
            <ToggleGroupSeparator />
            <ToggleGroupItem aria-label="Underline" value="underline">
              <UnderlineIcon />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <p className="text-xs text-muted-fg">
          {align.length > 0 ? align[0] : "none"} alignment ·{" "}
          {formatting.length > 0 ? formatting.join(" + ") : "no formatting"}
        </p>
      </div>
    </div>
  );
}
