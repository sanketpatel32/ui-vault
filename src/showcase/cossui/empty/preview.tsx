import { InboxIcon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./empty";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="flex w-full max-w-md rounded-xl border border-border bg-panel">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <InboxIcon />
              </EmptyMedia>
              <EmptyTitle>No components yet</EmptyTitle>
              <EmptyDescription>
                Vendor your first component and it will show up here, ready to search and preview.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <button
                className="rounded-lg bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
                type="button"
              >
                Add a component
              </button>
            </EmptyContent>
          </Empty>
        </div>
      </div>
    </div>
  );
}
