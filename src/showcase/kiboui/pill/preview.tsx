import { CheckCircleIcon, UsersIcon, XIcon } from "lucide-react";
import {
  Pill,
  PillAvatar,
  PillAvatarGroup,
  PillButton,
  PillDelta,
  PillIcon,
  PillIndicator,
  PillStatus,
} from "./index";

// Demo from the official kibo-ui docs example
// (https://www.kibo-ui.com/components/pill).

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-wrap items-center justify-center gap-2 p-6">
        <Pill>
          <PillAvatar fallback="HB" />
          @haydenbleasel
        </Pill>
        <Pill>
          <PillStatus>
            <CheckCircleIcon className="text-emerald-500" size={12} />
            Passed
          </PillStatus>
          Approval Status
        </Pill>
        <Pill>
          #kibo-ui
          <PillButton size="icon" variant="ghost">
            <XIcon size={12} />
          </PillButton>
        </Pill>
        <Pill>
          <PillIndicator pulse variant="success" />
          Active
        </Pill>
        <Pill>
          <PillIndicator variant="error" />
          Error
        </Pill>
        <Pill>
          <PillDelta delta={10} />
          Up 10%
        </Pill>
        <Pill>
          <PillDelta delta={-5} />
          Down 5%
        </Pill>
        <Pill>
          <PillDelta delta={0} />
          No change
        </Pill>
        <Pill>
          <PillIcon icon={UsersIcon} />
          17 users
        </Pill>
        <Pill>
          <PillAvatarGroup>
            <PillAvatar fallback="HB" />
            <PillAvatar fallback="SC" />
            <PillAvatar fallback="LR" />
          </PillAvatarGroup>
          Loved by millions
        </Pill>
      </div>
    </div>
  );
}
