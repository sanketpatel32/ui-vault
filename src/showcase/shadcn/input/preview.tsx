import { Input } from "./input";

export default function Preview() {
  return (
    <div className="w-72 space-y-3">
      <Input type="email" placeholder="Email address" />
      <Input type="password" placeholder="Password" />
    </div>
  );
}
