---
path: /about
title: About us
description: Who builds Aloha Social, how it is funded and governed, and what the project is trying to be.
---

# About us

Aloha Social is a fully open-source social network for Nextcloud. It is built in the open, published under the AGPL-3.0-or-later licence, and developed at [github.com/AlohaSocial/social](https://github.com/AlohaSocial/social).

## What we are trying to be

A social network that is good to be in. That sounds vague, so here is what it means in the code:

- **No scoreboard by default.** Like, boost and follower counts are hidden. Less pressure, less comparison, less performing for strangers.
- **No advertising, no tracking.** There is no ad server to feed, so nothing about your reading is measured on its behalf.
- **Every personalised feed explains itself.** The For You feed says why each post is there, and you can edit the interests behind it or turn the feed off.
- **Complexity stays hidden.** Federation is genuinely complicated. None of that complexity is handed to the person posting.
- **Design comes first.** A real phone layout, a dark mode that is the same design, full keyboard navigation, sound and haptics that are optional, and respect for the system's reduced-motion setting.

## Why Nextcloud

Aloha Social is a Nextcloud app, not another service to run. That choice buys three things a separate network cannot:

1. **No new account, no new password.** The login people already have — including single sign-on and two-factor authentication — is the login.
2. **The data stays where the organisation's data already is.** Posts live next to the files, calendar and chat, on infrastructure the organisation controls and backs up under its own rules.
3. **It is part of the workspace.** Posts appear in unified search, links unfurl in Talk, Text and Deck, and notifications use the Nextcloud bell and mail digest.

Read [why it runs on Nextcloud](/nextcloud) for the full list.

## The team

Aloha Social is built by a small core team at Nextcloud together with contributors from across the Nextcloud and fediverse communities.

### Core team

| | |
|---|---|
| **Andy Scherzinger** | Core developer |
| **Anna** | Core developer |
| **Benedikt Schächner** | Maintainer & lead developer |
| **Frank Karlitschek** | Nextcloud founder, project initiator |
| **Hamza** | Core developer |
| **Jan C. Borchardt** | Design & UX lead |

<div style="border: none; box-shadow: none;">
[![All contributors](https://contrib.rocks/image?repo=AlohaSocial/social&max=100&columns=20)](https://github.com/AlohaSocial/social/graphs/contributors)
</div>

**All contributors:** [github.com/AlohaSocial/social/graphs/contributors](https://github.com/AlohaSocial/social/graphs/contributors)

There is no closed core and no proprietary cloud service. Everything the app does is in the repository: server code, web client, translations, tests and documentation.

## How the project works

- **Developed in the open.** Issues, pull requests and design decisions are discussed on GitHub. Large changes are specified in the repository's `docs/` directory before they are built.
- **Tested continuously.** Roughly 7,900 PHP tests and 4,000 JavaScript tests run against every change.
- **Documented from the code.** The documentation on this site is published from the repository's own documents, split into short pages — every page links back to its source.
- **Federated, not siloed.** Aloha Social speaks ActivityPub and the AT Protocol, so it talks to Mastodon, Bluesky, Pixelfed, PeerTube, GoToSocial and Akkoma without a bridge.

## What it costs

Nothing. The software is free under AGPL-3.0-or-later: anyone may run it, inspect it, adapt it and contribute to it. A hosting provider may charge for running it; the licence does not allow anyone to charge for the right to use it.

## Take part

- **Report a bug or ask for a feature** — [open an issue](https://github.com/AlohaSocial/social/issues).
- **Contribute code or translations** — see the [contributing guide](/docs/contributing).
- **Run it for your organisation** — the [installation guide](/install) covers Nextcloud 34 to 36 with PHP 8.3 to 8.5.
- **Use the brand** — logos, colours and the press boilerplate are on the [brand page](/brand).