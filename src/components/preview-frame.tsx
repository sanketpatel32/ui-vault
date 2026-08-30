import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { AlertCircle, ExternalLink, Loader2, Monitor, Smartphone, Sun, Moon } from "lucide-react";
import type { UIEntry } from "@/data";
import { showcaseLoaders } from "@/showcase";
import { sourceById } from "@/lib/registry";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class PreviewErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("Preview render error:", error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const lazyMap: Record<string, React.LazyExoticComponent<React.ComponentType>> = {};

for (const key of Object.keys(showcaseLoaders)) {
  lazyMap[key] = lazy(showcaseLoaders[key]);
}

function PreviewRenderer({ previewKey }: { previewKey: string }) {
  const Component = lazyMap[previewKey];
  if (!Component) return null;
  return <Component />;
}

function ToolbarButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex h-6.5 w-6.5 cursor-pointer items-center justify-center rounded-md transition-colors",
        active ? "bg-accent-soft text-accent" : "text-muted-fg hover:bg-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

export function PreviewFrame({ entry }: { entry: UIEntry }) {
  const source = sourceById.get(entry.source);
  const appTheme = useTheme();
  const hasPreview = Boolean(entry.previewKey && lazyMap[entry.previewKey]);

  const [narrow, setNarrow] = useState(false);
  // null = follow the app theme; otherwise force that theme on the canvas only
  const [forcedTheme, setForcedTheme] = useState<"light" | "dark" | null>(null);
  const canvasTheme = forcedTheme ?? appTheme;

  useEffect(() => {
    setNarrow(false);
    setForcedTheme(null);
  }, [entry.id]);

  const scoped = forcedTheme !== null || narrow;

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-panel">
      <div className="flex h-10 items-center justify-between gap-2 border-b border-border px-3">
        <p className="px-1 text-xs font-medium text-muted-fg">
          {hasPreview ? "Live preview" : "Install"}
        </p>
        <div className="flex items-center gap-1.5">
          {hasPreview && (
            <>
              <div className="flex items-center gap-0.5">
                <ToolbarButton
                  label={narrow ? "Full width" : "Phone width"}
                  active={narrow}
                  onClick={() => setNarrow((v) => !v)}
                >
                  {narrow ? <Monitor size={14} /> : <Smartphone size={14} />}
                </ToolbarButton>
                <ToolbarButton
                  label={`Preview in ${canvasTheme === "dark" ? "light" : "dark"} mode`}
                  active={forcedTheme !== null}
                  onClick={() =>
                    setForcedTheme((t) =>
                      t === null ? (appTheme === "dark" ? "light" : "dark") : null,
                    )
                  }
                >
                  {canvasTheme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                </ToolbarButton>
              </div>
              <span aria-hidden className="h-4 w-px bg-border" />
            </>
          )}
          <a
            href={entry.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md px-1 py-1 text-xs text-muted-fg transition-colors hover:text-accent"
          >
            Open at {source?.name} <ExternalLink size={11} />
          </a>
        </div>
      </div>

      <div className="preview-dots relative flex min-h-[340px] items-center justify-center overflow-hidden p-6">
        <div
          className={cn(
            "flex w-full items-center justify-center transition-all duration-300",
            scoped && "rounded-xl border border-border shadow-lg shadow-black/5",
            scoped && (canvasTheme === "dark" ? "dark bg-bg" : "light bg-bg"),
            narrow ? "max-w-[400px] p-5" : scoped ? "p-6" : "",
          )}
        >
          {hasPreview && entry.previewKey ? (
            <PreviewErrorBoundary
              key={entry.id}
              fallback={
                <div className="flex max-w-sm flex-col items-center gap-4 px-6 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-dashed border-red-500/40 bg-red-500/10 text-red-400">
                    <AlertCircle size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-fg">Preview failed to render</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-fg">
                      This component requires specific runtime context or props. Grab the install
                      command to use it in your app.
                    </p>
                    {entry.install && (
                      <code className="mt-3 inline-block rounded-md border border-border bg-muted px-2 py-1 font-mono text-[11px] text-muted-fg">
                        {entry.install}
                      </code>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(entry.sourceUrl, "_blank")}
                  >
                    View at {source?.name} <ExternalLink size={12} />
                  </Button>
                </div>
              }
            >
              <Suspense
                fallback={
                  <div className="flex items-center gap-2 py-16 text-sm text-muted-fg">
                    <Loader2 size={14} className="animate-spin" /> Loading preview…
                  </div>
                }
              >
                <PreviewRenderer previewKey={entry.previewKey} />
              </Suspense>
            </PreviewErrorBoundary>
          ) : (
            <div className="flex max-w-sm flex-col items-center gap-4 px-6 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-dashed border-border text-muted-fg">
                <ExternalLink size={20} />
              </span>
              <div>
                <p className="text-sm font-medium text-fg">No local preview yet</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-fg">
                  This component is free to vendor — the code just isn't copied into UI Vault yet.
                  Take the install command or grab it at the source.
                </p>
                {entry.install && (
                  <code className="mt-3 inline-block rounded-md border border-border bg-muted px-2 py-1 font-mono text-[11px] text-muted-fg">
                    {entry.install}
                  </code>
                )}
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
      </div>
    </section>
  );
}
