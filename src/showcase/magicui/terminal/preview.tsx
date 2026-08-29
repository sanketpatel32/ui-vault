import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "./terminal";

export default function Preview() {
  return (
    <Terminal className="max-w-md">
      <TypingAnimation>&gt; npx create-react-app my-app</TypingAnimation>
      <AnimatedSpan delay={1500} className="text-emerald-500">
        <span>✔ Installing dependencies.</span>
      </AnimatedSpan>
      <AnimatedSpan delay={2500} className="text-emerald-500">
        <span>✔ Successfully created project!</span>
      </AnimatedSpan>
    </Terminal>
  );
}
