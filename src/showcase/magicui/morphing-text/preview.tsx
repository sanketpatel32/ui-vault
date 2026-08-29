import { MorphingText } from "./morphing-text";

const texts = ["Dynamic", "Interactive", "Animated", "MagicUI"];

export default function Preview() {
  return <MorphingText texts={texts} className="text-2xl font-bold" />;
}
