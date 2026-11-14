import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, categoryBySlug } from "@/data/categories";
import { PRODUCTS, productBySlug } from "@/data/catalog";
import { pageMeta } from "@/lib/seo";
import CategoryPage from "@/components/pages/CategoryPage";
import ProductPage from "@/components/pages/ProductPage";

const LANG = "zh" as const;
const BASE = "/zh";

type Args = { params: { slug: string[] } };

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
        `${p.nameZh} - ${categoryBySlug(p.cat)?.zh || "产品中心"} | 安徽东渐`,
        `${p.nameZh}。${p.description}`.slice(0, 158),
        p.image || undefined,
      );
    }
  }
  const c = categoryBySlug(a);
  if (c) {
    return pageMeta(
      LANG,
      `${BASE}/products/${c.slug}`,
      `${c.zh} — ${c.count} 个产品 | 安徽东渐`,
      c.descZh,
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
