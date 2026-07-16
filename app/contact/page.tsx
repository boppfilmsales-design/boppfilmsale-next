import { query } from "@/lib/db";

export default async function ContactPage() {
  const rows = await query<{ title: string; content: string | null }>(
    "SELECT title, content FROM pages WHERE slug='contact' AND lang='cn' LIMIT 1"
  );
  const page = rows[0];

  return (
    <div>
      <h1>{page?.title || "联系我们"}</h1>
      {page?.content ? (
        <div className="prose contact-info" dangerouslySetInnerHTML={{ __html: page.content }} />
      ) : (
        <div className="contact-info">
          <p><strong>邮箱：</strong> sale@boppfilmsale.com</p>
          <p><strong>电话：</strong> 86-551-64687285</p>
        </div>
      )}
    </div>
  );
}
