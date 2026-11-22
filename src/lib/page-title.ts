import type { SourceId } from "@/data";
import { categoryBySlug, entryById, sourceById } from "@/lib/registry";

const APP_NAME = "UI Vault";

function segment(pathname: string, prefix: string): string | null {
  if (!pathname.startsWith(prefix)) return null;
  const rest = pathname.slice(prefix.length).replace(/\/+$/, "");
  if (!rest || rest.includes("/")) return null;
  try {
    return decodeURIComponent(rest);
  } catch {
    return rest;
  }
}

/** Human-readable page name for a router pathname (basename already stripped). */
export function pageName(pathname: string): string {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return "Home";
  if (path === "/browse") return "Browse";
  if (path === "/favorites") return "Favorites";

  const entryId = segment(path, "/component/");
  if (entryId !== null) return entryById.get(entryId)?.name ?? "Unknown component";

  const slug = segment(path, "/c/");
  if (slug !== null) return categoryBySlug.get(slug)?.name ?? "Unknown category";

  const sourceId = segment(path, "/source/");
  if (sourceId !== null) return sourceById.get(sourceId as SourceId)?.name ?? "Unknown source";

  return "Page not found";
}

export function pageTitle(pathname: string): string {
  const name = pageName(pathname);
  return name === "Home" ? APP_NAME : `${name} · ${APP_NAME}`;
}
