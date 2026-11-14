// Fetch detail text + download product images for every scraped product.
// Run: node scripts/scrape-details.mjs
import fs from "node:fs";
import path from "node:path";

const BASE = "https://old.boppfilmsale.com";
const ROOT = process.cwd();
const CATALOG = path.join(ROOT, "scripts", "source-catalog.json");
const OUT = path.join(ROOT, "scripts", "source-details.json");
const IMG_DIR = path.join(ROOT, "public", "products");

fs.mkdirSync(IMG_DIR, { recursive: true });

const cats = JSON.parse(fs.readFileSync(CATALOG, "utf8"));
const products = cats.flatMap((c) =>
  c.products.map((p) => ({ ...p, catId: c.id, catSlug: c.slug, catEn: c.en, catZh: c.zh }))
);

function cleanText(html) {
  let t = html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|tr|td|li|h\d)>/gi, "\n")
    .replace(/<[^>]+>/g, " ");
  t = t
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&le;/gi, "<=")
    .replace(/&ge;/gi, ">=")
    .replace(/&middot;/gi, "·")
    .replace(/&bull;/gi, "•")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/[ \t\u3000]+/g, " ")
    .replace(/\n\s*\n+/g, "\n");
  return t.trim();
}

function extractDetail(html) {
  const text = cleanText(html);
  // The detail block starts after "详细说明"
  const start = text.indexOf("详细说明");
  const endMarks = ["←[上一个产品", "上一个产品", "首页 | 关于我们", "皖ICP备"];
  let end = text.length;
  for (const m of endMarks) {
    const i = text.indexOf(m, start >= 0 ? start : 0);
    if (i > 0 && i < end) end = i;
  }
  const body = (start >= 0 ? text.slice(start + 4, end) : text.slice(0, 4000)).trim();

  const grab = (label) => {
    const re = new RegExp(label + "\\s*[:：]?\\s*([^\\n]{1,160})", "i");
    const m = body.match(re);
    return m ? m[1].trim() : "";
  };

  return {
    description: body.slice(0, 2600),
    thickness: grab("产品厚度|厚度"),
    width: grab("产品宽度|宽度"),
    length: grab("产品长度|长度"),
    features: grab("产品特点|特点"),
    applications: grab("产品用途|用途|应用"),
  };
}

async function fetchWithRetry(url, tries = 2) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; SiteMigration/1.0)" },
        signal: AbortSignal.timeout(20000),
      });
      if (!res.ok) throw new Error(String(res.status));
      return Buffer.from(await res.arrayBuffer());
    } catch (e) {
      if (i === tries - 1) throw e;
    }
  }
}

async function pool(items, limit, fn) {
  let idx = 0;
  const workers = Array.from({ length: limit }, async () => {
    while (idx < items.length) {
      const i = idx++;
      try {
        await fn(items[i], i);
      } catch (e) {
        // ignore individual failures
      }
    }
  });
  await Promise.all(workers);
}

(async () => {
  const details = {};
  let done = 0;
  await pool(products, 10, async (p) => {
    const url = `${BASE}/${p.url.replace(/^\//, "")}`;
    const buf = await fetchWithRetry(url);
    details[p.url] = { ...extractDetail(buf.toString("utf8")), sourceUrl: url };
    done++;
    if (done % 50 === 0) console.log(`details ${done}/${products.length}`);
  });
  fs.writeFileSync(OUT, JSON.stringify(details, null, 2), "utf8");
  console.log(`details saved: ${Object.keys(details).length}/${products.length}`);

  // Download images (one per unique product)
  const targets = [];
  const seen = new Set();
  for (const p of products) {
    if (!p.image || seen.has(p.image)) continue;
    seen.add(p.image);
    targets.push(p.image);
  }
  let imgDone = 0;
  await pool(targets, 12, async (rel) => {
    const name = path.basename(rel);
    const dest = path.join(IMG_DIR, name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) return;
    const buf = await fetchWithRetry(`${BASE}/${rel.replace(/^\//, "")}`);
    if (buf.length > 1000 && buf[0] === 0xff && buf[1] === 0xd8) {
      fs.writeFileSync(dest, buf);
    }
    imgDone++;
    if (imgDone % 50 === 0) console.log(`images ${imgDone}/${targets.length}`);
  });
  console.log(`images downloaded: ${fs.readdirSync(IMG_DIR).length}/${targets.length}`);
})();
