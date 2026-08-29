export default function Preview() {
  return (
    <div className="relative flex items-center justify-center p-8 bg-gradient-to-tr from-accent/20 to-purple-500/20 rounded-2xl">
      <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md shadow-lg text-center dark:bg-black/20">
        <h4 className="text-sm font-semibold text-fg">Frosted Glassmorphism</h4>
        <p className="mt-1 text-xs text-muted-fg">Backdrop blur with translucent border gradient.</p>
      </div>
    </div>
  );
}
