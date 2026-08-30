import { formatISO, subDays } from "date-fns";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
  type Activity,
} from "./index";

// Deterministic pseudo-random activity so the graph is stable across renders.
const generateActivities = (): Activity[] => {
  const activities: Activity[] = [];
  const today = new Date();

  for (let i = 20 * 7; i >= 0; i--) {
    const date = formatISO(subDays(today, i), { representation: "date" });
    const seed = (i * 7919 + 17) % 100;

    if (i !== 0 && seed < 35) {
      continue; // day off — filled in as level 0 by the graph itself
    }

    const count = i === 0 ? 6 : (seed % 12) + 1;
    const level = count > 9 ? 4 : count > 6 ? 3 : count > 3 ? 2 : 1;

    activities.push({ date, count, level });
  }

  return activities;
};

const activities = generateActivities();

export default function Preview() {
  return (
    <div className="w-full">
      <div className="flex min-h-48 items-center justify-center p-6">
        <div className="flex w-full max-w-md flex-col gap-3 rounded-lg border border-border bg-panel p-4">
          <ContributionGraph blockSize={11} data={activities}>
            <ContributionGraphCalendar hideMonthLabels>
              {({ activity, dayIndex, weekIndex }) => (
                <ContributionGraphBlock
                  activity={activity}
                  dayIndex={dayIndex}
                  key={`${weekIndex}-${dayIndex}`}
                  weekIndex={weekIndex}
                />
              )}
            </ContributionGraphCalendar>
            <ContributionGraphFooter>
              <ContributionGraphTotalCount />
              <ContributionGraphLegend />
            </ContributionGraphFooter>
          </ContributionGraph>
          <p className="text-muted-fg text-xs">
            21 weeks of generated activity — drag horizontally if it overflows.
          </p>
        </div>
      </div>
    </div>
  );
}
