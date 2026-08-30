import { ImageZoom } from "./index";

// Demo from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/image-zoom) — next/image replaced
// with a plain <img> for the SPA environment.

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-96 items-center justify-center p-6">
        <ImageZoom>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Placeholder image"
            className="h-auto w-96 max-w-full rounded-md border"
            height={800}
            src="https://placehold.co/1200x800"
            width={1200}
          />
        </ImageZoom>
      </div>
    </div>
  );
}
