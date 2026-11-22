import meta, { Connected } from "./vpn-widget.stories";
import { AnimataStory } from "@/showcase/_shared/animata/story";

export default function Preview() {
  return <AnimataStory meta={meta} story={Connected} />;
}
