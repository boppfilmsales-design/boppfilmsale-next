import Link from "next/link";
import { notFound } from "next/navigation";
import { query } from "@/lib/db";

function toAbsUrl(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  const base = "http://www.boppfilmsale.com/";
  return base + (src.startsWith("/") ? src.slice(1) : src);
}

export default async function EnProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const rows = await query<{
    id: number;
    name: string;
    model: string | null;
    intro: string | null;
    summary: string | null;
    description: string | null;
    image: string | null;
    images: string | null;
  }>("SELECT * FROM products WHERE id = ? AND lang='en'", [params.id]);

  if (rows.length === 0) notFound();
  const p = rows[0];

  const gallery = (p.images || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(toAbsUrl);

  // Main image: image -> gallery first -> null
  const mainImage = p.image ? toAbsUrl(p.image) : gallery[0] || null;

  // Description: description -> summary -> intro -> ""
  const detail = p.description || p.summary || p.intro || "";

  return (
    <div className="product-detail">
      <nav className="product-breadcrumb">
        <Link href="/en/products">Products</Link>
        <span>/</span>
        <span>{p.name}</span>
      </nav>

      <header className="product-detail-header">
        <h1>{p.name}{p.model ? ` (${p.model})` : ""}</h1>
      </header>

      {mainImage && (
        <div className="product-main-image">
          <img src={mainImage} alt={p.name} />
        </div>
      )}

      {detail && (
        <div className="product-description" dangerouslySetInnerHTML={{ __html: detail }} />
      )}

      {gallery.length > 0 && (
        <section className="product-gallery">
          <h3>Product Gallery</h3>
          <div className="gallery-grid">
            {gallery.map((g, i) => (
              <img key={i} src={g} alt={`${p.name} ${i + 1}`} />
            ))}
          </div>
        </section>
      )}

      <p style={{ marginTop: 40, textAlign: "center" }}>
        <Link href="/en/products" className="btn btn-outline">← Back to Products</Link>
      </p>
    </div>
  );
}