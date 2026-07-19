// import_from_old_site.mjs  (v3 - 只提取产品主区，修复导航/页脚混入)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const OLD_SITE = process.env.OLD_SITE || 'C:\\Users\\DELL\\Desktop\\web-东渐网站源码';
const productsDir = path.join(OLD_SITE, 'c_html_products');

const CATEGORIES = [
  { id: 1, keys: ['bopp', 'pp film', 'polypropylene', 'cpp', '烟膜', '光膜', '消光膜', '热封膜', 'tape', '胶带', 'bags', 'bag grade', 'bopp film'] },
  { id: 2, keys: ['bopet', 'pet film', 'polyester', '聚酯', '镀铝', 'metallized', 'metallize', 'capacitor', '电容'] },
  { id: 3, keys: ['tape', '胶带', 'glue', '胶水', 'adhesive', 'acrylic'] },
  { id: 4, keys: ['coating', '涂布', 'pvdc', 'coated', 'eva'] },
  { id: 5, keys: ['intermediate', '中间体', 'lactone', '丁内酯', '单体', '树脂', 'resin', 'glycol', '醇', 'monomer', 'cyclodextrin', 'carnitine', 'carotene', 'acid'] },
  { id: 6, keys: ['ps film', '聚苯乙烯', 'nylon', '尼龙', 'bops', 'cpp film', 'polystyrene'] },
  { id: 7, keys: ['ribbon', '碳带', 'label', '标签', 'coding', '打码', 'tear tape', '拉线'] },
  { id: 8, keys: ['pe ', 'pvc', '聚氯乙烯', '聚乙烯', 'po film', '袋子', 'wrap', '缠绕膜', 'shrink', 'shrinkage'] },
  { id: 9, keys: ['paper', '纸', '复印纸', 'a4'] },
  { id: 10, keys: ['machine', '设备', '分切机', 'slitter', 'coding machine', '电子', 'electronics'] },
  { id: 11, keys: ['mask', '口罩', 'kn95', '防疫', 'medical', '手套', 'glove', 'protective'] },
];

function classify(text) {
  const t = (text || '').toLowerCase();
  let best = 1, bestScore = 0;
  for (const c of CATEGORIES) {
    let score = 0;
    for (const k of c.keys) if (t.includes(k)) score++;
    if (score > bestScore) { bestScore = score; best = c.id; }
  }
  return best;
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&ldquo;|&rdquo;|&quot;|&#39;|&amp;|&middot;/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

function isMostlyEnglish(s) {
  if (!s || s.trim().length < 30) return false;
  const latin = (s.match(/[A-Za-z]/g) || []).length;
  const cjk = (s.match(/[一-鿿]/g) || []).length;
  return latin > cjk && latin > 40;
}

function isNoise(s) {
  const t = s.toLowerCase();
  return /sale@boppfilmsale|skype|boppfilmsales|上一个产品|下一个产品|联系人|电话|传真|手机|address|qq:|msn|e-mail|产品搜索|产品分类|about us|home/i.test(t);
}

function extractFromHtml(file) {
  const full = fs.readFileSync(file, 'utf-8');

  // 产品名（优先 h1.weizhi，其次 产品名称：）
  let nameCn = '';
  const h1 = full.match(/<h1[^>]*class="weizhi"[^>]*>(.*?)<\/h1>/s);
  if (h1) nameCn = stripTags(h1[1]);
  const nameLine = full.match(/产品名称：[<strong>]*([^<]+)/);
  if (!nameCn && nameLine) nameCn = nameLine[1].trim();
  if (!nameCn) {
    const t = full.match(/<title>(.*?)<\/title>/s);
    if (t) nameCn = stripTags(t[1]);
  }

  // 编号
  const modelM = full.match(/产品编号：[<strong>]*([^<]+)/);
  const model = modelM ? modelM[1].trim() : '';

  // 图片
  const imgs = [];
  const imgRe = /<img[^>]+src="(\.\.\/pic\/big\/[^"]+)"/g;
  let m;
  while ((m = imgRe.exec(full)) !== null) imgs.push(m[1].replace('../', ''));

  // 详细描述：只取 class="hangju" 区（已验证可匹配），绝不回退到整页
  const hangju = full.match(/class="hangju"[^>]*>([\s\S]*?)<\/div>\s*<\/td>/i)
    || full.match(/详细说明：<\/td>[\s\S]*?<td[^>]*class="line_buttom_hui_xuxian"[^>]*>([\s\S]*?)<\/td>/i);
  if (!hangju) return { nameCn, model, images: imgs, enText: '', cnText: '' };

  const descHtml = hangju[1];
  const blocks = descHtml
    .split(/<\/?(?:p|div|span|br\s*\/?)\b[^>]*>/i)
    .map(s => stripTags(s))
    .filter(Boolean);
  let enText = '', cnText = '';
  for (const b of blocks) {
    if (isNoise(b)) continue;
    if (isMostlyEnglish(b)) enText += b + '\n';
    else if (/[一-鿿]/.test(b) && b.length > 5) cnText += b + '\n';
  }
  enText = enText.trim();
  cnText = cnText.trim();

  return { nameCn, model, images: imgs, enText, cnText };
}

