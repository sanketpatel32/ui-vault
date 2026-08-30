import { useIsMobile, useMediaQuery } from "./use-media-query";

export default function Preview() {
  const isDesktop = useMediaQuery("lg");
  const isMobile = useIsMobile();
  const coarsePointer = useMediaQuery({ pointer: "coarse" });

  const rows = [
    { label: 'useMediaQuery("lg")', value: isDesktop },
    { label: "useIsMobile() — max-md", value: isMobile },
    { label: 'useMediaQuery({ pointer: "coarse" })', value: coarsePointer },
  ];

  return (
    <div className="flex flex-col gap-3 p-6">
      <p className="text-xs text-muted-fg">Resize the window — each row re-renders live:</p>
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between gap-4 rounded-lg border border-border bg-panel px-4 py-3"
        >
          <code className="text-xs">{row.label}</code>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              row.value ? "bg-emerald-500/15 text-emerald-400" : "bg-zinc-500/15 text-zinc-400"
            }`}
          >
            {String(row.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
