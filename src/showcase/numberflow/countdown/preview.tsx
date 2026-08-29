import { useState } from "react";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { Eye, Heart, Share2 } from "lucide-react";

export default function Preview() {
  const [likes, setLikes] = useState(1284);
  const [views, setViews] = useState(8490);
  const [shares, setShares] = useState(312);
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      <NumberFlowGroup>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-panel p-3 shadow-xs">
          <button
            onClick={() => {
              setLiked(!liked);
              setLikes((l) => (liked ? l - 1 : l + 1));
            }}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
          >
            <Heart size={15} className={liked ? "fill-red-500 text-red-500" : ""} />
            <NumberFlow value={likes} format={{ notation: "compact" }} />
          </button>

          <div className="h-4 w-px bg-border" />

          <button
            onClick={() => setViews((v) => v + Math.floor(Math.random() * 15) + 1)}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
          >
            <Eye size={15} />
            <NumberFlow value={views} format={{ notation: "compact" }} />
          </button>

          <div className="h-4 w-px bg-border" />

          <button
            onClick={() => setShares((s) => s + 1)}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
          >
            <Share2 size={15} />
            <NumberFlow value={shares} format={{ notation: "compact" }} />
          </button>
        </div>
      </NumberFlowGroup>
      <p className="text-xs text-muted-fg">
        Click any metric to trigger smooth NumberFlow transitions
      </p>
    </div>
  );
}
