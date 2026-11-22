import { HeroVideoDialog } from "./hero-video-dialog";

const THUMB =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="640" height="360" fill="#18181b"/><circle cx="320" cy="180" r="48" fill="#fff" opacity="0.9"/><polygon points="305,160 305,200 345,180" fill="#18181b"/></svg>`,
  );

export default function Preview() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <HeroVideoDialog
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/aqz-KE-bpKQ"
        thumbnailSrc={THUMB}
        thumbnailAlt="Demo video thumbnail"
        className="max-w-md"
      />
    </div>
  );
}
