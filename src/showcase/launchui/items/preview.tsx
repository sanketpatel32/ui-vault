import { Item, ItemTitle, ItemDescription, ItemIcon } from "./item";
import { Zap, Shield } from "lucide-react";

export default function Preview() {
  return (
    <div className="grid grid-cols-2 gap-3 max-w-md">
      <Item className="rounded-xl border border-border bg-panel p-3">
        <ItemIcon>
          <Zap size={16} className="text-accent" />
        </ItemIcon>
        <ItemTitle className="text-xs font-semibold">Ultra Fast</ItemTitle>
        <ItemDescription className="text-[10px] text-muted-fg">
          Lightning speed page loads
        </ItemDescription>
      </Item>
      <Item className="rounded-xl border border-border bg-panel p-3">
        <ItemIcon>
          <Shield size={16} className="text-accent" />
        </ItemIcon>
        <ItemTitle className="text-xs font-semibold">Accessible</ItemTitle>
        <ItemDescription className="text-[10px] text-muted-fg">
          WAI-ARIA compliant design
        </ItemDescription>
      </Item>
    </div>
  );
}
