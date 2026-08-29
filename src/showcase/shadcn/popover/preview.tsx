import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 space-y-2">
        <h4 className="font-semibold text-xs text-fg">Dimensions</h4>
        <p className="text-xs text-muted-fg">Set width and height properties for the layer.</p>
      </PopoverContent>
    </Popover>
  );
}
