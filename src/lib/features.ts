export type FeatureSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type Feature = {
  slug: string;
  nav: string;
  index: string;
  title: string;
  lede: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  facts?: { value: string; label: string }[];
  sections: FeatureSection[];
  quote?: string;
  docs?: { href: string; label: string }[];
};

export const FEATURES: Feature[] = [
  {
    slug: "write",
    nav: "Write",
    index: "01",
    title: "Compose posts with clear audience and media controls.",
    lede: "Choose public, unlisted, followers-only or direct visibility for each post. Replies inherit the original post's audience, so check who will receive a message before sending it.",
    image: "/img/readme/composer.jpg",
    alt: "The Aloha Social composer with the audience picker, attachment toolbar and scheduling",
    width: 1360,
    height: 900,
    facts: [
      { value: "2 GB", label: "video ceiling, streamed in chunks" },
      { value: "881", label: "animated emoji, no tracker" },
      { value: "4", label: "supported post audiences" },
    ],
    sections: [
      {
        heading: "Say who sees it",
        body: "Choose public, unlisted, followers-only or direct visibility for each post. A reply keeps the original post's audience and is addressed to the conversation. Posts also carry a language label.",
      },
      {
        heading: "Pictures, video and audio",
        body: "JPEG, PNG, GIF, WebP, AVIF and HEIC/HEIF images, plus common video and audio formats, are supported subject to Nextcloud and server limits. Videos are uploaded in chunks with an app-level ceiling of 2 GB; actual limits can be lower.",
        bullets: [
          "Where ffmpeg is installed, supported .mov or HEVC videos can be converted to H.264 MP4. Conversion is optional and availability depends on server configuration.",
          "An H.264 MP4 is never re-encoded, so nothing is lost twice.",
          "PDF, text, Markdown, CSV, ZIP, EPUB, ODF and Office files ride on a post too, drawn as a card you press to download.",
          "Videos posted to a channel are published as real PeerTube channel videos, so the same video reaches both audiences.",
        ],
      },
      {
        heading: "Image privacy and accessibility",
        body: "Images are stripped of Exif, XMP, IPTC and GPS metadata before storage or delivery. Image adjustments include crop and colour controls. The composer prompts for alt text when a picture has none; it does not block the post if you continue without it.",
        bullets: [
          "A post carrying an undescribed picture says so before it goes. A nudge, never a refusal.",
          "Click or drag a crosshair to say where the subject is, so a square crop never cuts somebody's head off. It federates, so other servers crop it correctly too.",
          "Blurhash placeholders keep a timeline from jumping as pictures load.",
        ],
      },
      {
        heading: "Polls, warnings and quotes",
        body: "Create polls with up to four options and add a content warning. Quote posts carry the original author’s permission; remote quote support varies between services. Custom emoji appear remotely where the receiving service supports their ActivityPub markup.",
        bullets: [
          "The picker includes 881 Noto animated emoji served by the host installation; it does not load them from Giphy or Tenor.",
          "Anything up to 120 characters can go out drawn big on colour as a card, with the words still searchable in the post.",
          "/dice, /flip and /pick are played when the post goes out and posted as plain text, so a Mastodon reader sees the same result.",
        ],
      },
      {
        heading: "Send it later",
        body: "Pick a time at least five minutes out and Post becomes Schedule. The waiting posts are listed in Settings, each with a way to cancel one.",
      },
    ],
    docs: [
      { href: "/docs/feature-write", label: "Everything the composer carries" },
      { href: "/docs/user-writing-a-post", label: "Writing a post, step by step" },
      { href: "/docs/start", label: "Getting started" },
    ],
  },
  {
    slug: "read",
    nav: "Read",
    index: "02",
    title: "Choose between followed, local and federated timelines.",
    lede: "Switch between posts from accounts you follow, posts from your server and posts it has discovered from other servers. Photos and videos have their own views.",
    image: "/img/readme/dark.jpg",
    alt: "The Aloha Social timeline in dark mode",
    width: 1360,
    height: 900,
    facts: [
      { value: "0", label: "scores shown by default" },
      { value: "j k l f b", label: "keyboard, and ? for the list" },
      { value: "30 s", label: "polling without notify_push" },
    ],
    sections: [
      {
        heading: "For you, built from what you read",
        body: "The second feed in the switcher, made of the hashtags you actually read. It notices what you stay on, what you scroll past and what you like, boost, reply to, bookmark and open — then shows the last week's posts carrying them, the best matches first, no author allowed to fill it.",
        bullets: [
          "Every post says why it is there, and Less like this in its menu takes it out.",
          "Settings → For you draws the list as a cloud: drag, pin, remove and add tags, choose languages, pause or turn it off.",
          "It never leaves this server and nobody else sees it. Administrators can switch it off or make it opt-in.",
        ],
      },
      {
        heading: "Shorts and vertical video",
        body: "Shorts are brief vertical videos that can be shared as regular posts or set to expire after 24 hours. Their visibility and how they appear on remote services depend on the selected audience and compatibility of those services.",
        bullets: [
          "The full-screen feed lets viewers move through vertical video posts.",
          "Temporary Shorts are intended for followers and expire after a day.",
          "Remote story-style display depends on whether the receiving service supports it.",
        ],
      },
      {
        heading: "Photos, videos and remote media",
        body: "Browse image and video posts in dedicated views. PeerTube videos play in Aloha with chapters and “continue watching”, and every channel has an RSS feed for podcast apps.",
        bullets: [
          "Remote video chapters and playback progress are displayed where the remote server sends them.",
          "Photos and videos have their own views, with trending pictures and videos beside the trends.",
          "Video channels federate with PeerTube in both directions — published out, played back in.",
        ],
      },
      {
        heading: "Less of a scoreboard",
        body: "Like, boost and follower counts are hidden by default; you can choose to show them. The timeline has no engagement-ranked feed. A separate For you feed uses followed hashtags, explains why a post appears and can be paused or turned off. Its interest data stays on the server.",
      },
      {
        heading: "Control what reaches you",
        body: "Notification policies can hold selected activity for review instead of sending an alert. Digests and quiet hours help you choose when notifications arrive. Block, mute and word filters are available from profiles and posts.",
      },
      {
        heading: "Keyboard and reduced motion",
        body: "The web app supports keyboard navigation, and the site respects your device’s reduced-motion preference. Live updates depend on the host server’s push configuration; otherwise the client checks periodically.",
      },
    ],
    docs: [
      { href: "/docs/for-you", label: "How the For You feed is built" },
      { href: "/docs/user-reading", label: "Reading: feeds, media and threads" },
      { href: "/docs/user-keyboard-shortcuts", label: "Keyboard shortcuts" },
    ],
  },
  {
    slug: "converse",
    nav: "Converse",
    index: "03",
    title: "Read a thread and reply in context.",
    lede: "Open a post to read its replies in order, follow the conversation and respond to the right message. Notifications and moderation controls are available where you need them.",
    image: "/img/readme/thread.png",
    alt: "A post opened onto its own page with a threaded conversation beneath it",
    width: 1360,
    height: 900,
    sections: [
      {
        heading: "Threads that hold their shape",
        body: "Each reply is followed by the replies to it, oldest first, with a line down its side. A reply whose parent this server does not hold keeps its place in time rather than disappearing, and when the thread shown is shorter than the reply count the page says so.",
      },
      {
        heading: "Reply, react, edit or archive", 
        body: "Reply, boost, favourite and react with an emoji — which federates as EmojiReact and shows who reacted with what.",
        bullets: [
          "Archive a post: off your profile and out of every timeline, hashtag page and search on this server, with nothing sent to anybody and a way back from Settings.",
          "Edit it, or delete and write it again — the correction people actually make. What you post next is a new post, and the dialog says so before anything happens.",
          "The Edited line under a post opens every version of it.",
          "Bookmark posts you want to return to; saved items remain private to your account.",
        ],
      },
      {
        heading: "Translation, honestly labelled",
        body: "Where the Nextcloud has a translation provider configured, a post in another language can be translated in place. The interface identifies the provider so readers know they are seeing a machine translation.",
      },
      {
        heading: "Notifications that behave",
        body: "A page, not a list of everything: filters across the top, a New line where you left off, and a run of likes of the same post drawn as one card with the faces stacked.",
        bullets: [
          "It marks itself read after it has been in front of you for two seconds, not the instant it renders.",
          "Five questions decide who may reach you — each answered Allow or Hold for review, with digests and quiet hours beside them.",
          "Mute a conversation without leaving it; follow-request actions remain available from notifications.",
        ],
      },
    ],
    docs: [
      { href: "/docs/feature-converse", label: "Threads, edits and archives" },
      { href: "/docs/user-how-a-post-reads", label: "How a post reads" },
      { href: "/docs/user-what-a-post-used-to-say", label: "Edit history" },
    ],
  },
  {
    slug: "discover",
    nav: "Discover",
    index: "04",
    title: "Find accounts and topics across the network.",
    lede: "Search for people and hashtags using this server and any public directories its operator has enabled. Results identify which directories responded.",
    image: "/img/readme/discover.png",
    alt: "The Discover page with trending hashtags, starter packs and a cross-server search",
    width: 1360,
    height: 900,
    sections: [
      {
        heading: "Search other servers' directories",
        body: "Type a name, a handle or a subject. It uses the APIs those servers publish for strangers to read, holds no credentials for any of them, aggregates nothing and stores nobody. Directories that did not answer are named under the results, so a short list is never mistaken for an empty Fediverse.",
      },
      {
        heading: "People you already know",
        body: "Where profile fields are available, Aloha Social can use them to suggest people from the same organisation. The server operator controls the account and directory settings.",
      },
      {
        heading: "Starter packs and trends",
        bullets: [
          "Starter packs — a named handful of accounts with one button that follows all of them. Administrators curate their own.",
          "Trending hashtags ranked over a window you choose from one hour to ten days. The busiest hour and the busiest ten days are genuinely different lists.",
          "What other servers are talking about, and a box that finds a hashtag across them — ranked by how many servers named a tag, not by adding up counts from instances that differ in size by four orders of magnitude.",
          "Trending pictures and videos.",
        ],
        body: "A small server's own trending list is what the few people on it posted today, and a new one's is empty. This asks other servers the same question and says whose answer it is — “busy on mastodon.social and misskey.io” rather than a number from nowhere.",
      },
      {
        heading: "Explore, and search",
        body: "The sidebar links to followed hashtags, lists and local trends. Search covers people, hashtags and posts visible to your account. Availability of unified search results depends on the Nextcloud’s search integration.",
      },
    ],
    docs: [
      { href: "/docs/feature-discover", label: "Directories, starter packs and trends" },
      { href: "/docs/user-finding-and-following-people", label: "Finding and following people" },
      { href: "/docs/user-bluesky", label: "Bluesky, and what carries over" },
    ],
  },
  {
    slug: "profile",
    nav: "Profile",
    index: "05",
    title: "Profiles, collections and account tools.",
    lede: "Add a banner, bio and profile details; links can be verified when the page you name links back. Profiles also provide access to posts and account tools.",
    image: "/img/readme/profile.jpg",
    alt: "An Aloha Social profile with banner, bio, verified links and a grid of posts",
    width: 1360,
    height: 900,
    sections: [
      {
        heading: "Verified links",
        body: "A profile field naming a web page earns the tick when that page links back with rel=\"me\" — from an <a> anywhere on it or a <link> in its head. The editor says which of your fields are verified and when each was last proved, and hands you the line to paste on the far end.",
      },
      {
        heading: "Featured hashtags and highlights",
        body: "Up to ten tags pinned under the bio, saying what the account is about in its own words. The editor starts from the tags you already post with most rather than an empty box. Highlights is a twelve-week posting chart and the tags somebody keeps coming back to.",
      },
      {
        heading: "Collections and team accounts",
        bullets: [
          "Collections — Pixelfed's albums — as a tab of the profile: a shelf of the account's collections, each a page of its posts drawn as the profile grid.",
          "Team accounts can be connected to a Nextcloud group, so the group’s membership determines who can post from the shared identity.",
          "Who wrote each post is recorded and shown to the team and to moderators, and to nobody else.",
        ],
        body: "A team account is an actor like any other: followable from Mastodon and Pixelfed, moderatable, with its own followers.",
      },
      {
        heading: "Private account statistics",
        body: "Review activity for the last 30 days beside the previous 30 days, including estimated reach, interactions, likes and boosts. The report includes per-post details and can be exported as CSV or JSON; it is generated for the account owner.",
        bullets: [
          "See which post formats, days, times and hashtags performed best, along with follower activity.",
          "Figures are calculated from data available to this server; read the report’s notes about what it can measure.",
          "Export the report as CSV or JSON for your own records.",
        ],
      },
      {
        heading: "Archives and account moves",
        body: "Aloha Social documents importing posts and follows from supported services, and exporting an archive in a Mastodon-compatible layout. An account move can notify followers when both servers support ActivityPub migration; imported posts are copies, not moved originals. Check the current guide before relying on a migration or export format.",
      },
    ],
    docs: [
      { href: "/docs/user-managing-your-account", label: "Managing your account" },
      { href: "/docs/user-posting-as-a-team", label: "Posting as a team" },
      { href: "/docs/moving", label: "Moving an account" },
    ],
  },
  {
    slug: "safety",
    nav: "Safety",
    index: "06",
    title: "Choose how to protect your attention and account.",
    lede: "Block or mute accounts, filter words, review who can reach you and report content. Available privacy controls depend on server settings and remote-service support.",
    image: "/img/readme/settings.png",
    alt: "Aloha Social account settings: default visibility, discoverability, filters and migration",
    width: 1360,
    height: 900,
    sections: [
      {
        heading: "Keep personal data on the server",
        body: "Aloha Social does not need a third-party GIF or map service for the features described here. Post locations are entered by people rather than looked up through a geocoder. Link previews are fetched by the server and are not federated.",
        bullets: [
          "Exif, XMP, IPTC and GPS metadata are removed from images before storage or delivery.",
          "Your For you interests stay on the server and are not shown to other users.",
          "Private notes about accounts are visible only to the person who wrote them.",
          "The built-in emoji picker includes 881 Noto animated emoji without using Giphy or Tenor.",
        ],
      },
      {
        heading: "Block, mute, filter",
        bullets: [
          "Block severs a relationship in both directions and hides somebody everywhere.",
          "Mute hides them from your timelines and optionally your notifications without them ever knowing — for an hour, a day, seven days, thirty, or until you lift it.",
          "Filtered words apply to every timeline this app draws, folded behind the filter's name or taken out altogether, and can expire on their own.",
          "Per-user domain blocks, conversation mute, and hide-their-boosts beside the bell that says tell me when they post.",
        ],
        body: "Nobody is told, nothing is deleted, and what is currently being taken away is said at the top of the page rather than left to be noticed as gaps in a conversation.",
      },
      {
        heading: "Who may reach you",
        body: "Notification policies can consider whether you follow someone, whether they follow you, whether their account is new, whether a private mention was unsolicited and whether their server is limited. Each category can be allowed or held for review. Defaults depend on account age and server policy.",
      },
      {
        heading: "Report content and filter feeds",
        body: "Reports can be sent to the server’s moderators; where forwarding is enabled, reports about remote accounts are relayed without exposing the reporting account’s identity to the remote server. Word filters can hide or fold matching posts. The account settings also include an option to hide posts labelled as AI-generated.",
      },
      {
        heading: "For administrators",
        body: "Moderators can review reports, limit or suspend accounts, remove posts and reverse decisions. Actions are recorded with the responsible moderator in the Nextcloud’s audit log. Operators can configure review queues, domain blocks and retention rules for remote content.",
      },
    ],
    docs: [
      { href: "/protect", label: "How Aloha protects you" },
      { href: "/docs/user-who-is-in-the-photo", label: "Who may reach you, and requests" },
      { href: "/rules", label: "Rules for using Aloha Social" },
    ],
  },
  {
    slug: "notify",
    nav: "Notify",
    index: "07",
    title: "Notifications that stay quiet until they matter.",
    lede: "One page with filters across the top, a New line where you left off, and five questions that decide whether somebody is allowed to ring the bell at all.",
    image: "/img/readme/notifications.jpg",
    alt: "The notifications page with filters across the top and a New line marking where you left off",
    width: 1360,
    height: 900,
    facts: [
      { value: "2 s", label: "in front of you before it marks itself read" },
      { value: "5", label: "questions deciding who may reach you" },
      { value: "0", label: "third-party services involved" },
    ],
    sections: [
      {
        heading: "A page, not a pile",
        body: "Filters across the top — All, Mentions, Favourites, Boosts, Follows, Polls, Edits — and a New line where you left off. A run of likes of the same post is drawn as one card with the faces stacked rather than the same post quoted twelve times.",
        bullets: [
          "It marks itself read after it has been in front of you for two seconds, not the instant it renders, so it stops clearing the badge on your phone for things nobody saw.",
          "Eight people favourited your post arrives as one line, not eight rows.",
          "Clients read the same grouping, because it is Mastodon 4.3's grouped notifications.",
        ],
      },
      {
        heading: "Who may reach you",
        body: "Five questions about whoever is writing to you — do I follow them, do they follow me, are they new here, is this a private mention I did not ask for, has this server limited them — each answered Allow or Hold for review, in Settings → Notifications beside the digests and quiet hours.",
        bullets: [
          "A held person can still write: everything they do waits together at the top of Activities and raises no bell, push or mail.",
          "Decide once — accept and they are allowed until you stop allowing them; dismiss and what they sent is gone.",
          "New accounts start calm: strangers, brand-new accounts, unsolicited private mentions and limited accounts held.",
          "Clients read it as Mastodon 4.3's notification policy, so drop stays available.",
        ],
      },
      {
        heading: "Nextcloud's own bell rings too",
        body: "Mentions, favourites, boosts, new followers, follow requests, edits of posts you boosted and polls you voted in all reach Nextcloud notifications and its mail digest, each linking into this app rather than out to a remote server.",
        bullets: [
          "A follow request carries Accept and Decline on the bell entry itself.",
          "Mute a conversation from any post's menu: the thread stays on your timelines and stops notifying you until you unmute it.",
        ],
      },
    ],
    docs: [
      { href: "/docs/notify", label: "Notification policy, page by page" },
      { href: "/docs/user-who-may-reach-you-and-requests", label: "Who may reach you" },
      { href: "/docs/user-muting-a-conversation", label: "Muting a conversation" },
    ],
  },
  {
    slug: "nextcloud",
    nav: "Nextcloud",
    index: "08",
    title: "It behaves like the Nextcloud it lives in.",
    lede: "Share from Files, replies in the Comments tab, link cards in Talk and Deck, dashboard widgets, unified search — and one account, one login, one set of rules.",
    image: "/brand/screenshot.png",
    alt: "Aloha Social inside a Nextcloud, with the app menu and the surrounding navigation visible",
    width: 1918,
    height: 930,
    facts: [
      { value: "1", label: "account, password and two-factor login" },
      { value: "10", label: "files shareable to the composer at once" },
      { value: "0", label: "second place to edit your display name" },
    ],
    sections: [
      {
        heading: "Share to Aloha Social, from Files",
        body: "Select a picture or a video — up to ten — pick Share to Aloha Social from the menu, and the composer opens with them already attached. Nothing is uploaded a second time.",
        bullets: [
          "Public replies to a picture you posted from Files appear in the file's Comments tab, and a comment you write there goes out as your reply.",
          "Other people's comments on the file stay on your server.",
        ],
      },
      {
        heading: "Links unfurl, search is unified",
        body: "Paste a link to a post or a profile into a Talk message, a Text document or a Deck card and it becomes a card with the author, the text and the first picture — only what anybody could read, because the card is cached once for everyone who sees the link.",
        bullets: [
          "Unified search, so Aloha Social posts turn up where every other search result does.",
          "Dashboard widgets and an entry in the contacts menu.",
          "The Activity app lists your follows, mentions, boosts and favourites, and puts them in its digest mail. Activity's own notifications stay off: the bell is the bell.",
        ],
      },
      {
        heading: "One identity, and one way to end it",
        body: "Your display name and avatar come from your Nextcloud account and are changed there — there is no second place to edit a name that would do nothing on an instance whose accounts come from LDAP.",
        bullets: [
          "Deleting a Nextcloud user takes their Fediverse account with it: tombstoned, dropped, and a Delete federated so other servers drop their copies too.",
          "Group membership decides who may post from a shared team account.",
          "Same login, same password, same two-factor authentication you already use for files, calendar and chat.",
        ],
      },
      {
        heading: "Where Nextcloud stops and the fediverse starts",
        body: "Everything federation-shaped — moderation, deliveries, remote media, retention — is handled by the app, not by a setting you have to find. The administrator gets it under Administration → Aloha Social, and you get your account under Settings.",
        bullets: [
          "Announcements from your administrators arrive at the top of your timeline.",
          "Announcements, filters and limits are server policy, so a quiet server stays quiet for everybody.",
          "See what is deliberately not there yet in the project's own README before you rely on it.",
        ],
      },
    ],
    docs: [
      { href: "/nextcloud", label: "Why it runs on Nextcloud" },
      { href: "/docs/feature-safety-and-privacy-that-is-the-default", label: "Safety and privacy" },
      { href: "/activitypub/native", label: "How the app talks to the fediverse" },
    ],
  },
];


export const FEATURE_SLUGS = FEATURES.map((feature) => feature.slug);

export function getFeature(slug: string) {
  return FEATURES.find((feature) => feature.slug === slug);
}

export function getAdjacent(slug: string) {
  const index = FEATURES.findIndex((feature) => feature.slug === slug);
  return {
    prev: index > 0 ? FEATURES[index - 1] : undefined,
    next: index >= 0 && index < FEATURES.length - 1 ? FEATURES[index + 1] : undefined,
  };
}
