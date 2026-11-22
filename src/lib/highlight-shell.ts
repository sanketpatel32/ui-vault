export type ShellTokenKind =
  | "command"
  | "keyword"
  | "package"
  | "version"
  | "url"
  | "flag"
  | "text"
  | "space";

export interface ShellToken {
  kind: ShellTokenKind;
  text: string;
}

const COMMANDS = new Set(["npx", "npm", "pnpm", "yarn", "bun", "bunx", "deno"]);
const KEYWORDS = new Set(["add", "i", "install", "dlx", "exec", "run", "x", "init", "create"]);
const URL_RE = /^https?:\/\//;
const PACKAGE_RE = /^(@[\w.-]+\/)?[\w.-]+(\/[\w.-]+)*(@[\w.^~<>=*-]+)?$/;

function classifyWord(word: string, isFirst: boolean): ShellToken[] {
  if (isFirst && COMMANDS.has(word)) return [{ kind: "command", text: word }];
  if (URL_RE.test(word)) return [{ kind: "url", text: word }];
  if (word.startsWith("-")) return [{ kind: "flag", text: word }];
  if (KEYWORDS.has(word)) return [{ kind: "keyword", text: word }];
  if (PACKAGE_RE.test(word)) {
    const at = word.indexOf("@", 1);
    if (at > 0) {
      return [
        { kind: "package", text: word.slice(0, at) },
        { kind: "version", text: word.slice(at) },
      ];
    }
    return [{ kind: "package", text: word }];
  }
  return [{ kind: "text", text: word }];
}

/** Tokenizes a one-line install command. Concatenating every token's text yields the input. */
export function highlightShell(code: string): ShellToken[] {
  const tokens: ShellToken[] = [];
  let first = true;
  for (const part of code.split(/(\s+)/)) {
    if (!part) continue;
    if (/^\s+$/.test(part)) {
      tokens.push({ kind: "space", text: part });
      if (part.includes("\n")) first = true;
      continue;
    }
    tokens.push(...classifyWord(part, first));
    first = false;
  }
  return tokens;
}
