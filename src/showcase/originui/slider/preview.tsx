import { Slider } from "@/components/ui/slider";

export default function Preview() {
  return (
    <div className="w-64 space-y-2">
      <Slider defaultValue={[45]} max={100} step={1} />
    </div>
  );
}
