import { useState } from "react";
import { Loader2, Plus, Send } from "lucide-react";
import { Button, type ButtonProps } from "./button";

const variants: ButtonProps["variant"][] = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "link",
  "destructive",
  "destructive-outline",
];

const sizes: ButtonProps["size"][] = ["xs", "sm", "default", "lg", "xl"];

export default function Preview() {
  const [saving, setSaving] = useState(false);

  const fakeSave = () => {
    setSaving(true);
    window.setTimeout(() => setSaving(false), 1600);
  };

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-5 p-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant === "link" ? "Link" : variant[0].toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {sizes.map((size) => (
            <Button key={size} variant="outline" size={size}>
              {size}
            </Button>
          ))}
          <Button variant="outline" size="icon" aria-label="Add">
            <Plus />
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>
            <Send />
            Invite (offline)
          </Button>
          <Button onClick={fakeSave} loading={saving}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
          <Button variant="secondary" loading>
            Always loading
          </Button>
        </div>
        <p className="inline-flex items-center gap-1.5 text-xs text-muted-fg">
          <Loader2 className="size-3 animate-spin" />7 variants · 5 sizes · icon · disabled ·
          loading states
        </p>
      </div>
    </div>
  );
}
