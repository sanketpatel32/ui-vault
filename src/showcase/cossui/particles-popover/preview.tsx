import Component from "./p-popover-2";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <Component />
        <p className="text-xs text-muted-fg">
          Click to open the notifications popover — dismiss with the X or Close button.
        </p>
      </div>
    </div>
  );
}
