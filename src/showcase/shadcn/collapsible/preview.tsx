import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

export default function Preview() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-80 space-y-2 rounded-xl border border-border bg-panel p-4"
    >
      <div className="flex items-center justify-between space-x-4">
        <h4 className="text-xs font-semibold text-fg">Starred Repositories</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ChevronsUpDown size={14} />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border border-border px-3 py-2 font-mono text-xs text-muted-fg">
        @shadcn/ui
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border border-border px-3 py-2 font-mono text-xs text-muted-fg">
          @tailwindlabs/tailwindcss
        </div>
        <div className="rounded-md border border-border px-3 py-2 font-mono text-xs text-muted-fg">
          @radix-ui/primitives
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
