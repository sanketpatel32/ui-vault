import { useState } from "react";
import { Radio, RadioGroup } from "./radio-group";

const PLANS = [
  {
    description: "For individuals and side projects.",
    label: "Hobby",
    monthly: 0,
  },
  {
    description: "For small teams shipping together.",
    label: "Pro",
    monthly: 12,
  },
  {
    description: "SSO, audit logs and priority support.",
    label: "Enterprise",
    monthly: 48,
  },
];

export default function Preview() {
  const [value, setValue] = useState("Pro");

  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-border bg-panel p-5">
          <RadioGroup value={value} onValueChange={(newValue) => setValue(newValue)}>
            {PLANS.map((plan) => (
              <label className="flex items-start gap-2.5" key={plan.label}>
                <Radio value={plan.label} />
                <span className="grid gap-1">
                  <span className="flex items-baseline gap-2">
                    <span className="text-sm leading-none font-medium text-fg">{plan.label}</span>
                    <span className="text-xs text-muted-fg">
                      {plan.monthly === 0 ? "Free" : `$${plan.monthly}/seat/mo`}
                    </span>
                  </span>
                  <span className="text-xs text-muted-fg">{plan.description}</span>
                </span>
              </label>
            ))}
          </RadioGroup>
          <p className="border-t border-border pt-3 text-xs text-muted-fg">Current plan: {value}</p>
        </div>
      </div>
    </div>
  );
}
