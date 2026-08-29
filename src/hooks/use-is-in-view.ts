import { useInView } from "motion/react";
import * as React from "react";

export interface UseIsInViewOptions {
  inView?: boolean;
  inViewMargin?: any;
  inViewOnce?: boolean;
}

export function useIsInView(
  userRef?: any,
  options?: UseIsInViewOptions,
): { ref: React.RefObject<any>; isInView: boolean } {
  const internalRef = React.useRef<any>(null);
  const targetRef =
    userRef && typeof userRef === "object" && "current" in userRef ? userRef : internalRef;
  const inView = useInView(targetRef, {
    margin: options?.inViewMargin,
    once: options?.inViewOnce,
  });

  return {
    ref: targetRef,
    isInView: options?.inView !== undefined ? (options.inView ? inView : true) : inView,
  };
}
