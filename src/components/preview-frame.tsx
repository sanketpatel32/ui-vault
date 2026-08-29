import { lazy, Suspense } from "react";
import { ExternalLink, Sparkles } from "lucide-react";
import type { UIEntry } from "@/data";
import { showcaseLoaders } from "@/showcase";
import { sourceById } from "@/lib/registry";
import { Button } from "@/components/ui/button";

const cache = new Map<string, React.ComponentType>();

function resolvePreview(key: string): React.ComponentType | null {
  if (cache.has(key)) return cache.get(key)!;
  const loader = showcaseLoaders[key];
  if (!loader) return null;
  const Component = lazy(loader);
  cache.set(key, Component);
  return Component;
}

export function PreviewFrame({ entry }: { entry: UIEntry }) {
  const source = sourceById.get(entry.source);
  const Preview = entry.previewKey ? resolvePreview(entry.previewKey) : null;

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-panel">
      <div className="flex h-10 items-center justify-between border-b border-border px-4">
        <p className="text-xs font-medium text-muted-fg">
          {Preview ? "Live preview" : "Reference"}
        </p>
        <a
          href={entry.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-muted-fg transition-colors hover:text-accent"
        >
          Open at {source?.name} <ExternalLink size={11} />
        </a>
      </div>

      <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden p-8">
        {Preview ? (
          <Suspense
            fallback={
              <div className="flex items-center gap-2 text-sm text-muted-fg">
                <Sparkles size={14} className="animate-pulse" /> Loading preview…
              </div>
            }
          >
            <Preview />
          </Suspense>
        ) : (
          <div className="flex max-w-sm flex-col items-center gap-4 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-dashed border-border text-muted-fg">
              <ExternalLink size={20} />
            </span>
            <div>
              <p className="text-sm font-medium text-fg">
                {entry.previewMode === "live" ? "Not vendored yet" : "Link-out component"}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-fg">
                {entry.previewMode === "live"
                  ? "This source is free to vendor — the preview just hasn’t been copied into UI Vault yet."
                  : "This source is paid, gated or reference-only, so it lives at the source."}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(entry.sourceUrl, "_blank")}
            >
              View at {source?.name} <ExternalLink size={12} />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
