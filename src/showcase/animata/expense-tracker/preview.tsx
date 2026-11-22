import meta, { Primary } from "./expense-tracker.stories";
import { AnimataStory } from "@/showcase/_shared/animata/story";

export default function Preview() {
  return <AnimataStory meta={meta} story={Primary} />;
}
