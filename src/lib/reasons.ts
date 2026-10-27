/**
 * The release key points for Aloha Social.
 * Source of truth: validated against AlohaSocial/social documentation (27 October 2026).
 */

export const PITCH =
  "Aloha Social is an open-source social network built around digital well-being. It brings text, photos, video and Shorts together in a carefully designed app, connects to the open social web, and keeps federation complexity out of the way.";

export const BOILERPLATE = {
  intro: "Aloha Social is a fully open-source social network you run on your own server.",
  bullets: [
    "Every user gets a Fediverse identity that can reach Mastodon, Pixelfed, PeerTube, GoToSocial and Akkoma. Optional native AT Protocol hosting connects a server to Bluesky when its administrator enables and configures it.",
    "It brings posts, photos, Shorts and video channels together in one carefully designed app, on infrastructure the organisation controls.",
    "Native apps are available for Android and Apple platforms, alongside the web app.",
    "The software includes no advertising or third-party tracking code, and engagement counts are hidden by default.",
    "The personalised For You feed explains recommendations and gives readers controls over feedback and consented learning.",
    "Posts stay on servers the organisation runs, next to its files, calendar and chat.",
    "Aloha is fully open source and designed with care.",
  ],
} as const;

export type Reason = {
  number: number;
  title: string;
  body?: string;
  bullets?: readonly string[];
};

export type ReasonGroup = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  reasons: readonly Reason[];
};

