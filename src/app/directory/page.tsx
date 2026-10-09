import { StaticMarkdownPage, staticPageMetadata } from "@/components/static-page";

export const metadata = staticPageMetadata("/directory");

export default function Page() {
  return <StaticMarkdownPage path="/directory" />;
}