import { useState } from "react";
import { Textarea } from "./textarea";

const MAX_LENGTH = 120;

export default function Preview() {
  const [bio, setBio] = useState("");

  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-border bg-panel p-5">
          <label className="grid gap-1.5">
            <span className="text-xs text-muted-fg">Bio</span>
            <Textarea
              maxLength={MAX_LENGTH}
              placeholder="Tell us a little about yourself…"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-fg">Grows with content.</p>
            <p className="text-xs text-muted-fg tabular-nums">
              {bio.length}/{MAX_LENGTH}
            </p>
          </div>
          <Textarea disabled placeholder="Disabled textarea" className="border-dashed" />
        </div>
      </div>
    </div>
  );
}
