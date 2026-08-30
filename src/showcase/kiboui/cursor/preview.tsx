import { Cursor, CursorBody, CursorMessage, CursorName, CursorPointer } from "./index";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="w-full max-w-md rounded-lg border border-border bg-panel p-4 font-mono text-xs">
          <p className="mb-2 text-muted-fg">— hero.tsx —</p>
          <p className="text-fg">const title = "Kibo UI";</p>
          <p className="text-fg">const subtitle = "Live cursors";</p>

          <div className="mt-6 flex flex-col items-start gap-8">
            <Cursor className="text-violet-500">
              <CursorPointer />
              <CursorBody>
                <CursorName>Anna</CursorName>
                <CursorMessage>editing the title</CursorMessage>
              </CursorBody>
            </Cursor>

            <Cursor className="ml-24 text-sky-500">
              <CursorPointer />
              <CursorBody>
                <CursorName>Marco</CursorName>
              </CursorBody>
            </Cursor>

            <Cursor className="ml-48 text-emerald-500">
              <CursorPointer />
              <CursorBody>
                <CursorName>Jules</CursorName>
                <CursorMessage>viewing</CursorMessage>
              </CursorBody>
            </Cursor>
          </div>
        </div>
      </div>
    </div>
  );
}
