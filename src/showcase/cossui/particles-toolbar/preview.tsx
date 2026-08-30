import Component from "./p-toolbar-1";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <div className="w-full max-w-md">
          <Component />
        </div>
        <p className="text-xs text-muted-fg">
          Live toolbar — toggle alignments, pick a font, hover for tooltips.
        </p>
      </div>
    </div>
  );
}
