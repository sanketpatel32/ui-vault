import { useState } from "react";
import { ThemeSwitcher } from "./index";

// Demo from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/theme-switcher). The switcher is a
// controlled, presentational control in this SPA — it does not change the
// hub theme, so the selected value is echoed below.

export default function Preview() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <ThemeSwitcher defaultValue="system" onChange={setTheme} value={theme} />
        <p className="text-muted-fg text-xs">
          Selected theme: <span className="font-medium text-fg">{theme}</span>
        </p>
      </div>
    </div>
  );
}
