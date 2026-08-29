import { cn } from "@/lib/utils";
export default function Preview() {
  return (
    <div className={cn("flex items-center justify-around gap-6 opacity-70 max-w-md")}>
      <span className="font-bold tracking-widest text-xs">GITHUB</span>
      <span className="font-bold tracking-widest text-xs">VERCEL</span>
      <span className="font-bold tracking-widest text-xs">STRIPE</span>
      <span className="font-bold tracking-widest text-xs">LINEAR</span>
    </div>
  );
}
