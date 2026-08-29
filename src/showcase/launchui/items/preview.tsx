import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Sparkles } from "lucide-react";

const items = [
  { icon: Zap, title: "Ultra Fast", desc: "Optimized for lightning load times." },
  { icon: Shield, title: "Accessible", desc: "WAI-ARIA compliant components." },
  { icon: Sparkles, title: "Customizable", desc: "Easy styling with Tailwind." },
];

export default function Preview() {
  return (
    <div className="grid grid-cols-3 gap-3 max-w-md">
      {items.map((item, i) => (
        <Card key={i}>
          <CardContent className="p-3 text-center space-y-1">
            <item.icon size={18} className="mx-auto text-accent mb-1" />
            <h5 className="text-xs font-semibold text-fg">{item.title}</h5>
            <p className="text-[10px] text-muted-fg leading-tight">{item.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
