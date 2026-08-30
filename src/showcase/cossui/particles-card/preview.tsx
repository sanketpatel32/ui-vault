import Component from "./p-card-2";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <Component />
        <p className="text-xs text-muted-fg">
          Login card combining form, field, and input particles.
        </p>
      </div>
    </div>
  );
}
