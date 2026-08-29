export default function Preview() {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-panel p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-medium text-accent uppercase tracking-wider">
            animata
          </span>
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
        </div>
        <h4 className="text-base font-semibold text-fg tracking-tight">Animated Timeline</h4>
        <p className="text-xs text-muted-fg leading-relaxed">
          The Animated Timeline component is an interactive, visually appealing timeline that
          responds to user interaction. Built with Framer Motion and React, this component
          highlights key events or milestones in a vertical timeline structure.When a user hovers
          over a specific timeline item, the associated circular dot and all previous dots in the
          sequence turn green, indicating progression. The dot size also enlarges slightly,
          enhancing the focus on the current event. The component offers a sleek and smooth
          animation experience, perfect for showcasing chronological steps, milestones, or
          achievements in an engaging and user-friendly manner.This component is highly
          customizable, allowing easy modifications to the timeline content and styling, making it
          suitable for diverse applications such as resumes, project timelines, or product roadmaps.
        </p>
      </div>
    </div>
  );
}
