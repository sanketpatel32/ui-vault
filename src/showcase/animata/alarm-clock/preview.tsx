import meta, { WeekdayRoutine } from "./alarm-clock.stories";
import { AnimataStory } from "@/showcase/_shared/animata/story";

export default function Preview() {
  return <AnimataStory meta={meta} story={WeekdayRoutine} />;
}
