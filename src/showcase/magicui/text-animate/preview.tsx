import { TextAnimate } from "./text-animate";

// Demo from the official magicui docs example
// (https://magicui.design/docs/components/text-animate).
export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <TextAnimate animation="blurInUp" by="character" once className="text-2xl font-semibold">
        Blur in by character
      </TextAnimate>
    </div>
  );
}
