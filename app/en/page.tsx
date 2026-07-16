import Link from "next/link";
import { query } from "@/lib/db";

export default async function HomeEnPage() {
  const news = await query<{ id: number; title: string; created_at: string }>(
    "SELECT id, title, created_at FROM news WHERE lang='en' ORDER BY created_at DESC LIMIT 5"
  );

  return (
    <div>
      <div className="banner">AEC Group · Professional Film Materials Supplier</div>

      <h2 className="section-title">About Us</h2>
      <div className="prose">
        <p>AEC Group, composed of Anhui Dongjian New Materials Co., Ltd. and Anhui Dongjian Import & Export Co., Ltd., is a comprehensive enterprise integrating production, R&D, sales and service, covering plastic film, coating, printing and metallizing industries.</p>
        <Link href="/en/about" className="btn" style={{ marginTop: 12, display: "inline-block" }}>Learn More</Link>
      </div>

      <h2 className="section-title">Latest News</h2>
      <ul>
        {news.map((n) => (
          <li key={n.id} style={{ marginBottom: 10 }}>
            <Link href={`/en/news/${n.id}`}><strong>{n.title}</strong></Link>
            <span style={{ color: "#999", fontSize: 13, marginLeft: 8 }}>{n.created_at}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
