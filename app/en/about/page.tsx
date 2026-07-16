import { query } from "@/lib/db";

export default async function EnAboutPage() {
  const rows = await query<{ title: string; content: string | null }>(
    "SELECT title, content FROM pages WHERE slug='about' AND lang='en' LIMIT 1"
  );
  const page = rows[0];

  return (
    <div>
      <h1>{page?.title || "About Us"}</h1>
      {page?.content ? (
        <div className="prose" dangerouslySetInnerHTML={{ __html: page.content }} />
      ) : (
        <p>AEC Group - professional film materials supplier.</p>
      )}
    </div>
  );
}
