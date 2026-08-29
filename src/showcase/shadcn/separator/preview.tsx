import { Separator } from "./separator";

export default function Preview() {
  return (
    <div className="space-y-3 text-xs w-72">
      <div>
        <h4 className="text-xs font-semibold text-fg">Radix Primitives</h4>
        <p className="text-[11px] text-muted-fg">An open-source UI component library.</p>
      </div>
      <Separator />
      <div className="flex h-5 items-center space-x-4 text-xs text-muted-fg">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  );
}
