import { Button } from "@/showcase/_shared/originui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center p-8">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4 text-sm">
            Vendored from the Origin UI registry.
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
