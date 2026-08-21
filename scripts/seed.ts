import { execute } from "../lib/db";
import * as fs from "fs";
import * as path from "path";

const schema = fs.readFileSync(path.resolve(__dirname, "../db/schema.sql"), "utf-8");
// Turso 不支持 /* */ 注释，去掉
const cleanSchema = schema
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .split(";")
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

const categoriesCn = [
  "双向拉伸聚丙烯薄膜",
  "双向拉伸聚酯薄膜",
  "胶粘带和胶水",
  "涂布膜",
  "中间体",
  "聚苯乙烯膜、流延聚丙烯膜、尼龙膜",
  "拉线、碳带、标签、打码机等",
  "聚乙烯、聚氯乙烯、聚烯烃薄膜和袋子",
  "纸制品",
  "机器设备和电子产品",
  "防疫用品",
];
const categoriesEn = [
  "Biaxially Oriented Polypropylene Film",
  "Biaxially Oriented Polyester Film",
  "Adhesive Tape and Glue",
  "Coating Film",
  "Intermediates",
  "PS Film, CPP Film, Nylon Film",
  "Tear Tape, Ribbon, Label, Coding Machine",
  "PE, PVC, PO Film and Bags",
  "Paper Products",
  "Machinery and Electronics",
  "Epidemic Prevention Supplies",
];

const sampleProducts: Record<number, [string, string, string][]> = {
  1: [
    ["BOPP 光膜", "BOPP-G12", "双向拉伸聚丙烯普通光膜，适用于印刷复合包装。"],
    ["BOPP 消光膜", "BOPP-M20", "表面消光处理，质感柔和，常用于高档包装。"],
    ["BOPP 热封膜", "BOPP-H35", "单/双面热封型，适用于自动包装生产线。"],
  ],
  2: [
    ["BOPET 镀铝膜", "BOPET-M50", "高阻隔镀铝聚酯薄膜，用于食品、医药包装。"],
    ["BOPET 电容膜", "BOPET-C08", "超薄电工级聚酯薄膜，适用于电容器。"],
  ],
  3: [
    ["BOPP 封箱胶带", "TAPE-48", "水性压敏胶带，强粘耐久，通用封箱。"],
    ["丙烯酸胶水", "GLUE-AC01", "环保型丙烯酸乳液，适用于涂布复合。"],
  ],
  4: [
    ["PVDC 涂布膜", "PVDC-12", "高阻隔涂布膜，延长食品保鲜期。"],
    ["丙烯酸涂布膜", "AC-COAT", "表面功能化处理，提升印刷适性。"],
  ],
  5: [["伽马丁内酯", "IM-99", "医药/化工中间体原料。"]],
  6: [
    ["CPP 流延膜", "CPP-25", "流延聚丙烯薄膜，热封性能优异。"],
    ["尼龙膜", "NY-15", "高强度 PA 薄膜，耐穿刺。"],
  ],
  7: [
    ["热转印碳带", "RIBBON-W", "蜡基/混合基碳带，打印清晰。"],
    ["打码机", "CODING-M1", "小字符喷码设备。"],
  ],
  8: [
    ["PE 缠绕膜", "PE-WRAP", "拉伸缠绕膜，托盘包装防护。"],
    ["POF 收缩膜", "POF-19", "环保型收缩膜，透明度高。"],
  ],
  9: [["复印纸", "A4-70", "80g 双面复印纸。"]],
  10: [["分切机", "SLIT-1600", "高精度薄膜分切设备。"]],
  11: [["防护口罩", "MASK-KN95", "KN95 防护口罩。"]],
};

