import type { Metadata } from "next";
import CasesPage from "@/components/pages/CasesPage";
import { CASES } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("zh", "/zh/cases", CASES.zh.metaTitle, CASES.zh.metaDescription);

export default function Page() {
  return <CasesPage lang="zh" />;
}
