// Re-implemented from FancyComponents "Typewriter" (MIT):
// https://fancycomponents.dev/docs/typewriter
import { useEffect, useState } from "react";

const PHRASES = ["Copy.", "Paste.", "Ship.", "Repeat."];

export default function Preview() {
  const [text, setText] = useState("");
  const [phrase, setPhrase] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = PHRASES[phrase];
    let delay = deleting ? 55 : 95;
    if (!deleting && text === full) delay = 1400;
    if (deleting && text === "") delay = 350;

    const t = window.setTimeout(() => {
      if (!deleting) {
        if (text === full) setDeleting(true);
        else setText(full.slice(0, text.length + 1));
      } else {
        if (text === "") {
          setDeleting(false);
          setPhrase((p) => (p + 1) % PHRASES.length);
        } else {
          setText(full.slice(0, text.length - 1));
        }
      }
    }, delay);
    return () => window.clearTimeout(t);
  }, [text, deleting, phrase]);

  return (
    <div className="text-center">
      <p className="min-h-[1.2em] font-mono text-4xl font-semibold tracking-tight sm:text-5xl">
        <span className="text-fg">{text}</span>
        <span className="typewriter-caret text-accent">▍</span>
      </p>
      <p className="mt-4 text-sm text-muted-fg">Types, pauses, deletes, moves on</p>
    </div>
  );
}
