import { Navbar, NavbarLeft, NavbarRight } from "./navbar";
import { Button } from "./button";

export default function Preview() {
  return (
    <Navbar className="w-full max-w-lg rounded-xl border border-border bg-panel/90 p-3 shadow-xs">
      <NavbarLeft>
        <span className="font-bold text-xs tracking-wider text-fg">LAUNCHUI</span>
      </NavbarLeft>
      <NavbarRight>
        <Button size="sm">Sign In</Button>
      </NavbarRight>
    </Navbar>
  );
}
