// Re-implemented from React Bits "CountUp" (MIT): https://reactbits.dev/animations/count-up
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

const TARGET = 24601;

export default function Preview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, TARGET, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-mono text-5xl font-semibold tabular-nums sm:text-6xl">
        {value.toLocaleString()}
      </p>
      <p className="mt-4 text-sm text-muted-fg">
        Downloads and counting — scrolls into view, then counts up
      </p>
    </div>
  );
}
