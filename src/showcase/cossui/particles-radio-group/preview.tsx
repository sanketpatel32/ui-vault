import Component from "./p-radio-group-2";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <Component />
        <p className="text-xs text-muted-fg">
          Pick one framework — Next.js starts selected, Vite is disabled.
        </p>
      </div>
    </div>
  );
}
