import { Badge } from "./badge";
import { Button } from "./button";
import { Mockup, MockupFrame } from "./mockup";

export default function Preview() {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-3">
      <Badge variant="outline">🚀 Launch UI Components</Badge>
      <h1 className="text-2xl font-bold tracking-tight text-fg">Build landing pages in minutes</h1>
      <p className="text-xs text-muted-fg max-w-sm">
        Pre-built, responsive React and Tailwind components to ship modern websites fast.
      </p>
      <div className="flex gap-2 pt-1">
        <Button size="sm">Get Started</Button>
        <Button size="sm" variant="outline">
          Learn More
        </Button>
      </div>
      <MockupFrame size="small" className="w-full mt-3">
        <Mockup type="responsive" className="bg-panel p-3 text-center text-xs text-muted-fg">
          Interactive Hero Preview Window
        </Mockup>
      </MockupFrame>
    </div>
  );
}
