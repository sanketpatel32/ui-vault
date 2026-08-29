import * as ComponentModule from "./comic-text";

export default function Preview() {
  const Component = (ComponentModule as any).default || Object.values(ComponentModule)[0] as any;
  if (!Component) return <div className="text-xs text-muted-fg">Component loaded</div>;
  return (
    <div className="flex items-center justify-center p-4">
      <Component />
    </div>
  );
}
