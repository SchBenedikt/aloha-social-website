import { StaticMarkdownPage, staticPageMetadata } from "@/components/static-page";

export const metadata = staticPageMetadata("/sitemap");

export default function Page() {
  return <StaticMarkdownPage path="/sitemap" />;
}