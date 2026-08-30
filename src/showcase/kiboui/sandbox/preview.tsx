import { AppWindowIcon, CodeIcon, TerminalIcon } from "lucide-react";
import {
  SandboxCodeEditor,
  SandboxConsole,
  SandboxFileExplorer,
  SandboxLayout,
  SandboxPreview,
  SandboxProvider,
  SandboxTabs,
  SandboxTabsContent,
  SandboxTabsList,
  SandboxTabsTrigger,
} from "./index";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/showcase/_shared/kiboui/ui/resizable";

// Demo from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/sandbox).

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-96 justify-center p-6">
        <div className="h-[480px] w-full max-w-4xl">
          <SandboxProvider>
            <SandboxLayout>
              <SandboxTabs defaultValue="preview">
                <SandboxTabsList>
                  <SandboxTabsTrigger value="code">
                    <CodeIcon size={14} />
                    Code
                  </SandboxTabsTrigger>
                  <SandboxTabsTrigger value="preview">
                    <AppWindowIcon size={14} />
                    Preview
                  </SandboxTabsTrigger>
                  <SandboxTabsTrigger value="console">
                    <TerminalIcon size={14} />
                    Console
                  </SandboxTabsTrigger>
                </SandboxTabsList>
                <SandboxTabsContent className="overflow-hidden" value="code">
                  <ResizablePanelGroup orientation="horizontal">
                    <ResizablePanel
                      className="overflow-y-auto"
                      defaultSize={25}
                      maxSize={40}
                      minSize={20}
                    >
                      <SandboxFileExplorer />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel className="overflow-y-auto">
                      <SandboxCodeEditor />
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </SandboxTabsContent>
                <SandboxTabsContent value="preview">
                  <SandboxPreview showOpenInCodeSandbox={false} showRefreshButton={false} />
                </SandboxTabsContent>
                <SandboxTabsContent value="console">
                  <SandboxConsole />
                </SandboxTabsContent>
              </SandboxTabs>
            </SandboxLayout>
          </SandboxProvider>
        </div>
      </div>
    </div>
  );
}
