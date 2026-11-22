import { ComicText } from "./comic-text";

// Demo from the official magicui docs example
// (https://magicui.design/docs/components/comic-text).
export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <ComicText fontSize={5}>BOOM!</ComicText>
    </div>
  );
}
