import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, categoryBySlug } from "@/data/categories";
import { PRODUCTS, productBySlug } from "@/data/catalog";
import { pageMeta } from "@/lib/seo";
import CategoryPage from "@/components/pages/CategoryPage";
import ProductPage from "@/components/pages/ProductPage";

const LANG = "en" as const;
const BASE = "/en";

type Args = { params: { slug: string[] } };

/** Every category and every product gets a real static HTML file — no
    client-side ?category= filtering, so Google/Edge can crawl the content. */
export function generateStaticParams() {
  return [
    ...CATEGORIES.map((c) => ({ slug: [c.slug] })),
    ...PRODUCTS.map((p) => ({ slug: [p.cat, p.slug] })),
  ];
}

export function generateMetadata({ params }: Args): Metadata {
  const [a, b] = params.slug || [];
  if (b) {
    const p = productBySlug(b);
    if (p) {
      return pageMeta(
        LANG,
        `${BASE}/products/${p.cat}/${p.slug}`,
        `${p.nameEn} | ${categoryBySlug(p.cat)?.en || "Products"} | AEC GROUP`,
        p.description.slice(0, 158),
        p.image || undefined,
      );
    }
  }
  const c = categoryBySlug(a);
  if (c) {
    return pageMeta(
      LANG,
      `${BASE}/products/${c.slug}`,
      `${c.en} — ${c.count} Products | AEC GROUP`,
      c.descEn,
    );
  }
  return {};
}

export default function Page({ params }: Args) {
  const slug = params.slug || [];

  if (slug.length === 1) {
    const category = categoryBySlug(slug[0]);
    if (!category) notFound();
    return <CategoryPage lang={LANG} category={category} />;
  }

  if (slug.length === 2) {
    const product = productBySlug(slug[1]);
    if (!product || product.cat !== slug[0]) notFound();
    return <ProductPage lang={LANG} product={product} />;
  }

  notFound();
}
