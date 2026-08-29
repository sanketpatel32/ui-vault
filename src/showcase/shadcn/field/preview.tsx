import { Field, FieldDescription, FieldGroup, FieldLabel } from "./field";
import { Input } from "@/components/ui/input";

export default function Preview() {
  return (
    <FieldGroup className="w-72">
      <Field>
        <FieldLabel htmlFor="email-input">Email Address</FieldLabel>
        <Input id="email-input" placeholder="m@example.com" />
        <FieldDescription>We will never share your email.</FieldDescription>
      </Field>
    </FieldGroup>
  );
}
