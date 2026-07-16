import Link from "next/link";
import { query } from "@/lib/db";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;
  let products: { id: number; name: string; model: string | null; intro: string | null; image: string | null }[] = [];
  let title = "产品展示";

  if (category) {
    const cat = await query<{ id: number }>(
      "SELECT id FROM product_categories WHERE lang='cn' AND name=? LIMIT 1",
      [category]
    );
    title = category;
    if (cat.length > 0) {
      products = await query(
        "SELECT id, name, model, intro, image FROM products WHERE lang='cn' AND category_id=? ORDER BY sort",
        [cat[0].id]
      );
    }
  } else {
    products = await query(
      "SELECT id, name, model, intro, image FROM products WHERE lang='cn' ORDER BY sort"
    );
  }

  return (
    <div>
      <h1>{title}</h1>
      {products.length === 0 ? (
        <p>暂无产品，敬请期待。</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="product-card">
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={p.name} />
              ) : (
                <div style={{ height: 160, background: "#f3f3f3" }} />
              )}
              <div className="body">
                <div className="name">{p.name}</div>
                {p.model && <div className="code">型号：{p.model}</div>}
                {p.intro && <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{p.intro}</div>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
