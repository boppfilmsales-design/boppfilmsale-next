// Turn the scraped source catalogue into a clean bilingual TS data module.
// Run: node scripts/build-catalog.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const cats = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/source-catalog.json"), "utf8"));
const detailsPath = path.join(ROOT, "scripts/source-details.json");
const details = fs.existsSync(detailsPath) ? JSON.parse(fs.readFileSync(detailsPath, "utf8")) : {};
const imgDir = path.join(ROOT, "public/products");
const available = new Set(fs.existsSync(imgDir) ? fs.readdirSync(imgDir) : []);

/* ---------- category metadata ---------- */
const CAT_META = {
  "bopp-film": {
    en: "BOPP Film",
    zh: "BOPP 双向拉伸聚丙烯薄膜",
    descEn: "Plain, heat-sealable, matte, pearlized, metallized, cigarette and capacitor grades — the core of flexible packaging.",
    descZh: "平膜、热封膜、消光膜、珠光膜、镀铝膜、烟膜与电容膜，软包装的基础材料。",
    usesEn: "Food packaging · Lamination · Printing · Tape base · Labels · Capacitors",
    usesZh: "食品包装 · 复合 · 印刷 · 胶带基材 · 标签 · 电容器",
  },
  "bopet-film": {
    en: "BOPET Film",
    zh: "BOPET 双向拉伸聚酯薄膜",
    descEn: "Polyester films for thermal transfer, metallizing, electrical insulation, capacitors and high-clarity printing.",
    descZh: "用于热转印、镀铝、电气绝缘、电容器与高透明印刷的聚酯薄膜。",
    usesEn: "Thermal transfer · Metallizing · Insulation · Capacitors · Printing",
    usesZh: "热转印 · 镀铝 · 绝缘 · 电容器 · 印刷",
  },
  "adhesive-tape-glue": {
    en: "Adhesive Tape & Glue",
    zh: "胶粘带与胶水",
    descEn: "BOPP packing tape, jumbo rolls, masking tape, double-sided tape, hot-melt and acrylic adhesives.",
    descZh: "BOPP 封箱胶带、母卷半成品、美纹纸胶带、双面胶带及热熔胶、丙烯酸胶水。",
    usesEn: "Carton sealing · Converting · Labelling · Industrial bonding",
    usesZh: "封箱 · 深加工 · 标签 · 工业粘接",
  },
  "coated-film": {
    en: "Coated & Lamination Film",
    zh: "涂布膜与预涂膜",
    descEn: "EVA thermal lamination, PVDC (K-film), acrylic and specialty coated films for barrier and print protection.",
    descZh: "EVA 预涂膜、PVDC 涂布（K 膜）、丙烯酸涂布及特种涂布膜，提升阻隔与印刷保护。",
    usesEn: "Print finishing · High barrier · Thermal lamination · Luxury packaging",
    usesZh: "印后覆膜 · 高阻隔 · 热复合 · 精品包装",
  },
  "ps-cpp-nylon-film": {
    en: "PS / CPP / Nylon Film",
    zh: "BOPS、CPP、尼龙膜",
    descEn: "BOPS window and sheet film, cast polypropylene (CPP), metallized CPP and biaxially oriented nylon.",
    descZh: "BOPS 窗口膜与片材、流延聚丙烯 CPP 膜、CPP 镀铝膜及双向拉伸尼龙膜。",
    usesEn: "Windows & envelopes · Retort pouches · Composite bags · Thermoforming",
    usesZh: "窗口信封 · 蒸煮袋 · 复合袋 · 热成型",
  },
  "tear-tape-ribbon-label": {
    en: "Tear Tape, Ribbon & Labels",
    zh: "拆封拉线、碳带与标签",
    descEn: "Thermal transfer ribbons, tear tapes, self-adhesive barcode labels and coding machines.",
    descZh: "热转印碳带、拆封拉线、不干胶条码标签与打码设备。",
    usesEn: "Barcode printing · Tamper evidence · Brand protection · Coding",
    usesZh: "条码打印 · 防伪拆封 · 品牌保护 · 打码",
  },
  "pe-pvc-po-film-bags": {
    en: "PE / PVC / POF Film & Bags",
    zh: "PE、PVC、POF 膜及袋",
    descEn: "POF shrink film, PE stretch and cling film, PVC film, bubble film and finished packaging bags.",
    descZh: "POF 热收缩膜、PE 缠绕膜与保鲜膜、PVC 膜、气泡膜及各类包装袋。",
    usesEn: "Shrink wrapping · Pallet wrap · Food cling · Protective packaging",
    usesZh: "收缩包装 · 托盘缠绕 · 食品保鲜 · 缓冲防护",
  },
  "paper-products": {
    en: "Paper Products",
    zh: "纸制品",
    descEn: "Copy paper, lightweight coated (LWC) paper, photo paper, thermal paper and printing consumables.",
    descZh: "复印纸、轻量涂布纸、相纸、热敏纸及打印耗材。",
    usesEn: "Office printing · Publishing · Labels · Imaging",
    usesZh: "办公打印 · 出版 · 标签 · 影像输出",
  },
  "machinery-electronics": {
    en: "Packaging Machinery",
    zh: "包装机械与电子产品",
    descEn: "Slitting and rewinding machines, coating lines, printing presses, packaging and shrinking equipment.",
    descZh: "分切复卷机、涂布机、印刷机、包装机与收缩设备。",
    usesEn: "Film converting · Slitting · Coating · End-of-line packing",
    usesZh: "薄膜深加工 · 分切 · 涂布 · 后道包装",
  },
  "solar-panels": {
    en: "Solar Panels",
    zh: "光伏太阳能板",
    descEn: "High-efficiency mono PERC and bifacial double-glass photovoltaic modules.",
    descZh: "高效单晶 PERC 与双面双玻光伏组件。",
    usesEn: "Utility PV · Commercial rooftops · Renewable energy",
    usesZh: "地面电站 · 工商业屋顶 · 可再生能源",
  },
  "auto-parts-protection": {
    en: "Auto Parts & Protection",
    zh: "汽配与防疫用品",
    descEn: "Wheel hubs, tyres, bicycle components and protective mask products.",
    descZh: "轮毂、轮胎、自行车配件及防护口罩等用品。",
    usesEn: "Automotive aftermarket · Personal protection",
    usesZh: "汽车后市场 · 个人防护",
  },
};

