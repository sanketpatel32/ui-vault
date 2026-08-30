import { ToastProvider } from "@/showcase/_shared/cossui/toast";
import Component from "./p-toast-2";

export default function Preview() {
  return (
    <ToastProvider>
      <div className="w-full">
        <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
          <Component />
          <p className="text-xs text-muted-fg">
            Click any button — toasts stack up in the bottom-right corner.
          </p>
        </div>
      </div>
    </ToastProvider>
  );
}
