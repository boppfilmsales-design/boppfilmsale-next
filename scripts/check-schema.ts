import { query } from "@/lib/db";

async function checkSchema() {
  const cols = await query('PRAGMA table_info(products)');
  console.log('Products table columns:', cols);
}

checkSchema().catch(console.error);