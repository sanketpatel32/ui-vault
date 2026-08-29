import { Highlighter } from "./highlighter";

export default function Preview() {
  return (
    <p className="text-sm text-fg">
      Highlight important text with{" "}
      <Highlighter action="highlight" color="#8b5cf6">
        rough notation
      </Highlighter>{" "}
      effects.
    </p>
  );
}
