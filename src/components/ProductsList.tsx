"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getCategories, getProducts, type Lang } from "@/lib/data";

function ProductsListInner({ lang }: { lang: Lang }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const activeCategoryId = categoryParam ? Number(categoryParam) : null;

  const categories = getCategories(lang);
  const allProducts = getProducts(lang);
  const products = useMemo(
    () =>
      activeCategoryId
        ? allProducts.filter((p) => p.category_id === activeCategoryId)
        : allProducts,
    [allProducts, activeCategoryId]
  );

  const base = lang === "zh" ? "/zh/products" : "/en/products";
  const labels =
    lang === "zh"
      ? { all: "全部产品", empty: "该分类下暂无产品。", model: "型号：" }
      : {
          all: "All Products",
          empty: "No products found in this category.",
          model: "Model: ",
        };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 24,
          marginTop: 24,
        }}
      >
        {/* Sidebar - Categories */}
        <aside
          className="sidebar-box"
          style={{ position: "sticky", top: 100 }}
        >
          <h3
            style={{
              background: "var(--primary)",
              color: "#fff",
              padding: "12px 16px",
              fontSize: 16,
              fontWeight: 600,
              borderRadius: "8px 8px 0 0",
              margin: "-1px -1px 0 -1px",
            }}
          >
            {lang === "zh" ? "产品分类" : "Product Categories"}
          </h3>
          <div style={{ padding: "12px 16px" }}>
            <a
              href={base}
              className={!activeCategoryId ? "active" : ""}
              style={{
                display: "block",
                padding: "10px 12px",
                borderRadius: 6,
                marginBottom: 8,
                color: "var(--text)",
                fontWeight: 500,
                background: !activeCategoryId
                  ? "rgba(26,111,206,0.1)"
                  : "transparent",
              }}
            >
              {labels.all}
            </a>
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`${base}?category=${cat.id}`}
                className={activeCategoryId === cat.id ? "active" : ""}
                style={{
                  display: "block",
                  padding: "10px 12px",
                  borderRadius: 6,
                  marginBottom: 8,
                  color: "var(--text)",
                  background:
                    activeCategoryId === cat.id
                      ? "rgba(26,111,206,0.1)"
                      : "transparent",
                  fontWeight: activeCategoryId === cat.id ? 600 : 400,
                }}
              >
                {cat.name}
              </a>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="content-box" style={{ padding: 24 }}>
          <h1 style={{ color: "var(--accent)", marginBottom: 8 }}>
            {activeCategoryId
              ? categories.find((c) => c.id === activeCategoryId)?.name ||
                labels.all
              : labels.all}
          </h1>

          {products.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "var(--text-light)",
                padding: 60,
              }}
            >
              {labels.empty}
            </p>
          ) : (
            <div className="product-grid">
              {products.map((p) => (
                <a
                  key={p.id}
                  href={`${base}/${p.id}`}
                  className="product-card"
                >
                  <div
                    style={{
                      width: "100%",
                      height: 180,
                      background:
                        "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#1e40af",
                      fontWeight: 700,
                      fontSize: 28,
                      letterSpacing: 1,
                    }}
                  >
                    AEC
                  </div>
                  <div className="body">
                    <div className="name">{p.name}</div>
                    {p.model && (
                      <div className="code">
                        {labels.model}
                        {p.model}
                      </div>
                    )}
                    {p.summary && (
                      <div
                        style={{
                          fontSize: 14,
                          color: "var(--text-light)",
                          lineHeight: 1.6,
                          marginTop: 8,
                        }}
                      >
                        {p.summary}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProductsList({ lang }: { lang: Lang }) {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Loading…</div>}>
      <ProductsListInner lang={lang} />
    </Suspense>
  );
}
