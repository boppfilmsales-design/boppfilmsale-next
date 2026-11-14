import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { CONTACT } from "@/content/pages";
import { pageMeta } from "@/lib/seo";

// 旧地址保留，规范页面为 /zh/contact
export const metadata: Metadata = {
  ...pageMeta("zh", "/zh/feedback", CONTACT.zh.metaTitle, CONTACT.zh.metaDescription),
  alternates: { canonical: "/zh/contact" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ContactPage lang="zh" />;
}
