import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { CONTACT } from "@/content/pages";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("zh", "/zh/contact", CONTACT.zh.metaTitle, CONTACT.zh.metaDescription);

export default function Page() {
  return <ContactPage lang="zh" />;
}
