import { Input } from "./input";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex max-w-sm flex-col gap-3 p-6">
        <Input placeholder="Email address" type="email" />
        <Input placeholder="Password" type="password" />
      </div>
    </div>
  );
}
