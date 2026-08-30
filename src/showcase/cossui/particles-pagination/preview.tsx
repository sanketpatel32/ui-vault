import { useEffect, useState } from "react";
import Component from "./p-pagination-2";

const TOTAL_PAGES = 8;

function pageFromHash(): number {
  const match = window.location.hash.match(/^#\/page\/(\d+)$/);
  if (!match) {
    return 1;
  }
  return Math.min(TOTAL_PAGES, Math.max(1, Number(match[1])));
}

export default function Preview() {
  const [page, setPage] = useState(pageFromHash);

  useEffect(() => {
    const handleHashChange = () => setPage(pageFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <p className="text-sm font-medium">
          Page {page} of {TOTAL_PAGES}
        </p>
        <div className="w-full max-w-sm">
          <Component currentPage={page} totalPages={TOTAL_PAGES} />
        </div>
        <p className="text-xs text-muted-fg">
          Click Previous / Next — the buttons navigate via the URL hash and this counter follows
          along.
        </p>
      </div>
    </div>
  );
}
