import { useState } from "react";
import {
  Choicebox,
  ChoiceboxIndicator,
  ChoiceboxItem,
  ChoiceboxItemDescription,
  ChoiceboxItemHeader,
  ChoiceboxItemSubtitle,
  ChoiceboxItemTitle,
} from "./index";

const plans = [
  {
    id: "hobby",
    title: "Hobby",
    subtitle: "Free forever",
    description: "For personal projects. 1 workspace, community support.",
  },
  {
    id: "pro",
    title: "Pro",
    subtitle: "$12 / month",
    description: "Unlimited workspaces, previews, and email support.",
  },
  {
    id: "team",
    title: "Team",
    subtitle: "$49 / month",
    description: "Shared libraries, SSO, and priority support for 10 seats.",
  },
];

export default function Preview() {
  const [value, setValue] = useState("pro");

  return (
    <div className="w-full">
      <div className="flex min-h-48 flex-col items-center justify-center gap-4 p-6">
        <div className="w-full max-w-sm">
          <Choicebox onValueChange={setValue} value={value}>
            {plans.map((plan) => (
              <ChoiceboxItem id={plan.id} key={plan.id} value={plan.id}>
                <ChoiceboxItemHeader>
                  <ChoiceboxIndicator id={plan.id} />
                  <div className="flex flex-col gap-0.5">
                    <ChoiceboxItemTitle>{plan.title}</ChoiceboxItemTitle>
                    <ChoiceboxItemSubtitle>{plan.subtitle}</ChoiceboxItemSubtitle>
                  </div>
                </ChoiceboxItemHeader>
                <ChoiceboxItemDescription>{plan.description}</ChoiceboxItemDescription>
              </ChoiceboxItem>
            ))}
          </Choicebox>
        </div>
        <p className="text-muted-fg text-xs">
          Selected plan: <span className="font-medium text-fg">{value}</span>
        </p>
      </div>
    </div>
  );
}
