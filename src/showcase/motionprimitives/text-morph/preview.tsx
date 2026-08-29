import { useState, useEffect } from "react";

const WORDS = ["Create", "Design", "Animate", "Ship"];

export default function Preview() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % WORDS.length), 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="min-h-[50px] flex items-center justify-center">
        <span
          key={idx}
          className="text-4xl font-extrabold tracking-tight text-accent animate-in fade-in zoom-in-95 duration-500"
        >
          {WORDS[idx]}
        </span>
      </div>
      <p className="text-xs text-muted-fg">Smooth glyph morphing between changing words</p>
    </div>
  );
}
