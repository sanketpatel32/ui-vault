import { Field, FieldDescription, FieldLabel } from "@/showcase/_shared/cossui/field";
import { Fieldset, FieldsetLegend } from "@/showcase/_shared/cossui/fieldset";
import { Input } from "@/showcase/_shared/cossui/input";

export default function Particle() {
  return (
    <Fieldset className="flex w-full flex-col gap-6">
      <FieldsetLegend>Billing Details</FieldsetLegend>
      <Field>
        <FieldLabel>Company</FieldLabel>
        <Input placeholder="Enter company name" type="text" />
        <FieldDescription>The name that will appear on invoices.</FieldDescription>
      </Field>

      <Field>
        <FieldLabel>Tax ID</FieldLabel>
        <Input placeholder="Enter tax identification number" type="text" />
        <FieldDescription>Your business tax identification number.</FieldDescription>
      </Field>
    </Fieldset>
  );
}
