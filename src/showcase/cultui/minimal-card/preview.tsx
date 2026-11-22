import {
  MinimalCard,
  MinimalCardDescription,
  MinimalCardImage,
  MinimalCardTitle,
} from "./minimal-card";

// Mirrors the upstream demo (./demo.tsx), which maps its cards without a `key`.
const cards = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  title: "Sick title",
  description: "How to design with gestures and motion that feel intuitive and natural.",
}));

export default function Preview() {
  return (
    <div className="w-full">
      <div className="w-full max-w-4xl">
        <div className="min-h-[500px] p-4 flex flex-col justify-center rounded-lg space-y-4">
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {cards.map((card) => (
              <MinimalCard key={card.id}>
                <MinimalCardImage src="/basic-img.png" alt={card.title} />
                <MinimalCardTitle>{card.title}</MinimalCardTitle>
                <MinimalCardDescription>{card.description}</MinimalCardDescription>
              </MinimalCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
