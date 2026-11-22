import { Loader2 } from "lucide-react";

export function RouteFallback() {
  return (
    <div role="status" className="flex justify-center py-28 text-muted-fg">
      <Loader2 className="size-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
      <span className="sr-only">Loading page…</span>
    </div>
  );
}
