import Link from "next/link";
import { query } from "@/lib/db";

export default async function NewsPage() {
  const news = await query<{
    id: number;
    title: string;
    summary: string | null;
    created_at: string;
  }>("SELECT id, title, summary, created_at FROM news WHERE lang='cn' ORDER BY created_at DESC");

  return (
    <div>
      <h1>新闻动态</h1>
      <ul>
        {news.map((n) => (
          <li key={n.id} style={{ marginBottom: 14 }}>
            <Link href={`/news/${n.id}`}><strong>{n.title}</strong></Link>
            <div style={{ color: "#999", fontSize: 13 }}>{n.created_at}</div>
            {n.summary && <div style={{ marginTop: 4 }}>{n.summary}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
