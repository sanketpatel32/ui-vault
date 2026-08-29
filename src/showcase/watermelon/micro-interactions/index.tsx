import { motion } from "motion/react";
import { useState } from "react";
import { Heart, Bookmark } from "lucide-react";

export function MicroInteractions() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-panel shadow-sm">
      <motion.button
        type="button"
        whileTap={{ scale: 0.8 }}
        onClick={() => setLiked(!liked)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-muted/40 text-xs font-medium cursor-pointer"
      >
        <Heart size={14} className={liked ? "fill-red-500 text-red-500" : "text-muted-fg"} />
        <span>{liked ? "Liked" : "Like"}</span>
      </motion.button>
      <motion.button
        type="button"
        whileTap={{ scale: 0.8 }}
        onClick={() => setSaved(!saved)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-muted/40 text-xs font-medium cursor-pointer"
      >
        <Bookmark size={14} className={saved ? "fill-accent text-accent" : "text-muted-fg"} />
        <span>{saved ? "Saved" : "Save"}</span>
      </motion.button>
    </div>
  );
}

export default MicroInteractions;
