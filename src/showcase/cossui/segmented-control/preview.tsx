import { useState } from "react";
import { Calendar, Columns3, Rows3 } from "lucide-react";
import {
  segmentedControlItemVariants,
  segmentedControlRootClassName,
} from "@/showcase/_shared/cossui/segmented-control";
import { RadioGroupPrimitive, RadioPrimitive } from "@/showcase/_shared/cossui/radio-group";

const views = [
  { value: "table", label: "Table", icon: Rows3 },
  { value: "board", label: "Board", icon: Columns3 },
  { value: "calendar", label: "Calendar", icon: Calendar },
] as const;

export default function Preview() {
  const [view, setView] = useState<string>("table");

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <RadioGroupPrimitive
          aria-label="Project view"
          className={segmentedControlRootClassName}
          value={view}
          onValueChange={(value) => setView(String(value))}
        >
          {views.map((item) => (
            <RadioPrimitive.Root
              key={item.value}
              className={segmentedControlItemVariants({
                className: "grow",
                state: "checked",
              })}
              value={item.value}
            >
              <item.icon />
              {item.label}
            </RadioPrimitive.Root>
          ))}
        </RadioGroupPrimitive>
        <p className="text-xs text-muted-fg">
          Showing issues as{" "}
          <strong className="text-fg">{views.find((v) => v.value === view)?.label}</strong> — switch
          with a click or arrow keys.
        </p>
      </div>
    </div>
  );
}
