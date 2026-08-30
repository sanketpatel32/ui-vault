import { Input } from "../input/input";
import { Field, FieldDescription, FieldError, FieldLabel } from "./field";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="flex w-full max-w-sm flex-col gap-5 rounded-xl border border-border bg-panel p-5">
          <Field>
            <FieldLabel htmlFor="preview-name">Display name</FieldLabel>
            <Input id="preview-name" placeholder="Ada Lovelace" />
            <FieldDescription>Visible on your public profile.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="preview-email">Email</FieldLabel>
            <Input id="preview-email" placeholder="ada@example.com" required type="email" />
            <FieldError match="valueMissing">Please enter an email address.</FieldError>
            <FieldError match="typeMismatch">That email address does not look right.</FieldError>
          </Field>
          <p className="border-t border-border pt-3 text-xs text-muted-fg">
            Focus the email field and blur it to trigger validation.
          </p>
        </div>
      </div>
    </div>
  );
}
