import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { CONTACT } from "@/content/pages";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta("en", "/en/contact", CONTACT.en.metaTitle, CONTACT.en.metaDescription);

export default function Page() {
  return <ContactPage lang="en" />;
}
