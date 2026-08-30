import { QRCode } from "./index";

// Demo from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/qr-code) — the client component
// derives its colors from the active theme's CSS variables.

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-96 flex-col items-center justify-center gap-6 p-6">
        <QRCode data="https://www.kibo-ui.com/" />
        <QRCode data="https://github.com/shadcnblocks/kibo" robustness="H" />
      </div>
    </div>
  );
}
