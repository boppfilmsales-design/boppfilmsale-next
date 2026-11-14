import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { ABOUT } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("en", "/en/about", ABOUT.en.metaTitle, ABOUT.en.metaDescription);

export default function Page() {
  return <AboutPage lang="en" />;
}
