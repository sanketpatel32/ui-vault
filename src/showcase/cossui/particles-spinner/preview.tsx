import Component from "./p-spinner-1";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <Component />
        <p className="text-xs text-muted-fg">Spinner at its default size.</p>
      </div>
    </div>
  );
}
