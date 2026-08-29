export function JobtrackerDashboard() {
  return (
    <div className="w-80 rounded-2xl border border-border bg-panel p-4 shadow-md space-y-2">
      <div className="text-xs font-semibold text-fg">Job Application Pipeline</div>
      <div className="flex gap-2 text-[10px]">
        <div className="flex-1 p-2 rounded bg-muted/50 text-center font-medium">Applied (8)</div>
        <div className="flex-1 p-2 rounded bg-accent-soft text-accent text-center font-medium">
          Interview (3)
        </div>
        <div className="flex-1 p-2 rounded bg-emerald-500/10 text-emerald-500 text-center font-medium">
          Offer (1)
        </div>
      </div>
    </div>
  );
}

export default JobtrackerDashboard;
