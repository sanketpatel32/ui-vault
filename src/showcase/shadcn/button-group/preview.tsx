import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <div className="inline-flex rounded-lg border border-border p-1 bg-panel shadow-xs">
      <Button variant="ghost" size="sm" className="rounded-md">Day</Button>
      <Button variant="subtle" size="sm" className="rounded-md">Week</Button>
      <Button variant="ghost" size="sm" className="rounded-md">Month</Button>
      <Button variant="ghost" size="sm" className="rounded-md">Year</Button>
    </div>
  );
}
