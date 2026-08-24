import { query, execute } from "@/lib/db";

async function findAndDeleteGBL() {
  // Find all 丁内酯 products (Chinese name)
  const cnProducts = await query(`
    SELECT id, name, lang 
    FROM products 
    WHERE name LIKE '%丁内酯%'
  `);

  // Find all GBL products (English name) - check name, intro, description, summary
  const enProducts = await query(`
    SELECT id, name, lang 
    FROM products 
    WHERE (name LIKE '%GBL%' OR name LIKE '%Gamma-Butyrolactone%' OR name LIKE '%Butyrolactone%')
       AND lang = 'en'
  `);

  // Also check intro/description/summary for English products
  const enProducts2 = await query(`
    SELECT id, name, lang 
    FROM products 
    WHERE (intro LIKE '%GBL%' OR intro LIKE '%Gamma-Butyrolactone%' OR intro LIKE '%Butyrolactone%'
        OR description LIKE '%GBL%' OR description LIKE '%Gamma-Butyrolactone%' OR description LIKE '%Butyrolactone%'
        OR summary LIKE '%GBL%' OR summary LIKE '%Gamma-Butyrolactone%' OR summary LIKE '%Butyrolactone%')
       AND lang = 'en'
  `);

  const allProducts = [...cnProducts, ...enProducts, ...enProducts2];
  // Deduplicate by id
  const uniqueProducts = Array.from(new Map(allProducts.map(p => [p.id, p])).values());

  console.log('Found GBL products:', uniqueProducts);

  if (!uniqueProducts || uniqueProducts.length === 0) {
    console.log('No GBL products found');
    return;
  }

  const ids = uniqueProducts.map(p => p.id);
  
  // Delete them
  for (const id of ids) {
    await execute(`DELETE FROM products WHERE id = ?`, [id]);
  }
  
  console.log(`Deleted ${ids.length} GBL products with IDs:`, ids);
}

findAndDeleteGBL().catch(console.error);