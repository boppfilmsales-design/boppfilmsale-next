// fix_gap.js - 补修 image/images 仍缺失的记录（幂等，可反复运行）
// 用法: node fix_gap.js
const { createClient } = require("@libsql/client");
require("dotenv").config({ path: ".env.local" });

const BASE = "http://www.boppfilmsale.com/";

function absUrl(p) {
  p = p.trim();
  if (!p) return null;
  if (/^https?:\/\//i.test(p)) return p;
  if (p.startsWith("/")) return BASE + p.slice(1);
  return BASE + p;
}

async function main() {
  const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  // 只取仍缺失/还是相对路径的记录
  const r = await db.execute(
    "SELECT id, image, images FROM products WHERE (image IS NULL OR image = '' OR image NOT LIKE 'http%' OR images IS NULL OR images = '' OR images NOT LIKE '%http%')"
  );
  const rows = r.rows;
  console.log(`需要修复的记录: ${rows.length} 条`);

  let ok = 0, fail = 0;
  for (let i = 0; i < rows.length; i++) {
    const rec = rows[i];
    // 图片列表补全
    let imgs = null;
    if (rec.images) {
      const parts = rec.images.split(",").map((s) => s.trim()).filter(Boolean).map(absUrl);
      if (parts.length) imgs = parts.join(",");
    }
    // image 补全/取首张
    let img = rec.image ? absUrl(rec.image) : null;
    if ((!img || !img.trim()) && imgs) img = imgs.split(",")[0];

    try {
      await db.execute(
        "UPDATE products SET image = ?, images = ? WHERE id = ?",
        [img, imgs, rec.id]
      );
      ok++;
    } catch (e) {
      fail++;
      console.error(`id=${rec.id} 失败: ${e.message}`);
    }
    if ((i + 1) % 200 === 0) {
      console.log(`进度: ${i + 1}/${rows.length} (成功${ok} 失败${fail})`);
      // 稍等，避免速率限制
      await new Promise((res) => setTimeout(res, 1000));
    }
  }

  console.log(`\n修复完成: 成功 ${ok} 条, 失败 ${fail} 条`);

  // 验证
  const v = await db.execute(
    "SELECT lang, COUNT(*) total, SUM(CASE WHEN image IS NOT NULL AND image != '' THEN 1 ELSE 0 END) has_img FROM products GROUP BY lang"
  );
  console.log("验证:", JSON.stringify(v.rows, null, 2));
  db.close();
}

main().catch((e) => {
  console.error("执行失败:", e.message);
  process.exit(1);
});