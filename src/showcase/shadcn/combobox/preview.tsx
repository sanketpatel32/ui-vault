import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

export default function Preview() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("next.js");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-52 justify-between">
          {value ? frameworks.find((f) => f.value === value)?.label : "Select framework..."}
          <ChevronsUpDown size={14} className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-1">
        <div className="space-y-1">
          {frameworks.map((f) => (
            <div
              key={f.value}
              onClick={() => {
                setValue(f.value);
                setOpen(false);
              }}
              className="flex items-center justify-between px-2 py-1.5 text-xs rounded-md cursor-pointer hover:bg-muted"
            >
              <span>{f.label}</span>
              {value === f.value && <Check size={14} />}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
