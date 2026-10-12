import { StaticMarkdownPage, staticPageMetadata } from "@/components/static-page";

export const metadata = staticPageMetadata("/gdpr");

export default function Page() {
  return <StaticMarkdownPage path="/gdpr" />;
}
