import { useState } from "react";
import {
  Snippet,
  SnippetCopyButton,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger,
} from "./index";

// Demo from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/snippet).

const commands = [
  {
    label: "npm",
    code: "npx shadcn@latest add https://www.kibo-ui.com/r/snippet.json",
  },
  {
    label: "pnpm",
    code: "pnpm dlx shadcn@latest add https://www.kibo-ui.com/r/snippet.json",
  },
  {
    label: "yarn",
    code: "yarn dlx shadcn@latest add https://www.kibo-ui.com/r/snippet.json",
  },
  {
    label: "bun",
    code: "bunx --bun shadcn@latest add https://www.kibo-ui.com/r/snippet.json",
  },
];

export default function Preview() {
  const [value, setValue] = useState(commands[0].label);
  const activeCommand = commands.find((command) => command.label === value);

  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="w-full max-w-xl">
          <Snippet onValueChange={setValue} value={value}>
            <SnippetHeader>
              <SnippetTabsList>
                {commands.map((command) => (
                  <SnippetTabsTrigger key={command.label} value={command.label}>
                    {command.label}
                  </SnippetTabsTrigger>
                ))}
              </SnippetTabsList>
              {activeCommand && <SnippetCopyButton value={activeCommand.code} />}
            </SnippetHeader>
            {commands.map((command) => (
              <SnippetTabsContent key={command.label} value={command.label}>
                {command.code}
              </SnippetTabsContent>
            ))}
          </Snippet>
        </div>
      </div>
    </div>
  );
}
