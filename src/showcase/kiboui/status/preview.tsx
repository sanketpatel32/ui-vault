import { Status, StatusIndicator, StatusLabel } from "./index";

// Demo from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/status).

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-wrap items-center justify-center gap-2 p-6">
        <Status status="online">
          <StatusIndicator />
          <StatusLabel />
        </Status>

        <Status status="offline">
          <StatusIndicator />
          <StatusLabel />
        </Status>

        <Status status="maintenance">
          <StatusIndicator />
          <StatusLabel />
        </Status>

        <Status status="degraded">
          <StatusIndicator />
          <StatusLabel />
        </Status>
      </div>
    </div>
  );
}
