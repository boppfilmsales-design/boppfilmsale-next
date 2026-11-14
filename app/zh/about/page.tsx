import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { ABOUT } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("zh", "/zh/about", ABOUT.zh.metaTitle, ABOUT.zh.metaDescription);

export default function Page() {
  return <AboutPage lang="zh" />;
}
