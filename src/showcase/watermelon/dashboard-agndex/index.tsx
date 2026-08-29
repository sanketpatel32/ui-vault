export function AgndexDashboard() {
  return (
    <div className="w-80 rounded-2xl border border-border bg-panel p-4 shadow-md space-y-3">
      <div className="flex justify-between items-center text-xs font-semibold border-b border-border pb-2">
        <span>Agndex Planner</span>
        <span className="text-[10px] text-emerald-500">Active</span>
      </div>
      <div className="space-y-2">
        <div className="p-2 rounded bg-muted/40 text-xs flex justify-between">
          <span>Team Sync</span>
          <span className="text-[10px] text-muted-fg">10:00 AM</span>
        </div>
        <div className="p-2 rounded bg-muted/40 text-xs flex justify-between">
          <span>Design Review</span>
          <span className="text-[10px] text-muted-fg">2:30 PM</span>
        </div>
      </div>
    </div>
  );
}

export default AgndexDashboard;
