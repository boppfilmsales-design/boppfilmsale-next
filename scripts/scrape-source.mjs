// Scrape old.boppfilmsale.com product catalogue into a clean bilingual dataset.
// Run: node scripts/scrape-source.mjs
import fs from "node:fs";
import path from "node:path";

const BASE = "https://old.boppfilmsale.com";
const OUT = path.join(process.cwd(), "scripts", "source-catalog.json");

const BIG_CATS = [
  { id: 1, zh: "双向拉伸聚丙烯薄膜", en: "BOPP Film", slug: "bopp-film" },
  { id: 14, zh: "双向拉伸聚酯薄膜", en: "BOPET Film", slug: "bopet-film" },
  { id: 3, zh: "胶粘带和胶水", en: "Adhesive Tape & Glue", slug: "adhesive-tape-glue" },
  { id: 2, zh: "涂布膜", en: "Coated Film", slug: "coated-film" },
  { id: 16, zh: "聚苯乙烯膜、流延聚丙烯膜、尼龙膜", en: "PS / CPP / Nylon Film", slug: "ps-cpp-nylon-film" },
  { id: 20, zh: "拉线、碳带、标签、打码机等", en: "Tear Tape, Ribbon & Labels", slug: "tear-tape-ribbon-label" },
  { id: 17, zh: "聚乙烯、聚氯乙烯、聚烯烃薄膜和袋子", en: "PE / PVC / PO Film & Bags", slug: "pe-pvc-po-film-bags" },
  { id: 11, zh: "纸制品", en: "Paper Products", slug: "paper-products" },
  { id: 10, zh: "机器设备和电子产品", en: "Machinery & Electronics", slug: "machinery-electronics" },
  { id: 24, zh: "光伏太阳能板", en: "Solar Panels", slug: "solar-panels" },
  { id: 21, zh: "汽配和防疫用品", en: "Auto Parts & Protection", slug: "auto-parts-protection" },
];

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/\s+/g, " ")
    .trim();

async function get(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; SiteMigration/1.0)" },
    signal: AbortSignal.timeout(25000),
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return buf.toString("utf8");
}

function maxPage(html) {
  const clean = html.replace(/&amp;/g, "&");
  const nums = [...clean.matchAll(/[?&]page=(\d+)/g)].map((m) => +m[1]);
  return nums.length ? Math.max(...nums) : 1;
}

function parseProducts(html) {
  const out = [];
  // Each product cell: link + img (code/alt) then a link with code <br> name
  const cellRe =
    /<a href="\.\.\/(c_html_products\/[^"]+\.html)"[^>]*>\s*<img[^>]*src="\.\.\/(pic\/big\/[^"]+)"[^>]*alt="([^"]*)"[^>]*>\s*<\/a>[\s\S]{0,400}?<a href="\.\.\/c_html_products\/[^"]+\.html"[^>]*>\s*([^<]+?)<br\s*\/?>\s*([^<]+?)<\/a>/g;
  for (const m of html.matchAll(cellRe)) {
    out.push({
      url: m[1],
      image: m[2],
      alt: decode(m[3]),
      code: decode(m[4]),
      nameZh: decode(m[5]),
    });
  }
  // dedupe by url
  const seen = new Set();
  return out.filter((p) => (seen.has(p.url) ? false : (seen.add(p.url), true)));
}

function parseSubcats(html) {
  const out = [];
  const re = /href="([^"]*small_id=(\d+)[^"]*)"[^>]*>([^<]{2,80})</g;
  for (const m of html.matchAll(re)) {
    const label = decode(m[3]).replace(/^[└├│\s\-]+/, "");
    if (!label || out.some((x) => x.id === +m[2])) continue;
    out.push({ id: +m[2], zh: label, url: decode(m[1]) });
  }
  return out;
}

(async () => {
  const result = [];
  for (const cat of BIG_CATS) {
    const first = await get(`${BASE}/c_products/?big_id=${cat.id}`);
    const pages = Math.min(maxPage(first), 12);
    let products = parseProducts(first);
    const subcats = parseSubcats(first);
    for (let p = 2; p <= pages; p++) {
      try {
        const html = await get(
          `${BASE}/c_products/?big_id=${cat.id}&small_id=&page=${p}&key=`
        );
        products = products.concat(parseProducts(html));
      } catch (e) {
        console.warn(`  page ${p} failed: ${e.message}`);
      }
    }
    const seen = new Set();
    products = products.filter((x) =>
      seen.has(x.url) ? false : (seen.add(x.url), true)
    );
    result.push({ ...cat, subcats, products });
    console.log(
      `${cat.en.padEnd(30)} pages=${pages} products=${products.length} subcats=${subcats.length}`
    );
  }
  fs.writeFileSync(OUT, JSON.stringify(result, null, 2), "utf8");
  console.log(`\nWrote ${OUT}`);
  console.log(`Total products: ${result.reduce((n, c) => n + c.products.length, 0)}`);
})();
