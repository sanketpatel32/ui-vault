import meta, { TokyoMorning } from "./weather-card.stories";
import { AnimataStory } from "@/showcase/_shared/animata/story";

export default function Preview() {
  return <AnimataStory meta={meta} story={TokyoMorning} />;
}
