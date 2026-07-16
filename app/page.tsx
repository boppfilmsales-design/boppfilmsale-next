import Link from "next/link";
import { query } from "@/lib/db";

export default async function HomePage() {
  const products = await query<{ id: number; name: string; image: string | null }>(
    "SELECT id, name, image FROM products WHERE lang='cn' ORDER BY sort LIMIT 8"
  );
  const news = await query<{ id: number; title: string; created_at: string }>(
    "SELECT id, title, created_at FROM news WHERE lang='cn' ORDER BY created_at DESC LIMIT 5"
  );

  return (
    <div>
      <h1>欢迎来到 BOPP Film Sale</h1>
      <p>我们提供高品质 BOPP / BOPET 薄膜产品，涵盖包装、电子、工业等多领域。</p>

      <h2 style={{ marginTop: 30 }}>热门产品</h2>
      <div className="product-grid">
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`} className="product-card">
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

      <h2 style={{ marginTop: 30 }}>最新新闻</h2>
      <ul>
        {news.map((n) => (
          <li key={n.id}>
            <Link href={`/news/${n.id}`}>{n.title}</Link>
            <span style={{ color: "#999", marginLeft: 8 }}>{n.created_at}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
