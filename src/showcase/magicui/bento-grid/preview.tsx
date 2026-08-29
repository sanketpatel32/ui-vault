import { BentoCard, BentoGrid } from "./bento-grid";
import { Bell, FileText } from "lucide-react";

const features = [
  {
    Icon: FileText,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: <div className="absolute inset-0 bg-linear-to-tr from-accent/20 to-transparent" />,
  },
  {
    Icon: Bell,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: <div className="absolute inset-0 bg-linear-to-tr from-pink-500/20 to-transparent" />,
  },
];

export default function Preview() {
  return (
    <BentoGrid className="max-w-md">
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
