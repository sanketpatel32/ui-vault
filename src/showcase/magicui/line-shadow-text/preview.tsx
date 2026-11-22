import { LineShadowText } from "./line-shadow-text";

export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <LineShadowText className="text-5xl font-bold italic tracking-tight" shadowColor="#6366f1">
        Shadow
      </LineShadowText>
    </div>
  );
}
