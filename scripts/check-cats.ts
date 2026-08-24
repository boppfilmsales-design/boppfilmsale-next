import { query } from "@/lib/db";

async function checkCategories() {
  const cats = await query("SELECT * FROM product_categories WHERE lang='cn'");
  console.log('Chinese categories:', cats);
  const catsEn = await query("SELECT * FROM product_categories WHERE lang='en'");
  console.log('English categories:', catsEn);
}

checkCategories().catch(console.error);