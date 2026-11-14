import { CATEGORIES, type CatalogCategory } from "@/data/categories";
import { productsByCat } from "@/data/catalog";
import { SITE, UI, type Lang } from "@/content/site";
import { jsonLdScript } from "@/lib/seo";
import PageHero from "./PageHero";
import CategorySidebar from "./CategorySidebar";
import ProductCard from "./ProductCard";
import FinalCta from "./FinalCta";

export default function CategoryPage({
  lang,
  category,
}: {
  lang: Lang;
  category: CatalogCategory;
}) {
  const u = UI[lang];
  const zh = lang === "zh";
  const base = zh ? "/zh" : "/en";
  const name = zh ? category.zh : category.en;
  const desc = zh ? category.descZh : category.descEn;
  const uses = (zh ? category.usesZh : category.usesEn).split("·").map((s) => s.trim()).filter(Boolean);
  const products = productsByCat(category.slug);
  const path = `${base}/products/${category.slug}`;

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description: desc,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: zh ? p.nameZh : p.nameEn,
      url: `${SITE.baseUrl}${path}/${p.slug}`,
    })),
  };

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={u.categoriesLabel}
        title={name}
        lead={desc}
        crumbs={[
          { name: u.productsLabel, href: `${base}/products` },
          { name },
        ]}
      />

      <section className="section">
        <div className="wrap catalog-layout">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(itemList) }} />
          <CategorySidebar lang={lang} active={category.slug} />

          <div>
            <div className="catalog-toolbar">
              <h2>{zh ? `${name} · 产品清单` : `${name} — product listing`}</h2>
              <span className="count">{products.length} {u.productCount}</span>
            </div>

            <div className="tag-row" aria-label={zh ? "典型应用" : "Typical applications"}>
              {uses.map((x) => <span key={x}>{x}</span>)}
            </div>

            <div className="prose" style={{ marginBottom: 26, maxWidth: "none" }}>
              <p>
                {zh
                  ? `本页列出源站「${category.zh}」分类下的全部 ${products.length} 个条目，含型号与实物图片。厚度、幅宽、卷长、卷芯与表面处理均可按您的加工条件确认；页面参数为示意，最终以技术数据表为准。`
                  : `All ${products.length} entries from the ${category.en} division are listed below with their source model references and real product photos. Thickness, width, roll length, core and surface treatment are confirmed against your converting conditions; published values are indicative and the technical datasheet governs.`}
              </p>
              <p>
                {zh
                  ? "每个产品页都包含该等级的选型要点、完整参数表、典型应用、询价所需信息与常见问题，供工程与采购直接核对。若您现用某一等级，提供数据表或留样，我们可以按厚度、处理值、摩擦系数与封合窗口做配对。"
                  : "Each product page carries grade-specific selection points, a full specification table, typical applications, the information needed for an exact quotation and common technical questions. If you already run a grade, send the datasheet or a retained sample and we will match gauge, treatment, COF and seal window."}
              </p>
            </div>

            {category.subcatsZh.length > 0 && (
              <div className="subcat-row">
                <span className="subcat-label">{zh ? "源站子类" : "Source sub-categories"}</span>
                {category.subcatsZh.slice(0, 12).map((s, i) => <span key={`${s}-${i}`}>{s}</span>)}
              </div>
            )}

            <div className="product-grid">
              {products.map((p, i) => (
                <ProductCard key={p.slug} product={p} lang={lang} catName={name} eager={i < 6} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCta
        lang={lang}
        title={zh ? `需要${name}的具体报价？` : `Need a quotation for ${name}?`}
        body={
          zh
            ? "把厚度、幅宽、用途与目标数量发来，24 小时内回复等级建议、数据表与确定报价。"
            : "Send thickness, width, application and target quantity. Grade recommendation, datasheet and firm quotation within 24 hours."
        }
      />
    </>
  );
}
