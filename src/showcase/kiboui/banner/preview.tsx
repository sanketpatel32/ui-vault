import { RocketIcon } from "lucide-react";
import { useState } from "react";
import { Banner, BannerAction, BannerClose, BannerIcon, BannerTitle } from "./index";

export default function Preview() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <div className="w-full max-w-lg">
          <Banner inset onClose={() => setVisible(false)} visible={visible}>
            <BannerIcon icon={RocketIcon} />
            <BannerTitle>
              The registry now vendors the kiboui source — 40 live previews shipped today.
            </BannerTitle>
            <BannerAction className="text-accent-fg" onClick={() => setVisible(false)}>
              Got it
            </BannerAction>
            <BannerClose />
          </Banner>
        </div>

        {!visible && (
          <button
            className="rounded-lg border border-border bg-panel px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
            onClick={() => setVisible(true)}
            type="button"
          >
            Show banner again
          </button>
        )}
      </div>
    </div>
  );
}
