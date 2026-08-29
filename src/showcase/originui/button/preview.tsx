import { Button } from "./button";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-center gap-3 p-6">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </div>
  );
}
