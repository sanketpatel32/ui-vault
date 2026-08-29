import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./resizable";

export default function Preview() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="max-w-md min-h-[140px] rounded-xl border border-border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4 text-xs text-muted-fg font-medium">
          Sidebar Panel
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4 text-xs text-muted-fg font-medium">
          Main Content Panel
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
