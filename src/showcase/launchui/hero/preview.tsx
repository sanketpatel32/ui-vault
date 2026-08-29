import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Preview() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-lg mx-auto">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-panel px-3 py-1 text-xs text-muted-fg mb-4">
        <span>🚀 Launch UI Components</span>
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
        Build landing pages in minutes
      </h1>
      <p className="mt-3 text-xs text-muted-fg leading-relaxed max-w-md">
        Pre-built, responsive React and Tailwind components to ship modern websites fast.
      </p>
      <div className="mt-6 flex gap-3">
        <Button>
          Get Started <ArrowRight size={14} />
        </Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </div>
  );
}
