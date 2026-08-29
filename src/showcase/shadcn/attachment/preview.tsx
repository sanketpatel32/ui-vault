import { Attachment } from "./attachment";

export default function Preview() {
  return (
    <div className="w-64 space-y-2">
      <Attachment name="project-specification.pdf" size="1.2 MB" />
      <Attachment name="design-mockups.fig" size="8.4 MB" />
    </div>
  );
}
