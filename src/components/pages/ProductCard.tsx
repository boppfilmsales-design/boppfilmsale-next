import type { CatalogProduct } from "@/data/catalog";
import { UI, type Lang } from "@/content/site";
import { buildProductCopy } from "@/content/product-copy";
import { IconArrow } from "../Icons";

export default function ProductCard({
  product,
  lang,
  catName,
  eager = false,
}: {
  product: CatalogProduct;
  lang: Lang;
  catName: string;
  /** First cards in the viewport load immediately; the rest stay lazy. */
  eager?: boolean;
}) {
  const u = UI[lang];
  const zh = lang === "zh";
  const base = zh ? "/zh" : "/en";
  const name = zh ? product.nameZh : product.nameEn;
  const copy = buildProductCopy(product, lang);
  const excerpt = copy.highlights[0]?.d ?? (zh ? product.nameZh : product.description);
  const gauge = [product.thickness, product.width].filter(Boolean).slice(0, 2);

  return (
    <a className="product-card" href={`${base}/products/${product.cat}/${product.slug}`}>
      <div className="product-img">
        {product.image ? (
          <img
            src={product.image}
            alt={`${name} — ${catName}`}
            width={400}
            height={300}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          <div className="ph">AEC GROUP</div>
        )}
      </div>
      <div className="product-body">
        <span className="cat-tag">{catName}</span>
        <h3>{name}</h3>
        {gauge.length > 0 && (
          <div className="card-specs">
            {gauge.map((g) => <span key={g}>{g}</span>)}
          </div>
        )}
        <p className="excerpt">{excerpt}</p>
        {product.code && <div className="model">{product.code}</div>}
        <span className="more">{u.readMore} <IconArrow size={13} /></span>
      </div>
    </a>
  );
}
