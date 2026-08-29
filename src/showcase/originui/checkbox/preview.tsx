import { Checkbox } from "./checkbox";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 p-8">
        <label className="flex items-center gap-2">
          <Checkbox defaultChecked id="terms" /> <label htmlFor="terms">Accept terms</label>
        </label>
        <label className="flex items-center gap-2">
          <Checkbox id="news" /> <label htmlFor="news">Subscribe</label>
        </label>
      </div>
    </div>
  );
}
