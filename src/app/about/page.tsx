import { StaticMarkdownPage, staticPageMetadata } from "@/components/static-page";

export const metadata = staticPageMetadata("/about");

export default function Page() {
  return <StaticMarkdownPage path="/about" />;
}
