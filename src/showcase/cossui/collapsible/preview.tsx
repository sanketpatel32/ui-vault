import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "./collapsible";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="w-full max-w-md rounded-xl border border-border bg-panel">
          <Collapsible>
            <CollapsibleTrigger className="group flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-medium">
              Appearance settings
              <ChevronDown className="size-4 text-muted-fg transition-transform duration-200 group-data-[panel-open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsiblePanel>
              <div className="flex flex-col gap-2 px-4 pb-4">
                {[
                  ["Theme", "Follow system (dark)"],
                  ["Density", "Compact"],
                  ["Preview grid", "2 columns"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 rounded-lg bg-muted px-3 py-2"
                  >
                    <span className="text-sm text-fg">{label}</span>
                    <span className="text-xs text-muted-fg">{value}</span>
                  </div>
                ))}
                <p className="pt-1 text-xs text-muted-fg">
                  Click the header to collapse the panel again.
                </p>
              </div>
            </CollapsiblePanel>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}
