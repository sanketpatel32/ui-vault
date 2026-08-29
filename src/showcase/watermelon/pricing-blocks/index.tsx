import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function PricingBlock() {
  return (
    <div className="w-64 rounded-2xl border border-accent bg-panel p-4 shadow-md space-y-3">
      <h4 className="text-xs font-semibold text-fg">Starter Plan</h4>
      <div className="text-2xl font-bold text-fg">
        $19 <span className="text-xs font-normal text-muted-fg">/mo</span>
      </div>
      <ul className="space-y-1.5 text-xs text-muted-fg">
        <li className="flex items-center gap-1.5">
          <Check size={13} className="text-accent" /> 20+ Blocks
        </li>
        <li className="flex items-center gap-1.5">
          <Check size={13} className="text-accent" /> Unlimited exports
        </li>
      </ul>
      <Button size="sm" className="w-full">
        Get Started
      </Button>
    </div>
  );
}

export default PricingBlock;
