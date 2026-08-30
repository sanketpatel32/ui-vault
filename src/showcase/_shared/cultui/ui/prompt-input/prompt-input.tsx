import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ComponentProps,
  type PropsWithChildren,
} from "react";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/showcase/_shared/cultui/ui/button";
import { Textarea } from "@/showcase/_shared/cultui/ui/textarea";

// ============================================================================
// Types
// ============================================================================

export interface PromptInputController {
  /** Textarea state and helpers */
  textInput: {
    value: string;
    setInput: (value: string) => void;
  };
  /** Submit the current value to the `onSubmit` handler */
  submit: () => void;
}

// ============================================================================
// Context
// ============================================================================

const PromptInputContext = createContext<PromptInputController | null>(null);

/**
 * Returns the nearest PromptInput controller, or `null` when called outside a
 * provider. Consumers use this to integrate with the input when present and
 * fall back to their own behavior otherwise.
 */
export function useOptionalPromptInputController(): PromptInputController | null {
  return useContext(PromptInputContext);
}

/** Like {@link useOptionalPromptInputController} but throws outside a provider. */
export function usePromptInputController(): PromptInputController {
  const controller = useContext(PromptInputContext);
  if (!controller) {
    throw new Error("usePromptInputController must be used within a PromptInputProvider");
  }
  return controller;
}

// ============================================================================
// Provider
// ============================================================================

export type PromptInputProviderProps = PropsWithChildren<{
  /** Called with the textarea value when the prompt is submitted */
  onSubmit?: (value: string) => void;
}>;

/**
 * Context-only provider. Wrap consumers that need optional access to the
 * prompt input (e.g. a prompt library inserting text).
 */
export function PromptInputProvider({ children, onSubmit }: PromptInputProviderProps) {
  const [value, setValue] = useState("");

  const submit = useCallback(() => {
    onSubmit?.(value);
  }, [onSubmit, value]);

  const controller = useMemo<PromptInputController>(
    () => ({ textInput: { value, setInput: setValue }, submit }),
    [value, submit],
  );

  return <PromptInputContext.Provider value={controller}>{children}</PromptInputContext.Provider>;
}

// ============================================================================
// PromptInput (provider + form composition)
// ============================================================================

export type PromptInputProps = ComponentProps<"form"> & {
  /** Called with the textarea value when the form is submitted */
  onSubmitPrompt?: (value: string) => void;
};

function PromptInputForm({ className, children, ...props }: ComponentProps<"form">) {
  const controller = usePromptInputController();

  return (
    <form
      className={cn(
        "flex w-full flex-col gap-2 rounded-xl border border-input bg-background p-2 shadow-sm",
        className,
      )}
      onSubmit={(event) => {
        event.preventDefault();
        controller.submit();
      }}
      {...props}
    >
      {children}
    </form>
  );
}

/**
 * Chat-style prompt input: textarea + send button composition.
 * Composes its own provider, so `PromptInputTextarea` and
 * `PromptInputSubmit` inside it are automatically wired together.
 */
export function PromptInput({ onSubmitPrompt, ...props }: PromptInputProps) {
  return (
    <PromptInputProvider onSubmit={onSubmitPrompt}>
      <PromptInputForm {...props} />
    </PromptInputProvider>
  );
}

// ============================================================================
// Textarea
// ============================================================================

export type PromptInputTextareaProps = ComponentProps<typeof Textarea>;

/**
 * Textarea bound to the nearest prompt input controller. Falls back to an
 * uncontrolled textarea when used outside a provider.
 */
export function PromptInputTextarea({ className, ...props }: PromptInputTextareaProps) {
  const controller = useOptionalPromptInputController();

  return (
    <Textarea
      className={cn(
        "min-h-10 resize-none border-none bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        className,
      )}
      {...(controller
        ? {
            value: controller.textInput.value,
            onChange: (event) => controller.textInput.setInput(event.target.value),
          }
        : {})}
      {...props}
    />
  );
}

// ============================================================================
// Submit
// ============================================================================

export type PromptInputSubmitProps = ComponentProps<typeof Button>;

/** Send button; defaults to a circular icon button with an up arrow. */
export function PromptInputSubmit({ className, children, ...props }: PromptInputSubmitProps) {
  return (
    <Button
      type="submit"
      size="icon"
      className={cn("self-end rounded-full [&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children ?? <ArrowUp />}
    </Button>
  );
}
