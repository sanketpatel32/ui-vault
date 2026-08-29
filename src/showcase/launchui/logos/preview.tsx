import Logo from "./logo";
import ReactLogo from "./react";

export default function Preview() {
  return (
    <div className="flex items-center justify-around gap-6 p-4 rounded-xl border border-border bg-panel">
      <Logo image={ReactLogo} name="React" />
      <Logo image={ReactLogo} name="Framework" badge="v19" />
    </div>
  );
}
