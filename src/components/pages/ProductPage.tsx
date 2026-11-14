import { CATEGORIES } from "@/data/categories";
import { productsByCat, type CatalogProduct } from "@/data/catalog";
import { SITE, UI, type Lang } from "@/content/site";
import { buildProductCopy } from "@/content/product-copy";
import { IconArrow, IconMail, IconCheck, IconBox, IconShield } from "../Icons";
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
  const copy = buildProductCopy(product, lang);
  const related = productsByCat(product.cat).filter((p) => p.id !== product.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    alternateName: zh ? product.nameEn : product.nameZh,
    sku: product.code || String(product.id),
    category: catName,
    description: copy.intro[0],
    image: product.image ? `${SITE.baseUrl}${product.image}` : undefined,
    brand: { "@type": "Brand", name: "AEC GROUP" },
    manufacturer: {
      "@type": "Organization",
      name: SITE.legalName,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hefei",
        addressRegion: "Anhui",
        addressCountry: "CN",
      },
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: u.home, item: `${SITE.baseUrl}${base}` },
      { "@type": "ListItem", position: 2, name: u.productsLabel, item: `${SITE.baseUrl}${base}/products` },
      { "@type": "ListItem", position: 3, name: catName, item: `${SITE.baseUrl}${base}/products/${product.cat}` },
      { "@type": "ListItem", position: 4, name, item: `${SITE.baseUrl}${path}` },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
    `${zh ? "产品询价" : "Product enquiry"}: ${name}${product.code ? ` / ${product.code}` : ""}`,
  )}`;

  return (
    <>
      <section className="section tight" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumb) }} />
          <nav className="product-breadcrumb" aria-label="Breadcrumb">
            <a href={base}>{u.home}</a> /{" "}
            <a href={`${base}/products`}>{u.productsLabel}</a> /{" "}
            <a href={`${base}/products/${product.cat}`}>{catName}</a> /{" "}
            <span aria-current="page">{name}</span>
          </nav>

          <div className="detail-layout">
            <div className="detail-image">
              {product.image ? (
                <img src={product.image} alt={`${name} — ${catName}`} width={800} height={800} decoding="async" />
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

              <div className="detail-badges">
                <span><IconShield size={15} /> {zh ? "可提供 TDS / COA / MSDS" : "TDS / COA / MSDS available"}</span>
                <span><IconBox size={15} /> {zh ? "支持寄样试机" : "Trial reels available"}</span>
              </div>

              <div className="detail-actions">
                <a href={`${base}/contact`} className="btn btn-primary">
                  {u.requestThis} <IconArrow size={16} />
                </a>
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

      {/* Key characteristics — first content a buyer scans after the hero */}
      <section className="section tight">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{zh ? "选型要点" : "Why this grade"}</span>
            <h2 className="section-title">{zh ? "关键特性" : "Key characteristics"}</h2>
          </div>
          <div className="feature-grid">
            {copy.highlights.map((h, i) => (
              <article className="feature-item" key={h.t}>
                <span className="feature-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{h.t}</h3>
                <p>{h.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Full specification table */}
      <section className="section alt tight">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{zh ? "技术参数" : "Specification"}</span>
            <h2 className="section-title">{u.specifications}</h2>
            <p className="section-lead">
              {zh
                ? "标注「源站」的数值来自原产品目录，其余为订货时可确定的项目；最终以随报价提供的数据表为准。"
                : "Values marked “source” come from the original catalogue; the remaining items are set when the order is specified. The datasheet issued with your quotation governs."}
            </p>
          </div>
          <div className="spec-wrap">
            <table className="spec-table wide">
              <caption className="sr-only" style={{ position: "absolute", left: -9999 }}>
                {u.specifications} — {name}
              </caption>
              <tbody>
                {copy.specs.map((s) => (
                  <tr key={s.label}><th scope="row">{s.label}</th><td>{s.value}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="spec-note">{copy.noteEn}</p>
        </div>
      </section>

      {/* Long-form product description */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{zh ? "产品说明" : "Product description"}</span>
            <h2 className="section-title">{zh ? "关于这个等级" : "About this grade"}</h2>
          </div>
          <div className="prose" style={{ maxWidth: 860 }}>
            {copy.intro.map((para, i) => <p key={i}>{para}</p>)}
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
        </div>
      </section>

      {/* Applications */}
      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{zh ? "应用场景" : "Where it is used"}</span>
            <h2 className="section-title">{zh ? "典型应用" : "Typical applications"}</h2>
            <p className="section-lead">
              {zh
                ? "以下为该类材料的常见用途；具体结构请结合您的灌装、印刷与复合条件确认。"
                : "Common uses for this class of material. The final structure depends on your filling, printing and laminating conditions."}
            </p>
          </div>
          <div className="app-grid">
            {copy.applications.map((a, i) => (
              <article className="app-item" key={a.t}>
                <span className="app-num">{String(i + 1).padStart(2, "0")}</span>
                <div><h3>{a.t}</h3><p>{a.d}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quote checklist + FAQ */}
      <section className="section">
        <div className="wrap quote-layout">
          <div className="quote-panel">
            <span className="eyebrow">{zh ? "询价准备" : "Before you enquire"}</span>
            <h2 className="section-title" style={{ fontSize: 28 }}>{zh ? "提供这些，报价一次到位" : "Send these, get an exact quote"}</h2>
            <ul className="check-list">
              {copy.checklist.map((c) => <li key={c}><IconCheck size={16} /> {c}</li>)}
            </ul>
            <a href={`${base}/contact`} className="btn btn-primary">
              {u.requestThis} <IconArrow size={16} />
            </a>
          </div>

          <div className="product-faq">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqLd) }} />
            <span className="eyebrow">FAQ</span>
            <h2 className="section-title" style={{ fontSize: 28 }}>{zh ? "采购前常问" : "Common questions"}</h2>
            <div className="faq-list">
              {copy.faqs.map((f, i) => (
                <details className="faq-item" key={f.q} open={i === 0}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section alt">
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 26 }}>
            <span className="eyebrow">{u.related}</span>
            <h2 className="section-title" style={{ fontSize: 28 }}>
              {zh ? `更多${catName}产品` : `More from ${catName}`}
            </h2>
          </div>
          <div className="product-grid">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} lang={lang} catName={catName} eager={i === 0} />
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <a href={`${base}/products/${product.cat}`} className="btn btn-outline">
              {u.seeCategory} <IconArrow size={16} />
            </a>
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