/* ---------- Chinese -> English product-name dictionary ---------- */
const DICT = [
  [/安全套|避孕套/gi, "Condom"],
  [/轮毂/g, "Wheel Hub"], [/轮胎/g, "Tyre"], [/自行车配件/g, "Bicycle Parts"],
  [/口罩|防疫用品/g, "Protective Mask"],
  [/双向拉伸聚丙烯薄膜|BOPP平膜|BOPP 平膜/gi, "BOPP Plain Film"],
  [/珠光膜|珍珠膜/g, "Pearlized BOPP Film"],
  [/镀铝膜|镀铝/g, "Metallized Film"],
  [/消光膜|哑光膜/g, "Matte BOPP Film"],
  [/光膜/g, "Glossy BOPP Film"],
  [/热封膜/g, "Heat Sealable BOPP Film"],
  [/烟膜|香烟包装膜/g, "Cigarette Overwrap Film"],
  [/电容膜/g, "Capacitor Film"],
  [/胶带膜/g, "BOPP Tape Base Film"],
  [/制袋膜/g, "Bag-Making BOPP Film"],
  [/包花膜|鲜花/g, "Flower Wrapping Film"],
  [/印刷复合膜|印刷膜/g, "Printing & Lamination BOPP Film"],
  [/上光膜/g, "Thermal Lamination Film (Gloss)"],
  [/镭射膜|全息|激光/g, "Holographic Film"],
  [/打孔膜|透气膜/g, "Perforated Film"],
  [/防雾膜/g, "Anti-Fog Film"],
  [/抗静电膜/g, "Anti-Static Film"],
  [/扭结膜/g, "Twist Wrap Film"],
  [/预涂膜/g, "Thermal Lamination Film"],
  [/绝缘膜/g, "Electrical Insulation Film"],
  [/转移基膜|碳带膜/g, "Thermal Transfer Base Film"],
  [/超薄/g, "Ultra-Thin"],
  [/聚酯薄膜|BOPET/gi, "BOPET Polyester Film"],
  [/涂布膜/g, "Coated Film"],
  [/涂布/g, "Coated"],
  [/胶带半成品|母卷/g, "Adhesive Tape Jumbo Roll"],
  [/超透明胶带/g, "Crystal Clear BOPP Tape"],
  [/美纹纸胶带/g, "Masking Tape"],
  [/双面胶带/g, "Double-Sided Tape"],
  [/封箱胶带|胶带/g, "BOPP Packing Tape"],
  [/胶水/g, "Adhesive Glue"],
  [/珠光粉|颜料/g, "Pearlescent Pigment"],
  [/窗口膜|信封膜/g, "Window Envelope Film"],
  [/片材/g, "Sheet"],
  [/收缩膜/g, "Shrink Film"],
  [/尼龙膜/g, "Biaxially Oriented Nylon Film"],
  [/流延聚丙烯膜|CPP/gi, "CPP Cast Polypropylene Film"],
  [/碳带/g, "Thermal Transfer Ribbon"],
  [/拉线|拆封/g, "Tear Tape"],
  [/不干胶标签|自粘标签|标签/g, "Self-Adhesive Label"],
  [/打码机/g, "Coding Machine"],
  [/缠绕膜/g, "PE Stretch Wrap Film"],
  [/保鲜膜/g, "PVC Cling Film"],
  [/气泡膜/g, "Air Bubble Film"],
  [/托盘/g, "Pallet Wrap"],
  [/包装袋|袋子/g, "Packaging Bag"],
  [/POF/gi, "POF Shrink Film"],
  [/PE膜|聚乙烯膜/gi, "PE Film"],
  [/PVC膜|聚氯乙烯膜/gi, "PVC Film"],
  [/复印纸/g, "Copy Paper"],
  [/轻涂纸|轻量涂布纸/g, "Lightweight Coated Paper"],
  [/相纸/g, "Photo Paper"],
  [/热敏纸/g, "Thermal Paper"],
  [/皱纹纸/g, "Crepe Paper"],
  [/打印耗材/g, "Printing Consumables"],
  [/分切机|复卷机/g, "Slitting & Rewinding Machine"],
  [/涂布机/g, "Coating Machine"],
  [/印刷机/g, "Printing Press"],
  [/包装机/g, "Packaging Machine"],
  [/收缩机|收缩设备/g, "Shrink Wrapping Equipment"],
  [/太阳能板|光伏组件|PERC/gi, "PERC Solar Module"],
];

