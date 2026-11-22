// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/split-text.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import { useRef, useState } from "react";

import { cn } from "@/showcase/_shared/animata/lib/utils";

export default function SplitText({
  text = "ANIMATA",
  className,
}: {
  text: string;
  className?: string;
}) {
  const [activeIndex, setIndex] = useState<number>();
  const timer = useRef<NodeJS.Timeout>(undefined);

  const letterClassName =
    "inline h-1/2 select-none overflow-y-hidden leading-none transition-transform duration-300 ease-out whitespace-pre";

  return (
    <div
      className={cn(
        "relative mx-auto text-4xl font-black uppercase text-yellow-500 md:text-5xl lg:text-9xl",
        className,
      )}
    >
      {/** add hidden text so that we maintain the size for any text */}
      <div className="invisible leading-none">{text}</div>
      <div className="absolute top-0 flex h-full">
        {text.split("").map((letter, index) => (
          <div
            onMouseEnter={() => {
              if (timer.current) {
                clearTimeout(timer.current);
              }
              setIndex(index);
            }}
            onMouseLeave={() => {
              timer.current = setTimeout(() => {
                setIndex(undefined);
              });
            }}
            key={`${letter}-${index}`}
            className="relative inline-flex h-full flex-col leading-none"
            aria-hidden
          >
            {/** top half */}
            <span
              className={cn(letterClassName, {
                "-translate-y-5": index === activeIndex,
                "-translate-y-3":
                  activeIndex !== undefined &&
                  (index === activeIndex - 1 || index === activeIndex + 1),
                "-translate-y-1":
                  activeIndex !== undefined &&
                  (index === activeIndex - 2 || index === activeIndex + 2),
              })}
            >
              {letter}
            </span>

            {/** bottom half */}
            <span
              className={cn(letterClassName, {
                "translate-y-5": index === activeIndex,
                "translate-y-3":
                  activeIndex !== undefined &&
                  (index === activeIndex - 1 || index === activeIndex + 1),
                "translate-y-1":
                  activeIndex !== undefined &&
                  (index === activeIndex - 2 || index === activeIndex + 2),
              })}
            >
              <span className="absolute -translate-y-1/2 leading-none">{letter}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
