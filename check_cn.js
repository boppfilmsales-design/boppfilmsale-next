const { createClient } = require('@libsql/client');
require('dotenv').config({ path: '.env.local' });

const db = createClient({ 
  url: process.env.TURSO_DATABASE_URL, 
  authToken: process.env.TURSO_AUTH_TOKEN 
});

async function main() {
  const result = await db.execute("SELECT id, name, substr(description, 1, 80) as desc_preview FROM products WHERE lang='cn' ORDER BY id LIMIT 10");
  console.log('Chinese products:');
  result.rows.forEach(r => console.log(`  ID ${r.id}: ${r.name} - ${r.desc_preview}`));
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });