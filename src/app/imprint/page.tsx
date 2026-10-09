import { StaticMarkdownPage, staticPageMetadata } from "@/components/static-page";

export const metadata = staticPageMetadata("/imprint");

export default function Page() {
  return <StaticMarkdownPage path="/imprint" />;
}