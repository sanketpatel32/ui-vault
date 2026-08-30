import { useState } from "react";
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "./meter";

const STRENGTH_LABELS = ["Empty", "Weak", "Fair", "Good", "Strong"];

function scorePassword(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

export default function Preview() {
  const [password, setPassword] = useState("");
  const score = scorePassword(password);

  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="w-full max-w-xs rounded-xl border border-border bg-panel p-5">
          <label className="grid gap-1.5">
            <span className="text-xs text-muted-fg">Password</span>
            <input
              className="h-9 w-full rounded-lg border border-border bg-panel px-3 font-mono text-sm outline-none focus-visible:border-accent"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type to test strength…"
              type="text"
              value={password}
            />
          </label>
          <Meter className="mt-4" max={4} min={0} value={score}>
            <div className="flex items-baseline justify-between">
              <MeterLabel>Strength</MeterLabel>
              <MeterValue />
            </div>
            <MeterTrack>
              <MeterIndicator />
            </MeterTrack>
          </Meter>
          <p className="mt-3 text-xs text-muted-fg">
            {STRENGTH_LABELS[score]} — {score}/4 checks passed (length, caps, digits, symbols)
          </p>
        </div>
      </div>
    </div>
  );
}
