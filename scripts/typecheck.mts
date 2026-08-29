import { execSync } from "node:child_process";

try {
  const out = execSync("npx tsc --noEmit -p tsconfig.app.json", { encoding: "utf8" });
  console.log("✓ TypeScript check passed cleanly with 0 errors!");
} catch (e: any) {
  const out = e.stdout || e.message;
  console.error("TypeScript errors:\n", out);
  process.exit(1);
}
