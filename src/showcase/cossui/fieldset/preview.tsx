import { useState } from "react";
import { Label } from "../label/label";
import { Switch } from "../switch/switch";
import { Fieldset, FieldsetLegend } from "./fieldset";

export default function Preview() {
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(false);

  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-border bg-panel p-5">
          <Fieldset className="m-0 border-0 p-0">
            <FieldsetLegend className="text-sm">Notification preferences</FieldsetLegend>
            <p className="mt-1 text-xs text-muted-fg">
              Choose where workspace alerts are delivered.
            </p>
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="fieldset-email">Email notifications</Label>
                <Switch
                  checked={email}
                  id="fieldset-email"
                  onCheckedChange={(value) => setEmail(value)}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="fieldset-push">Push notifications</Label>
                <Switch
                  checked={push}
                  id="fieldset-push"
                  onCheckedChange={(value) => setPush(value)}
                />
              </div>
            </div>
          </Fieldset>
          <p className="border-t border-border pt-3 text-xs text-muted-fg">
            Delivery via:{" "}
            {[email ? "email" : null, push ? "push" : null].filter(Boolean).join(" + ") ||
              "nowhere"}
          </p>
        </div>
      </div>
    </div>
  );
}
