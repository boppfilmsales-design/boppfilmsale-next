import type { Metadata } from "next";
import CapabilitiesPage from "@/components/pages/CapabilitiesPage";
import { CAPABILITIES } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("en", "/en/capabilities", CAPABILITIES.en.metaTitle, CAPABILITIES.en.metaDescription);

export default function Page() {
  return <CapabilitiesPage lang="en" />;
}
