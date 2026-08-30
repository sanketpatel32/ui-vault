import { useState } from "react";
import { Checkbox } from "./checkbox";

export default function Preview() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="w-full">
      <div className="grid min-h-48 place-items-center p-6">
        <div className="flex w-full max-w-xs flex-col gap-3.5 rounded-xl border border-border bg-panel p-4">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm">
            <Checkbox checked={checked} onCheckedChange={(value) => setChecked(value)} />
            Controlled — {checked ? "checked" : "unchecked"}
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-sm">
            <Checkbox defaultChecked />
            Uncontrolled, defaultChecked
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-sm">
            <Checkbox defaultChecked indeterminate />
            Indeterminate
          </label>
          <label className="flex items-center gap-2.5 text-sm text-muted-fg">
            <Checkbox defaultChecked disabled />
            Disabled
          </label>
        </div>
      </div>
    </div>
  );
}
