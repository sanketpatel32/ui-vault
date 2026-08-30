import { useState } from "react";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "./index";

const renderSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function Preview() {
  const [files, setFiles] = useState<File[] | undefined>();

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-3 p-6">
        <div className="w-full max-w-md">
          <Dropzone maxFiles={4} onDrop={(accepted) => setFiles(accepted)} src={files}>
            <DropzoneEmptyState />
            <DropzoneContent>
              {files && (
                <ul className="w-full space-y-1.5 text-left">
                  {files.map((file) => (
                    <li
                      className="flex items-center justify-between gap-3 rounded-md border border-border bg-muted px-3 py-2 text-xs"
                      key={`${file.name}-${file.size}`}
                    >
                      <span className="truncate font-medium text-fg">{file.name}</span>
                      <span className="shrink-0 text-muted-fg">{renderSize(file.size)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </DropzoneContent>
          </Dropzone>
        </div>

        {files && (
          <button
            className="rounded-lg border border-border bg-panel px-3 py-1.5 text-xs font-medium text-muted-fg transition-colors hover:bg-muted hover:text-fg"
            onClick={() => setFiles(undefined)}
            type="button"
          >
            Clear files
          </button>
        )}
      </div>
    </div>
  );
}
