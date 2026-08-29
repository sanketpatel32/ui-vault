import { Button } from "@/components/ui/button";

export function CtaBlock() {
  return (
    <div className="rounded-2xl border border-border bg-linear-to-r from-emerald-500/10 via-panel to-panel p-6 text-center max-w-md shadow-xs">
      <h3 className="text-base font-bold text-fg">Start Building Faster Today</h3>
      <p className="text-xs text-muted-fg mt-1">
        Join thousands of creators using Watermelon UI blocks.
      </p>
      <Button size="sm" className="mt-4">
        Explore Library
      </Button>
    </div>
  );
}

export default CtaBlock;
