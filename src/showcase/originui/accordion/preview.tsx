import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Preview() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-sm">
      <AccordionItem value="1">
        <AccordionTrigger className="text-xs">How does Origin UI work?</AccordionTrigger>
        <AccordionContent className="text-xs text-muted-fg">
          Origin UI provides copy-paste variants for high-density components.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
