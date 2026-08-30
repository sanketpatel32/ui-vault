import Component from "./p-textarea-2";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <div className="w-full max-w-xs">
          <Component />
        </div>
        <p className="text-xs text-muted-fg">Small textarea — type a message.</p>
      </div>
    </div>
  );
}
