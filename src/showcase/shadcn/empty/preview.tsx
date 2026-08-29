import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./empty";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Preview() {
  return (
    <Empty className="max-w-sm rounded-xl border border-dashed border-border p-6 text-center">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox size={20} className="text-muted-fg mx-auto" />
        </EmptyMedia>
        <EmptyTitle>No messages yet</EmptyTitle>
        <EmptyDescription>When you receive new messages, they will show up here.</EmptyDescription>
      </EmptyHeader>
      <Button size="sm" variant="outline" className="mt-3">
        Refresh Inbox
      </Button>
    </Empty>
  );
}
