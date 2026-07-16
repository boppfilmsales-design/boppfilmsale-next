import Link from "next/link";
import { notFound } from "next/navigation";
import { query } from "@/lib/db";

export default async function EnProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const rows = await query<{
    id: number;
    name: string;
    model: string | null;
    description: string | null;
    image: string | null;
    images: string | null;
  }>("SELECT * FROM products WHERE id = ? AND lang='en'", [params.id]);

  if (rows.length === 0) notFound();
  const p = rows[0];

  const gallery = p.images
    ? p.images.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div>
      <p><Link href="/en/products">← Back to Products</Link></p>
      <h1>{p.name}{p.model ? `（${p.model}）` : ""}</h1>
      {p.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.image} alt={p.name} style={{ maxWidth: 320, margin: "10px 0" }} />
      )}
      {p.description && <div className="prose" dangerouslySetInnerHTML={{ __html: p.description }} />}
      {gallery.length > 0 && (
        <div className="product-grid" style={{ marginTop: 20 }}>
          {gallery.map((g, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={g} alt={`${p.name}-${i}`} style={{ width: "100%", borderRadius: 8 }} />
          ))}
        </div>
      )}
    </div>
  );
}
