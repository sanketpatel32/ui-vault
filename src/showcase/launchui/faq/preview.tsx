import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

export default function Preview() {
  return (
    <div className="w-full max-w-sm">
      <Accordion type="single" collapsible>
        <AccordionItem value="1">
          <AccordionTrigger className="text-xs">How do I install Launch UI?</AccordionTrigger>
          <AccordionContent className="text-xs text-muted-fg">
            Copy and paste components directly or use the shadcn CLI registry.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger className="text-xs">
            Is it compatible with Tailwind v4?
          </AccordionTrigger>
          <AccordionContent className="text-xs text-muted-fg">
            Yes, fully tested and compatible with modern React and Tailwind CSS v4.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
