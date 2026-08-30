import Component from "./p-toggle-2";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <Component />
        <p className="text-xs text-muted-fg">
          Click to press the toggle, click again to release it.
        </p>
      </div>
    </div>
  );
}
