// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/cycle-text.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function CycleText() {
  const words = ["Hello", "World", "Ciaoo", "World"];
  const [index, setIndex] = useState(0);

  const total = words.length;
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 1300);
    return () => clearInterval(interval);
  }, [total]);

  return (
    <div>
      <span className="font-mono text-xl text-pink-600">
        System.out.println(
        <AnimatePresence mode="wait">
          <motion.h1
            key={`words_${index}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.08 }}
            className="inline-block font-mono text-xl text-blue-700"
          >
            &quot;{words[index]}&quot;
          </motion.h1>
        </AnimatePresence>
        )
      </span>
    </div>
  );
}
