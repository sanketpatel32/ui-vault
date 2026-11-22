import meta, { Primary } from "./case-study-card.stories";
import { AnimataStory } from "@/showcase/_shared/animata/story";

export default function Preview() {
  return <AnimataStory meta={meta} story={Primary} />;
}
