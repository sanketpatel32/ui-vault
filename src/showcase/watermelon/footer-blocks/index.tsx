export function FooterBlock() {
  return (
    <footer className="w-full max-w-md rounded-xl border border-border bg-panel p-6 shadow-xs text-center text-xs space-y-2">
      <div className="font-bold text-fg">WATERMELON UI</div>
      <div className="flex justify-center gap-4 text-muted-fg">
        <a href="#" className="hover:text-fg">
          Components
        </a>
        <a href="#" className="hover:text-fg">
          Blocks
        </a>
        <a href="#" className="hover:text-fg">
          Pricing
        </a>
      </div>
      <p className="text-[10px] text-muted-fg pt-2 border-t border-border">
        © 2026 Watermelon. All rights reserved.
      </p>
    </footer>
  );
}

export default FooterBlock;
