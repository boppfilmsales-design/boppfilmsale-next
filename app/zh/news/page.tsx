import type { Metadata } from "next";
import NewsPage from "@/components/pages/NewsPage";
import { NEWS } from "@/content/pages";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("zh", "/zh/news", NEWS.zh.metaTitle, NEWS.zh.metaDescription);

export default function Page() {
  return <NewsPage lang="zh" />;
}
