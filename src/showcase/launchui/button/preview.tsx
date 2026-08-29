import { Button } from "./button";

export default function Preview() {
  return (
    <div className="flex gap-3">
      <Button>Launch App</Button>
      <Button variant="outline">Documentation</Button>
    </div>
  );
}
