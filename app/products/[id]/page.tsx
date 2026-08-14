import Link from "next/link";
import { notFound } from "next/navigation";
import { query } from "@/lib/db";

// 相对路径图片补全为老站绝对 URL（如 pic/big/1.jpg -> http://www.boppfilmsale.com/pic/big/1.jpg）
function toAbsUrl(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  const base = "http://www.boppfilmsale.com/";
  return base + (src.startsWith("/") ? src.slice(1) : src);
}

export default async function ProductDetail({
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
  }>("SELECT * FROM products WHERE id = ? AND lang='cn'", [params.id]);

  if (rows.length === 0) notFound();
  const p = rows[0];

  const gallery = (p.images || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(toAbsUrl);

  // 主图：image -> 图库第一张（fallback）
  const mainImage = p.image ? toAbsUrl(p.image) : gallery[0] || null;

  // 详情：description -> summary -> intro（三级 fallback）
  const detail = p.description || p.summary || p.intro || "";

  return (
    <div>
      <p><Link href="/products">← 返回产品列表</Link></p>
      <h1>{p.name}{p.model ? `（${p.model}）` : ""}</h1>

      {mainImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={mainImage} alt={p.name} style={{ maxWidth: 320, margin: "10px 0" }} />
      )}

      {detail && (
        <div className="prose" dangerouslySetInnerHTML={{ __html: detail }} />
      )}

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