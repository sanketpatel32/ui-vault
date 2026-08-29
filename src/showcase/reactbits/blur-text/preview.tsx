// Re-implemented from React Bits "BlurText" (MIT): https://reactbits.dev/text-animations/blur-text
import { useRef } from "react";
import { motion, useInView } from "motion/react";

const WORDS = ["Every", "component", "you", "love", "—", "in", "one", "vault."];

export default function Preview() {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <p ref={ref} className="max-w-md text-center text-2xl font-semibold tracking-tight sm:text-3xl">
      {WORDS.map((word, i) => (
        <motion.span
          key={word + i}
          className="mr-[0.28em] inline-block"
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
          transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
