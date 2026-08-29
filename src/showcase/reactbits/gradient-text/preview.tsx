import { cn } from "@/lib/utils";
export default function Preview() {
  return (
    <div className={cn("flex flex-col items-center gap-4 text-center")}>
      <h3 className="bg-linear-to-r from-accent via-pink-500 to-cyan-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
        Gradient Elegance
      </h3>
      <p className="text-xs text-muted-fg">Multi-stop animated gradient sweep</p>
    </div>
  );
}
