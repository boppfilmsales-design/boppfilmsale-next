// debug_extract.mjs - 诊断单个文件的提取结构
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const OLD_SITE = process.env.OLD_SITE || 'C:\\Users\\DELL\\Desktop\\web-东渐网站源码';
const f = path.join(OLD_SITE, 'c_html_products', 'bopp-yanmo-456.html');
const full = fs.readFileSync(f, 'utf-8');

const m740 = full.match(/<td width="740"[^>]*>([\s\S]*?)<\/td>\s*<\/tr>/i);
console.log('=== width=740 match ===');
console.log('found:', !!m740, 'len:', m740 ? m740[1].length : 0);

const hangjuAll = full.match(/class="hangju"/g);
console.log('hangju count:', hangjuAll ? hangjuAll.length : 0);

const hj = full.match(/class="hangju"[^>]*>([\s\S]*?)<\/div>\s*<\/td>/i);
console.log('=== hangju regex ===');
console.log('found:', !!hj);
if (hj) console.log('first 400 chars:\n', hj[1].slice(0, 400));

// 退路：详细说明 之后的 td
const detail = full.match(/详细说明：<\/td>[\s\S]*?<td[^>]*class="line_buttom_hui_xuxian"[^>]*>([\s\S]*?)<\/td>/i);
console.log('=== 详细说明退路 ===');
console.log('found:', !!detail);
if (detail) console.log('first 400:\n', detail[1].slice(0, 400));