/** Ordered whole-name patterns. First match wins, so no stacked duplicates. */
const NAME_PATTERNS = [
  [/安全套|避孕套/, "Condom"],
  [/轮毂/, "Alloy Wheel Hub"], [/轮胎/, "Tyre"], [/自行车配件/, "Bicycle Components"],
  [/口罩|防疫用品/, "Protective Face Mask"],
  [/锌铝电工膜|锌铝/, "Zn-Al Metallized Capacitor Film"],
  [/电容膜/, "Capacitor Film"],
  [/扭结膜/, "Twist-Wrap Film"],
  [/彩色印刷.*膜|彩印.*膜/, "Colour-Printed BOPP Film"],
  [/全息|防伪|镭射|激光/, "Holographic BOPP Film"],
  [/珠光膜|珍珠膜|white opaque/i, "Pearlized / White Opaque BOPP Film"],
  [/珠光粉|颜料/, "Pearlescent Pigment"],
  [/预涂膜|上光膜|thermal lamination/i, "Thermal Lamination Film"],
  [/镀铝.*BOPET|BOPET.*镀铝/i, "Metallized BOPET Film"],
  [/镀铝|metallized/i, "Metallized BOPP Film"],
  [/消光|哑光|matte/i, "Matte BOPP Film"],
  [/防雾/, "Anti-Fog BOPP Film"],
  [/抗静电/, "Anti-Static BOPP Film"],
  [/打孔|穿孔|perforated/i, "Perforated BOPP Film"],
  [/热封/, "Heat-Sealable BOPP Film"],
  [/烟膜|香烟|cigarette/i, "Cigarette Overwrap Film"],
  [/胶带膜|tape.*film/i, "BOPP Tape Base Film"],
  [/制袋膜/, "Bag-Making BOPP Film"],
  [/包花|鲜花|flower/i, "Flower Wrapping Film"],
  [/印刷复合|printing.*laminat/i, "Printing & Lamination BOPP Film"],
  [/绝缘膜/, "Electrical Insulation BOPET Film"],
  [/碳带膜|转移基膜|超薄/, "Thermal Transfer Base Film"],
  [/平膜|光膜|plain|glossy/i, "BOPP Plain / Glossy Film"],
  [/双向拉伸聚丙烯|BOPP/i, "BOPP Film"],
  [/BOPET|聚酯薄膜/i, "BOPET Polyester Film"],
  [/PVDC|K膜|K 膜/i, "PVDC Coated (K) Film"],
  [/丙烯酸/, "Acrylic Coated Film"],
  [/EVA/, "EVA Pre-Coated Film"],
  [/涂布/, "Coated Film"],
  [/拉线|拆封|tear tape/i, "Tear Tape"],
  [/彩色碳带|碳带|ribbon/i, "Thermal Transfer Ribbon"],
  [/不干胶|自粘标签|标签|label/i, "Self-Adhesive Label"],
  [/打码机/, "Coding Machine"],
  [/超透明胶带/, "Crystal Clear BOPP Tape"],
  [/美纹纸/, "Masking Tape"],
  [/双面胶/, "Double-Sided Tape"],
  [/母卷|半成品/, "Adhesive Tape Jumbo Roll"],
  [/胶带/, "BOPP Packing Tape"],
  [/胶水/, "Adhesive Glue"],
  [/窗口膜|信封膜/, "BOPS Window Envelope Film"],
  [/片材/, "BOPS Sheet"],
  [/尼龙膜/, "Biaxially Oriented Nylon Film"],
  [/CPP|流延聚丙烯/i, "CPP Cast Polypropylene Film"],
  [/POF|热收缩/i, "POF Shrink Film"],
  [/缠绕膜/, "PE Stretch Wrap Film"],
  [/保鲜膜/, "PVC Cling Film"],
  [/气泡膜/, "Air Bubble Film"],
  [/包装袋|袋子/, "Packaging Bag"],
  [/PE膜|聚乙烯膜|^PE/i, "PE Film"],
  [/PVC膜|聚氯乙烯膜|^PVC/i, "PVC Film"],
  [/BOPS|聚苯乙烯/i, "BOPS Film"],
  [/复印纸/, "Copy Paper"],
  [/轻涂纸|轻量涂布/, "Lightweight Coated Paper"],
  [/相纸/, "Photo Paper"],
  [/热敏纸/, "Thermal Paper"],
  [/皱纹纸/, "Crepe Paper"],
  [/打印耗材/, "Printing Consumables"],
  [/分切|复卷/, "Slitting & Rewinding Machine"],
  [/涂布机/, "Coating Machine"],
  [/印刷机/, "Printing Press"],
  [/包装机/, "Packaging Machine"],
  [/收缩机|收缩设备/, "Shrink Wrapping Equipment"],
  [/太阳能|PERC|光伏/i, "PERC Solar Module"],
];

