import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Terminal } from "lucide-react";

export default function Preview() {
  return (
    <Alert className="w-full max-w-sm">
      <Terminal size={16} />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
  );
}
