// check_product.js - 检查 products 表中 id=1 及 BOPP 产品的实际数据
// 运行方式: cd C:\Users\DELL\Desktop\boppfilmsale-next && node check_product.js
const { createClient } = require("@libsql/client");
require("dotenv").config({ path: ".env.local" });

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function check() {
  // 1. 查 id=1 的所有语言版本
  const rows = await db.execute("SELECT id, lang, name, model, intro, description, summary, image, images FROM products WHERE id = 1");
  console.log("=== id=1 所有记录 ===");
  console.log(JSON.stringify(rows.rows, null, 2));

  // 2. 查 lang='cn' 且 name 包含 BOPP 的前 5 条
  const cn = await db.execute(
    "SELECT id, lang, name, model, intro, description, summary, image, images FROM products WHERE lang='cn' AND name LIKE '%BOPP%' LIMIT 5"
  );
  console.log("\n=== lang='cn' BOPP 产品 ===");
  console.log(JSON.stringify(cn.rows, null, 2));

  // 3. 查 lang='en' 的前 5 条 BOPP
  const en = await db.execute(
    "SELECT id, lang, name, model, intro, description, summary, image, images FROM products WHERE lang='en' AND name LIKE '%BOPP%' LIMIT 5"
  );
  console.log("\n=== lang='en' BOPP 产品 ===");
  console.log(JSON.stringify(en.rows, null, 2));

  // 4. 统计 description / image 为空的比例
  const stat = await db.execute(
    "SELECT lang, COUNT(*) as total, SUM(CASE WHEN description IS NOT NULL AND description != '' THEN 1 ELSE 0 END) as has_desc, SUM(CASE WHEN image IS NOT NULL AND image != '' THEN 1 ELSE 0 END) as has_img FROM products GROUP BY lang"
  );
  console.log("\n=== 各语言 description/image 填充率 ===");
  console.log(JSON.stringify(stat.rows, null, 2));

  db.close();
}

check().catch((e) => {
  console.error("查询失败:", e.message);
  process.exit(1);
});