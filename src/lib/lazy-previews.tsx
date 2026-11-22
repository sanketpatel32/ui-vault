import { lazy } from "react";
import { showcaseLoaders } from "@/showcase";

export const lazyPreviews: Record<string, React.LazyExoticComponent<React.ComponentType>> = {};

for (const key of Object.keys(showcaseLoaders)) {
  lazyPreviews[key] = lazy(async () => {
    const [mod, { withReducedMotion }] = await Promise.all([
      showcaseLoaders[key](),
      import("@/showcase/reduced-motion"),
    ]);
    return { default: withReducedMotion(mod.default, key) };
  });
}

export function hasLazyPreview(previewKey: string | undefined): previewKey is string {
  return Boolean(previewKey && lazyPreviews[previewKey]);
}
