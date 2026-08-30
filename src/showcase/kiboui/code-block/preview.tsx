import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
  CodeBlockSelect,
  CodeBlockSelectContent,
  CodeBlockSelectItem,
  CodeBlockSelectTrigger,
  CodeBlockSelectValue,
  type BundledLanguage,
} from "./index";

const files: {
  language: BundledLanguage;
  filename: string;
  code: string;
}[] = [
  {
    language: "tsx",
    filename: "Counter.tsx",
    code: `import { useState } from "react";

export function Counter({ step = 1 }: { step?: number }) {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((c) => c + step)}>
      Count: {count}
    </button>
  );
}`,
  },
  {
    language: "css",
    filename: "tokens.css",
    code: `:root {
  --accent: #7c3aed;
  --border: #e4e4e7;
  --radius: 0.5rem;
}

.card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--accent);
}`,
  },
];

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <CodeBlock data={files} defaultValue="tsx">
            <CodeBlockHeader>
              <CodeBlockFiles>
                {(item) => (
                  <CodeBlockFilename value={item.language}>{item.filename}</CodeBlockFilename>
                )}
              </CodeBlockFiles>
              <CodeBlockSelect>
                <CodeBlockSelectTrigger>
                  <CodeBlockSelectValue />
                </CodeBlockSelectTrigger>
                <CodeBlockSelectContent>
                  {(item) => (
                    <CodeBlockSelectItem key={item.language} value={item.language}>
                      {item.filename}
                    </CodeBlockSelectItem>
                  )}
                </CodeBlockSelectContent>
              </CodeBlockSelect>
              <CodeBlockCopyButton />
            </CodeBlockHeader>
            <CodeBlockBody>
              {(item) => (
                <CodeBlockItem key={item.language} value={item.language}>
                  <CodeBlockContent language={item.language as BundledLanguage}>
                    {item.code}
                  </CodeBlockContent>
                </CodeBlockItem>
              )}
            </CodeBlockBody>
          </CodeBlock>
        </div>
      </div>
    </div>
  );
}
