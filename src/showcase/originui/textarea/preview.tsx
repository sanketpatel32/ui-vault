import { Textarea } from "./textarea";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="p-6">
        <Textarea placeholder="Leave a comment" className="min-h-28 w-full max-w-md" />
      </div>
    </div>
  );
}
