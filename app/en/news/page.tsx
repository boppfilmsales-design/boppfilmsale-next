import type { Metadata } from "next";
import NewsPage from "@/components/pages/NewsPage";
import { NEWS } from "@/content/pages";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("en", "/en/news", NEWS.en.metaTitle, NEWS.en.metaDescription);

export default function Page() {
  return <NewsPage lang="en" />;
}
