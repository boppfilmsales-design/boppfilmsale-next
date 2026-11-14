import type { Metadata } from "next";
import FaqPage from "@/components/pages/FaqPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "en",
  "/en/faq",
  "FAQ | MOQ, samples, lead times & documents | AEC GROUP",
  "Straight answers on minimum order quantity, samples, quotation time, lead times, certifications, custom slitting, mixed containers and payment terms.",
);

export default function Page() {
  return <FaqPage lang="en" />;
}
