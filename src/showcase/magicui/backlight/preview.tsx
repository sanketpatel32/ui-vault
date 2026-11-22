import { Backlight } from "./backlight";

export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <Backlight>
        <span className="rounded-lg bg-panel px-6 py-3 text-lg font-semibold text-fg">
          Backlight glow
        </span>
      </Backlight>
    </div>
  );
}
