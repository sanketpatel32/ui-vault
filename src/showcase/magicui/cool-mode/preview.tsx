import { CoolMode } from "./cool-mode";

export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <CoolMode>
        <span className="inline-block cursor-pointer rounded-lg border border-border bg-panel px-5 py-2.5 text-sm font-medium text-fg">
          Click me
        </span>
      </CoolMode>
    </div>
  );
}
