import { BellRing, Check, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

const perks = [
  "Every free-tier component vendored",
  "Live previews with reduced-motion support",
  "Local favorites — no account needed",
];

const buttonClass =
  "inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-panel px-4 text-sm font-medium transition-colors hover:bg-accent-soft";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Pro workspace</CardTitle>
              <CardDescription>For maintainers shipping many projects.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="flex items-baseline gap-1.5">
                <span className="text-3xl font-semibold">$0</span>
                <span className="text-sm text-muted-fg">/ month</span>
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-sm text-fg">
                    <Check className="size-4 text-emerald-600" />
                    {perk}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <button
                type="button"
                className="inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-lg bg-fg px-4 text-sm font-medium text-bg transition-opacity hover:opacity-85"
              >
                Get started
              </button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BellRing className="size-4 text-muted-fg" />
                New login
              </CardTitle>
              <CardDescription>Today at 09:41</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                <Globe className="size-5 text-muted-fg" />
                <div>
                  <p className="text-sm font-medium">Chrome on macOS</p>
                  <p className="text-xs text-muted-fg">Lisbon, PT · 84.12.9.207</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <button type="button" className={`${buttonClass} flex-1`}>
                Dismiss
              </button>
              <button
                type="button"
                className="inline-flex h-9 flex-1 cursor-pointer items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                Revoke
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
