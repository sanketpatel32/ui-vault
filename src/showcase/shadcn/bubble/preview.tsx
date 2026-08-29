import { Bubble, BubbleContent } from "./bubble";

export default function Preview() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <Bubble variant="default">
        <BubbleContent>Hey! Have you seen the new shadcn components?</BubbleContent>
      </Bubble>
      <Bubble variant="outline" align="end">
        <BubbleContent>Yes, they look fantastic! 🔥</BubbleContent>
      </Bubble>
    </div>
  );
}
