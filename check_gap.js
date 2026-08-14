// check_gap.js - 检查 image 字段哪些还没填充
const { createClient } = require("@libsql/client");
require("dotenv").config({ path: ".env.local" });

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function main() {
  // 1. 按语言统计 image 非空
  const r1 = await db.execute(
    "SELECT lang, COUNT(*) total, SUM(CASE WHEN image IS NOT NULL AND image != '' THEN 1 ELSE 0 END) has_img, SUM(CASE WHEN images IS NOT NULL AND images != '' THEN 1 ELSE 0 END) has_gallery FROM products GROUP BY lang"
  );
  console.log("=== 按语言统计 ===");
  console.log(JSON.stringify(r1.rows, null, 2));

  // 2. image 为空但有图库（应该被修复但没修的）
  const r2 = await db.execute(
    "SELECT COUNT(*) c FROM products WHERE (image IS NULL OR image = '') AND images IS NOT NULL AND images != ''"
  );
  console.log("\n=== image 为空但有图库的条数:", r2.rows[0].c);

  // 3. 样例：image 为空的记录
  const r3 = await db.execute(
    "SELECT id, lang, name, image, images FROM products WHERE (image IS NULL OR image = '') AND images IS NOT NULL AND images != '' LIMIT 5"
  );
  console.log("\n=== image 为空但有图库的样例 ===");
  console.log(JSON.stringify(r3.rows, null, 2));

  db.close();
}

main().catch((e) => {
  console.error("查询失败:", e.message);
  process.exit(1);
});