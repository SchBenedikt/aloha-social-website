import { StaticMarkdownPage, staticPageMetadata } from "@/components/static-page";

export const metadata = staticPageMetadata("/protect");

export default function Page() {
  return <StaticMarkdownPage path="/protect" />;
}
