import Link from "next/link";
import { query } from "@/lib/db";

export default async function HomeEnPage() {
  const products = await query<{ id: number; name: string; image: string | null }>(
    "SELECT id, name, image FROM products WHERE lang='en' ORDER BY sort LIMIT 8"
  );
  const news = await query<{ id: number; title: string; created_at: string }>(
    "SELECT id, title, created_at FROM news WHERE lang='en' ORDER BY created_at DESC LIMIT 5"
  );

  return (
    <div>
      <h1>Welcome to BOPP Film Sale</h1>
      <p>We supply high-quality BOPP / BOPET film products for packaging, electronics and industry.</p>

      <h2 style={{ marginTop: 30 }}>Featured Products</h2>
      <div className="product-grid">
        {products.map((p) => (
          <Link key={p.id} href={`/en/products/${p.id}`} className="product-card">
            {p.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt={p.name} />
            ) : (
              <div style={{ height: 160, background: "#eee" }} />
            )}
            <div className="body">{p.name}</div>
          </Link>
        ))}
      </div>

      <h2 style={{ marginTop: 30 }}>Latest News</h2>
      <ul>
        {news.map((n) => (
          <li key={n.id}>
            <Link href={`/en/news/${n.id}`}>{n.title}</Link>
            <span style={{ color: "#999", marginLeft: 8 }}>{n.created_at}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
