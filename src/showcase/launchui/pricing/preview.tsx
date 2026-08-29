import { PricingCard } from "./pricing";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <PricingCard title="Pro Plan" price="$29">
      <p className="text-xs text-muted-fg">Full access to all Launch UI marketing blocks.</p>
      <Button size="sm" className="w-full mt-2">
        Subscribe
      </Button>
    </PricingCard>
  );
}
