import { Label } from "./label";
import { Input } from "@/components/ui/input";

export default function Preview() {
  return (
    <div className="grid w-72 items-center gap-1.5">
      <Label htmlFor="email">Your email address</Label>
      <Input type="email" id="email" placeholder="name@example.com" />
    </div>
  );
}
