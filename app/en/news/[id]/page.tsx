import Link from "next/link";
import { notFound } from "next/navigation";
import { query } from "@/lib/db";

export default async function EnNewsDetail({
  params,
}: {
  params: { id: string };
}) {
  const rows = await query<{
    id: number;
    title: string;
    content: string | null;
    created_at: string;
  }>("SELECT * FROM news WHERE id = ? AND lang='en'", [params.id]);

  if (rows.length === 0) notFound();
  const n = rows[0];

  return (
    <div>
      <p><Link href="/en/news">← Back to News</Link></p>
      <h1>{n.title}</h1>
      <div style={{ color: "#999", fontSize: 13, marginBottom: 16 }}>{n.created_at}</div>
      {n.content && <div className="prose" dangerouslySetInnerHTML={{ __html: n.content }} />}
    </div>
  );
}
