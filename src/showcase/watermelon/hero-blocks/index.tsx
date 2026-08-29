import { Button } from "@/components/ui/button";

export function HeroBlock() {
  return (
    <div className="text-center p-6 max-w-md mx-auto space-y-3">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
        🍉 Watermelon UI
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-fg">Next-Gen SaaS Hero Block</h2>
      <p className="text-xs text-muted-fg max-w-sm mx-auto">
        Stunning, responsive hero layouts built with Tailwind CSS and Framer Motion.
      </p>
      <div className="flex justify-center gap-2 pt-2">
        <Button size="sm">Get Started</Button>
        <Button size="sm" variant="outline">
          Live Demo
        </Button>
      </div>
    </div>
  );
}

export default HeroBlock;
