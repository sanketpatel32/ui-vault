import { DiaTextReveal } from "./dia-text-reveal";

export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <DiaTextReveal text="Colored text reveal" className="text-3xl font-bold" />
    </div>
  );
}
