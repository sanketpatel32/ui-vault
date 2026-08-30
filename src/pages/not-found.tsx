import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-28 text-center">
      <p className="text-gradient font-mono text-7xl font-semibold tracking-tight">404</p>
      <p className="max-w-sm text-sm leading-relaxed text-muted-fg">
        This page fell into a WebGL background and never came back.
      </p>
      <Link to="/">
        <Button variant="outline">Back to safety</Button>
      </Link>
    </div>
  );
}
