import { AspectRatio } from "./aspect-ratio";

export default function Preview() {
  return (
    <div className="w-72 overflow-hidden rounded-xl border border-border shadow-xs">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&auto=format&fit=crop&q=60"
          alt="Photo by Drew Beamer"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  );
}
