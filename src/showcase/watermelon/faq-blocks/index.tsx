import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqBlock() {
  return (
    <div className="w-full max-w-sm">
      <Accordion type="single" collapsible>
        <AccordionItem value="1">
          <AccordionTrigger className="text-xs">Is Watermelon UI free?</AccordionTrigger>
          <AccordionContent className="text-xs text-muted-fg">
            Yes, Watermelon UI is 100% open source and free to use in your projects.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default FaqBlock;
