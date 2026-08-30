import Component from "./p-dialog-2";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <Component />
        <p className="text-xs text-muted-fg">Open the menu, then choose &quot;Open dialog&quot;.</p>
      </div>
    </div>
  );
}
