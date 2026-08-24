import Link from "next/link";
import { query } from "@/lib/db";

// Map English category names (used in URLs) to Chinese category names (in database)
const categoryEnToCn: Record<string, string> = {
  "Biaxially Oriented Polypropylene Film": "双向拉伸聚丙烯薄膜",
  "Biaxially Oriented Polyester Film": "双向拉伸聚酯薄膜",
  "Adhesive Tape and Glue": "胶粘带和胶水",
  "Coating Film": "涂布膜",
  "Intermediates": "中间体",
  "PS Film, CPP Film, Nylon Film": "聚苯乙烯膜、流延聚丙烯膜、尼龙膜",
  "Tear Tape, Ribbon, Label, Coding Machine": "拉线、碳带、标签、打码机等",
  "PE, PVC, PO Film and Bags": "聚乙烯、聚氯乙烯、聚烯烃薄膜和袋子",
  "Paper Products": "纸制品",
  "Machinery and Electronics": "机器设备和电子产品",
  "Epidemic Prevention Supplies": "防疫用品",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;
  let products: { id: number; name: string; model: string | null; intro: string | null; image: string | null }[] = [];
  let title = "产品展示";

  if (category) {
    // Convert English category name to Chinese for database lookup
    const cnCategoryName = categoryEnToCn[category] || category;
    const cat = await query<{ id: number }>(
      "SELECT id FROM product_categories WHERE lang='cn' AND name=? LIMIT 1",
      [cnCategoryName]
    );
    title = cnCategoryName;
    if (cat.length > 0) {
      products = await query(
        "SELECT id, name, model, intro, image FROM products WHERE lang='cn' AND category_id=? ORDER BY sort",
        [cat[0].id]
      );
    }
  } else {
    products = await query(
      "SELECT id, name, model, intro, image FROM products WHERE lang='cn' ORDER BY sort"
    );
  }

  return (
    <div>
      <h1>{title}</h1>
      {products.length === 0 ? (
        <p>暂无产品，敬请期待。</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="product-card">
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={p.name} />
              ) : (
                <div style={{ height: 160, background: "#f3f3f3" }} />
              )}
              <div className="body">
                <div className="name">{p.name}</div>
                {p.model && <div className="code">型号：{p.model}</div>}
                {p.intro && <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{p.intro}</div>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
