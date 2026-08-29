import { Faq1 } from "./faq-1";

const faqs = [
  {
    id: "1",
    question: "Is Watermelon UI free?",
    answer: "Yes — the registry is open source and free for personal and commercial use.",
  },
  {
    id: "2",
    question: "How do I install a block?",
    answer: "Copy the shadcn CLI command from any block page and run it in your project.",
  },
  {
    id: "3",
    question: "Does it work with Tailwind v4?",
    answer: "Yes, the blocks are built on React 19, TypeScript and Tailwind CSS v4.",
  },
];

export default function Preview() {
  return (
    <div className="w-full p-6">
      <Faq1 title="Frequently asked questions" faqs={faqs} />
    </div>
  );
}
