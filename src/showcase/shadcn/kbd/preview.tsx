import { Kbd, KbdGroup } from "./kbd";

export default function Preview() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-fg">Press</span>
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <span className="text-xs text-muted-fg">to search</span>
    </div>
  );
}
