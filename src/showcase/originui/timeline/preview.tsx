import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "./timeline";

export default function Preview() {
  return (
    <div className="w-full p-6">
      <Timeline>
        <TimelineItem step={1}>
          <TimelineHeader>
            <TimelineSeparator />
            <TimelineDate>February 2026</TimelineDate>
            <TimelineTitle>Registry released</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>Origin UI components ship as shadcn registry items.</TimelineContent>
        </TimelineItem>
        <TimelineItem step={2}>
          <TimelineHeader>
            <TimelineSeparator />
            <TimelineDate>August 2026</TimelineDate>
            <TimelineTitle>Vendored into UI Vault</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>Every family now renders a live preview.</TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
