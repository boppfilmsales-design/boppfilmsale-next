const { createClient } = require('@libsql/client');
require('dotenv').config({ path: '.env.local' });

const db = createClient({ 
  url: process.env.TURSO_DATABASE_URL, 
  authToken: process.env.TURSO_AUTH_TOKEN 
});

async function check() {
  // Check pages table for English content
  const pages = await db.execute("SELECT slug, lang, title, substr(content, 1, 200) as content_preview FROM pages WHERE lang='en'");
  console.log('English pages:');
  console.log(JSON.stringify(pages.rows, null, 2));
  
  // Check products table for English products
  const products = await db.execute("SELECT id, lang, name, substr(description, 1, 100) as desc_preview FROM products WHERE lang='en' LIMIT 10");
  console.log('\nEnglish products (first 10):');
  console.log(JSON.stringify(products.rows, null, 2));
  
  // Check for Chinese characters in English content - name
  const cnInEnName = await db.execute("SELECT id, lang, name FROM products WHERE lang='en' AND name GLOB '*[一-龥]*' LIMIT 20");
  console.log('\nEnglish products with Chinese chars in name:');
  console.log(JSON.stringify(cnInEnName.rows, null, 2));
  
  // Check for Chinese characters in English content - description
  const cnInEnDesc = await db.execute("SELECT id, lang, name, substr(description, 1, 100) as desc_preview FROM products WHERE lang='en' AND description GLOB '*[一-龥]*' LIMIT 20");
  console.log('\nEnglish products with Chinese chars in description:');
  console.log(JSON.stringify(cnInEnDesc.rows, null, 2));
  
  // Check for Chinese characters in English pages content
  const cnInPages = await db.execute("SELECT slug, lang, title, substr(content, 1, 200) as content_preview FROM pages WHERE lang='en' AND content GLOB '*[一-龥]*' LIMIT 20");
  console.log('\nEnglish pages with Chinese chars:');
  console.log(JSON.stringify(cnInPages.rows, null, 2));
  
  // Check product_categories for English
  const cats = await db.execute("SELECT id, lang, name FROM product_categories WHERE lang='en'");
  console.log('\nEnglish categories:');
  console.log(JSON.stringify(cats.rows, null, 2));
  
  process.exit(0);
}

check().catch(e => { console.error(e); process.exit(1); });