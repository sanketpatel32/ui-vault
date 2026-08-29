import { InputGroup } from "./input-group";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Preview() {
  return (
    <div className="w-64">
      <InputGroup prefix={<Search size={14} />}>
        <Input
          placeholder="Search..."
          className="border-0 shadow-none focus-visible:ring-0 text-xs pl-1"
        />
      </InputGroup>
    </div>
  );
}
