import { Marker } from "./marker";

export default function Preview() {
  return (
    <div className="w-64 space-y-2">
      <Marker variant="default">Default Marker Item</Marker>
      <Marker variant="separator">Separator Marker</Marker>
      <Marker variant="border">Bordered Marker Item</Marker>
    </div>
  );
}
