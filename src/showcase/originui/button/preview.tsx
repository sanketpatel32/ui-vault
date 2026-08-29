import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Origin Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}
