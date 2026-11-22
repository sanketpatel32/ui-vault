import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface RootErrorBoundaryProps {
  children: ReactNode;
}

interface RootErrorBoundaryState {
  error: Error | null;
}

function clearLocalStateAndReload() {
  try {
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith("ui-vault:")) localStorage.removeItem(key);
    }
  } catch {
    // storage unavailable — reload anyway
  }
  window.location.reload();
}

function CrashScreen({ error }: { error: Error }) {
  return (
    <div
      role="alert"
      className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center"
    >
      <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="max-w-md text-sm leading-relaxed text-muted-fg">
        UI Vault hit an unexpected error and couldn't render this page. If it keeps happening,
        clearing local state (favorites, recents, theme) usually fixes it.
      </p>
      <pre className="max-w-md overflow-auto rounded-lg border border-border bg-panel px-3 py-2 text-left font-mono text-xs text-muted-fg">
        {error.message || String(error)}
      </pre>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Reload
        </Button>
        <Button onClick={clearLocalStateAndReload}>Clear local state and reload</Button>
      </div>
    </div>
  );
}

export class RootErrorBoundary extends Component<RootErrorBoundaryProps, RootErrorBoundaryState> {
  constructor(props: RootErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): RootErrorBoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("UI Vault crashed:", error, errorInfo);
  }

  override render() {
    return this.state.error ? <CrashScreen error={this.state.error} /> : this.props.children;
  }
}
