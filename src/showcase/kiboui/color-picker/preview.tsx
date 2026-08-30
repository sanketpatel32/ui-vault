import Color from "color";
import { useState } from "react";
import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
  useColorPicker,
} from "./index";

const presets = ["#7c3aed", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#18181b"];

const PresetSwatches = () => {
  const { setHue, setSaturation, setLightness, setAlpha } = useColorPicker();

  return (
    <div className="flex flex-wrap items-center gap-2">
      {presets.map((hex) => {
        const [h, s, l] = Color(hex).hsl().array();

        return (
          <button
            aria-label={`Use ${hex}`}
            className="size-6 rounded-md border border-border transition-transform hover:scale-110"
            key={hex}
            onClick={() => {
              setHue(h);
              setSaturation(s);
              setLightness(l);
              setAlpha(100);
            }}
            style={{ backgroundColor: hex }}
            type="button"
          />
        );
      })}
    </div>
  );
};

export default function Preview() {
  const [rgba, setRgba] = useState<[number, number, number, number]>([124, 58, 237, 1]);

  // The picker calls back with a rgba array ([r, g, b, a]) — see ColorPickerProps.onChange.
  const handleColorChange = (value: unknown) => {
    if (Array.isArray(value)) {
      const [r = 0, g = 0, b = 0, a = 1] = value as number[];
      setRgba([r, g, b, a]);
    }
  };

  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="flex w-full max-w-sm flex-col gap-3 rounded-lg border border-border bg-panel p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="size-10 shrink-0 rounded-md border border-border"
                style={{
                  backgroundColor: `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`,
                }}
              />
              <div className="flex flex-col text-xs">
                <span className="font-mono text-fg">
                  rgb({Math.round(rgba[0])}, {Math.round(rgba[1])}, {Math.round(rgba[2])})
                </span>
                <span className="text-muted-fg">alpha {Math.round(rgba[3] * 100)}%</span>
              </div>
            </div>
            <ColorPickerOutput />
          </div>

          <ColorPicker defaultValue="#7c3aed" onChange={handleColorChange}>
            <div className="h-28">
              <ColorPickerSelection className="size-full" />
            </div>
            <ColorPickerHue />
            <ColorPickerAlpha />
            <ColorPickerFormat />
            <PresetSwatches />
          </ColorPicker>
        </div>
      </div>
    </div>
  );
}
