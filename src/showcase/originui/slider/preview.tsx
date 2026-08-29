import { Slider } from "./slider";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="p-8">
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>
    </div>
  );
}
