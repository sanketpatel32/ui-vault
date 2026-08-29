import { Footer, FooterBottom, FooterContent } from "./footer";
import { Button } from "./button";

export default function Preview() {
  return (
    <Footer className="w-full max-w-md rounded-xl border border-border bg-panel p-4 shadow-xs">
      <FooterContent className="text-center text-xs">
        <h4 className="font-semibold text-fg">Launch UI</h4>
        <p className="text-[11px] text-muted-fg mt-1">Free & premium landing page components</p>
      </FooterContent>
      <FooterBottom className="mt-4 flex justify-between items-center text-[10px] text-muted-fg border-t border-border pt-2">
        <span>© 2026 Launch UI</span>
        <Button size="sm" variant="ghost" className="h-6 text-[10px]">
          Privacy
        </Button>
      </FooterBottom>
    </Footer>
  );
}
