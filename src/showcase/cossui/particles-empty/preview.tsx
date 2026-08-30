import Component from "./p-empty-1";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <div className="w-full max-w-xs">
          <Component />
        </div>
        <p className="text-xs text-muted-fg">
          Empty state with icon, copy, and call-to-action buttons.
        </p>
      </div>
    </div>
  );
}
