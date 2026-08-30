import Component from "./p-frame-2";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <div className="w-full max-w-md">
          <Component />
        </div>
        <p className="text-xs text-muted-fg">
          Click the section header to expand the framed panel.
        </p>
      </div>
    </div>
  );
}