async function main() {
  console.log("重建表（先删后建，确保结构最新）...");
  const drops = [
    "DROP TABLE IF EXISTS product_categories",
    "DROP TABLE IF EXISTS product_subcategories",
    "DROP TABLE IF EXISTS products",
    "DROP TABLE IF EXISTS news",
    "DROP TABLE IF EXISTS pages",
    "DROP TABLE IF EXISTS orders",
    "DROP TABLE IF EXISTS feedback",
    "DROP TABLE IF EXISTS links",
    "DROP TABLE IF EXISTS admin_users",
  ];
  for (const d of drops) {
    try { await execute(d); } catch {}
  }
  for (const stmt of cleanSchema) {
    try {
      await execute(stmt);
    } catch (e: any) {
      console.warn("建表语句失败:", e?.message);
    }
  }
  console.log("建表完成");

  await execute("DELETE FROM product_categories");
  await execute("DELETE FROM products");
  await execute("DELETE FROM news");
  await execute("DELETE FROM pages");

  for (let i = 0; i < categoriesCn.length; i++) {
    await execute("INSERT INTO product_categories (lang, name, sort) VALUES (?, ?, ?)", ["cn", categoriesCn[i], i + 1]);
    await execute("INSERT INTO product_categories (lang, name, sort) VALUES (?, ?, ?)", ["en", categoriesEn[i], i + 1]);
  }
  console.log(`已插入 ${categoriesCn.length} 个大类（中英各一份）`);

  let pid = 0;
  for (let catId = 1; catId <= categoriesCn.length; catId++) {
    const list = sampleProducts[catId] || [];
    for (const [name, model, intro] of list) {
      pid++;
      await execute("INSERT INTO products (lang, category_id, name, model, intro, sort) VALUES (?, ?, ?, ?, ?, ?)", ["cn", catId, name, model, intro, pid]);
      await execute("INSERT INTO products (lang, category_id, name, model, intro, sort) VALUES (?, ?, ?, ?, ?, ?)", ["en", catId, `${name} (EN)`, model, intro, pid]);
    }
  }
  console.log("已插入示例产品");

  const newsCn = [
    ["公司通过 ISO 9001 质量体系认证", "东渐集团于近日顺利通过 ISO 9001 质量管理体系认证，标志着公司管理水平再上新台阶。"],
    ["新产品 BOPP 消光膜量产", "我司自主研发的 BOPP 消光膜已正式量产，产品性能达到行业领先水平。"],
  ];
  const newsEn = [
    ["Company Passes ISO 9001 Certification", "AEC Group has successfully passed the ISO 9001 quality management system certification."],
    ["New BOPP Matte Film in Mass Production", "Our self-developed BOPP matte film has entered mass production with industry-leading performance."],
  ];
  for (let i = 0; i < newsCn.length; i++) {
    await execute("INSERT INTO news (lang, title, content, summary, sort) VALUES (?, ?, ?, ?, ?)", ["cn", newsCn[i][0], newsCn[i][1], newsCn[i][1].slice(0, 30), i + 1]);
    await execute("INSERT INTO news (lang, title, content, summary, sort) VALUES (?, ?, ?, ?, ?)", ["en", newsEn[i][0], newsEn[i][1], newsEn[i][1].slice(0, 30), i + 1]);
  }

  const aboutCn = `<h2>中国东渐集团</h2><p>东渐集团是由安徽东渐新材料有限公司和安徽东渐进出口有限公司组成的，集生产、研发、销售和服务为一体的综合性企业，产品覆盖塑膜工业、涂布工业、印刷复合业、镀铝镭射等行业。</p><p>公司从软塑料包装薄膜及制品业起步，成长为在包装薄膜、薄膜深加工（彩印、镀铝、涂布、分切等）、薄膜电子材料、胶粘带、胶水及自动化机械设备等行业具有雄厚实力的大型企业。</p>`;
  const aboutEn = `<h2>AEC Group</h2><p>AEC Group, composed of Anhui Dongjian New Materials Co., Ltd. and Anhui Dongjian Import & Export Co., Ltd., is a comprehensive enterprise integrating production, R&D, sales and service, covering plastic film, coating, printing and metallizing industries.</p>`;
  const contactCn = `<p><strong>联系人：</strong>杨经理</p><p><strong>电话：</strong>86-551-64687285 / 63483992</p><p><strong>传真：</strong>86-551-64683490</p><p><strong>手机：</strong>18919659471</p><p><strong>邮箱：</strong>sale@boppfilmsale.com</p><p><strong>地址：</strong>安徽省合肥市包河区徽州大道1158号（邮编：230051）</p><p><strong>Skype：</strong>boppfilmsales　<strong>QQ：</strong>2538474128</p>`;
  const contactEn = `<p><strong>Contact：</strong>Manager Yang</p><p><strong>Tel：</strong>86-551-64687285</p><p><strong>Email：</strong>sale@boppfilmsale.com</p><p><strong>Address：</strong>No.1158 Huizhou Avenue, Baohe District, Hefei, Anhui (230051)</p>`;

  await execute("INSERT INTO pages (lang, slug, title, content, sort) VALUES (?,?,?,?,?)", ["cn", "about", "关于我们", aboutCn, 1]);
  await execute("INSERT INTO pages (lang, slug, title, content, sort) VALUES (?,?,?,?,?)", ["en", "about", "About Us", aboutEn, 1]);
  await execute("INSERT INTO pages (lang, slug, title, content, sort) VALUES (?,?,?,?,?)", ["cn", "contact", "联系我们", contactCn, 2]);
  await execute("INSERT INTO pages (lang, slug, title, content, sort) VALUES (?,?,?,?,?)", ["en", "contact", "Contact Us", contactEn, 2]);

  console.log("示例数据灌入完成 ✅");
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
