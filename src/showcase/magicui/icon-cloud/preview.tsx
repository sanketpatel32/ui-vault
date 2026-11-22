import { IconCloud } from "./icon-cloud";
import { Bell, Heart, Home, Search, Settings, Star, User, Zap } from "lucide-react";

const icons = [
  <Bell key="b" size={32} />,
  <Heart key="h" size={32} />,
  <Home key="m" size={32} />,
  <Search key="s" size={32} />,
  <Settings key="g" size={32} />,
  <Star key="t" size={32} />,
  <User key="u" size={32} />,
  <Zap key="z" size={32} />,
];

export default function Preview() {
  return (
    <div className="flex items-center justify-center p-4 text-fg">
      <IconCloud icons={icons} />
    </div>
  );
}
