// Re-implemented from FancyComponents "Letter Swap" (MIT):
// https://fancycomponents.dev/docs/letter-swap
import { useEffect, useRef, useState } from "react";

const LABEL = "Hover me";
const GLYPHS = "!<>-_\\/[]{}=+*^?#@$%";

export default function Preview() {
  const [text, setText] = useState(LABEL);
  const running = useRef(false);
  const interval = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearInterval(interval.current), []);

  const scramble = () => {
    if (running.current) return;
    running.current = true;
    const queue = LABEL.split("").map((char, i) => ({ char, start: i * 3, end: i * 3 + 9 }));
    let frame = 0;
    window.clearInterval(interval.current);
    interval.current = window.setInterval(() => {
      let settled = 0;
      const out = queue
        .map(({ char, start, end }) => {
          if (frame >= end) {
            settled++;
            return char;
          }
          if (frame >= start) {
            return char === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          return char;
        })
        .join("");
      setText(out);
      frame++;
      if (settled === queue.length) {
        window.clearInterval(interval.current);
        running.current = false;
      }
    }, 40);
  };

  return (
    <div className="text-center">
      <p
        onMouseEnter={scramble}
        onMouseLeave={() => setText(LABEL)}
        className="cursor-default text-4xl font-semibold tracking-tight text-accent sm:text-5xl"
      >
        {text}
      </p>
      <p className="mt-4 text-sm text-muted-fg">
        Letters scramble through glyphs and settle one by one
      </p>
    </div>
  );
}
