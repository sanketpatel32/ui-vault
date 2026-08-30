import { useEffect, useState } from "react";
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "./progress";

export default function Preview() {
  const [value, setValue] = useState(28);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setValue((prev) => Math.min(prev + 4, 100));
    }, 80);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (value >= 100) setRunning(false);
  }, [value]);

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-8 p-6">
        <div className="w-full max-w-sm">
          <Progress max={100} value={value}>
            <div className="flex items-baseline justify-between">
              <ProgressLabel>Uploading assets</ProgressLabel>
              <ProgressValue />
            </div>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
          <button
            className="mt-4 rounded-lg bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85 disabled:opacity-50"
            disabled={running}
            type="button"
            onClick={() => {
              setValue(0);
              setRunning(true);
            }}
          >
            {running ? "Uploading…" : value >= 100 ? "Upload again" : "Start upload"}
          </button>
        </div>
        <div className="w-full max-w-sm">
          <p className="mb-2 text-xs text-muted-fg">Indeterminate — value is null</p>
          <Progress max={100} value={null} />
        </div>
      </div>
    </div>
  );
}
