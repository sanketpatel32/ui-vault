import { Mockup, MockupFrame } from "./mockup";

export default function Preview() {
  return (
    <MockupFrame size="small" className="w-72">
      <Mockup type="responsive" className="bg-panel p-6 text-center text-xs text-muted-fg">
        Responsive Device Mockup Frame
      </Mockup>
    </MockupFrame>
  );
}
