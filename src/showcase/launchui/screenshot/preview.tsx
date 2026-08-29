import { cn } from "@/lib/utils";
export default function Preview() {
  return (
    <div className={cn("w-72 overflow-hidden rounded-xl border border-border shadow-xl")}>
      <img
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60"
        alt="Dashboard Screenshot"
        className="w-full object-cover"
      />
    </div>
  );
}
