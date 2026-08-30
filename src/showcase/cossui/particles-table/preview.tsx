import Component from "./p-table-2";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <Component />
        <p className="text-xs text-muted-fg">
          Project budgets with status badges and a footer total.
        </p>
      </div>
    </div>
  );
}
