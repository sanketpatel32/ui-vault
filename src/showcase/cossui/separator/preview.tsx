import { AtSign, Mail } from "lucide-react";
import { Separator } from "./separator";

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="flex w-full max-w-md flex-col gap-4">
          <div>
            <h3 className="text-sm font-semibold text-fg">Account</h3>
            <p className="mt-1 text-xs text-muted-fg">Profile, security and connected services.</p>
            <Separator className="mt-3" />
          </div>

          <div className="flex items-center gap-3">
            <Mail className="size-4 text-muted-fg" />
            <span className="text-sm text-fg">owner@uivault.local</span>
            <Separator orientation="vertical" />
            <AtSign className="size-4 text-muted-fg" />
            <span className="text-sm text-fg">@owner</span>
          </div>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs font-medium tracking-wide text-muted-fg uppercase">
              or continue with
            </span>
            <Separator className="flex-1" />
          </div>

          <p className="text-center text-xs text-muted-fg">
            Horizontal, vertical and labelled separators.
          </p>
        </div>
      </div>
    </div>
  );
}
