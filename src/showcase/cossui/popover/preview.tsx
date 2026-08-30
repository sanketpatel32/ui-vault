import { useState } from "react";
import { CalendarDays, MailCheck } from "lucide-react";
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "./popover";

const inputClass =
  "h-9 w-full rounded-lg border border-border bg-panel px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-accent/40";

export default function Preview() {
  const [email, setEmail] = useState("");
  const [sentTo, setSentTo] = useState<string | null>(null);

  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <Popover>
          <PopoverTrigger className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-border bg-panel px-4 text-sm font-medium transition-colors hover:bg-accent-soft">
            <MailCheck className="size-4" />
            Share project
          </PopoverTrigger>
          <PopoverPopup align="start" className="w-80">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <PopoverTitle className="text-base">Invite a teammate</PopoverTitle>
                <PopoverDescription>
                  They get read access to this project’s registry.
                </PopoverDescription>
              </div>
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSentTo(email);
                }}
              >
                <input
                  className={inputClass}
                  type="email"
                  required
                  placeholder="teammate@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-fg">
                    <CalendarDays className="size-3.5" />
                    Expires in 30 days
                  </span>
                  <div className="flex items-center gap-2">
                    <PopoverClose className="cursor-pointer text-xs text-muted-fg underline-offset-2 hover:underline">
                      Cancel
                    </PopoverClose>
                    <button
                      type="submit"
                      className="inline-flex h-8 cursor-pointer items-center rounded-lg bg-fg px-3 text-xs font-medium text-bg transition-opacity hover:opacity-85"
                    >
                      Send invite
                    </button>
                  </div>
                </div>
              </form>
              {sentTo && (
                <p className="rounded-lg bg-accent-soft px-3 py-2 text-xs text-fg">
                  Invite sent to <strong>{sentTo}</strong>.
                </p>
              )}
            </div>
          </PopoverPopup>
        </Popover>
      </div>
    </div>
  );
}
