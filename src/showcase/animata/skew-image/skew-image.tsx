// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/image/skew-image.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { ImgHTMLAttributes } from "react";
import { cn } from "@/showcase/_shared/animata/lib/utils";

interface SkewImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export default function SkewImage({ className, ...props }: SkewImageProps) {
  return (
    <div
      className={cn(
        "h-52 w-40 transition-all duration-300 ease-in-out [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]",
        "hover:scale-95 hover:[clip-path:polygon(0_5%,100%_0,100%_95%,0%_100%)] hover:[&>img]:scale-125",
      )}
    >
      <img
        alt=""
        {...props}
        className={cn(
          "transition-transform delay-150 h-full w-full object-cover duration-300 ease-in-out",
          className,
        )}
      />
    </div>
  );
}
