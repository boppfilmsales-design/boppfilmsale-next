import type { Metadata } from "next";
import ProductsIndex from "@/components/pages/ProductsIndex";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "en",
  "/en/products",
  "Product Catalogue | BOPP, BOPET, coated films & more | AEC GROUP",
  "Browse 11 product divisions and 465 film, tape, ribbon, label, paper and machinery entries from AEC GROUP. Static, crawlable category pages with real product photos.",
);

export default function Page() {
  return <ProductsIndex lang="en" />;
}
