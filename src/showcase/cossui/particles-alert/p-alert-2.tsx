import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/showcase/_shared/cossui/alert";

export default function Particle() {
  return (
    <Alert>
      <InfoIcon />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>Describe what can be done about it here.</AlertDescription>
    </Alert>
  );
}
