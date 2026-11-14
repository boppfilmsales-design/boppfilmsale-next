import type { Metadata } from "next";
import CasesPage from "@/components/pages/CasesPage";
import { CASES } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("en", "/en/cases", CASES.en.metaTitle, CASES.en.metaDescription);

export default function Page() {
  return <CasesPage lang="en" />;
}
