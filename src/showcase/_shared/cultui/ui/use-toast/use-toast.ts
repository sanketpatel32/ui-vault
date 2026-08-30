import { useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Toast = {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  open?: boolean;
};

export type ToastInput = Omit<Toast, "id">;

export type ToastReturn = {
  id: string;
  dismiss: () => void;
  update: (input: ToastInput) => void;
};

const TOAST_DISMISS_DELAY = 5000;

let count = 0;
let memoryToasts: Toast[] = [];
const listeners: Array<(toasts: Toast[]) => void> = [];

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return `${Date.now()}-${count}`;
}

function dispatch(toasts: Toast[]) {
  memoryToasts = toasts;
  for (const listener of listeners) {
    listener(toasts);
  }
}

export function dismiss(toastId?: string) {
  if (toastId === undefined) {
    dispatch([]);
    return;
  }
  dispatch(memoryToasts.filter((toast) => toast.id !== toastId));
}

export function toast(input: ToastInput): ToastReturn {
  const id = genId();
  const update = (next: ToastInput) => {
    dispatch(memoryToasts.map((t) => (t.id === id ? { ...t, ...next } : t)));
  };
  dispatch([...memoryToasts, { ...input, id, open: true }]);
  window.setTimeout(() => dismiss(id), TOAST_DISMISS_DELAY);
  return {
    id,
    dismiss: () => dismiss(id),
    update,
  };
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>(memoryToasts);

  useEffect(() => {
    listeners.push(setToasts);
    return () => {
      const index = listeners.indexOf(setToasts);
      if (index >= 0) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    toast,
    dismiss,
    toasts,
  };
}

export default useToast;
