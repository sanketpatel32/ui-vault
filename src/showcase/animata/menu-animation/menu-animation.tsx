// Vendored from https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/list/menu-animation.tsx (MIT, codse/animata) on 2026-11-22 — only "@/" import aliases rewritten.
import { ArrowRight } from "lucide-react";

interface MenuAnimationProps {
  menuItems: string[];
}

export default function MenuAnimation({ menuItems }: MenuAnimationProps) {
  return (
    <div className="flex min-w-fit flex-col gap-2 overflow-hidden px-10">
      {menuItems.map((item, index) => (
        <div key={index} className="group/menu flex items-center gap-2">
          <ArrowRight className="size-5 -translate-x-full text-black opacity-0 transition-all duration-300 ease-out hover:z-20 group-hover/menu:translate-x-0 group-hover/menu:text-blue-500 group-hover/menu:opacity-100 md:size-10" />

          <h1 className="z-10 -translate-x-6 cursor-pointer font-mono font-semibold text-black transition-transform duration-300 ease-out group-hover/menu:translate-x-0 group-hover/menu:text-blue-500 dark:text-white md:-translate-x-12 md:text-4xl md:group-hover/menu:translate-x-0">
            {item}
          </h1>
        </div>
      ))}
    </div>
  );
}
