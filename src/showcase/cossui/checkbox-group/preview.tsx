import { useState } from "react";
import { Checkbox } from "../checkbox/checkbox";
import { CheckboxGroup } from "./checkbox-group";

const OPTIONS = [
  {
    description: "Product updates and weekly digest",
    label: "Product newsletter",
    value: "newsletter",
  },
  {
    description: "Comments, mentions and answers",
    label: "Community activity",
    value: "activity",
  },
  {
    description: "Billing and security alerts",
    label: "Account alerts",
    value: "alerts",
  },
];

export default function Preview() {
  const [value, setValue] = useState<string[]>(["alerts"]);

  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-border bg-panel p-5">
          <div>
            <h3 className="text-sm font-medium text-fg">Notifications</h3>
            <p className="mt-0.5 text-xs text-muted-fg">Choose what lands in your inbox.</p>
          </div>
          <CheckboxGroup value={value} onValueChange={(newValue) => setValue(newValue)}>
            {OPTIONS.map((option) => (
              <label className="flex items-start gap-2.5" key={option.value}>
                <Checkbox value={option.value} />
                <span className="grid gap-1">
                  <span className="text-sm leading-none font-medium text-fg">{option.label}</span>
                  <span className="text-xs text-muted-fg">{option.description}</span>
                </span>
              </label>
            ))}
          </CheckboxGroup>
          <p className="border-t border-border pt-3 text-xs text-muted-fg">
            Selected: {value.length > 0 ? value.join(", ") : "nothing"}
          </p>
        </div>
      </div>
    </div>
  );
}
