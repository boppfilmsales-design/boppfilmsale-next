import {
  productsEn,
  productsZh,
  categories,
  newsEn,
  newsZh,
  pagesEn,
  pagesZh,
  type SiteProduct,
  type SiteCategory,
} from "@/data";

export type Lang = "en" | "zh";

function productSet(lang: Lang): SiteProduct[] {
  return lang === "en" ? productsEn : productsZh;
}

export function getCategories(lang: Lang): SiteCategory[] {
  return lang === "en" ? categories.en : categories.zh;
}

export function getProducts(lang: Lang, categoryId?: number): SiteProduct[] {
  const all = productSet(lang);
  const list = categoryId
    ? all.filter((p) => p.category_id === categoryId)
    : all;
  return [...list].sort((a, b) => a.id - b.id);
}

export function getProduct(lang: Lang, id: number): SiteProduct | undefined {
  return productSet(lang).find((p) => p.id === id);
}

export function getAllProductIds(lang: Lang): number[] {
  return productSet(lang).map((p) => p.id);
}

export function getCategoryName(lang: Lang, id: number | null): string {
  if (id == null) return "";
  const cat = getCategories(lang).find((c) => c.id === id);
  return cat ? cat.name : "";
}

export function getNews(lang: Lang) {
  return lang === "en" ? newsEn : newsZh;
}

export function getNewsItem(lang: Lang, id: number) {
  return (lang === "en" ? newsEn : newsZh).find((n) => n.id === id);
}

export function getPage(
  lang: Lang,
  slug: string
): { title: string; content: string } | undefined {
  const map = lang === "en" ? pagesEn : pagesZh;
  return map[slug];
}
