import { toastManager, ToastProvider } from "./toast";

export default function Preview() {
  return (
    <ToastProvider position="bottom-right">
      <div className="w-full">
        <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              className="rounded-lg bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
              type="button"
              onClick={() =>
                toastManager.add({
                  title: "Event created",
                  description: "Monday, January 3rd at 6:00pm",
                })
              }
            >
              Default toast
            </button>
            <button
              className="rounded-lg border border-border bg-panel px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-muted"
              type="button"
              onClick={() =>
                toastManager.add({
                  title: "Changes saved",
                  description: "Your edits are now live.",
                  type: "success",
                })
              }
            >
              Success
            </button>
            <button
              className="rounded-lg border border-border bg-panel px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-muted"
              type="button"
              onClick={() =>
                toastManager.add({
                  title: "Something went wrong",
                  description: "The registry could not be reached.",
                  type: "error",
                })
              }
            >
              Error
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              className="rounded-lg border border-border bg-panel px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-muted"
              type="button"
              onClick={() =>
                toastManager.promise(
                  new Promise<string>((resolve) => window.setTimeout(() => resolve("ok"), 2000)),
                  {
                    loading: "Saving your changes…",
                    success: "All changes saved",
                    error: "Save failed — try again",
                  },
                )
              }
            >
              Promise toast (2s)
            </button>
            <button
              className="rounded-lg border border-border bg-panel px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-muted"
              type="button"
              onClick={() => {
                const id = toastManager.add({
                  title: "File deleted",
                  description: "src/old-preview.tsx was removed.",
                  timeout: 1000000,
                  actionProps: {
                    children: "Undo",
                    onClick: () => {
                      toastManager.close(id);
                      toastManager.add({
                        title: "Restored",
                        description: "Nothing was deleted.",
                        type: "info",
                      });
                    },
                  },
                });
              }}
            >
              Toast with action
            </button>
          </div>
          <p className="text-xs text-muted-fg">
            Toasts stack in the bottom-right corner — hover to expand, swipe to dismiss.
          </p>
        </div>
      </div>
    </ToastProvider>
  );
}
