import { KineticText } from "./kinetic-text";

// Demo from the official magicui docs example
// (https://magicui.design/docs/components/kinetic-text).
export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <KineticText text="Hover over me" className="text-5xl tracking-tight" />
    </div>
  );
}
