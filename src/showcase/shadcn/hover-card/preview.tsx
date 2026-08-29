import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" className="font-semibold text-accent">
          @nextjs
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex space-x-3">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-fg">@nextjs</h4>
            <p className="text-xs text-muted-fg leading-relaxed">
              The React Framework – created and maintained by @vercel.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
