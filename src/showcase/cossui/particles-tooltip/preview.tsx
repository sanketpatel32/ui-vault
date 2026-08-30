import Component from "./p-tooltip-2";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <Component />
        <p className="text-xs text-muted-fg">
          Hover an icon to reveal its tooltip — and click to toggle it on.
        </p>
      </div>
    </div>
  );
}
