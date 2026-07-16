import Link from "next/link";
import { query } from "@/lib/db";

export default async function ProductsPage() {
  const products = await query<{
    id: number;
    name: string;
    model: string | null;
    summary: string | null;
    image: string | null;
  }>(
    "SELECT id, name, model, summary, image FROM products WHERE lang='cn' ORDER BY sort"
  );

  return (
    <div>
      <h1>产品中心</h1>
      <div className="product-grid">
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`} className="product-card">
            {p.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt={p.name} />
            ) : (
              <div style={{ height: 160, background: "#eee" }} />
            )}
            <div className="body">
              <strong>{p.name}</strong>
              {p.model && <div style={{ color: "#888", fontSize: 13 }}>型号：{p.model}</div>}
              {p.summary && <div style={{ fontSize: 13, marginTop: 6 }}>{p.summary}</div>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
