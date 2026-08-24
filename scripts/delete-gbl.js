import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function findAndDeleteGBL() {
  // First, find all GBL products
  const { data: products, error: findError } = await supabase
    .from('products')
    .select('id, name, name_en, category')
    .or("name.ilike.%丁内酯%,name_en.ilike.%GBL%,name_en.ilike.%Gamma-Butyrolactone%,name_en.ilike.%Butyrolactone%");

  if (findError) {
    console.error('Find error:', findError);
    return;
  }

  console.log('Found GBL products:', products);

  if (!products || products.length === 0) {
    console.log('No GBL products found');
    return;
  }

  const ids = products.map(p => p.id);
  
  // Delete them
  const { error: deleteError } = await supabase
    .from('products')
    .delete()
    .in('id', ids);

  if (deleteError) {
    console.error('Delete error:', deleteError);
  } else {
    console.log(`Deleted ${ids.length} GBL products with IDs:`, ids);
  }
}

findAndDeleteGBL();