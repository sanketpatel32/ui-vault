import { ScrollArea } from "./scroll-area";
import { Separator } from "@/components/ui/separator";

const tags = Array.from({ length: 25 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

export default function Preview() {
  return (
    <ScrollArea className="h-48 w-48 rounded-xl border border-border p-4">
      <h4 className="mb-3 text-xs font-semibold leading-none text-fg">Tags</h4>
      {tags.map((tag) => (
        <div key={tag}>
          <div className="text-xs text-muted-fg py-1">{tag}</div>
          <Separator className="my-1" />
        </div>
      ))}
    </ScrollArea>
  );
}
