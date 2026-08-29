import { cn } from "@/lib/utils";
export default function Preview() {
  const items = ["React", "Tailwind", "Motion", "TypeScript", "Vite", "Next.js", "Radix", "Shadcn"];

  return (
    <div className={cn("w-full max-w-md overflow-hidden py-4 fade-x")}>
      <div className="flex gap-4 animate-[marquee_15s_linear_infinite]">
        {items.concat(items).map((item, idx) => (
          <div
            key={item + idx}
            className="flex h-12 w-28 shrink-0 items-center justify-center rounded-xl border border-border bg-panel text-xs font-semibold shadow-xs text-fg"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
