import { useState } from "react";
import { Heart, Star, Wallet } from "lucide-react";
import { PreviewCard, PreviewCardPopup, PreviewCardTrigger } from "./preview-card";

export default function Preview() {
  const [following, setFollowing] = useState(false);

  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <PreviewCard>
          <PreviewCardTrigger className="flex w-64 cursor-pointer flex-col gap-3 rounded-xl border border-border bg-panel p-4 text-left transition-colors hover:bg-accent-soft">
            <div className="h-24 w-full rounded-lg bg-linear-to-br from-accent/30 via-muted to-accent-soft" />
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft font-semibold text-accent">
                MK
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Motion Kit — 48 animations</p>
                <p className="truncate text-xs text-muted-fg">@motionkit · hover me</p>
              </div>
            </div>
          </PreviewCardTrigger>
          <PreviewCardPopup sideOffset={8}>
            <div className="flex w-56 flex-col gap-3">
              <div className="flex items-center gap-2">
                <Wallet className="size-4 text-muted-fg" />
                <span className="text-sm font-medium">Motion Kit</span>
                <span className="ms-auto inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-fg">
                  <Star className="size-3" />
                  4.9
                </span>
              </div>
              <p className="text-sm leading-snug text-muted-fg">
                Spring-based animation primitives, badges and page transitions. MIT licensed.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFollowing((f) => !f)}
                  className={`inline-flex h-8 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg text-xs font-medium transition-colors ${
                    following ? "bg-muted text-fg" : "bg-fg text-bg hover:opacity-85"
                  }`}
                >
                  <Heart className={`size-3.5 ${following ? "fill-red-500 text-red-500" : ""}`} />
                  {following ? "Following" : "Follow"}
                </button>
                <button
                  type="button"
                  className="inline-flex h-8 flex-1 cursor-pointer items-center justify-center rounded-lg border border-border text-xs font-medium transition-colors hover:bg-accent-soft"
                >
                  View kit
                </button>
              </div>
            </div>
          </PreviewCardPopup>
        </PreviewCard>
      </div>
    </div>
  );
}
