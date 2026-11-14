import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { productsByCat, type CatalogProduct } from "@/data/catalog";
import { SITE, UI, type Lang } from "@/content/site";
import { IconArrow, IconMail } from "../Icons";
import { jsonLdScript } from "@/lib/seo";
import ProductCard from "./ProductCard";
import FinalCta from "./FinalCta";

export default function ProductPage({
  lang,
  product,
}: {
  lang: Lang;
  product: CatalogProduct;
}) {
  const u = UI[lang];
  const zh = lang === "zh";
  const base = zh ? "/zh" : "/en";
  const cat = CATEGORIES.find((c) => c.slug === product.cat)!;
  const catName = zh ? cat.zh : cat.en;
  const name = zh ? product.nameZh : product.nameEn;
  const path = `${base}/products/${product.cat}/${product.slug}`;
  const related = productsByCat(product.cat).filter((p) => p.id !== product.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    alternateName: zh ? product.nameEn : product.nameZh,
    sku: product.code || String(product.id),
    category: catName,
    description: product.description,
    image: product.image ? `${SITE.baseUrl}${product.image}` : undefined,
    brand: { "@type": "Brand", name: "AEC GROUP" },
    manufacturer: {
      "@type": "Organization",
      name: SITE.legalName,
      address: { "@type": "PostalAddress", addressLocality: "Hefei", addressRegion: "Anhui", addressCountry: "CN" },
    },
  };

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
    `${zh ? "产品询价" : "Product enquiry"}: ${name}${product.code ? ` / ${product.code}` : ""}`,
  )}`;

  const specs: { label: string; value: string }[] = [
    ...(product.thickness ? [{ label: zh ? "厚度" : "Thickness", value: product.thickness }] : []),
    ...(product.width ? [{ label: zh ? "幅宽" : "Roll width", value: product.width }] : []),
    ...(product.length ? [{ label: zh ? "卷长" : "Roll length", value: product.length }] : []),
    { label: zh ? "产品分类" : "Division", value: catName },
    ...(product.code ? [{ label: zh ? "源站型号" : "Source reference", value: product.code }] : []),
  ];

  return (
    <>
      <section className="section tight" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
          <nav className="product-breadcrumb" aria-label="Breadcrumb">
            <Link href={base}>{u.home}</Link> /{" "}
            <Link href={`${base}/products`}>{u.productsLabel}</Link> /{" "}
            <Link href={`${base}/products/${product.cat}`}>{catName}</Link> /{" "}
            <span aria-current="page">{name}</span>
          </nav>

          <div className="detail-layout">
            <div className="detail-image">
              {product.image ? (
                <img src={product.image} alt={name} width={800} height={800} decoding="async" />
              ) : (
                <div className="noimg">AEC GROUP</div>
              )}
            </div>

            <div className="detail-info">
              <span className="eyebrow">{catName}</span>
              <h1>{name}</h1>
              {product.code && <div className="model">{product.code}</div>}
              <p className="lead">
                {zh
                  ? "按产线条件确认规格后供货：厚度、幅宽、卷长、卷芯与表面处理均可指定。"
                  : "Supplied to your line conditions — thickness, width, roll length, core size and surface treatment can all be specified."}
              </p>

              <table className="spec-table">
                <caption className="sr-only" style={{ position: "absolute", left: -9999 }}>
                  {u.specifications}
                </caption>
                <tbody>
                  {specs.map((s) => (
                    <tr key={s.label}><th scope="row">{s.label}</th><td>{s.value}</td></tr>
                  ))}
                </tbody>
              </table>

              <div className="detail-actions">
                <Link href={`${base}/contact`} className="btn btn-primary">
                  {u.requestThis} <IconArrow size={16} />
                </Link>
                <a href={mailto} className="btn btn-outline">
                  <IconMail size={16} /> {SITE.email}
                </a>
              </div>
              <p className="form-note" style={{ textAlign: "left" }}>
                {u.responseTime} · {u.noObligation}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{zh ? "产品说明" : "Product description"}</span>
            <h2 className="section-title">{zh ? "关于这个等级" : "About this grade"}</h2>
          </div>
          <div className="prose" style={{ maxWidth: 860 }}>
            <p>{product.description}</p>
            <p>
              {zh
                ? "所有产品均可提供技术数据表（TDS）、批次检测报告 / COA、MSDS 与出口单证；常规等级支持寄样。价格按规格、数量与交期核算，请通过上方按钮询价。"
                : "Technical datasheets (TDS), lot test reports / COA, MSDS and full export documentation are available for every grade; samples can be dispatched for standard items. Pricing depends on specification, quantity and schedule — request a quotation above."}
            </p>
          </div>

          {product.sourceNote.length > 80 && (
            <details className="source-note">
              <summary>
                {zh
                  ? "查看源站原始技术说明（中文原文）"
                  : "Original supplier specification (source text, Chinese)"}
              </summary>
              <div className="source-body" lang="zh-CN">{product.sourceNote}</div>
            </details>
          )}

          <div style={{ marginTop: 56 }}>
            <div className="section-head" style={{ marginBottom: 26 }}>
              <span className="eyebrow">{u.related}</span>
              <h2 className="section-title" style={{ fontSize: 28 }}>
                {zh ? `更多${catName}产品` : `More from ${catName}`}
              </h2>
            </div>
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} lang={lang} catName={catName} />
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <Link href={`${base}/products/${product.cat}`} className="btn btn-outline">
                {u.seeCategory} <IconArrow size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FinalCta
        lang={lang}
        title={zh ? `索取「${name}」的报价与样品` : `Request a quotation and sample for ${name}`}
        body={
          zh
            ? "附上厚度、幅宽、用途与月用量，工程师 24 小时内回复等级建议、数据表与确定报价。"
            : "Include thickness, width, application and monthly volume. An engineer replies within 24 hours with a grade recommendation, datasheet and firm quotation."
        }
      />
    </>
  );
}
