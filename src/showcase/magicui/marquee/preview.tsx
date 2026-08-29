import { Marquee } from "./marquee";

const reviews = [
  { name: "Jack", username: "@jack", body: "I've never seen anything like this before. It's amazing." },
  { name: "Jill", username: "@jill", body: "I don't know what to say. I'm speechless. This is amazing." },
  { name: "John", username: "@john", body: "I'm at a loss for words. This is amazing. I love it." },
];

export default function Preview() {
  return (
    <div className="relative flex h-[160px] w-full max-w-md flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-panel">
      <Marquee pauseOnHover className="[--duration:20s]">
        {reviews.map((review) => (
          <figure
            key={review.username}
            className="relative w-48 cursor-pointer overflow-hidden rounded-xl border border-border bg-muted/40 p-3 hover:bg-muted/80"
          >
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-xs font-medium text-fg">{review.name}</figcaption>
                <p className="text-[10px] text-muted-fg">{review.username}</p>
              </div>
            </div>
            <blockquote className="mt-2 text-[11px] text-muted-fg leading-relaxed">{review.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    </div>
  );
}
