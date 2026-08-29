import { Item, ItemContent, ItemDescription, ItemTitle } from "./item";
import { Layers } from "lucide-react";

export default function Preview() {
  return (
    <Item className="flex items-center gap-3 rounded-xl border border-border bg-panel p-3 max-w-sm">
      <Layers className="text-accent shrink-0" size={20} />
      <ItemContent>
        <ItemTitle className="text-xs font-semibold">Modular Architecture</ItemTitle>
        <ItemDescription className="text-[11px] text-muted-fg">
          Completely customizable React components.
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
