import Component from "./p-date-picker-2";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <div className="w-full max-w-sm">
          <Component />
        </div>
        <p className="text-xs text-muted-fg">
          Click the trigger and pick a start and end date — the button shows the range.
        </p>
      </div>
    </div>
  );
}
