import { Checkbox } from "../checkbox/checkbox";
import { Label } from "./label";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="grid min-h-48 place-items-center p-6">
        <div className="flex w-full max-w-xs flex-col gap-5 rounded-xl border border-border bg-panel p-5">
          <div className="grid gap-1.5">
            <Label htmlFor="label-username">Username (htmlFor link)</Label>
            <input
              className="h-8 w-full rounded-lg border border-border bg-panel px-3 text-sm outline-none focus-visible:border-accent"
              id="label-username"
              placeholder="Click the label to focus"
            />
          </div>
          <Label className="cursor-pointer">
            <Checkbox defaultChecked />
            Control nested inside the label
          </Label>
          <Label className="text-muted-fg">The same component renders a muted label</Label>
        </div>
      </div>
    </div>
  );
}
