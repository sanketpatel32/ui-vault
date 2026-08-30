// Mechanical fix loop for vendored showcase code, driven by tsc output:
//  - TS1484/TS2578: type-only imports under verbatimModuleSyntax / stale @ts-expect-error
//  - TS6133/TS6196: unused imports, bindings, params (underscore-prefix or removal)
// Run: npx tsx scripts/fix-v06.mts   (idempotent; loops until no matching errors)
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

function tscErrors(): { file: string; line: number; col: number; code: string; msg: string }[] {
  let out = "";
  try {
    out = execSync("npx tsc -b --pretty false", {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });
  } catch (e: any) {
    out = (e.stdout ?? "") + (e.stderr ?? "");
  }
  const errs: { file: string; line: number; col: number; code: string; msg: string }[] = [];
  for (const m of out.matchAll(/^(.+?)\((\d+),(\d+)\): error (TS\d+): (.*)$/gm)) {
    errs.push({ file: m[1], line: +m[2], col: +m[3], code: m[4], msg: m[5] });
  }
  return errs;
}

const files = new Map<string, string>();
const get = (f: string) => {
  if (!files.has(f)) files.set(f, readFileSync(f, "utf8"));
  return files.get(f)!;
};
const put = (f: string, c: string) => files.set(f, c);

function importBlockOf(src: string, name: string) {
  for (const m of src.matchAll(/import\s+(type\s+)?\{([^}]*)\}\s*from\s*["']([^"']+)["'];?/gs)) {
    const names = m[2]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (names.some((n) => n.split(/\s+as\s+/)[0] === name || n === name)) {
      return {
        start: m.index!,
        end: m.index! + m[0].length,
        names,
        module: m[3],
        prefix: m[1] ?? "",
      };
    }
  }
  return null;
}

for (let round = 0; round < 8; round++) {
  const errs = tscErrors().filter((e) => ["TS1484", "TS6133", "TS6196", "TS2578"].includes(e.code));
  if (!errs.length) {
    console.log(`round ${round}: clean`);
    break;
  }
  let applied = 0;
  const skipped = new Set<string>();
  for (const e of errs) {
    const name = e.msg.match(/'([^']+)'/)?.[1];
    const src = get(e.file);

    if (e.code === "TS2578") {
      const lines = src.split("\n");
      const l = lines[e.line - 1] ?? "";
      if (/@ts-expect-error/.test(l)) {
        lines.splice(e.line - 1, 1);
        put(e.file, lines.join("\n"));
        applied++;
      }
      continue;
    }
    if (!name) continue;

    const block = importBlockOf(src, name);
    if (e.code === "TS1484" && block) {
      const rest = block.names.filter((n) => n.split(/\s+as\s+/)[0] !== name && n !== name);
      const valuePart = rest.length
        ? `import ${block.prefix ? block.prefix + " " : ""}{ ${rest.join(", ")} } from "${block.module}";`
        : "";
      const typePart = `import type { ${name} } from "${block.module}";`;
      put(
        e.file,
        src.slice(0, block.start) +
          [valuePart, typePart].filter(Boolean).join("\n") +
          src.slice(block.end),
      );
      applied++;
      continue;
    }

    if (e.code === "TS6133" || e.code === "TS6196") {
      if (block) {
        // unused named import -> drop it (and the statement if it empties)
        const rest = block.names.filter((n) => n.split(/\s+as\s+/)[0] !== name && n !== name);
        const valuePart = rest.length
          ? `import ${block.prefix ? block.prefix + " " : ""}{ ${rest.join(", ")} } from "${block.module}";`
          : "";
        put(e.file, src.slice(0, block.start) + valuePart + src.slice(block.end));
        applied++;
        continue;
      }
      // unused default import: `import NAME, {` -> `import {`;  `import NAME from "m";` -> drop line
      const mixed = new RegExp(`import\\s+${name}\\s*,\\s*\\{`).exec(src);
      if (mixed) {
        put(e.file, src.replace(mixed[0], "import {"));
        applied++;
        continue;
      }
      const solo = new RegExp(`import\\s+${name}\\s+from\\s+["'][^"']+["'];?\\r?\\n`).exec(src);
      if (solo) {
        put(e.file, src.replace(solo[0], ""));
        applied++;
        continue;
      }
      const lines = src.split("\n");
      const line = lines[e.line - 1] ?? "";
      // array-destructure binding: const [a, NAME] = ...
      if (new RegExp(`(\\[|,\\s*)${name}(\\s*[,\\]])`).test(line) && /=\s*\[/.test(line)) {
        lines[e.line - 1] = line.replace(
          new RegExp(`(\\[|,\\s*)${name}(\\s*[,\\]])`),
          `$1_${name}$2`,
        );
        put(e.file, lines.join("\n"));
        applied++;
        continue;
      }
      // object-destructure binding: const { a, NAME } = ... / { NAME, ... }
      if (/=\s*\{/.test(line) && new RegExp(`[{,]\\s*${name}\\s*[,}]`).test(line)) {
        lines[e.line - 1] = line.replace(
          new RegExp(`([{,]\\s*)${name}(\\s*[,}])`),
          `$1${name}: _${name}$2`,
        );
        put(e.file, lines.join("\n"));
        applied++;
        continue;
      }
      // declaration (const/let/var/function/type/interface) -> underscore-prefix, no readers exist
      if (new RegExp(`\\b(const|let|var|function|type|interface|class)\\s+${name}\\b`).test(line)) {
        lines[e.line - 1] = line.replace(
          new RegExp(`\\b(const|let|var|function|type|interface|class)(\\s+)${name}\\b`),
          "$1$2_" + name,
        );
        put(e.file, lines.join("\n"));
        applied++;
        continue;
      }
      // parameter at the reported column: identifier preceded by '(' or ',' on that line
      const col = e.col - 1;
      const before = line.slice(0, col).trimEnd();
      if (/[,(]$/.test(before) && new RegExp(`^${name}\\b`).test(line.slice(col))) {
        lines[e.line - 1] = line.slice(0, col) + "_" + line.slice(col);
        put(e.file, lines.join("\n"));
        applied++;
        continue;
      }
      skipped.add(`${e.file}:${e.line} ${name} — ${line.trim().slice(0, 80)}`);
    }
  }
  for (const [f, c] of files) writeFileSync(f, c, "utf8");
  files.clear();
  console.log(`round ${round}: applied ${applied}/${errs.length}, skipped ${skipped.size}`);
  for (const s of skipped) console.log("SKIP " + s);
}
