import { VideoText } from "./video-text";

const VIDEO = "https://cdn.magicui.design/ocean-small.webm";

export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="h-28 w-full max-w-sm">
        <VideoText src={VIDEO}>WAVE</VideoText>
      </div>
    </div>
  );
}
