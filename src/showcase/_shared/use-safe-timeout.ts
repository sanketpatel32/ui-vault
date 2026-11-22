import { useCallback, useEffect, useRef } from "react";

/** setTimeout whose pending timers are cleared when the calling component unmounts. */
export function useSafeTimeout() {
  const pending = useRef(new Set<ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const timers = pending.current;
    return () => {
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, []);

  return useCallback((callback: () => void, delay?: number) => {
    const id = setTimeout(() => {
      pending.current.delete(id);
      callback();
    }, delay);
    pending.current.add(id);
    return id;
  }, []);
}
