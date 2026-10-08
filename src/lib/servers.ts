/**
 * The public server directory.
 *
 * Only add a listing when its details and dated counts can be attributed to
 * a server operator. This site does not fetch or verify live server data.
 */

export type Registration = "open" | "approval" | "invite" | "closed";

export type ServerEntry = {
  id: string;
  domain: string;
  name: string;
  tagline: string;
  /** Approximate count of registered accounts. */
  registered: number | null;
  /** Approximate monthly active accounts. */
  active: number | null;
  registration: Registration;
  region: string;
  languages: string[];
  focus: string;
  moderation: string;
  since: string;
  admin: string;
  /** Homepage of the server. `null` while the entry is still a placeholder. */
  url: string | null;
  /** The date the figures above were taken. */
  countedOn: string;
};

export const REGISTRATION_LABEL: Record<Registration, string> = {
  open: "Open",
  approval: "Approval",
  invite: "Invite only",
  closed: "Closed",
};

/** Month used to label a manually verified directory refresh. */
export const DIRECTORY_COUNTED_ON = "October 2026";

export const DIRECTORY_HAS_VERIFIED_DATA = false;

export const SERVERS: ServerEntry[] = [];

export const REGISTRATION_ORDER: Registration[] = [
  "open",
  "approval",
  "invite",
  "closed",
];

export const COMPARE_CRITERIA = [
  {
    label: "Registration",
    body: "Open means you can sign up now. Approval means a person reads it first. Invite means somebody vouches. Closed means the accounts belong to an institution.",
  },
  {
    label: "Size",
    body: "Registered accounts are only one measure of a server's size. Monthly activity provides context, but it should be read alongside the operator's policies and community focus.",
  },
  {
    label: "Moderation",
    body: "How many people moderate, whether the rules are written down, and whether removals are published. Silence and suspensions are visible from outside the server.",
  },
  {
    label: "Focus and language",
    body: "Every server has a temperature. The language list matters more than it looks: the local timeline is only useful if you can read it.",
  },
] as const;
