// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/text-border-animation.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
"use client";

import { useEffect, useState } from "react";

import { cn } from "@/showcase/_shared/animata/lib/utils";

interface TextProps {
  /**
   * Text to display
   */
  text: string;

  className?: string;
}

export default function TextBorderAnimation({ text = "Programming", className }: TextProps) {
  const [isHoveredIn, setIsHoveredIn] = useState(false);
  const [isHoveredOut, setIsHoveredOut] = useState(false);

  const handleHover = () => {
    setIsHoveredIn(true);
  };

  const handleHoverExit = () => {
    setIsHoveredIn(false);
    setIsHoveredOut(true);
  };

  useEffect(() => {
    if (isHoveredOut) {
      const timer = setTimeout(() => {
        setIsHoveredOut(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isHoveredOut]);

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverExit}
      className="overflow-hidden"
      aria-hidden
    >
      <span className={cn("text-xl xl:text-5xl font-medium text-foreground", className)}>
        {text}
      </span>
      <div className="relative mt-1 h-1 w-full">
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-full bg-yellow-500 transition-transform duration-300",
            isHoveredIn
              ? "translate-x-0 transform opacity-100"
              : "-translate-x-full transform opacity-0",
          )}
        ></div>
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-full translate-x-0 transform bg-yellow-500 opacity-0 transition-transform duration-300",
            isHoveredOut && "translate-x-full opacity-100",
          )}
        ></div>
      </div>
    </div>
  );
}