function toEnglishName(zh, code, catEn) {
  if (!zh) return cleanCode(code) || catEn;
  let base = "";
  for (const [re, rep] of NAME_PATTERNS) {
    if (re.test(zh)) { base = rep; break; }
  }
  // Numeric spec in the Chinese name (e.g. "25MIC", "4.5微米", "70克")
  const spec = zh.match(/(\d+(?:\.\d+)?\s*(?:mic|µm|um|微米|克|g|mm|米))/i);
  let suffix = spec ? spec[1].replace(/微米/gi, "µm").replace(/克/g, "gsm").trim() : "";
  if (!base) base = cleanCode(code);
  if (!base || base.length < 3) base = catEn;
  const out = suffix ? `${base} ${suffix}` : base;
  return out.slice(0, 90).trim();
}

function cleanCode(code = "") {
  const s = code
    .replace(/^AEC[_\s-]*/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\d{6,}\b/g, "")
    .replace(/\s*\b\d{1,3}\b\s*$/, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!s || /^\d+$/.test(s)) return "";
  return s
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bBopp\b/g, "BOPP")
    .replace(/\bBopet\b/g, "BOPET")
    .replace(/\bCpp\b/g, "CPP")
    .replace(/\bPof\b/g, "POF")
    .replace(/\bPe\b/g, "PE")
    .replace(/\bPvc\b/g, "PVC")
    .replace(/\bPvdc\b/g, "PVDC")
    .replace(/\bPsa\b/g, "PSA")
    .replace(/\bTtr\b/g, "TTR")
    .replace(/\bOpp\b/g, "OPP")
    .replace(/\bPet\b/g, "PET")
    .replace(/\bLwc\b/g, "LWC");
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function idFromUrl(url) {
  const m = url.match(/-(\d+)\.html$/);
  return m ? +m[1] : 0;
}

/* ---------- build ---------- */
const all = [];
const usedIds = new Set();
let nextId = 90000;
const usedSlugs = new Set();

