import { useState } from "react";
import { Switch } from "./switch";

export default function Preview() {
  const [autoplay, setAutoplay] = useState(false);

  return (
    <div className="w-full">
      <div className="grid min-h-48 place-items-center p-6">
        <div className="flex w-full max-w-xs flex-col gap-4 rounded-xl border border-border bg-panel p-5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm">Autoplay media</span>
            <Switch checked={autoplay} onCheckedChange={(value) => setAutoplay(value)} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm">Location sharing</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between gap-4 text-muted-fg">
            <span className="text-sm">
              Single sign-on
              <span className="block text-xs">Managed by your admin</span>
            </span>
            <Switch checked disabled />
          </div>
          <p className="border-t border-border pt-3 text-xs text-muted-fg">
            Autoplay is {autoplay ? "on" : "off"}
          </p>
        </div>
      </div>
    </div>
  );
}
