import { ScrollVelocityContainer, ScrollVelocityRow } from "./scroll-based-velocity";

export default function Preview() {
  return (
    <ScrollVelocityContainer className="w-full max-w-sm overflow-hidden py-2">
      <ScrollVelocityRow baseVelocity={2}>Magic UI Velocity Scroll</ScrollVelocityRow>
    </ScrollVelocityContainer>
  );
}
