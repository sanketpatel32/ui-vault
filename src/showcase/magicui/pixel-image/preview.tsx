import { PixelImage } from "./pixel-image";

const SRC =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6366f1"/><stop offset="1" stop-color="#ec4899"/></linearGradient></defs><rect width="320" height="240" fill="url(#g)"/><circle cx="160" cy="120" r="60" fill="#fff" opacity="0.85"/></svg>`,
  );

export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <PixelImage src={SRC} grid="8x8" />
    </div>
  );
}
