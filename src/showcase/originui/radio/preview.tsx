import { RadioGroup, RadioGroupItem } from "./radio-group";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="p-8">
        <RadioGroup defaultValue="comfortable">
          <label className="flex items-center gap-2">
            <RadioGroupItem value="default" id="r1" /> Default
          </label>
          <label className="flex items-center gap-2">
            <RadioGroupItem value="comfortable" id="r2" /> Comfortable
          </label>
          <label className="flex items-center gap-2">
            <RadioGroupItem value="compact" id="r3" /> Compact
          </label>
        </RadioGroup>
      </div>
    </div>
  );
}
