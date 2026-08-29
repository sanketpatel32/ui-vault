// Re-implemented from Aceternity UI "Moving Border" (MIT, free tier):
// https://ui.aceternity.com/components/moving-border
// The rotating conic-gradient track lives in src/index.css (.moving-border-track)
export default function Preview() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative overflow-hidden rounded-xl p-[1.5px]">
        <div className="moving-border-track absolute inset-[-100%]" aria-hidden />
        <div className="relative rounded-[10px] bg-panel px-10 py-4">
          <p className="text-lg font-semibold tracking-tight">Get Started</p>
        </div>
      </div>
      <p className="text-sm text-muted-fg">A light streak travels around the border</p>
    </div>
  );
}
