import { cn } from "@/lib/utils";
export default function Preview() {
  return (
    <div className={cn("flex flex-col items-center gap-4 text-center")}>
      <h3 className="shiny-text text-3xl font-extrabold tracking-tight">Luminescent Wave</h3>
      <p className="text-xs text-muted-fg">Light wave passing continuously through text</p>
    </div>
  );
}
