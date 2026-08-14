// fix_product_data.js - 修复产品数据：图片路径补全为绝对 URL + 填充缺失字段
// 用法:
//   node fix_product_data.js          # 预览模式（只统计，不修改）
//   node fix_product_data.js --apply  # 真正执行更新
const { createClient } = require("@libsql/client");
require("dotenv").config({ path: ".env.local" });

const APPLY = process.argv.includes("--apply");
const BASE = "http://www.boppfilmsale.com/";

function absUrl(p) {
  p = p.trim();
  if (!p) return null;
  if (/^https?:\/\//i.test(p)) return p;          // 已经是绝对 URL
  if (p.startsWith("/")) return BASE + p.slice(1); // /pic/x.jpg -> http://.../pic/x.jpg
  return BASE + p;                                 // pic/x.jpg -> http://.../pic/x.jpg
}

async function main() {
  const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  const all = await db.execute("SELECT id, image, images, intro, description FROM products");
  const rows = all.rows;
  console.log(`共 ${rows.length} 条产品记录`);

  let fixImage = 0, fixImages = 0, fixDesc = 0, fixImageFromGallery = 0;
  const updates = [];

  for (const r of rows) {
    const id = r.id;

    // 1) image 字段补全为绝对 URL
    let newImage = r.image;
    if (r.image && !/^https?:\/\//i.test(r.image)) {
      newImage = absUrl(r.image);
      fixImage++;
    }

    // 2) images 字段每个路径补全
    let newImages = null;
    if (r.images) {
      const parts = r.images.split(",").map((s) => s.trim()).filter(Boolean).map(absUrl);
      if (parts.length) {
        const joined = parts.join(",");
        if (joined !== r.images) {
          newImages = joined;
          fixImages++;
        } else {
          newImages = r.images;
        }
      }
    }

    // 3) description 为空时用 intro 填充
    let newDesc = r.description;
    if ((!r.description || !String(r.description).trim()) && r.intro && String(r.intro).trim()) {
      newDesc = r.intro;
      fixDesc++;
    }

    // 4) image 为空但有图库时取第一张
    if ((!newImage || !String(newImage).trim()) && newImages) {
      newImage = newImages.split(",")[0];
      fixImageFromGallery++;
    }

    if (newImage !== r.image || newImages !== r.images || newDesc !== r.description) {
      updates.push({ id, image: newImage, images: newImages, description: newDesc });
    }
  }

  console.log(`需更新: image补全 ${fixImage} | images补全 ${fixImages} | description填充 ${fixDesc} | image取图库首张 ${fixImageFromGallery}`);
  console.log(`总更新记录: ${updates.length} 条`);

  if (!APPLY) {
    console.log("\n[预览模式] 未执行任何修改。确认无误后运行: node fix_product_data.js --apply");
    db.close();
    return;
  }

  let ok = 0, fail = 0;
  for (const u of updates) {
    try {
      await db.execute(
        "UPDATE products SET image = ?, images = ?, description = ? WHERE id = ?",
        [u.image, u.images, u.description, u.id]
      );
      ok++;
    } catch (e) {
      fail++;
      console.error(`id=${u.id} 更新失败: ${e.message}`);
    }
  }
  console.log(`\n更新完成: 成功 ${ok} 条, 失败 ${fail} 条`);

  // 验证
  const v = await db.execute("SELECT COUNT(*) as c FROM products WHERE image LIKE 'http%'");
  const v2 = await db.execute("SELECT COUNT(*) as c FROM products WHERE description IS NULL OR description = ''");
  console.log(`验证: 绝对URL image 数量 = ${v.rows[0].c} | description 仍为空 = ${v2.rows[0].c}`);
  db.close();
}

main().catch((e) => {
  console.error("执行失败:", e.message);
  process.exit(1);
});