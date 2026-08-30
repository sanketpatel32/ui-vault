import { Spinner } from "./spinner";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-6 p-6">
        <div className="flex items-center gap-8 text-muted-fg">
          <Spinner className="size-4" />
          <Spinner className="size-6" />
          <Spinner className="size-8" />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-fg">
          <Spinner className="size-4" />
          Loading components…
        </div>
        <button
          className="flex items-center gap-2 rounded-lg bg-fg px-4 py-2 text-sm font-medium text-bg opacity-85"
          disabled
          type="button"
        >
          <Spinner className="size-4" />
          Saving…
        </button>
      </div>
    </div>
  );
}
