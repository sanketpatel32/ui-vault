import { Suspense, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { lazyPreviews, hasLazyPreview } from "@/lib/lazy-previews";
import { cn } from "@/lib/utils";

function Renderer({ previewKey }: { previewKey: string }) {
  const Component = lazyPreviews[previewKey];
  if (!Component) return null;
  return <Component />;
}

/**
 * Inline live preview for entry cards. Mounts only once the card scrolls
 * near the viewport so a full browse page never eagerly loads hundreds
 * of previews at once.
 */
export function CardPreview({ previewKey }: { previewKey?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  if (!hasLazyPreview(previewKey)) return null;

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={cn(
        "preview-dots pointer-events-none relative -mx-4 -mt-4 flex h-36 items-center justify-center overflow-hidden",
        "border-b border-border",
      )}
    >
      {visible && (
        <Suspense fallback={<Loader2 size={14} className="animate-spin text-faint-fg" />}>
          <div className="origin-center scale-[0.8]">
            <Renderer previewKey={previewKey} />
          </div>
        </Suspense>
      )}
    </div>
  );
}
