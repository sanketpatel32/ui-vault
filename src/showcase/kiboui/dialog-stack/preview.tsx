import {
  DialogStack,
  DialogStackBody,
  DialogStackContent,
  DialogStackDescription,
  DialogStackFooter,
  DialogStackHeader,
  DialogStackNext,
  DialogStackPrevious,
  DialogStackTitle,
  DialogStackTrigger,
} from "./index";

const steps = [
  {
    title: "Welcome to UI Vault",
    description: "A quick 3-step tour of the stacked dialog flow. Use Next to go deeper.",
  },
  {
    title: "Stacked, not replaced",
    description: "Each step is its own dialog. Previous dialogs peek out behind this one.",
  },
  {
    title: "Click your way back",
    description: "This stack is clickable — select an earlier dialog peeking behind to jump back.",
  },
];

const buttonClass =
  "rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <DialogStack clickable>
          <DialogStackTrigger className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90">
            Start the tour
          </DialogStackTrigger>

          <DialogStackBody>
            {steps.map((step, index) => (
              <DialogStackContent key={step.title}>
                <DialogStackHeader>
                  <DialogStackTitle>{step.title}</DialogStackTitle>
                  <DialogStackDescription>{step.description}</DialogStackDescription>
                </DialogStackHeader>
                <DialogStackFooter>
                  <DialogStackPrevious className={`${buttonClass} text-muted-fg`}>
                    Back
                  </DialogStackPrevious>
                  <DialogStackNext
                    className={`${buttonClass} border-transparent bg-accent text-accent-fg`}
                  >
                    {index === steps.length - 1 ? "Finish" : "Next"}
                  </DialogStackNext>
                </DialogStackFooter>
              </DialogStackContent>
            ))}
          </DialogStackBody>
        </DialogStack>
      </div>
    </div>
  );
}
