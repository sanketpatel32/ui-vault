import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center p-6">
        <div className="flex w-full max-w-md flex-col gap-3">
          <Alert>
            <InfoIcon />
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>
              New comments are held for moderation before they appear.
            </AlertDescription>
          </Alert>
          <Alert variant="success">
            <CircleCheckIcon />
            <AlertTitle>Deployed</AlertTitle>
            <AlertDescription>ui-vault.dev is live — build #142 took 38 seconds.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <TriangleAlertIcon />
            <AlertTitle>Approaching limit</AlertTitle>
            <AlertDescription>You have used 9 of 10 preview slots this month.</AlertDescription>
          </Alert>
          <Alert variant="error">
            <CircleAlertIcon />
            <AlertTitle>Sync failed</AlertTitle>
            <AlertDescription>
              The registry could not be reached. Retrying in 30 seconds.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
