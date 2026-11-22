// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/gibberish-text.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import { useEffect, useState } from "react";

import { cn } from "@/showcase/_shared/animata/lib/utils";

interface GibberishTextProps {
  /**
   * The text to animate.
   */
  text: string;

  /**
   * The class name to apply to each letter.
   */
  className?: string;
}

const Letter = ({ letter, className }: { letter: string; className?: string }) => {
  const [code, setCode] = useState(() => letter.toUpperCase().charCodeAt(0));

  useEffect(() => {
    let count = Math.floor(Math.random() * 10) + 5;
    const interval = setInterval(() => {
      setCode(() => Math.floor(Math.random() * 26) + 65);
      count--;
      if (count === 0) {
        setCode(letter.toUpperCase().charCodeAt(0));
        clearInterval(interval);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [letter]);

  const char = String.fromCharCode(code);

  return (
    <span
      className={cn("inline-block min-w-[1ch] font-mono text-center text-foreground", className)}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  );
};

export default function GibberishText({ text, className }: GibberishTextProps) {
  return (
    <>
      {text.split("").map((letter, index) => {
        return <Letter className={className} letter={letter} key={`${index}-${letter}`} />;
      })}
    </>
  );
}
