import Text3DFlip from "./text-3d-flip";

export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4">
      <Text3DFlip as="h2" className="text-3xl font-bold tracking-tight text-fg">
        Flip the script
      </Text3DFlip>
    </div>
  );
}
