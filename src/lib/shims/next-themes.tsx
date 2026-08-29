/* oxlint-disable react/only-export-components */
import React from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useTheme() {
  return {
    theme: "dark",
    setTheme: (_theme: string) => {},
    resolvedTheme: "dark",
    systemTheme: "dark",
    themes: ["light", "dark"],
  };
}
