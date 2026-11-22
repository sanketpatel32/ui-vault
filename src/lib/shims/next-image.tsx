import React from "react";

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string | { src: string };
  alt?: string;
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
  quality?: number | `${number}`;
  placeholder?: string;
  blurDataURL?: string;
}

// Next-only props are destructured out so they never reach the DOM <img>.
export default function Image({
  src,
  alt = "",
  fill,
  className,
  style,
  priority: _priority,
  unoptimized: _unoptimized,
  quality: _quality,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  ...props
}: ImageProps) {
  const imgSrc = typeof src === "string" ? src : src?.src || "";
  const fillStyle: React.CSSProperties = fill
    ? { position: "absolute", height: "100%", width: "100%", inset: 0, objectFit: "cover" }
    : {};

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      style={{ ...fillStyle, ...style }}
      {...props}
    />
  );
}
export { Image };
