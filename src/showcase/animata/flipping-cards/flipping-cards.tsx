// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/list/flipping-cards.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import type { ComponentProps } from "react";

import FlipCard, { FlipCardBack, FlipCardFront } from "@/showcase/animata/flip-card/flip-card";
import { cn } from "@/showcase/_shared/animata/lib/utils";

type FlippingCardsRootProps = ComponentProps<"div">;

function FlippingCardsRoot({ className, ...props }: FlippingCardsRootProps) {
  return <div className={cn("grid grid-cols-3 gap-5 max-sm:grid-cols-2", className)} {...props} />;
}

type FlippingCardsItemProps = ComponentProps<typeof FlipCard>;

function FlippingCardsItem({ className, ...props }: FlippingCardsItemProps) {
  return (
    <FlipCard className={cn("h-60 w-48 [&>div]:rounded-none", className)} rotate="y" {...props} />
  );
}

const FlippingCardsItemWithFaces = Object.assign(FlippingCardsItem, {
  Front: FlipCardFront,
  Back: FlipCardBack,
});

const FlippingCards = Object.assign(FlippingCardsRoot, {
  Item: FlippingCardsItemWithFaces,
}) as typeof FlippingCardsRoot & {
  Item: typeof FlippingCardsItemWithFaces;
};

export function getFlippingCardsAccent(_index: number) {
  return "hsl(var(--accent))";
}

export default FlippingCards;
export { FlippingCards, FlippingCardsItemWithFaces as FlippingCardsItem };
