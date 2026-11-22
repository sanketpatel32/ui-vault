// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/circular-text.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import { motion } from "motion/react";
import { useMemo } from "react";
import { cn } from "@/showcase/_shared/animata/lib/utils";

export default function CircularText({
  text,
  spinDuration = 30,
  radius = 5,
  className = "",
}: {
  text: string;
  spinDuration?: number;
  radius?: number;
  className?: string;
}) {
  const characters = useMemo(() => [...text], [text]);
  return (
    <motion.div
      key={spinDuration}
      className={cn(
        "relative mx-auto flex h-48 aspect-square origin-center cursor-pointer items-center justify-center rounded-full text-center font-bold text-foreground",
        className,
      )}
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        ease: "linear",
        duration: spinDuration,
        repeat: Infinity,
      }}
    >
      {characters.map((char, index) => {
        const angle = (360 / characters.length) * index;
        const transform = `rotate(${angle}deg) translateY(-${radius}px)`;
        return (
          <span
            key={`${char}-${index}`}
            style={{ transform, WebkitTransform: transform }}
            className="absolute inset-0 inline-block font-medium"
          >
            {char}
          </span>
        );
      })}
    </motion.div>
  );
}
