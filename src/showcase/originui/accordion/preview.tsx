import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-md p-6">
        <Accordion type="single" collapsible defaultValue="a">
          <AccordionItem value="a">
            <AccordionTrigger>First question</AccordionTrigger>
            <AccordionContent>Yes. It comes from the Origin UI registry.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Second question</AccordionTrigger>
            <AccordionContent>Copy-paste it with the shadcn CLI.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
