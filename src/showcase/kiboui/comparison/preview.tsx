import { Comparison, ComparisonHandle, ComparisonItem } from "./index";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="relative h-56 w-full max-w-md overflow-hidden rounded-lg border border-border">
          <Comparison className="size-full">
            <ComparisonItem position="left">
              <img
                alt="Original photo"
                className="size-full object-cover"
                src="https://picsum.photos/seed/kibo-compare/800/450"
              />
            </ComparisonItem>
            <ComparisonItem position="right">
              <img
                alt="Desaturated photo"
                className="size-full object-cover"
                src="https://picsum.photos/seed/kibo-compare/800/450"
                style={{ filter: "grayscale(1) contrast(1.05)" }}
              />
            </ComparisonItem>
            <ComparisonHandle />
          </Comparison>
          <span className="pointer-events-none absolute bottom-2 left-2 z-50 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
            Color
          </span>
          <span className="pointer-events-none absolute right-2 bottom-2 z-50 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
            Grayscale
          </span>
        </div>
      </div>
    </div>
  );
}
