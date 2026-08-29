import { Button } from "./button";
import { LinkButton } from "./link-button";

export default function Preview() {
  return (
    <div className="rounded-2xl border border-border bg-gradient-to-r from-accent/10 via-panel to-panel p-6 text-center max-w-md">
      <h3 className="text-lg font-bold text-fg">Ready to build your next project?</h3>
      <p className="text-xs text-muted-fg mt-1">Get started with Launch UI blocks today.</p>
      <div className="mt-4 flex justify-center gap-3">
        <Button size="sm">Start Building Now</Button>
        <LinkButton href="#" variant="outline" size="sm">
          Explore Docs
        </LinkButton>
      </div>
    </div>
  );
}
