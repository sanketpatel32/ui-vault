import { Slider } from "./slider";

export default function Preview() {
  return <Slider defaultValue={[50]} max={100} step={1} className="w-64" />;
}
