import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, lazyPlugins } from "vite-plus";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this project at /ui-vault/ — only builds need the subpath base
  base: command === "build" ? "/ui-vault/" : "/",
  fmt: {
    ignorePatterns: ["public/**", "src/data/entries.generated.ts"],
  },
  lint: {
    plugins: ["react", "typescript", "oxc"],
    rules: {
      "react/rules-of-hooks": "error",
      "react/only-export-components": ["warn", { allowConstantExport: true }],
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    overrides: [
      {
        // Vendored snapshot: its useSwipe is a plain helper (no React hooks inside).
        files: ["src/showcase/cultui/intro-disclosure/intro-disclosure.tsx"],
        rules: { "react/rules-of-hooks": "off" },
      },
      {
        // Vendored previews are frozen upstream snapshots (AGENTS.md golden rule 5).
        // Warn-level style rules fire hundreds of times on code we deliberately do
        // not edit — suppress them here and fix upstream by re-copying instead.
        files: ["src/showcase/**"],
        rules: {
          "react/only-export-components": "off",
          "react/refs": "off",
          "react/set-state-in-effect": "off",
          "react/purity": "off",
          "react/jsx-key": "off",
          "react/immutability": "off",
          "react/static-components": "off",
          "react/incompatible-library": "off",
          "react/use-memo": "off",
          "react/preserve-manual-memoization": "off",
          "react-hooks/exhaustive-deps": "off",
          "typescript/no-useless-default-assignment": "off",
          "typescript/no-floating-promises": "off",
          "typescript/no-base-to-string": "off",
          "typescript/restrict-template-expressions": "off",
          "typescript/no-misused-spread": "off",
          "typescript/unbound-method": "off",
          "typescript/no-for-in-array": "off",
          "typescript/no-redundant-type-constituents": "off",
          "typescript/no-duplicate-type-constituents": "off",
          "eslint/no-unused-vars": "off",
          "eslint/no-unused-expressions": "off",
          "eslint/no-empty-pattern": "off",
        },
      },
      {
        // shadcn-style kit files export cva variants beside the component by convention.
        files: ["src/components/ui/**"],
        rules: { "react/only-export-components": "off" },
      },
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],
  },
  plugins: lazyPlugins(() => [react(), tailwindcss()]),
  resolve: {
    alias: [
      { find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) },
      {
        find: "next/image",
        replacement: fileURLToPath(new URL("./src/lib/shims/next-image.tsx", import.meta.url)),
      },
      {
        find: "next/link",
        replacement: fileURLToPath(new URL("./src/lib/shims/next-link.tsx", import.meta.url)),
      },
      {
        find: "next/font/google",
        replacement: fileURLToPath(new URL("./src/lib/shims/next-font-google.ts", import.meta.url)),
      },
      {
        find: "next/navigation",
        replacement: fileURLToPath(new URL("./src/lib/shims/next-navigation.tsx", import.meta.url)),
      },
      {
        find: "next-themes",
        replacement: fileURLToPath(new URL("./src/lib/shims/next-themes.tsx", import.meta.url)),
      },
      {
        find: /^react-fast-marquee$/,
        replacement: fileURLToPath(
          new URL("./src/lib/shims/react-fast-marquee.ts", import.meta.url),
        ),
      },
    ],
  },
}));
