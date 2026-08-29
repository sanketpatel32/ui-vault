import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Preview() {
  return (
    <Card className="w-72 border-accent">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold">Pro Plan</CardTitle>
        <div className="text-2xl font-bold text-fg">$29 <span className="text-xs font-normal text-muted-fg">/month</span></div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-3">
        <ul className="space-y-2 text-xs text-muted-fg">
          <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Unlimited components</li>
          <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Full source code</li>
          <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Priority support</li>
        </ul>
        <Button size="sm" className="w-full">Subscribe</Button>
      </CardContent>
    </Card>
  );
}
