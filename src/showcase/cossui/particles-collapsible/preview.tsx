import Component from "./p-collapsible-1";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <div className="w-full max-w-64">
          <Component />
        </div>
        <p className="text-xs text-muted-fg">Click the trigger to reveal the recovery keys.</p>
      </div>
    </div>
  );
}
