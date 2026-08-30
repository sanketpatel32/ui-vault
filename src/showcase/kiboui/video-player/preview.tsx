import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from "./index";

// Demo from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/video-player).

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-96 items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <VideoPlayer className="overflow-hidden rounded-lg border">
            <VideoPlayerContent
              crossOrigin=""
              muted
              preload="auto"
              slot="media"
              src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4"
            />
            <VideoPlayerControlBar>
              <VideoPlayerPlayButton />
              <VideoPlayerSeekBackwardButton />
              <VideoPlayerSeekForwardButton />
              <VideoPlayerTimeRange />
              <VideoPlayerTimeDisplay showDuration />
              <VideoPlayerMuteButton />
              <VideoPlayerVolumeRange />
            </VideoPlayerControlBar>
          </VideoPlayer>
        </div>
      </div>
    </div>
  );
}
