import { useState } from "react";
import { Field, FieldError, FieldLabel } from "../field/field";
import { Input } from "../input/input";
import { Form } from "./form";

export default function Preview() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <Form
          className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-border bg-panel p-5"
          onFormSubmit={() => setSignedIn(true)}
        >
          <div>
            <h3 className="text-sm font-medium text-fg">Sign in</h3>
            <p className="mt-0.5 text-xs text-muted-fg">Fields are validated on submit.</p>
          </div>
          <Field name="email">
            <FieldLabel htmlFor="form-email">Email</FieldLabel>
            <Input
              id="form-email"
              name="email"
              placeholder="ada@example.com"
              required
              type="email"
            />
            <FieldError match="valueMissing">Enter your email to continue.</FieldError>
            <FieldError match="typeMismatch">That email looks invalid.</FieldError>
          </Field>
          <Field name="password">
            <FieldLabel htmlFor="form-password">Password</FieldLabel>
            <Input
              id="form-password"
              name="password"
              placeholder="••••••••"
              required
              type="password"
            />
            <FieldError match="valueMissing">Enter your password.</FieldError>
          </Field>
          <button
            className="rounded-lg bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
            type="submit"
          >
            Sign in
          </button>
          {signedIn && (
            <p className="text-xs text-muted-fg">
              Submitted successfully — the form values were valid.
            </p>
          )}
        </Form>
      </div>
    </div>
  );
}
