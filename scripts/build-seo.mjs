// Generate sitemap.xml, robots.txt, _headers and _redirects from the real
// catalogue, so search engines get one canonical URL per crawlable page.
// Run automatically as part of `npm run build`.
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BASE = "https://second.boppfilmsale.com";
const PUB = path.join(ROOT, "public");
const today = new Date().toISOString().slice(0, 10);

function readTsArray(file, name) {
  const text = fs.readFileSync(path.join(ROOT, file), "utf8");
  const re = new RegExp(`export const ${name}: [^=]* = (\\[[\\s\\S]*?\\n\\]);`);
  const m = text.match(re);
  if (!m) throw new Error(`Cannot parse ${name} from ${file}`);
  return JSON.parse(m[1]);
}

const categories = readTsArray("src/data/categories.ts", "CATEGORIES");
const products = readTsArray("src/data/catalog.ts", "PRODUCTS");

const STATIC_PAGES = [
  "",
  "about",
  "capabilities",
  "cases",
  "faq",
  "contact",
  "news",
  "products",
];

/** [urlPath, priority, changefreq, image] */
const entries = [];
for (const lang of ["en", "zh"]) {
  for (const page of STATIC_PAGES) {
    const p = page ? `/${lang}/${page}` : `/${lang}`;
    entries.push({ path: p, priority: page ? "0.8" : "1.0", freq: page ? "monthly" : "weekly", cat: !!page && page === "products" });
  }
  for (const c of categories) {
    entries.push({ path: `/${lang}/products/${c.slug}`, priority: "0.7", freq: "monthly", cat: true });
  }
  for (const p of products) {
    entries.push({
      path: `/${lang}/products/${p.cat}/${p.slug}`,
      priority: "0.6",
      freq: "monthly",
      image: p.image ? `${BASE}${p.image}` : undefined,
      title: p.nameEn,
    });
  }
}

const other = (p) => {
  if (p.startsWith("/en")) return `${BASE}/zh${p.slice(3)}`;
  if (p.startsWith("/zh")) return `${BASE}/en${p.slice(3)}`;
  return null;
};
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const cdata = (s) => String(s).replace(/]]>/g, "]]]]><![CDATA[>");
const cleanTitle = (t) => cdata(String(t || "").replace(/[^\x20-\x7E]/g, "").slice(0, 120));

const urls = entries.map((e) => {
  const loc = `${BASE}${e.path}`;
  const alt = other(e.path);
  const en = e.path.startsWith("/en") ? loc : alt;
  const zh = e.path.startsWith("/zh") ? loc : alt;
  const image = e.image
    ? `\n    <image:image><image:loc>${esc(e.image)}</image:loc><image:title><![CDATA[${cleanTitle(e.title)}]]></image:title></image:image>`
    : "";
  return `  <url>\n    <loc>${esc(loc)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${e.freq}</changefreq>\n    <priority>${e.priority}</priority>\n    <xhtml:link rel="alternate" hreflang="en" href="${esc(en)}" />\n    <xhtml:link rel="alternate" hreflang="zh-CN" href="${esc(zh)}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(en)}" />${image}\n  </url>`;
});

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
  urls.join("\n") +
  `\n</urlset>\n`;

fs.writeFileSync(path.join(PUB, "sitemap.xml"), sitemap, "utf8");

fs.writeFileSync(
  path.join(PUB, "robots.txt"),
  [
    "User-agent: *",
    "Allow: /",
    "Disallow: /en/feedback",
    "Disallow: /zh/feedback",
    "",
    `Sitemap: ${BASE}/sitemap.xml`,
    "",
  ].join("\n"),
  "utf8",
);

/* Cloudflare Pages headers. General defaults first; more specific rules
   later override the cache policy for immutable / long-lived assets. */
fs.writeFileSync(
  path.join(PUB, "_headers"),
  [
    "/*",
    "  Cache-Control: public, max-age=0, must-revalidate",
    "  X-Content-Type-Options: nosniff",
    "  X-Frame-Options: SAMEORIGIN",
    "  Referrer-Policy: strict-origin-when-cross-origin",
    "  Permissions-Policy: camera=(), microphone=(), geolocation=()",
    "",
    "/_next/static/*",
    "  Cache-Control: public, max-age=31536000, immutable",
    "",
    "/products/*",
    "  Cache-Control: public, max-age=2592000, stale-while-revalidate=86400",
    "",
    "/images/*",
    "  Cache-Control: public, max-age=2592000, stale-while-revalidate=86400",
    "",
  ].join("\n"),
  "utf8",
);

/* Old product URLs were /en/products/<numeric id>. Keep them alive with a
   301 to the new descriptive slug instead of leaving 404s for indexed links. */
const redirects = ["/ /en 301", ""];
for (const p of products) {
  const dest = `/products/${p.cat}/${p.slug}`;
  redirects.push(`/en/products/${p.id} /en${dest} 301`);
  redirects.push(`/zh/products/${p.id} /zh${dest} 301`);
}
redirects.push("");
fs.writeFileSync(path.join(PUB, "_redirects"), redirects.join("\n"), "utf8");

console.log(`SEO files written: ${entries.length} sitemap URLs, ${products.length * 2} legacy redirects`);
console.log(`  sitemap.xml ${(fs.statSync(path.join(PUB, "sitemap.xml")).size / 1024).toFixed(0)} KB`);
