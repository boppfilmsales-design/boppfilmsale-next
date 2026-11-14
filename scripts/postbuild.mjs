// Static export uses one root layout, so every generated HTML file starts
// with <html lang="en">. Rewrite the Chinese branch to lang="zh-CN" and add
// the matching og:locale — important for both accessibility and crawling.
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
if (!fs.existsSync(OUT)) {
  console.error("postbuild: out/ not found — run next build first");
  process.exit(1);
}

const files = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full);
    else if (name.endsWith(".html")) files.push(full);
  }
}
walk(OUT);

let fixed = 0;
for (const file of files) {
  const rel = path.relative(OUT, file).replace(/\\/g, "/");
  const isZh = rel === "zh.html" || rel.startsWith("zh/");
  if (!isZh) continue;
  let html = fs.readFileSync(file, "utf8");
  const next = html
    .replace(/<html([^>]*)\blang="en"/, '<html$1lang="zh-CN"')
    .replace(/(<meta property="og:locale" content=")en_US(")/, "$1zh_CN$2");
  if (next !== html) {
    fs.writeFileSync(file, next, "utf8");
    fixed++;
  }
}

console.log(`postbuild: set lang="zh-CN" on ${fixed} Chinese HTML pages (${files.length} HTML files total)`);
