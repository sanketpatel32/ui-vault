import Component from "./p-checkbox-group-2";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <Component />
        <p className="text-xs text-muted-fg">
          Toggle frameworks on and off — Next.js starts checked, Vite is disabled.
        </p>
      </div>
    </div>
  );
}
