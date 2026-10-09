import { StaticMarkdownPage, staticPageMetadata } from "@/components/static-page";

export const metadata = staticPageMetadata("/nextcloud");

export default function Page() {
  return <StaticMarkdownPage path="/nextcloud" />;
}
