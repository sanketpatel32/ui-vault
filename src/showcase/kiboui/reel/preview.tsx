import {
  Reel,
  ReelContent,
  ReelControls,
  ReelItem,
  ReelMuteButton,
  ReelNavigation,
  ReelNextButton,
  ReelPlayButton,
  ReelPreviousButton,
  ReelProgress,
  ReelVideo,
} from "./index";

// Demo from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/reel), using the Google sample
// videos so it works without the docs' private blob storage.

const reels: ReelItem[] = [
  {
    id: 1,
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: 10,
    title: "Big Buck Bunny",
    description: "Sample reel one",
  },
  {
    id: 2,
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: 10,
    title: "Elephants Dream",
    description: "Sample reel two",
  },
  {
    id: 3,
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    duration: 10,
    title: "For Bigger Escapes",
    description: "Sample reel three",
  },
];

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-96 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Reel data={reels}>
            <ReelProgress />
            <ReelContent>
              {(reel) => (
                <ReelItem key={reel.id}>
                  <ReelVideo src={reel.src} />
                </ReelItem>
              )}
            </ReelContent>
            <ReelNavigation />
            <ReelControls>
              <ReelPreviousButton />
              <div className="flex gap-2">
                <ReelPlayButton />
                <ReelMuteButton />
              </div>
              <ReelNextButton />
            </ReelControls>
          </Reel>
        </div>
      </div>
    </div>
  );
}
