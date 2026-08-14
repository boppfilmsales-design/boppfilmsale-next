import Link from "next/link";
import { query } from "@/lib/db";

export default async function EnProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;
  
  // Get categories for sidebar
  const categories = await query<{ id: number; name: string }>(
    "SELECT id, name FROM product_categories WHERE lang='en' ORDER BY sort"
  );

  // Get products
  let products: { id: number; name: string; model: string | null; summary: string | null; image: string | null; category_id: number | null }[] = [];
  
  if (category) {
    const cat = await query<{ id: number }>(
      "SELECT id FROM product_categories WHERE lang='en' AND name=? LIMIT 1",
      [category]
    );
    if (cat.length > 0) {
      products = await query(
        "SELECT id, name, model, summary, image, category_id FROM products WHERE lang='en' AND category_id=? ORDER BY sort",
        [cat[0].id]
      );
    }
  } else {
    products = await query(
      "SELECT id, name, model, summary, image, category_id FROM products WHERE lang='en' ORDER BY sort"
    );
  }

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 24, marginTop: 24 }}>
        {/* Sidebar - Categories */}
        <aside className="sidebar-box" style={{ position: "sticky", top: 100 }}>
          <h3 style={{ background: "var(--primary)", color: "#fff", padding: "12px 16px", fontSize: 16, fontWeight: 600, borderRadius: "8px 8px 0 0", margin: "-1px -1px 0 -1px" }}>
            Product Categories
          </h3>
          <div style={{ padding: "12px 16px" }}>
            <Link 
              href="/en/products" 
              className={!category ? "active" : ""}
              style={{ 
                display: "block", 
                padding: "10px 12px", 
                borderRadius: 6, 
                marginBottom: 8,
                color: "var(--text)",
                fontWeight: 500,
                background: !category ? "rgba(26,111,206,0.1)" : "transparent"
              }}
            >
              All Products
            </Link>
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                href={"/en/products?category=" + encodeURIComponent(cat.name)}
                className={category === cat.name ? "active" : ""}
                style={{ 
                  display: "block", 
                  padding: "10px 12px", 
                  borderRadius: 6, 
                  marginBottom: 8,
                  color: "var(--text)",
                  background: category === cat.name ? "rgba(26,111,206,0.1)" : "transparent",
                  fontWeight: category === cat.name ? 600 : 400
                }}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="content-box" style={{ padding: 24 }}>
          <h1 style={{ color: "var(--accent)", marginBottom: 8 }}>{category || "All Products"}</h1>
          {category && <p style={{ color: "var(--text-light)", marginBottom: 24 }}>Browse our {category} collection</p>}
          
          {products.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--text-light)", padding: 60 }}>No products found in this category.</p>
          ) : (
            <div className="product-grid">
              {products.map((p) => (
                <Link key={p.id} href={`/en/products/${p.id}`} className="product-card">
                  {p.image ? (
                    <img src={p.image} alt={p.name} style={{ width: "100%", height: 180, objectFit: "cover", background: "var(--gray-100)" }} />
                  ) : (
                    <div style={{ width: "100%", height: 180, background: "var(--gray-100)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
                      No Image
                    </div>
                  )}
                  <div className="body">
                    <div className="name">{p.name}</div>
                    {p.model && <div className="code">Model: {p.model}</div>}
                    {p.summary && <div style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.6, marginTop: 8 }}>{p.summary}</div>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}