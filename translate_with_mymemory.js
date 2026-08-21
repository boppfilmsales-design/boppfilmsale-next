const { createClient } = require('@libsql/client');
require('dotenv').config({ path: '.env.local' });

const db = createClient({ 
  url: process.env.TURSO_DATABASE_URL, 
  authToken: process.env.TURSO_AUTH_TOKEN 
});

// MyMemory Translation API (free)
// https://mymemory.translated.net/doc/spec.php
async function translateText(text) {
  if (!text || text.trim() === '') return '';
  
  // MyMemory API endpoint
  const url = 'https://api.mymemory.translated.net/get';
  
  // Prepare parameters
  const params = new URLSearchParams({
    q: text,
    langpair: 'zh|en',
    de: 'aabbcc@gmail.com' // optional email for higher quota
  });
  
  try {
    const response = await fetch(`${url}?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    if (data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    } else {
      console.warn('Translation failed:', data);
      return text; // fallback to original
    }
  } catch (error) {
    console.error('Translation error:', error.message);
    return text; // fallback
  }
}

async function main() {
  console.log('Fetching English products with Chinese descriptions...');
  
  // 获取所有英文产品
  const products = await db.execute(`
    SELECT id, name, model, description, summary, intro 
    FROM products 
    WHERE lang='en' 
    AND (description GLOB '*[一-龥]*' OR intro GLOB '*[一-龥]*')
    ORDER BY id
  `);
  
  console.log(`Found ${products.rows.length} English products needing translation`);
  
  let updated = 0;
  let failed = 0;
  
  for (const p of products.rows) {
    try {
      const descZh = p.description || '';
      const introZh = p.intro || '';
      const summaryZh = p.summary || '';
      
      // Translate each field
      const descEn = await translateText(descZh);
      const introEn = await translateText(introZh);
      const summaryEn = await translateText(summaryZh);
      
      // 更新数据库
      await db.execute({
        sql: `UPDATE products SET description=?, summary=?, intro=? WHERE id=?`,
        args: [descEn, summaryEn, introEn, p.id]
      });
      
      updated++;
      if (updated % 10 === 0) {
        console.log(`Progress: ${updated}/${products.rows.length} updated`);
      }
      
      // Be respectful to the free API - delay between requests
      await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
    } catch (err) {
      failed++;
      console.error(`Failed to update product ${p.id}:`, err.message);
    }
  }
  
  console.log(`\n=== Translation Complete ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Failed: ${failed}`);
  
  // 验证结果
  const verify = await db.execute(`
    SELECT COUNT(*) as count FROM products 
    WHERE lang='en' AND (description GLOB '*[一-龥]*' OR intro GLOB '*[一-龥]*')
  `);
  console.log(`Remaining with Chinese chars: ${verify.rows[0].count}`);
  
  // 显示几个示例
  const samples = await db.execute(`
    SELECT id, name, substr(description, 1, 100) as desc_preview 
    FROM products 
    WHERE lang='en' 
    ORDER BY id LIMIT 5
  `);
  console.log('\nSample translations:');
  samples.rows.forEach(r => console.log(`  ID ${r.id}: ${r.name} - ${r.desc_preview}`));
  
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });