import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { CONTACT } from "@/content/pages";
import { pageMeta } from "@/lib/seo";

// Legacy URL kept alive; the canonical contact page is /en/contact.
export const metadata: Metadata = {
  ...pageMeta("en", "/en/feedback", CONTACT.en.metaTitle, CONTACT.en.metaDescription),
  alternates: { canonical: "/en/contact" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ContactPage lang="en" />;
}
