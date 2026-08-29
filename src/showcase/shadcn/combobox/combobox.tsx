import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("next.js");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-xs cursor-pointer"
        >
          {value ? frameworks.find((f) => f.value === value)?.label : "Select framework..."}
          <ChevronsUpDown className="opacity-50" size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-1 bg-panel border border-border rounded-lg shadow-md">
        <div className="space-y-1">
          {frameworks.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => {
                setValue(f.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between px-2 py-1.5 text-xs rounded hover:bg-muted cursor-pointer",
                value === f.value ? "font-semibold text-accent" : "text-fg",
              )}
            >
              {f.label}
              {value === f.value && <Check size={14} className="text-accent" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
