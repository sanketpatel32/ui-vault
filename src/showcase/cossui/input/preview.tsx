import { useState } from "react";
import { Input } from "./input";

export default function Preview() {
  const [value, setValue] = useState("");

  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-border bg-panel p-5">
          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1.5">
              <span className="text-xs text-muted-fg">Default</span>
              <Input placeholder="Email" type="email" />
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs text-muted-fg">Small</span>
              <Input placeholder="Small" size="sm" />
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs text-muted-fg">Large</span>
              <Input placeholder="Large" size="lg" />
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs text-muted-fg">Disabled</span>
              <Input disabled placeholder="Disabled" />
            </label>
          </div>
          <label className="grid gap-1.5 border-t border-border pt-4">
            <span className="text-xs text-muted-fg">Controlled search</span>
            <Input
              placeholder="Search components…"
              type="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </label>
          <p className="text-xs text-muted-fg">
            {value.trim() ? `${value.trim().length} characters typed` : "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
