import { useState } from "react";
import { Deck, DeckCards, DeckEmpty, DeckItem } from "./index";

const cards = [
  {
    emoji: "🌍",
    title: "Which planet is closest to the sun?",
    subtitle: "Astronomy · easy",
    className: "from-sky-500 to-indigo-600",
  },
  {
    emoji: "🎨",
    title: "Who painted The Starry Night?",
    subtitle: "Art · medium",
    className: "from-violet-500 to-fuchsia-600",
  },
  {
    emoji: "🧪",
    title: "What is the chemical symbol for gold?",
    subtitle: "Science · medium",
    className: "from-emerald-500 to-teal-600",
  },
  {
    emoji: "📚",
    title: "Who wrote 1984?",
    subtitle: "Literature · easy",
    className: "from-amber-500 to-orange-600",
  },
  {
    emoji: "🎵",
    title: "How many strings does a cello have?",
    subtitle: "Music · hard",
    className: "from-rose-500 to-red-600",
  },
];

export default function Preview() {
  const [index, setIndex] = useState(0);
  const finished = index >= cards.length;

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <p className="text-muted-fg text-xs">Drag the top card left or right to swipe it away</p>

        <Deck className="h-72 w-56">
          <DeckCards currentIndex={index} onCurrentIndexChange={setIndex} threshold={80}>
            {cards.map((card) => (
              <DeckItem
                className={`flex-col gap-3 bg-gradient-to-br p-6 text-left text-white ${card.className}`}
                key={card.title}
              >
                <span className="text-3xl">{card.emoji}</span>
                <p className="text-sm leading-snug font-semibold">{card.title}</p>
                <p className="text-xs text-white/70">{card.subtitle}</p>
              </DeckItem>
            ))}
          </DeckCards>

          {finished && (
            <DeckEmpty className="border-border text-muted-fg">
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm">All cards swiped</p>
                <button
                  className="rounded-lg border border-border bg-panel px-3 py-1.5 text-xs font-medium text-fg transition-colors hover:bg-muted"
                  onClick={() => setIndex(0)}
                  type="button"
                >
                  Restart deck
                </button>
              </div>
            </DeckEmpty>
          )}
        </Deck>

        <p className="text-muted-fg text-xs">
          {finished ? "Done" : `Card ${index + 1} of ${cards.length}`}
        </p>
      </div>
    </div>
  );
}
