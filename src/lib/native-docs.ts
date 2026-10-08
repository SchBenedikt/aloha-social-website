import { SITE } from "./site";

export type NativeDocSection = {
  title: string;
  body: string;
  bullets?: readonly string[];
  code?: string;
};

export type NativeDoc = {
  title: string;
  summary: string;
  source: keyof typeof SITE.docSources;
  status?: string;
  sections: readonly NativeDocSection[];
};

export type NativeDocSlug = "user" | "admin" | "api" | "occ" | "mastodon" | "atproto" | "moving" | "architecture";

export const NATIVE_DOCS: Record<NativeDocSlug, NativeDoc> = {
  user: {
    title: "User guide",
    summary: "A practical guide to getting started, finding people, publishing posts and managing your account.",
    source: "user",
    sections: [
      { title: "An account on an Aloha Social server", body: "Aloha Social runs on a host platform that provides accounts and authentication. Depending on the operator's settings, you may sign in with an existing account or use an account created specifically for Aloha Social. Your Fediverse address uses a handle and the server's domain." },
      { title: "Find people and hashtags", body: "Use search, Discover, directories enabled by the administrator, or a profile's Follow button. A remote account may need to be resolved before it appears. Follow requests to locked accounts wait for approval.", bullets: ["Ask the server administrator which directory integrations are enabled.", "A follows export from another service may be imported; what is visible depends on that service's privacy settings."] },
      { title: "Choose an audience before posting", body: "The composer offers public, unlisted, followers-only and direct audiences. These choices affect where a post is delivered, not only how it is displayed on this server. Direct posts must name recipients. Replies inherit the original post's audience; review it before sending." },
      { title: "Media, warnings and scheduling", body: "The app supports common image, audio and video formats, subject to the limits configured on the server and its PHP/web-server stack. Images have metadata removed before storage or delivery. Video transcoding to a broadly playable format requires ffmpeg. Content warnings, alt text, polls and scheduled posts are available in the web client." },
      { title: "Archive, delete or move", body: "Archiving hides a post from this server's timelines without retracting copies already delivered elsewhere. Deletion requests removal from other servers but cannot guarantee every remote copy disappears. Account moves transfer followers only where both servers support the relevant ActivityPub migration flow; post imports create local copies, not moved originals." },
    ],
  },
  admin: {
    title: "Administrator guide",
    summary: "The setup prerequisites, federation checks, client API routing and day-to-day operations for a server operator.",
    source: "admin",
    sections: [
      { title: "Before enabling Aloha Social", body: "Set the stable public URL of the host platform before anyone creates a Fediverse identity. Aloha Social uses that address when building actor and post IDs; changing it later can require a destructive reset. Configure HTTPS and the platform's scheduled background-job mode." },
      { title: "Check federation", body: "The host platform's well-known redirects must expose WebFinger, and the server must make outbound HTTPS requests. Its administration overview reports setup conditions; the command-line check reports errors with a non-zero exit status.", code: "php occ social:check:install" },
      { title: "Mastodon-compatible clients need web-server rules", body: "Aloha Social routes are under the host platform's app path, while Mastodon clients expect /api and /oauth at the domain root. The repository provides Apache and nginx examples under contrib/webserver. Federation and the browser interface may work even when a mobile client cannot connect." },
      { title: "Uploads depend on the whole stack", body: "Effective image and video limits are the smallest applicable app, PHP upload/post-body, reverse-proxy and web-server limits. The app's documented video ceiling is not a guarantee that every deployment accepts a file that large. ffmpeg is optional; without it, some uploaded video formats will not play on every remote service." },
      { title: "Moderation and retention are operator decisions", body: "Review queue rules, domain access, remote-content retention, external registrations and optional media features are controlled by server settings. Check the consequences and take a backup before changing policies or upgrading." },
    ],
  },
  api: {
    title: "API reference overview",
    summary: "An orientation to the client-facing API and ActivityPub endpoints, with links to the maintained endpoint reference.",
    source: "api",
    sections: [
      { title: "Two protocol surfaces", body: "Aloha Social exposes a partial Mastodon-style client API and ActivityPub resources for server-to-server federation. They are related but not interchangeable: client routes are served through the host platform, while remote services discover actors through WebFinger and deliver activities to inboxes." },
      { title: "Client API base path", body: "Client routes are registered below the Aloha Social app path. Many Mastodon clients construct /api/v1 URLs at the domain root, so an administrator must configure the supplied web-server mappings before those clients can connect. Consult the current compatibility notes for exceptions." },
      { title: "Authentication and pagination", body: "Client requests use OAuth bearer tokens issued for the account. Timeline responses use paginated results and Mastodon-shaped entities where implemented. Federation requests use HTTP signatures; implementation details and unsupported routes are version-sensitive." },
      { title: "Treat compatibility as a matrix, not a promise", body: "A familiar route or JSON shape does not imply complete Mastodon parity. Push, streaming and other API areas have documented gaps. Check the compatibility document and the source for the exact app version you deploy." },
      { title: "Illustrative route shapes", body: "These paths identify the API families; use the upstream reference for exact request parameters, scopes, response schemas and version support.", code: "GET  /index.php/apps/social/api/v1/timelines/home\nPOST /index.php/apps/social/api/v1/statuses\nGET  /.well-known/webfinger\nPOST /index.php/apps/social/inbox" },
    ],
  },
  occ: {
    title: "OCC commands",
    summary: "A safe starting point for checking an installation and understanding queue commands. See the upstream reference for every command and option.",
    source: "occ",
    sections: [
      { title: "Run occ from the host-platform directory", body: "Use the PHP CLI and the occ script belonging to the same host-platform installation that runs Aloha Social. Run commands as the account appropriate for that installation, commonly the web-server user." },
      { title: "Start with read-only checks", body: "The installation check reports federation and client-API setup errors. Queue status inspects deliveries without changing them.", code: "php occ social:check:install\nphp occ social:queue:status" },
      { title: "Background delivery", body: "The host platform's configured background jobs process delivery periodically. The optional social:worker command drains the queue continuously and is intended to be managed as a long-running service. Consider resource limits, logs, service supervision and shutdown behaviour before deploying workers." },
      { title: "Retry and reset carefully", body: "Queue retry commands can send new requests to remote servers. Account moves notify followers. Reset commands may delete local and cached Social data. Read the current command help and upstream documentation, confirm the target and take a backup before invoking any state-changing operation." },
    ],
  },
  mastodon: {
    title: "Mastodon compatibility",
    summary: "A summary of client API and federation compatibility—and of the changes or unsupported features to check before switching.",
    source: "mastodon",
    status: "Compatibility varies by app version. The upstream review records which sections were checked against code or a running instance and when.",
    sections: [
      { title: "Not a drop-in Mastodon replacement", body: "Aloha Social implements parts of the Mastodon client API and ActivityPub; the project explicitly documents it as a partial implementation, not a drop-in replacement for a Mastodon instance. Read the current compatibility review before making it somebody's only Fediverse client." },
      { title: "Mobile clients may need server configuration", body: "Mastodon-style clients generally expect API and OAuth endpoints at the domain root. An administrator may need to install the project's web-server mappings. The web interface and federation can still work when this mapping is absent." },
      { title: "Known gaps are versioned", body: "The upstream compatibility document separates client routes, federation behaviour and instance migration. Features such as push or streaming may be absent; individual route coverage and correctness can change between releases. Use the table in the source document as the authoritative version-specific record." },
      { title: "Moving is not taking over a server", body: "A user account move can signal followers to follow a new account where remote servers support it. It does not transfer the old server's identity or move the original posts. Imported posts are copies, and some services cannot send a migration." },
    ],
  },
  atproto: {
    title: "Bluesky / AT Protocol status",
    summary: "The upstream AT Protocol document is a design specification, not evidence of a working Bluesky integration.",
    source: "atproto",
    status: "Not implemented. The linked upstream document explicitly labels itself a specification and says nothing in it is implemented.",
    sections: [
      { title: "Do not expect Bluesky federation", body: "Aloha Social speaks ActivityPub. Bluesky uses the AT Protocol, which is a different protocol. The repository's Atproto-Compatibility.md describes a proposed native identity and integration; its own status statement says it is not implemented." },
      { title: "A design is not a shipped feature", body: "The proposal discusses identity, repositories, a firehose, reading Bluesky content and migration as separate phases. Those descriptions are intended design decisions, not currently available product behaviour." },
      { title: "How to check again", body: "Before relying on AT Protocol support, check the current app release, implementation status and tests in the server repository. Do not infer availability from a specification, a planned phase, or this overview." },
    ],
  },
  moving: {
    title: "Moving an account",
    summary: "What an ActivityPub account move can do, what needs to happen on both servers, and what is not transferred.",
    source: "moving",
    sections: [
      { title: "A move carries followers, not posts", body: "The old server sends an ActivityPub Move so servers that support migration can redirect follows to the new account. The posts remain signed under their original server IDs. A post archive can create local copies, but those copies are not the originals and their existing replies or boosts do not move with them." },
      { title: "Moving to Aloha Social", body: "Create an account on the destination, add the old identity as an alias where required, import follows or posts if the old server does not expose them, then initiate the follower move from the old server. Each step depends on what the old service supports and exposes." },
      { title: "Moving away", body: "The destination account must identify the current account as an alias before the old account announces a move. The upstream instructions describe user-interface and administrator command paths; read the version-specific steps and confirmations before continuing." },
      { title: "Things a move does not guarantee", body: "Some servers do not implement Move; Pixelfed is specifically noted as unable to perform the follower-move step in the upstream guide. Direct messages and boosts are excluded from post imports. Export anything you need before deleting or resetting an account." },
    ],
  },
  architecture: {
    title: "Architecture overview",
    summary: "A map of the Aloha Social app, its ActivityPub boundary, queues, storage and host-platform integrations.",
    source: "architecture",
    sections: [
      { title: "An app installed on a host platform", body: "Aloha Social is an application installed into an existing host platform. It registers HTTP endpoints, database migrations, background jobs, settings and integrations with that platform. The deployment still needs an administrator to configure its public address, HTTPS, scheduled jobs and any client-facing web-server mappings." },
      { title: "Federation flow", body: "The app represents accounts and posts as ActivityPub actors and objects. Outbound activities are signed and queued for remote delivery; inbound activities are verified and processed through the server's inbox. A remote server ultimately controls what it accepts and how long it keeps content." },
      { title: "Persistence and jobs", body: "Local posts and app state use the host platform's database and storage integration. Background jobs handle delivery, scheduled work and cleanup. Remote media and retained content depend on the configuration and retention policy of the instance." },
      { title: "Implementation notes change", body: "The architecture document describes concrete tables, routes and components and is tied to the repository version. For implementation work, use that source and the code at the same release tag; this overview deliberately avoids treating internal names as stable public interfaces." },
    ],
  },
};

export const NATIVE_DOC_SLUGS = Object.keys(NATIVE_DOCS) as NativeDocSlug[];
