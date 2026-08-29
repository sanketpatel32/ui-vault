import { Loader2 } from "lucide-react";

export default function Preview() {
  return (
    <div className="flex items-center gap-3">
      <Loader2 size={16} className="animate-spin text-muted-fg" />
      <Loader2 size={24} className="animate-spin text-accent" />
      <Loader2 size={32} className="animate-spin text-fg" />
    </div>
  );
}
