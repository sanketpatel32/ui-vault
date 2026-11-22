// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/text/swap-text.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import { useState } from "react";

import { cn } from "@/showcase/_shared/animata/lib/utils";

interface SwapTextProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * The initial text to display.
   */
  initialText: string;

  /**
   * The final text to display.
   */
  finalText: string;

  /**
   * Whether the component should toggle on hover as well as click.
   */
  supportsHover?: boolean;

  /**
   * The class name for the text.
   */
  textClassName?: string;

  /**
   * The class name for the initial text.
   */
  initialTextClassName?: string;

  /**
   * The class name for the final text.
   */
  finalTextClassName?: string;

  /**
   * Whether to disable the click interaction.
   */
  disableClick?: boolean;
}

export default function SwapText({
  initialText,
  finalText,
  className,
  supportsHover = true,
  textClassName,
  initialTextClassName,
  finalTextClassName,
  disableClick,
  // The rest of the props are passed to the container div.
  ...props
}: SwapTextProps) {
  const [active, setActive] = useState(false);
  const common = "block transition-transform duration-1000 ease-slow";

  const longWord = finalText.length > initialText.length ? finalText : null;

  return (
    <div {...props} className={cn("relative overflow-hidden text-foreground", className)}>
      <button
        type="button"
        disabled={disableClick}
        className={cn(
          "group/swap w-full cursor-pointer select-none border-0 bg-transparent p-0 text-left text-3xl font-bold text-inherit",
          textClassName,
        )}
        onClick={() => !disableClick && setActive((current) => !current)}
      >
        <span
          className={cn(common, initialTextClassName, {
            "flex flex-col": true,
            "-translate-y-full": active,
            "group-hover/swap:-translate-y-full": supportsHover,
          })}
        >
          {initialText}
          {
            /* Trick to make sure it can always fit all available words after transition as the second word is set to absolute*/
            Boolean(longWord?.length) && <span className="invisible h-0">{longWord}</span>
          }
        </span>
        <span
          className={cn(`${common} absolute top-full`, finalTextClassName, {
            "-translate-y-full": active,
            "group-hover/swap:-translate-y-full": supportsHover,
          })}
        >
          {finalText}
        </span>
      </button>
    </div>
  );
}
