import { Button } from "@/showcase/_shared/cossui/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/showcase/_shared/cossui/menu";

export default function Particle() {
  return (
    <Menu>
      <MenuTrigger openOnHover render={<Button variant="outline" />}>
        Hover me
      </MenuTrigger>
      <MenuPopup>
        <MenuItem>Item one</MenuItem>
        <MenuItem>Item two</MenuItem>
      </MenuPopup>
    </Menu>
  );
}
