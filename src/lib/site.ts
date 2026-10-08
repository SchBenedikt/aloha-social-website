export const SITE = {
  name: "Aloha Social",
  tagline: "Social media for community-run servers.",
  description:
    "Aloha Social is open-source social networking software for community-run servers. Publish posts and media, follow compatible ActivityPub accounts, and manage a shared online community. Compatibility depends on the release and remote service.",
  github: "https://github.com/AlohaSocial",
  server: "https://github.com/AlohaSocial/social",
  logos: "https://github.com/AlohaSocial/Logos",
  apple: "https://github.com/AlohaSocial/Apple",
  android: "https://github.com/AlohaSocial/Android",
  appStore: "https://apps.nextcloud.com/apps/social",
  appStoreStatusChecked: "October 2026",
  nextcloud: "https://nextcloud.com",
  docs: {
    admin: "/docs/admin",
    user: "/docs/user",
    api: "/docs/api",
    occ: "/docs/occ",
    mastodon: "/docs/mastodon",
    atproto: "/docs/atproto",
    moving: "/docs/moving",
    architecture: "/docs/architecture",
  },
  docSources: {
    admin: "https://github.com/AlohaSocial/social/blob/master/docs/Admin.md",
    user: "https://github.com/AlohaSocial/social/blob/master/docs/User-Guide.md",
    api: "https://github.com/AlohaSocial/social/blob/master/docs/API.md",
    occ: "https://github.com/AlohaSocial/social/blob/master/docs/OCC-Commands.md",
    mastodon: "https://github.com/AlohaSocial/social/blob/master/docs/Mastodon-Compatibility.md",
    atproto: "https://github.com/AlohaSocial/social/blob/master/docs/Atproto-Compatibility.md",
    moving: "https://github.com/AlohaSocial/social/blob/master/docs/Moving.md",
    architecture: "https://github.com/AlohaSocial/social/blob/master/docs/Architecture.md",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const COLOR = {
  coral: "#E8604C",
  sea: "#0F4C5C",
  sand: "#FBF4EA",
  nextcloudBlue: "#0082C9",
} as const;
