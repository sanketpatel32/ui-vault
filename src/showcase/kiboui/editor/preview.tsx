import {
  EditorClearFormatting,
  EditorFormatBold,
  EditorFormatCode,
  EditorFormatItalic,
  EditorFormatStrike,
  EditorNodeBulletList,
  EditorNodeHeading1,
  EditorNodeHeading2,
  EditorNodeQuote,
  EditorNodeText,
  EditorProvider,
} from "./index";

const initialContent = `
  <h2>Shipping checklist</h2>
  <p>This editor ships with a <strong>slash menu</strong> — type <code>/</code> on an empty line to insert blocks.</p>
  <ul><li>Rich text out of the box</li><li>Task lists, quotes and code blocks</li></ul>
`;

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <EditorProvider
          className="w-full max-w-lg overflow-hidden rounded-lg border border-border bg-panel"
          content={initialContent}
          editorContainerProps={{
            className: "min-h-32 px-4 py-3 text-sm [&_.ProseMirror]:outline-none",
          }}
          placeholder="Start writing, or press / for commands…"
        >
          <div className="flex flex-wrap items-center gap-0.5 border-t border-border p-2">
            <EditorNodeHeading1 hideName />
            <EditorNodeHeading2 hideName />
            <EditorNodeText hideName />
            <EditorNodeBulletList hideName />
            <EditorNodeQuote hideName />
            <span className="mx-1 h-5 w-px bg-border" />
            <EditorFormatBold hideName />
            <EditorFormatItalic hideName />
            <EditorFormatStrike hideName />
            <EditorFormatCode hideName />
            <span className="mx-1 h-5 w-px bg-border" />
            <EditorClearFormatting hideName />
          </div>
        </EditorProvider>
      </div>
    </div>
  );
}
