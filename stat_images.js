// stat_images.js - 统计图片字段情况
const { createClient } = require("@libsql/client");
require("dotenv").config({ path: ".env.local" });

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function main() {
  // 1. 有 image 的产品数
  const r1 = await db.execute(
    "SELECT COUNT(*) as c FROM products WHERE image IS NOT NULL AND image != ''"
  );
  console.log("有 image 的产品数:", r1.rows[0].c);

  // 2. 有 images (图库) 的产品数
  const r2 = await db.execute(
    "SELECT COUNT(*) as c FROM products WHERE images IS NOT NULL AND images != ''"
  );
  console.log("有 images 图库的产品数:", r2.rows[0].c);

  // 3. description 为空的产品数
  const r3 = await db.execute(
    "SELECT COUNT(*) as c FROM products WHERE description IS NULL OR description = ''"
  );
  console.log("description 为空的产品数:", r3.rows[0].c);

  // 4. 样例：有图库的产品路径格式
  const r4 = await db.execute(
    "SELECT id, lang, name, image, images FROM products WHERE images IS NOT NULL AND images != '' LIMIT 3"
  );
  console.log("\n有图库产品样例:");
  r4.rows.forEach((r) => {
    console.log(`  id=${r.id} lang=${r.lang} name=${r.name}`);
    console.log(`    image=${r.image}`);
    console.log(`    images=${r.images}`);
  });

  // 5. 统计去重后的图片文件数量
  const r5 = await db.execute(
    "SELECT images FROM products WHERE images IS NOT NULL AND images != ''"
  );
  const files = new Set();
  r5.rows.forEach((r) => {
    r.images.split(",").forEach((s) => {
      s = s.trim();
      if (s) files.add(s);
    });
  });
  console.log("\n去重后图片路径总数:", files.size);

  // 6. 有几个不同的目录前缀
  const prefixes = new Set();
  files.forEach((f) => {
    const parts = f.split("/");
    prefixes.add(parts.slice(0, -1).join("/"));
  });
  console.log("图片目录前缀:", [...prefixes].join(", "));

  db.close();
}

main().catch((e) => {
  console.error("查询失败:", e.message);
  process.exit(1);
});