async function doExtract() {
  const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.html'));
  const out = [];
  let withEn = 0;
  for (const f of files) {
    const ex = extractFromHtml(path.join(productsDir, f));
    if (!ex.enText || ex.enText.length < 50) continue;
    withEn++;
    const combined = `${ex.nameCn} ${ex.enText}`;
    const categoryId = classify(combined);
    out.push({
      file: f, nameCn: ex.nameCn, nameEn: ex.nameCn, model: ex.model,
      images: ex.images, enText: ex.enText, cnText: ex.cnText,
      categoryId, needCnTranslate: !ex.cnText || ex.cnText.length < 20,
    });
  }
  fs.writeFileSync(path.join(root, 'scripts', 'extracted.json'), JSON.stringify(out, null, 2), 'utf-8');
  console.log(`扫描 ${files.length} 个文件，有英文的产品 ${withEn} 个`);
  const dist = {};
  for (const p of out) dist[p.categoryId] = (dist[p.categoryId] || 0) + 1;
  console.log('分类分布:', dist);
  console.log(`需中文翻译: ${out.filter(p => p.needCnTranslate).length}`);
  if (out.length) console.log('示例:', JSON.stringify(out[0], null, 2));
}

async function doTranslate() {
  const list = JSON.parse(fs.readFileSync(path.join(root, 'scripts', 'extracted.json'), 'utf-8'));
  const need = list.filter(p => p.needCnTranslate);
  if (!need.length) { console.log('无需翻译'); return; }
  const useDeepL = !!process.env.DEEPL_KEY;
  const useLLM = !!process.env.OPENAI_API_KEY;
  if (!useDeepL && !useLLM) { console.log('未设置 DEEPL_KEY / OPENAI_API_KEY，跳过'); return; }
  async function translate(text) {
    if (useDeepL) {
      const r = await fetch('https://api-free.deepl.com/v2/translate', {
        method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ auth_key: process.env.DEEPL_KEY, text, target_lang: 'ZH', source_lang: 'EN' }),
      });
      const j = await r.json();
      return j.translations?.[0]?.text || text;
    }
    const base = process.env.OPENAI_BASE || 'https://api.openai.com/v1';
    const r = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || 'gpt-4o-mini', messages: [
        { role: 'system', content: '把英文产品描述准确通顺地翻译成中文，保留技术术语。' },
        { role: 'user', content: text },
      ], temperature: 0.2 }),
    });
    const j = await r.json();
    return j.choices?.[0]?.message?.content?.trim() || text;
  }
  for (const p of need) { p.cnText = await translate(p.enText); console.log(`翻译: ${p.nameCn}`); }
  fs.writeFileSync(path.join(root, 'scripts', 'extracted.json'), JSON.stringify(list, null, 2), 'utf-8');
  console.log(`翻译完成`);
}

function decodeEntities(s) {
  return (s || '')
    .replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&ge;/g, '≥')
    .replace(/&le;/g, '≤').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"').replace(/&middot;/g, '·').replace(/&mdash;/g, '—')
    .replace(/&#39;/g, "'").replace(/&ldquo;|&rdquo;/g, '"').replace(/&lsquo;|&rsquo;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/\s+/g, ' ').trim();
}

async function doImport() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url || !authToken) { console.error('缺少 TURSO_DATABASE_URL / TURSO_AUTH_TOKEN'); process.exit(1); }
  const db = createClient({ url, authToken });
  const list = JSON.parse(fs.readFileSync(path.join(root, 'scripts', 'extracted.json'), 'utf-8'));
  let sort = 0;
  for (const p of list) {
    sort++;
    const imgs = p.images.join(',');
    const model = decodeEntities(p.model || '').replace(/[\/<>strong>]/g, '').trim();
    const enDesc = decodeEntities(p.enText);
    const cnDesc = decodeEntities(p.cnText || '');
    await db.execute(
      'INSERT INTO products (lang, category_id, name, model, intro, description, images, sort) VALUES (?,?,?,?,?,?,?,?)',
      ['en', p.categoryId, p.nameEn || p.nameCn, model, enDesc.slice(0, 200), enDesc, imgs, sort]);
    await db.execute(
      'INSERT INTO products (lang, category_id, name, model, intro, description, images, sort) VALUES (?,?,?,?,?,?,?,?)',
      ['cn', p.categoryId, p.nameCn, model, cnDesc.slice(0, 200), cnDesc || '', imgs, sort]);
  }
  console.log(`导入完成：${list.length} 个产品（en+cn 各一行，共 ${list.length * 2} 行）`);
}

const cmd = process.argv[2] || 'extract';
if (cmd === 'extract') doExtract();
else if (cmd === 'translate') doTranslate();
else if (cmd === 'import') doImport();
else console.log('用法: node scripts/import_from_old_site.mjs [extract|translate|import]');
