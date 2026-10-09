import { StaticMarkdownPage, staticPageMetadata } from "@/components/static-page";

export const metadata = staticPageMetadata("/admin-responsibilities");

export default function Page() {
  return <StaticMarkdownPage path="/admin-responsibilities" />;
}