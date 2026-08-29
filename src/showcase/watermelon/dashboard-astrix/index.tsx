export function AstrixDashboard() {
  return (
    <div className="w-80 rounded-2xl border border-border bg-panel p-4 shadow-md space-y-3">
      <div className="text-xs font-semibold text-fg">Astrix Analytics</div>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2.5 rounded-lg bg-muted/30 border border-border text-center">
          <div className="text-base font-bold text-fg">24.5k</div>
          <div className="text-[10px] text-muted-fg">Page Views</div>
        </div>
        <div className="p-2.5 rounded-lg bg-muted/30 border border-border text-center">
          <div className="text-base font-bold text-fg">4.8%</div>
          <div className="text-[10px] text-muted-fg">Conversion</div>
        </div>
      </div>
    </div>
  );
}

export default AstrixDashboard;
