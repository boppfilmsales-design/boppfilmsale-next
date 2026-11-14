import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/catalog";
import { SITE, UI, type Lang } from "@/content/site";
import { CategoryIcon, IconArrow } from "../Icons";
import { jsonLdScript } from "@/lib/seo";
import PageHero from "./PageHero";
import CategorySidebar from "./CategorySidebar";
import ProductCard from "./ProductCard";
import FinalCta from "./FinalCta";

export default function ProductsIndex({ lang }: { lang: Lang }) {
  const u = UI[lang];
  const zh = lang === "zh";
  const base = zh ? "/zh" : "/en";

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: zh ? "产品目录" : "Product catalogue",
    numberOfItems: CATEGORIES.length,
    itemListElement: CATEGORIES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: zh ? c.zh : c.en,
      url: `${SITE.baseUrl}${base}/products/${c.slug}`,
    })),
  };

  // One representative product per division keeps the index useful without
  // dumping 465 cards into a single HTML file.
  const featured = CATEGORIES.map((c) => PRODUCTS.find((p) => p.cat === c.slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={u.productsLabel}
        title={zh ? "按产线选膜，而不是按目录翻页。" : "Eleven divisions, one specification to confirm."}
        lead={
          zh
            ? `从 BOPP / BOPET 基膜到碳带、标签、胶带、纸品与包装机械，共 ${PRODUCTS.length} 个产品条目。每个条目都保留源站型号与实物图片，规格可按幅宽、卷长与处理面定制。`
            : `From BOPP and BOPET base films to ribbons, labels, tapes, paper and packaging machinery — ${PRODUCTS.length} product entries, each with its source model reference and a real product image. Width, roll length, core and treatment are specified to your line.`
        }
        crumbs={[{ name: u.productsLabel }]}
      />

      <section className="section">
        <div className="wrap catalog-layout">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(itemList) }} />
          <CategorySidebar lang={lang} />

          <div>
            <div className="section-head" style={{ marginBottom: 30 }}>
              <span className="eyebrow">{u.categoriesLabel}</span>
              <h2 className="section-title">
                {zh ? "按产品事业部浏览" : "Browse by division"}
              </h2>
              <p className="section-lead">
                {zh
                  ? "每个分类都是独立静态页面，产品、描述与图片可被搜索引擎直接抓取。"
                  : "Every division is a standalone static page — products, descriptions and images are crawlable without running JavaScript."}
              </p>
            </div>

            <div className="cat-grid two">
              {CATEGORIES.map((c, i) => (
                <Link className="cat-card" href={`${base}/products/${c.slug}`} key={c.slug}>
                  <div className="cat-top">
                    <span className="cat-num">{String(i + 1).padStart(2, "0")} / {CATEGORIES.length}</span>
                    <span className="cat-swatch"><CategoryIcon slug={c.slug} /></span>
                  </div>
                  <h3>{zh ? c.zh : c.en}</h3>
                  <p>{zh ? c.descZh : c.descEn}</p>
                  <span className="cat-count">{c.count} {u.productCount}</span>
                  <span className="cat-arrow">{u.seeCategory} <IconArrow size={14} /></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{zh ? "产品速览" : "Selected products"}</span>
            <h2 className="section-title">
              {zh ? "每个事业部看一个代表产品" : "One representative grade per division"}
            </h2>
            <p className="section-lead">
              {zh
                ? "完整清单在各分类页中，全部为静态 HTML，无需客户端筛选。"
                : "Full listings live on the division pages — static HTML, no client-side filtering."}
            </p>
          </div>
          <div className="product-grid">
            {featured.map((p) => {
              const c = CATEGORIES.find((x) => x.slug === p.cat)!;
              return <ProductCard key={p.slug} product={p} lang={lang} catName={zh ? c.zh : c.en} />;
            })}
          </div>
        </div>
      </section>

      <FinalCta
        lang={lang}
        title={zh ? "没找到需要的等级？" : "Cannot find the grade you need?"}
        body={zh ? "告诉我们厚度、幅宽与用途，我们从十一大事业部里替您配对。" : "Send thickness, width and application — we match it across all eleven divisions."}
      />
    </>
  );
}
