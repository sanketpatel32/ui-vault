import { Button } from "@/showcase/_shared/originui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center p-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Vendored from Origin UI.</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