export const REASON_GROUPS: readonly ReasonGroup[] = [
  {
    id: "big-picture",
    index: "01",
    title: "The big picture",
    blurb: "What Aloha Social is, where it runs and who it belongs to.",
    reasons: [
      {
        number: 1,
        title: "Your server becomes a social network.",
        bullets: [
          "It runs next to your files, calendar and chat — not as another service to run.",
          "Every user gets a social identity, @you@your.cloud, with no new account and no new password.",
          "It uses the login people already have, including SSO and two-factor authentication.",
        ],
      },
      {
        number: 2,
        title: "One account, the whole open social web.",
        bullets: [
          "Aloha Social speaks ActivityPub and exchanges supported content with Mastodon, Pixelfed, PeerTube, GoToSocial, Akkoma and other compatible servers.",
          "People on those servers can discover and follow Aloha accounts; the exact actions available depend on both servers and the content type.",
        ],
      },
      {
        number: 3,
        title: "Optional native Bluesky and AT Protocol hosting.",
        bullets: [
          "When an administrator enables and configures it, local accounts can have a native AT Protocol identity and repository alongside their ActivityPub identity.",
          "Supported public posts can be written to both protocols as separate operations, with distinct identity, records, delivery and indexing.",
          "Supported Bluesky clients can sign in through the configured PDS; remote profiles, feeds and interactions use supported local and proxied services.",
          "Account moves are available for supported AT Protocol flows, but are protocol-specific operations rather than automatic conversion of every Fediverse account.",
          "PLC, relay, AppView and Chat services remain external dependencies; a successful local write does not prove public indexing.",
        ],
      },
      {
        number: 4,
        title: "Native apps for Android and Apple platforms.",
        bullets: [
          "Aloha for Android runs on phones, tablets and foldables.",
          "The Apple app supports iPhone, iPad, Mac, Vision Pro, Watch and Apple TV, with platform-specific capabilities.",
          "The web app works in modern mobile and desktop browsers and ships with the server app.",
        ],
      },
      {
        number: 5,
        title: "Fully open source.",
        bullets: [
          "The Aloha Social server app is free software under AGPL-3.0-or-later; the native Android and Apple clients use MIT licences.",
          "Anyone can run it, inspect it, adapt it and contribute to it.",
          "There is no closed core, no proprietary cloud service and no vendor lock-in.",
        ],
      },
      {
        number: 6,
        title: "User experience and design come first.",
        bullets: [
          "Optional sound and haptic feedback.",
          "A friendly, minimalistic design that feels good to use.",
          "Complexity around federation is hidden as well as possible.",
          "A fun and friendly experience, unlike other social networks.",
          "A real phone layout, and a dark mode that is the same design — not an afterthought.",
          "The app asks for alt text before posting an undescribed picture, and shows an ALT badge on every described picture.",
          "Full keyboard navigation, and respect for the system’s reduced-motion setting.",
        ],
      },
    ],
  },
  {
    id: "every-kind-of-post",
    index: "02",
    title: "One app for every kind of post",
    blurb: "Text, photos, Shorts and video channels, in one account and one profile.",
    reasons: [
      {
        number: 7,
        title: "Text, photos, Shorts and video channels in one place.",
        body: "What usually takes Mastodon, Instagram, TikTok and YouTube together — with one account and one profile.",
      },
      {
        number: 8,
        title: "Shorts, with a studio in the browser.",
        bullets: [
          "A full-screen vertical video feed.",
          "Record with a countdown or upload a video, then trim it, pick the cover frame, add stickers and post with one-tap trending hashtags.",
        ],
      },
      {
        number: 9,
        title: "24-hour Shorts that travel.",
        bullets: [
          "Shorts can disappear after a day, are seen only by followers and show who has seen them.",
          "They appear in Pixelfed’s stories bar, too.",
        ],
      },
      {
        number: 10,
        title: "Video channels that work with PeerTube in both directions.",
        bullets: [
          "Videos posted on Aloha are published as real PeerTube channel videos.",
          "PeerTube videos play inline with chapters and “continue watching”.",
          "Every channel has an RSS feed for podcast apps.",
        ],
      },
      {
        number: 11,
        title: "Made for photographers.",
        bullets: [
          "Albums (collections) and photo grids.",
          "Tagging people in photos.",
          "Focal points that crop correctly on other servers.",
          "A public portfolio page to put on a CV.",
          "Seven photo adjustments before posting.",
        ],
      },
      {
        number: 12,
        title: "One composer for everything.",
        bullets: [
          "Polls, content warnings, scheduled posts and the post’s language.",
          "Quotes, with the original author’s permission.",
          "Custom emoji, and short text posts drawn as colour cards.",
          "Files of any common kind ride along: PDF, office documents, EPUB and ZIP.",
          "Videos of up to 2 GB.",
          "iPhone HEIC photos and .mov videos are converted automatically.",
        ],
      },
    ],
  },
  {
    id: "calm-social-media",
    index: "03",
    title: "Calm, healthy social media",
    blurb: "Less pressure, less noise, fewer bells — and a feed that explains itself.",
    reasons: [
      {
        number: 13,
        title: "No scoreboard.",
        body: "Like, boost and follower counts are hidden by default: less pressure and less comparison.",
      },
      {
        number: 14,
        title: "Calm notifications.",
        bullets: [
          "On new accounts by default: strangers, brand-new accounts and unsolicited private messages wait quietly in a review queue and never ring the bell.",
          "Digests and quiet hours collect notifications and deliver them at the times each person chooses.",
        ],
      },
      {
        number: 15,
        title: "A “For you” feed that explains itself.",
        bullets: [
          "It combines eligible local and remote candidates, followed accounts, content signals, freshness and feedback; consented behavioral learning is a separate control.",
          "Recommendations explain why they appear, and post menus offer reversible feedback such as seeing less of a similar post.",
          "Readers can manage learning consent, pause or reset learned data, and export supported recommendation data.",
          "Recommendation data is account-scoped and is not federated; availability depends on administrator settings and server synchronization.",
        ],
      },
      {
        number: 16,
        title: "Your choice on AI content.",
        body: "One switch hides every post that says it was made with AI.",
      },
    ],
  },
  {
    id: "privacy-by-default",
    index: "04",
    title: "Privacy by default",
    blurb: "No advertising code, privacy-minded defaults, and your data on servers you choose.",
    reasons: [
      {
        number: 17,
        title: "Photos lose their hidden data.",
        bullets: [
          "The location and camera data (Exif and GPS) a phone attaches are removed before a photo is stored or sent.",
          "The image itself is not re-encoded, so it keeps its quality.",
        ],
      },
      {
        number: 18,
        title: "No third parties.",
        bullets: [
          "No map service: places on posts are named by people, not looked up by a geolocation service.",
          "No GIF service: the 881 built-in animated emoji are served from your own server.",
          "The app includes no advertising or third-party analytics code; configured integrations and federation still communicate with their remote services.",
        ],
      },
      {
        number: 19,
        title: "Your data, on your servers.",
        bullets: [
          "Posts, statistics and interests stay on infrastructure the organisation controls.",
          "Reports about users on other servers are forwarded anonymously.",
        ],
      },
    ],
  },
  {
    id: "moving",
    index: "05",
    title: "Moving in, and moving on",
    blurb: "Bring your history with you — and leave whenever you want.",
    reasons: [
      {
        number: 20,
        title: "Bring your history with you.",
        bullets: [
          "Aloha can import supported posts and media from account archives and supported ActivityPub sources; the migration guide lists each source and its limits.",
          "Imported posts don’t flood followers’ timelines.",
          "Follows can be imported from Mastodon, Pixelfed, GoToSocial and Akkoma.",
          "PeerTube channels can be imported too.",
        ],
      },
      {
        number: 21,
        title: "Free to leave.",
        bullets: [
          "A full export with every picture and video, in Mastodon’s archive layout.",
          "Account moves are supported in both directions.",
        ],
      },
    ],
  },
  {
    id: "nextcloud",
    index: "06",
    title: "Built into your workspace",
    blurb: "Files, chat, calendar, search and notifications — already there.",
    reasons: [
      {
        number: 22,
        title: "Share straight from Files.",
        bullets: [
          "Pick photos or videos in Files and post them, with no second upload.",
          "Replies to a photo appear in the file’s comments.",
        ],
      },
      {
        number: 23,
        title: "Part of the whole workspace.",
        bullets: [
          "Links to posts unfurl in Talk, Text and Deck.",
          "Posts appear in Aloha’s unified search.",
          "Notifications use the in-app bell and its mail digest.",
          "Translations use the organisation’s own translation provider.",
        ],
      },
    ],
  },
  {
    id: "organisations",
    index: "07",
    title: "Made for organisations",
    blurb: "Team accounts, outside sign-ups, serious moderation and room to grow.",
    reasons: [
      {
        number: 24,
        title: "Team accounts and group lists.",
        bullets: [
          "An Aloha group can post as one account, and who wrote each post stays internal.",
          "Groups automatically become lists to read.",
        ],
      },
      {
        number: 25,
        title: "Social-only accounts for outsiders.",
        bullets: [
          "The public, members or customers can sign up for the social app alone.",
          "They get no access to files, chat or anything else.",
          "Signup can be open, need approval, or work by invitation.",
        ],
      },
      {
        number: 26,
        title: "Serious moderation.",
        bullets: [
          "Silence, suspend and take down posts, all recorded in Aloha’s audit log.",
          "A review queue for spam and for an account’s first post.",
          "Domain blocks that also clean up what a blocked server already sent.",
          "A dashboard of how well delivery to other servers is working.",
        ],
      },
      {
        number: 27,
        title: "Built to scale.",
        bullets: [
          "Nightly benchmarks measure common timeline and search queries on synthetic 100,000-post datasets across MySQL and PostgreSQL.",
          "The published measurements report test conditions and limits; they are not a promise of production latency.",
          "Several delivery workers can run in parallel.",
          "A video quota can be set per account.",
        ],
      },
    ],
  },
  {
    id: "audience",
    index: "08",
    title: "Finding people and growing an audience",
    blurb: "Discovery from day one, private statistics for creators.",
    reasons: [
      {
        number: 28,
        title: "Find people from day one.",
        bullets: [
          "Search across several fediverse directories at once.",
          "Colleagues are suggested from the workspace you share.",
          "Starter packs follow a whole group in one click.",
          "Trending hashtags, plus what other servers are talking about.",
          "Relays fill a new server’s timeline.",
        ],
      },
      {
        number: 29,
        title: "Private statistics for creators.",
        bullets: [
          "Reach and engagement for the last 30 days compared with the 30 before.",
          "Read counts on each of your own posts.",
          "The best hours to post and the hashtags worth using.",
          "Export to CSV or JSON.",
          "Nobody else sees these numbers.",
        ],
      },
      {
        number: 30,
        title: "Works with the apps people already use.",
        bullets: [
          "Mastodon and Pixelfed clients can use the supported Mastodon-compatible API paths; this is broad compatibility, not complete API parity.",
          "When native AT Protocol hosting is enabled, supported Bluesky clients can use its PDS and configured services.",
          "Root API and OAuth rewrites, server configuration and remote service availability affect what works in practice.",
        ],
      },
    ],
  },
];

