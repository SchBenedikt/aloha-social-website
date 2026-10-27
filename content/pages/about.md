---
path: /about
title: About us
description: Who builds Aloha Social, how it is funded and governed, and what the project is trying to be.
---

# About us

Aloha Social is an open-source social network you run on your own server. The server app is published under AGPL-3.0-or-later; native clients have their own licences. The project is developed in the open at [github.com/AlohaSocial](https://github.com/AlohaSocial).

## What we are trying to be

A social network that is good to be in. That sounds vague, so here is what it means in the code:

- **No scoreboard by default.** Like, boost and follower counts are hidden. Less pressure, less comparison, less performing for strangers.
- **No advertising code or third-party ad tracking.** Optional server integrations communicate with the remote services they are configured to use.
- **Recommendations with controls.** The optional For You feed explains why posts appear; behavioral learning has a separate consent control, and account-scoped learning data is not federated.
- **Complexity stays hidden.** Federation is genuinely complicated. None of that complexity is handed to the person posting.
- **Design comes first.** A real phone layout, a dark mode that is the same design, full keyboard navigation, sound and haptics that are optional, and respect for the system's reduced-motion setting.

## Why it runs in your workspace

Aloha Social runs inside the workspace you already have, not as another service to run. That choice buys three things a separate network cannot:

1. **No new account, no new password.** The login people already have — including single sign-on and two-factor authentication — is the login.
2. **The data stays where the organisation's data already is.** Posts live next to the files, calendar and chat, on infrastructure the organisation controls and backs up under its own rules.
3. **It is part of the workspace.** Posts appear in unified search, links unfurl in Talk, Text and Deck, and notifications use the in-app bell and mail digest.

Read [why it runs in your workspace](/nextcloud) for the full list.

## The team

Aloha Social is built by a small core team together with contributors from across the fediverse community.

### Core team

- Andy Scherzinger
- Anna
- Benedikt Schächner
- Frank Karlitschek
- Hamza
- Jan C. Borchardt

[![All contributors](https://contrib.rocks/image?repo=AlohaSocial/social&max=100&columns=20)](https://github.com/AlohaSocial/social/graphs/contributors)

**All contributors:** [github.com/AlohaSocial/social/graphs/contributors](https://github.com/AlohaSocial/social/graphs/contributors)

There is no closed core and no proprietary cloud service. Everything the app does is in the repository: server code, web client, translations, tests and documentation.

## How the project works

- **Developed in the open.** Issues, pull requests and design decisions are discussed on GitHub. Large changes are specified in the repository's `docs/` directory before they are built.
- **Tested in layers.** CI runs unit suites and build checks; integration and protocol interoperability jobs cover configured Nextcloud and remote-service paths.
- **Documented from the code.** Upstream reference chapters on this site are generated from the repository's Markdown docs and link back to their source; the complete index is at [/docs](/docs).
- **Federated, with clear protocol boundaries.** ActivityPub connects to the Fediverse. Optional native AT Protocol hosting can connect to Bluesky when the administrator enables and configures it; the two protocols keep separate identities and data flows.

## What it costs

The server app is free software under AGPL-3.0-or-later; the Android and Apple clients are MIT-licensed. Anyone may run, inspect, adapt and contribute to the software under the terms of its licence. A hosting provider may charge for running it.

## Take part

- **Report a bug or ask for a feature** — [open an issue](https://github.com/AlohaSocial/social/issues).
- **Contribute code or translations** — see the [contributing guide](/docs/contributing).
- **Run it for your organisation** — the [installation guide](/install) covers Aloha 34 to 36 with PHP 8.3 to 8.5.
- **Use the brand** — logos, colours and the press boilerplate are on the [brand page](/brand).
