import { query } from "@/lib/db";

export default async function AboutPage() {
  const rows = await query<{ title: string; content: string | null }>(
    "SELECT title, content FROM pages WHERE slug='about' AND lang='cn' LIMIT 1"
  );
  const page = rows[0];

  return (
    <div>
      <h1>{page?.title || "关于我们"}</h1>
      {page?.content ? (
        <div className="prose" dangerouslySetInnerHTML={{ __html: page.content }} />
      ) : (
        <p>欢迎了解 BOPP Film Sale。我们专注于 BOPP / BOPET 薄膜产品的研发与销售。</p>
      )}
    </div>
  );
}
