import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Preview() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-accent/30 bg-accent-soft p-3 text-xs text-fg max-w-md w-full">
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-accent" />
        <span>Origin UI v2 component variants now available.</span>
      </div>
      <Button size="sm" variant="outline" className="h-7 text-xs">Upgrade</Button>
    </div>
  );
}
