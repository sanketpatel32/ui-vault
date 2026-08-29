import { MessageScroller } from "./message-scroller";

export default function Preview() {
  return (
    <MessageScroller>
      <div className="text-xs p-2 rounded bg-muted/50">User: How do I get started?</div>
      <div className="text-xs p-2 rounded bg-accent-soft text-accent">
        Assistant: Run npm install and check the docs!
      </div>
      <div className="text-xs p-2 rounded bg-muted/50">User: Got it, thank you!</div>
    </MessageScroller>
  );
}
