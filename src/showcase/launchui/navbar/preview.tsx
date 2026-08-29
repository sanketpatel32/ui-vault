import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <header className="w-full max-w-lg rounded-xl border border-border bg-panel/80 p-3 shadow-xs backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="font-bold text-xs tracking-wider text-fg">LAUNCHUI</div>
        <nav className="flex gap-4 text-xs text-muted-fg">
          <a href="#" className="hover:text-fg">
            Features
          </a>
          <a href="#" className="hover:text-fg">
            Pricing
          </a>
          <a href="#" className="hover:text-fg">
            About
          </a>
        </nav>
        <Button size="sm">Sign In</Button>
      </div>
    </header>
  );
}
