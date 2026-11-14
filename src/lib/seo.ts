import type { Metadata } from "next";
import { SITE, type Lang } from "@/content/site";

/**
 * Per-page metadata. The root layout sets a site-wide canonical, so every
 * route must override it here — otherwise every page would tell Google that
 * /en is the canonical version (a classic duplicate-content trap).
 */
export function pageMeta(
  lang: Lang,
  path: string,
  title: string,
  description: string,
  image?: string,
): Metadata {
  const otherLang: Lang = lang === "en" ? "zh" : "en";
  const otherPath = path.replace(new RegExp(`^/${lang}(?=/|$)`), `/${otherLang}`);
  const enPath = lang === "en" ? path : otherPath;
  const zhPath = lang === "zh" ? path : otherPath;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: enPath,
        "zh-CN": zhPath,
        "x-default": enPath,
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title,
      description,
      url: `${SITE.baseUrl}${path}`,
      locale: lang === "zh" ? "zh_CN" : "en_US",
      alternateLocale: lang === "zh" ? "en_US" : "zh_CN",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.baseUrl}${item.path}`,
    })),
  };
}

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
