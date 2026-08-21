const { createClient } = require('@libsql/client');
require('dotenv').config({ path: '.env.local' });

const db = createClient({ 
  url: process.env.TURSO_DATABASE_URL, 
  authToken: process.env.TURSO_AUTH_TOKEN 
});

async function main() {
  // First, let's try to translate the remaining two using a simpler approach
  const result = await db.execute("SELECT id, description FROM products WHERE lang='en' AND id IN (925, 1215)");
  
  for (const row of result.rows) {
    let text = row.description;
    // Replace the problematic unicode character
    text = text.replace(//g, '');
    // Try to translate using MyMemory with POST to avoid URI length issues
    if (text.trim() !== '') {
      try {
        const response = await fetch('https://api.mymemory.translated.net/get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            q: text,
            langpair: 'zh|en',
            de: 'aabbcc@gmail.com'
          })
        });
        const data = await response.json();
        if (data.responseData && data.responseData.translatedText) {
          const translated = data.responseData.translatedText;
          await db.execute({
            sql: `UPDATE products SET description=? WHERE id=?`,
            args: [translated, row.id]
          });
          console.log('Updated ID ' + row.id);
        } else {
          console.warn('Translation failed for ID', row.id, data);
          // Fallback: just use the text after removing the weird char
          await db.execute({
            sql: `UPDATE products SET description=? WHERE id=?`,
            args: [text, row.id]
          });
        }
      } catch (err) {
        console.error('Error translating ID ' + row.id + ':', err.message);
        // Fallback: just use the text after removing the weird char
        await db.execute({
          sql: `UPDATE products SET description=? WHERE id=?`,
          args: [text, row.id]
        });
      }
    }
  }
  
  // Also, let's do a final pass to remove any remaining obvious Chinese characters by replacing with empty?
  // Better to re-run translation with a more robust method, but for now let's just check.
  const verify = await db.execute(`
    SELECT COUNT(*) as count FROM products 
    WHERE lang='en' AND (description GLOB '*[一-龥]*' OR intro GLOB '*[一-龥]*')
  `);
  console.log('Remaining with Chinese chars: ' + verify.rows[0].count);
  
  if (verify.rows[0].count === 0) {
    console.log('All Chinese content removed from English products!');
  } else {
    console.log('Still some Chinese remaining. Let\'s list them:');
    const remaining = await db.execute(`
      SELECT id, name, substr(description, 1, 80) as desc_preview 
      FROM products 
      WHERE lang='en' AND (description GLOB '*[一-龥]*' OR intro GLOB '*[一-龥]*')
    `);
    for (const r of remaining.rows) {
      console.log('  ID ' + r.id + ': ' + r.name + ' - ' + r.desc_preview);
    }
  }
  
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });