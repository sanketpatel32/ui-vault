import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, lazyPlugins } from "vite-plus";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this project at /ui-vault/ — only builds need the subpath base
  base: command === "build" ? "/ui-vault/" : "/",
  fmt: {
    ignorePatterns: ["public/**"],
  },
  lint: {
    plugins: ["react", "typescript", "oxc"],
    rules: {
      "react/rules-of-hooks": "error",
      "react/only-export-components": ["warn", { allowConstantExport: true }],
      "vite-plus/prefer-vite-plus-imports": "error",
    },
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
