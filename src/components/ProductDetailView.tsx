import Link from "next/link";
import type { Lang } from "@/lib/data";
import type { SiteProduct } from "@/data";

export default function ProductDetailView({
  lang,
  product,
}: {
  lang: Lang;
  product: SiteProduct;
}) {
  const base = lang === "zh" ? "/zh/products" : "/en/products";
  const detail = product.description || product.summary || product.intro || "";
  const backLabel = lang === "zh" ? "← 返回产品列表" : "← Back to Products";
  const galleryLabel = lang === "zh" ? "产品图片" : "Product Gallery";

  return (
    <div className="product-detail">
      <nav className="product-breadcrumb">
        <Link href={base}>Products</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <header className="product-detail-header">
        <h1>
          {product.name}
          {product.model ? ` (${product.model})` : ""}
        </h1>
      </header>

      {/* 产品图：源站图片已失效，统一显示占位图 */}
      <div
        className="product-main-image"
        style={{
          height: 260,
          background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#1e40af",
          fontWeight: 700,
          fontSize: 36,
          borderRadius: 12,
        }}
      >
        AEC
      </div>

      {detail && (
        <div
          className="product-description"
          dangerouslySetInnerHTML={{ __html: detail }}
        />
      )}

      {product.images && product.images.length > 0 && (
        <section className="product-gallery">
          <h3>{galleryLabel}</h3>
          <div className="gallery-grid">
            {product.images.map((_g, i) => (
              <div
                key={i}
                style={{
                  height: 160,
                  background:
                    "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#3730a3",
                  fontWeight: 600,
                }}
              >
                AEC
              </div>
            ))}
          </div>
        </section>
      )}

      <p style={{ marginTop: 40, textAlign: "center" }}>
        <Link href={base} className="btn btn-outline">
          {backLabel}
        </Link>
      </p>
    </div>
  );
}
