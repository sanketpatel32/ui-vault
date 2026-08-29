import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TestimonialBlock() {
  return (
    <div className="rounded-2xl border border-border bg-panel p-4 max-w-sm space-y-2 shadow-xs">
      <p className="text-xs text-muted-fg italic leading-relaxed">
        "Watermelon UI cut our landing page development time by half. Highly recommended!"
      </p>
      <div className="flex items-center gap-2 pt-1">
        <Avatar className="h-6 w-6">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>WM</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-xs font-semibold text-fg">Sarah Connor</div>
          <div className="text-[10px] text-muted-fg">Product Designer</div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialBlock;
