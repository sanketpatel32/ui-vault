import { useState, useEffect } from "react";

const PHRASE = "MOTION PRIMITIVES";
const GLYPHS = "01010101#@$%&*";

export default function Preview() {
  const [display, setDisplay] = useState(PHRASE);

  const run = () => {
    let count = 0;
    const timer = setInterval(() => {
      setDisplay(
        PHRASE.split("")
          .map((_c, i) =>
            i < count ? PHRASE[i] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (count >= PHRASE.length) clearInterval(timer);
      count += 1;
    }, 40);
  };

  useEffect(() => {
    run();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 text-center font-mono">
      <div className="text-2xl font-bold tracking-wider text-fg">{display}</div>
      <button
        onClick={run}
        className="rounded-lg border border-border bg-panel px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg font-sans"
      >
        Scramble
      </button>
    </div>
  );
}
