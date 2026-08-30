import { SparklesIcon } from "lucide-react";
import {
  Glimpse,
  GlimpseContent,
  GlimpseDescription,
  GlimpseImage,
  GlimpseTitle,
  GlimpseTrigger,
} from "./index";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-3 p-6">
        <p className="text-muted-fg text-xs">Hover the profile to peek the page</p>

        <Glimpse>
          <GlimpseTrigger
            asChild
            className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-border bg-panel px-4 py-2 transition-colors hover:bg-muted"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-fg">
              AM
            </span>
            <span className="text-sm font-medium">Alex Morgan</span>
            <SparklesIcon className="text-muted-fg size-3.5" />
          </GlimpseTrigger>

          <GlimpseContent className="w-80">
            <GlimpseImage
              alt="Kibo UI component registry"
              src="https://picsum.photos/seed/kibo-glimpse/480/252"
            />
            <GlimpseTitle>kibo-ui.com — component registry</GlimpseTitle>
            <GlimpseDescription>
              An open-source registry of well-crafted React components — tables, kanban, gantt and
              more.
            </GlimpseDescription>
          </GlimpseContent>
        </Glimpse>
      </div>
    </div>
  );
}