for (const cat of cats) {
  const meta = CAT_META[cat.slug];
  for (const p of cat.products) {
    let id = idFromUrl(p.url);
    if (!id || usedIds.has(id)) id = nextId++;
    usedIds.add(id);

    const nameEn = toEnglishName(p.nameZh, p.code, meta.en);
    let slug = slugify(nameEn) || `product-${id}`;
    if (usedSlugs.has(slug)) slug = `${slug}-${id}`;
    usedSlugs.add(slug);

    const imgName = path.basename(p.image || "");
    const image = available.has(imgName) ? `/products/${imgName}` : "";
    const d = details[p.url] || {};

    /* The source specification is Chinese and still contains HTML entities.
       Clean it into a readable note instead of shipping &rarr; / &nbsp; to
       a browser, and keep it as the *original* supplier text — we never
       pretend it was translated. */
    let sourceNote = (d.description || "")
      .replace(/&rarr;|&#8594;/gi, "→")
      .replace(/&larr;|&#8592;/gi, "←")
      .replace(/&nbsp;|&#160;/gi, " ")
      .replace(/&middot;|&#183;/gi, "·")
      .replace(/&le;|&#8804;/gi, "≤")
      .replace(/&ge;|&#8805;/gi, "≥")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;|&#34;/gi, '"')
      .replace(/&lt;|&#60;/gi, "<")
      .replace(/&gt;|&#62;/gi, ">")
      .replace(/&[a-z]+;/gi, " ")
      .replace(/&?#?\d+;/gi, " ")
      .replace(/←\s*\[上一个产品[\s\S]*$/, "")
      .replace(/首页\s*\|\s*关于我们[\s\S]*$/, "")
      .replace(/皖ICP备[\s\S]*$/, "")
      .replace(/^[:：\s]*/, "")
      .replace(/\r/g, "")
      .replace(/[ \t]{2,}/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
      .slice(0, 1800);

    const description = sourceNote; // used for spec extraction below

    // Extract specs from the free text when structured fields were empty.
    const pick = (field, re) => {
      if (field) return field;
      const m = description.match(re);
      return m ? m[1].trim().slice(0, 90) : "";
    };
    const thickness = pick(d.thickness, /(?:产品厚度|厚度|Thickness)\s*[:：]?\s*([^\n]{2,60})/i);
    const width = pick(d.width, /(?:产品宽度|宽度|Width)\s*[:：]?\s*([^\n]{2,60})/i);
    const length = pick(d.length, /(?:产品长度|长度|Length)\s*[:：]?\s*([^\n]{2,60})/i);
    const features = (d.features || "").replace(/&[a-z]+;|&?#?\d+;/gi, " ").trim().slice(0, 400);
    const applications = (d.applications || "").replace(/&[a-z]+;|&?#?\d+;/gi, " ").trim().slice(0, 400);

    // Normalise Chinese unit words so spec tables read correctly in English.
    const specEn = (s) => (s || "")
      .replace(/微米|um|UM|µm/gi, "µm")
      .replace(/毫米/g, "mm")
      .replace(/（|\）/g, "")
      .replace(/\s*MM\b/gi, " mm")
      .replace(/克/g, "g")
      .replace(/\s*[:：]\s*/, ": ")
      .replace(/\s+/g, " ")
      .trim();

    const specLines = [];
    if (thickness) specLines.push(`Thickness: ${specEn(thickness)}.`);
    if (width) specLines.push(`Roll width: ${specEn(width)}.`);
    if (length) specLines.push(`Roll length: ${specEn(length)}.`);

    /* English page copy: factual, product-specific, no invented claims.
       Unique per product via name, source model code, specs and category. */
    const descriptionEn = [
      `${nameEn} is part of the ${meta.en} range supplied by AEC GROUP from Hefei, China.`,
      `${meta.descEn}`,
      p.code ? `Source model / reference: ${p.code.replace(/^AEC[_\s-]*/i, "").replace(/[_-]+/g, " ")}.` : "",
      specLines.length ? `Indicative specification from the source catalogue — ${specLines.join(" ")}` : "",
      `Typical uses: ${meta.usesEn}.`,
      `Thickness, width, roll length, core size, surface treatment and packing are confirmed against your converting line before the order; ask for the technical datasheet, samples and a firm quotation.`,
    ].filter(Boolean).join(" ");

    all.push({
      id,
      slug,
      code: (p.code || "").slice(0, 80),
      nameEn,
      nameZh: p.nameZh || meta.zh,
      cat: cat.slug,
      catId: cat.id,
      image,
      thickness: specEn(thickness),
      width: specEn(width),
      length: specEn(length),
      description: descriptionEn,
      sourceNote,
      features,
      applications,
    });
  }
}

const categories = cats.map((c, i) => ({
  id: c.id,
  slug: c.slug,
  order: i,
  en: CAT_META[c.slug].en,
  zh: CAT_META[c.slug].zh,
  descEn: CAT_META[c.slug].descEn,
  descZh: CAT_META[c.slug].descZh,
  usesEn: CAT_META[c.slug].usesEn,
  usesZh: CAT_META[c.slug].usesZh,
  count: all.filter((p) => p.cat === c.slug).length,
  subcatsEn: c.subcats.map((s) => s.zh),
  subcatsZh: c.subcats.map((s) => s.zh),
}));

/* Distinguish identical names so no two product pages look like duplicates
   to a search engine. Prefer a model code, then a spec, then a serial. */
const dupCount = new Map();
for (const p of all) {
  const n = dupCount.get(p.nameEn) || 0;
  dupCount.set(p.nameEn, n + 1);
}
const emitted = new Map();
for (const p of all) {
  const total = dupCount.get(p.nameEn) || 1;
  const seen = emitted.get(p.nameEn) || 0;
  emitted.set(p.nameEn, seen + 1);
  if (total > 1) {
    const qualifier =
      (p.code && !/^\d{6,}$/.test(p.code) && !/^\d+$/.test(p.code)
        ? p.code.replace(/^AEC[_\s-]*/i, "").replace(/[_-]+/g, " ").trim()
        : "") ||
      p.thickness ||
      p.nameZh.replace(/[^\w\s.-]/g, "").trim().slice(0, 28) ||
      `Series ${seen + 1}`;
    p.nameEn = `${p.nameEn} — ${qualifier} (${String(seen + 1).padStart(2, "0")})`.slice(0, 120);
    p.slug = (slugify(p.nameEn) || `product-${p.id}`).slice(0, 70) + `-${p.id}`;
  }
}

const banner = `// AUTO-GENERATED by scripts/build-catalog.mjs from old.boppfilmsale.com.\n// Do not edit by hand — re-run the scraper + builder instead.\n\n`;

/* Keep the 11 categories in a tiny module: the navigation is a client
   component and must never pull the full 465-product text into the JS bundle. */
const categoryTypes =
  `export interface CatalogCategory {\n  id: number; slug: string; order: number;\n  en: string; zh: string; descEn: string; descZh: string;\n  usesEn: string; usesZh: string; count: number;\n  subcatsEn: string[]; subcatsZh: string[];\n}\n\n`;
const categoriesBody =
  categoryTypes +
  `export const CATEGORIES: CatalogCategory[] = ${JSON.stringify(categories, null, 2)};\n\n` +
  `export const categoryBySlug = (s: string) => CATEGORIES.find((c) => c.slug === s);\n`;

const productsBody =
  `export { CATEGORIES, categoryBySlug, type CatalogCategory } from "./categories";\n\n` +
  `export interface CatalogProduct {\n  id: number; slug: string; code: string;\n  nameEn: string; nameZh: string; cat: string; catId: number;\n  image: string; thickness: string; width: string; length: string;\n  description: string; sourceNote: string; features: string; applications: string;\n}\n\n` +
  `export const PRODUCTS: CatalogProduct[] = ${JSON.stringify(all, null, 2)};\n\n` +
  `export const productBySlug = (s: string) => PRODUCTS.find((p) => p.slug === s);\n` +
  `export const productsByCat = (s: string) => PRODUCTS.filter((p) => p.cat === s);\n` +
  `export const productById = (id: number) => PRODUCTS.find((p) => p.id === id);\n`;

fs.writeFileSync(path.join(ROOT, "src/data/categories.ts"), banner + categoriesBody, "utf8");
fs.writeFileSync(path.join(ROOT, "src/data/catalog.ts"), banner + productsBody, "utf8");
console.log(`Wrote src/data/categories.ts + src/data/catalog.ts`);
console.log(`  categories: ${categories.length}, products: ${all.length}`);
console.log(`  with image: ${all.filter((p) => p.image).length}`);
console.log(`  with detail text: ${all.filter((p) => p.description.length > 80).length}`);
console.log("\nSample EN names:");
all.slice(0, 12).forEach((p) => console.log(`  ${p.nameZh}  ->  ${p.nameEn}`));
