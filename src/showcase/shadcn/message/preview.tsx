import { Message, MessageAvatar, MessageContent, MessageHeader } from "./message";

export default function Preview() {
  return (
    <Message className="flex gap-3 max-w-sm">
      <MessageAvatar className="h-8 w-8 text-xs font-semibold">SC</MessageAvatar>
      <MessageContent>
        <MessageHeader>shadcn</MessageHeader>
        <div className="text-xs text-muted-fg mt-0.5">
          Clean, accessible UI primitives for modern React applications.
        </div>
      </MessageContent>
    </Message>
  );
}
