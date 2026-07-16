import { query } from "@/lib/db";

export default async function EnContactPage() {
  const rows = await query<{ title: string; content: string | null }>(
    "SELECT title, content FROM pages WHERE slug='contact' AND lang='en' LIMIT 1"
  );
  const page = rows[0];

  return (
    <div>
      <h1>{page?.title || "Contact Us"}</h1>
      {page?.content ? (
        <div className="prose contact-info" dangerouslySetInnerHTML={{ __html: page.content }} />
      ) : (
        <div className="contact-info">
          <p><strong>Email:</strong> sale@boppfilmsale.com</p>
          <p><strong>Tel:</strong> 86-551-64687285</p>
        </div>
      )}
    </div>
  );
}
