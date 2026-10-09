# Aloha Social Website

The official website for [Aloha Social](https://github.com/AlohaSocial) — a fully open-source social network for Nextcloud.

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Fonts**: Google Fonts (Fredoka, Public Sans, IBM Plex Mono) via `next/font`

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # React components
├── lib/           # Data, utilities, config
public/
├── brand/         # Logos, icons, manifest
└── img/readme/    # Feature screenshots
```

## Deployment

Built for static export where possible. Deploy to any Node.js host or static hosting (Vercel, Netlify, etc.).

## License

AGPL-3.0-or-later — see [AlohaSocial/social](https://github.com/AlohaSocial/social) for the main application.