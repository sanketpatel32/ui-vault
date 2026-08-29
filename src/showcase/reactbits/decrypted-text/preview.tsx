import { useState, useEffect } from "react";

const TARGET = "SECURITY_PROTOCOL_ACTIVATED";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

export default function Preview() {
  const [text, setText] = useState(TARGET);

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setText(
        TARGET.split("")
          .map((char, index) => {
            if (index < iteration) return TARGET[index];
            if (char === "_") return "_";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );

      if (iteration >= TARGET.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
  };

  useEffect(() => {
    scramble();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 text-center font-mono">
      <div className="min-h-[40px] text-2xl font-bold text-fg tracking-wide">{text}</div>
      <button
        onClick={scramble}
        className="rounded-lg border border-border bg-panel px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg font-sans"
      >
        Decrypt Again
      </button>
    </div>
  );
}
