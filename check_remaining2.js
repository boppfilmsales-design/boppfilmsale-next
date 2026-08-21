const { createClient } = require('@libsql/client');
require('dotenv').config({ path: '.env.local' });

const db = createClient({ 
  url: process.env.TURSO_DATABASE_URL, 
  authToken: process.env.TURSO_AUTH_TOKEN 
});

async function main() {
  const result = await db.execute("SELECT id, name, substr(description, 1, 120) as desc_preview FROM products WHERE lang='en' AND description GLOB '*[一-龥]*' ORDER BY id");
  console.log('Remaining with Chinese in description:');
  result.rows.forEach(r => console.log(`  ID ${r.id}: ${r.name} - ${r.desc_preview}`));
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });