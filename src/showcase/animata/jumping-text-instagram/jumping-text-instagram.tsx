// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/jumping-text-instagram.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import { motion } from "motion/react";

const splitText = (text: string, word = false) => {
  if (word) {
    return String(text).split(/(?:\b)/u);
  }
  return String(text).split(/(?:)/u);
};

export default function JumpingTextInstagram({
  text = "This is a jumping text effect",
  mode = "word",
  className,
}: {
  text: string;
  className?: string;
  mode?: "word" | "character";
}) {
  const isWordMode = mode === "word";
  const nodes = splitText(text, isWordMode);
  return (
    <div className={className} key={text}>
      {nodes.map((node, index) => (
        <motion.span
          key={index}
          initial={{
            y: 30,
            rotate: -30,
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotate: 0,
          }}
          transition={{
            type: "spring",
            damping: 10,
            mass: 2,
            delay: (isWordMode ? 0.05 : 0.01) * index,
          }}
          className="inline-block origin-center"
        >
          {node === " " ? "\u00A0" : node}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </div>
  );
}
