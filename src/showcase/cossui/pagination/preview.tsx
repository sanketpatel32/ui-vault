import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

const TOTAL_PAGES = 12;

function pageWindow(page: number): (number | "ellipsis")[] {
  if (page <= 3) return [1, 2, 3, 4, "ellipsis", TOTAL_PAGES];
  if (page >= TOTAL_PAGES - 2) {
    return [1, "ellipsis", TOTAL_PAGES - 3, TOTAL_PAGES - 2, TOTAL_PAGES - 1, TOTAL_PAGES];
  }
  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", TOTAL_PAGES];
}

export default function Preview() {
  const [page, setPage] = useState(4);

  const goTo = (next: number) => {
    setPage(Math.min(TOTAL_PAGES, Math.max(1, next)));
  };

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goTo(page - 1);
                }}
                aria-disabled={page === 1}
                className={page === 1 ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
            {pageWindow(page).map((entry, index) =>
              entry === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={entry}>
                  <PaginationLink
                    href="#"
                    isActive={entry === page}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(entry);
                    }}
                  >
                    {entry}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goTo(page + 1);
                }}
                aria-disabled={page === TOTAL_PAGES}
                className={page === TOTAL_PAGES ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <p className="text-xs text-muted-fg">
          Page {page} of {TOTAL_PAGES} — edges disable themselves.
        </p>
      </div>
    </div>
  );
}
