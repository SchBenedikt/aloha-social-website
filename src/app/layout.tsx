import type { Metadata, Viewport } from "next";
import { Fredoka, IBM_Plex_Mono, Public_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE } from "@/lib/site";

/** The typeface the official Aloha Social wordmark is drawn in. */
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

/** Neue Haas Grotesk-like neutral for reading. */
const publicSans = Public_Sans({
  variable: "--font-public",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

/** Mono for labels, counters and code. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

const themeScript = `(function(){var d=document.documentElement;try{var s=localStorage.getItem("theme");d.dataset.theme=(s==="dark"||s==="light")?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");}catch(e){d.dataset.theme="light";}
try{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver" in window))return;d.classList.add("has-io");
var start=function(){try{var io=new IntersectionObserver(function(es){for(var i=0;i<es.length;i++){if(es[i].isIntersecting){es[i].target.classList.add("is-in");io.unobserve(es[i].target);}}},{rootMargin:"0px 0px -6% 0px",threshold:0.05});var els=document.querySelectorAll("[data-reveal], [data-stagger]");for(var j=0;j<els.length;j++){io.observe(els[j]);}}catch(err){d.classList.remove("has-io");}};
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",start);}else{start();}}catch(e){d.classList.remove("has-io");}})();`;

const ogImageUrl = `${SITE.url}/brand/social-promo.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Aloha Social",
    "Aloha",
    "Fediverse",
    "ActivityPub",
    "AT Protocol",
    "Mastodon",
    "Pixelfed",
    "PeerTube",
    "Bluesky",
    "social network",
    "self-hosted",
    "open source",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: "/",
    locale: "en_US",
    images: [
      {
        url: ogImageUrl,
        width: 1280,
        height: 640,
        alt: "Aloha Social — the social network for your server",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [ogImageUrl],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/brand/favicon.ico", sizes: "32x32" },
      { url: "/brand/mark-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/mark-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon-180.png", sizes: "180x180" }],
    other: [
      { rel: "manifest", url: "/brand/manifest.json" },
    ],
  },
  manifest: `${SITE.url}/brand/manifest.json`,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf4ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0d2029" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fredoka.variable} ${publicSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col overflow-x-clip">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
