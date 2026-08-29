import { WordRotate } from "./word-rotate";

export default function Preview() {
  return (
    <WordRotate
      className="text-3xl font-bold text-fg tracking-tight"
      words={["Beautiful", "Performant", "Animated", "Composable"]}
    />
  );
}
