import Component from "./hero-color-panel";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <Component />
      </div>
    </div>
  );
}
