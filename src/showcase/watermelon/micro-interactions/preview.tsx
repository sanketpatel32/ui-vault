import { ShimmerButton } from "./shimmer-button/shimmer-button";
import { FlipButton } from "./flip/flip";

export default function Preview() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-6 p-8">
      <ShimmerButton>Shimmer Button</ShimmerButton>
      <FlipButton>Flip Button</FlipButton>
    </div>
  );
}
