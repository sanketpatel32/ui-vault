import { useState } from "react";
import { UserIcon } from "lucide-react";
import { Skeleton } from "./skeleton";

export default function Preview() {
  const [loading, setLoading] = useState(true);

  const reload = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1800);
  };

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <div className="flex w-full max-w-sm items-start gap-3 rounded-xl border border-border bg-panel p-4">
          {loading ? (
            <>
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="grid w-full gap-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="mt-1 h-8 w-24 rounded-lg" />
              </div>
            </>
          ) : (
            <>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <UserIcon className="size-5" />
              </span>
              <div className="grid w-full gap-1.5">
                <p className="text-sm font-medium text-fg">Ada Lovelace</p>
                <p className="text-xs leading-relaxed text-muted-fg">
                  Engineer and mathematician. Ships previews that load — and skeletons while they
                  do.
                </p>
              </div>
            </>
          )}
        </div>
        <button
          className="rounded-lg bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85 disabled:opacity-50"
          disabled={loading}
          type="button"
          onClick={reload}
        >
          {loading ? "Loading…" : "Reload skeleton"}
        </button>
      </div>
    </div>
  );
}
