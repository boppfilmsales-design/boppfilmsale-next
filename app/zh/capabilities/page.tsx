import type { Metadata } from "next";
import CapabilitiesPage from "@/components/pages/CapabilitiesPage";
import { CAPABILITIES } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("zh", "/zh/capabilities", CAPABILITIES.zh.metaTitle, CAPABILITIES.zh.metaDescription);

export default function Page() {
  return <CapabilitiesPage lang="zh" />;
}
