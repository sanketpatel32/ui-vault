import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <AlertDialog>
          <AlertDialogTrigger className="inline-flex h-9 cursor-pointer items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700">
            Delete project…
          </AlertDialogTrigger>
          <AlertDialogPopup className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete “Acme Redesign”?</AlertDialogTitle>
              <AlertDialogDescription>
                This permanently removes the project, its 23 components and all preview history.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogClose className="inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-panel px-4 text-sm font-medium transition-colors hover:bg-accent-soft">
                Cancel
              </AlertDialogClose>
              <AlertDialogClose className="inline-flex h-9 cursor-pointer items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700">
                Delete project
              </AlertDialogClose>
            </AlertDialogFooter>
          </AlertDialogPopup>
        </AlertDialog>
      </div>
    </div>
  );
}
