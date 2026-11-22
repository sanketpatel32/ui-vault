import meta, { Primary } from "./product-features.stories";
import { AnimataStory } from "@/showcase/_shared/animata/story";

export default function Preview() {
  return <AnimataStory meta={meta} story={Primary} />;
}
