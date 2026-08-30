import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

const faqs = [
  {
    q: "Is UI Vault free to use?",
    a: "Yes. Every vendored component comes from a free-tier or MIT-licensed source, and the hub itself is a personal, frontend-only project — no account, no backend, no telemetry.",
  },
  {
    q: "Can I use these components in commercial projects?",
    a: "All registry sources permit commercial use under their free tiers (MIT for most, free tier for reactbits, motion-primitives and aceternity). Each entry keeps its upstream license header, so attribution travels with the code.",
  },
  {
    q: "How do I add a new source to the library?",
    a: "Add the source to src/data/sources.ts, create a components file with one UIEntry per component, then run npm run registry:check and npm run llms. The hub UI is only a view over that registry.",
  },
];

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <Accordion
          defaultValue={["faq-0"]}
          className="w-full max-w-lg rounded-xl border border-border bg-panel px-4"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.q} value={`faq-${index}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>
                <p className="leading-relaxed">{faq.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
