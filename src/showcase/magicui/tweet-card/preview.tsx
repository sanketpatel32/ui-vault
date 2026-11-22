import type { Tweet } from "react-tweet/api";
import { MagicTweet } from "./tweet-card";

// The upstream demo renders the server-only <TweetCard id="…" />, which fetches from the
// Twitter syndication API. This SPA has no server, so the preview feeds the client-side
// <MagicTweet> a static tweet payload instead.
const text =
  "Introducing Magic UI — 150+ free and open-source animated components and effects built with React, TypeScript, Tailwind CSS, and Motion.";

const tweet: Tweet = {
  __typename: "Tweet",
  lang: "en",
  created_at: "2024-01-15T17:00:00.000Z",
  display_text_range: [0, text.length],
  entities: { hashtags: [], urls: [], user_mentions: [], symbols: [] },
  id_str: "1745185800000000000",
  text,
  user: {
    id_str: "16860528",
    name: "Dillion Verma",
    profile_image_url_https: "https://avatars.githubusercontent.com/u/16860528",
    profile_image_shape: "Circle",
    screen_name: "dillionverma",
    verified: false,
    is_blue_verified: true,
  },
  edit_control: {
    edit_tweet_ids: ["1745185800000000000"],
    editable_until_msecs: "0",
    is_edit_eligible: false,
    edits_remaining: "0",
  },
  isEdited: false,
  isStaleEdit: false,
  favorite_count: 1200,
  conversation_count: 48,
  news_action_type: "conversation",
};

export default function Preview() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <MagicTweet tweet={tweet} />
    </div>
  );
}
