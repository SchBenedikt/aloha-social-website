import { StaticMarkdownPage, staticPageMetadata } from "@/components/static-page";

export const metadata = staticPageMetadata("/terms");

export default function Page() {
  return <StaticMarkdownPage path="/terms" />;
}