export const REASON_COUNT = REASON_GROUPS.reduce(
  (total, group) => total + group.reasons.length,
  0,
);

export function findReasonGroup(id: string) {
  return REASON_GROUPS.find((group) => group.id === id);
}

export type ProofPoint = { fact: string; value: string };

export const PROOF_POINTS: readonly ProofPoint[] = [
  {
    fact: "Compatible networks today",
    value: "ActivityPub integrations plus optional native AT Protocol hosting",
  },
  { fact: "Native apps", value: "Android and Apple platforms; web app for modern browsers" },
  { fact: "Live interoperability", value: "Verify with the specific remote service; CI tests are not proof of public availability or indexing" },
  {
    fact: "Built-in animated emoji (no Giphy or Tenor)",
    value: "881, Google Noto, CC BY 4.0",
  },
  { fact: "Maximum video size", value: "2 GB" },
  { fact: "Performance evidence", value: "Nightly synthetic query benchmarks; see conditions and limits" },
  { fact: "Validation", value: "Unit, integration, browser and protocol interoperability suites" },
  { fact: "Licenses", value: "Server app: AGPL-3.0-or-later; native clients: MIT" },
  { fact: "Requirements", value: "Aloha 34 to 36, PHP 8.3 to 8.5" },
  { fact: "Source code", value: "github.com/alohasocial/social" },
];

export type HeadlineFigure = { value: string; label: string };

/** Compact proof numbers for the landing page. */
export const HEADLINE_FIGURES: readonly HeadlineFigure[] = [
  { value: "100k", label: "posts in the published synthetic performance benchmark" },
  { value: "881", label: "animated emoji built in — no Giphy, no Tenor" },
  { value: "2 GB", label: "maximum video size per post" },
  { value: "0", label: "ads or paid placements" },
];
