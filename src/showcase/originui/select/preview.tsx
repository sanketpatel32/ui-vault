import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center p-8">
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
