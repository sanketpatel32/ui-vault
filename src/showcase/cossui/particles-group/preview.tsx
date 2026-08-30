import Component from "./p-group-2";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <div className="w-full max-w-sm">
          <Component />
        </div>
        <p className="text-xs text-muted-fg">
          Click the copy button — the URL is copied and the icon flips to a checkmark.
        </p>
      </div>
    </div>
  );
}
