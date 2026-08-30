import { useState } from "react";
import { BoldIcon, ItalicIcon, PinIcon, UnderlineIcon } from "lucide-react";
import { Toggle } from "./toggle";

export default function Preview() {
  const [underline, setUnderline] = useState(false);
  const [pinned, setPinned] = useState(true);

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-5 p-6">
        <div className="flex items-center gap-1">
          <Toggle aria-label="Toggle bold" defaultPressed>
            <BoldIcon />
          </Toggle>
          <Toggle aria-label="Toggle italic">
            <ItalicIcon />
          </Toggle>
          <Toggle
            aria-label="Toggle underline"
            pressed={underline}
            onPressedChange={(value) => setUnderline(value)}
          >
            <UnderlineIcon />
          </Toggle>
          <Toggle aria-label="Toggle small" size="sm">
            A
          </Toggle>
        </div>
        <div className="flex items-center gap-2">
          <Toggle
            aria-label="Toggle pin"
            variant="outline"
            pressed={pinned}
            onPressedChange={(value) => setPinned(value)}
          >
            <PinIcon />
            {pinned ? "Pinned" : "Pin"}
          </Toggle>
          <Toggle aria-label="Disabled" disabled variant="outline">
            Locked
          </Toggle>
        </div>
        <p className="text-xs text-muted-fg">
          Underline {underline ? "on" : "off"} — {pinned ? "pinned" : "unpinned"}
        </p>
      </div>
    </div>
  );
}
