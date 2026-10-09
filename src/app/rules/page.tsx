import { StaticMarkdownPage, staticPageMetadata } from "@/components/static-page";

export const metadata = staticPageMetadata("/rules");

export default function Page() {
  return <StaticMarkdownPage path="/rules" />;
}
