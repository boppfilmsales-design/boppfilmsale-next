import Link from "next/link";
import type { CatalogProduct } from "@/data/catalog";
import { UI, type Lang } from "@/content/site";
import { IconArrow } from "../Icons";

export default function ProductCard({
  product,
  lang,
  catName,
}: {
  product: CatalogProduct;
  lang: Lang;
  catName: string;
}) {
  const u = UI[lang];
  const base = lang === "zh" ? "/zh" : "/en";
  const name = lang === "zh" ? product.nameZh : product.nameEn;
  const excerpt =
    lang === "zh"
      ? (product.sourceNote || product.nameZh).replace(/\n/g, " ").slice(0, 90)
      : product.description.slice(0, 130);

  return (
    <Link className="product-card" href={`${base}/products/${product.cat}/${product.slug}`}>
      <div className="product-img">
        {product.image ? (
          <img
            src={product.image}
            alt={name}
            width={400}
            height={300}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="ph">AEC GROUP</div>
        )}
      </div>
      <div className="product-body">
        <span className="cat-tag">{catName}</span>
        <h3>{name}</h3>
        {product.code && <div className="model">{product.code}</div>}
        <p className="excerpt">{excerpt}</p>
        <span className="more">{u.readMore} <IconArrow size={13} /></span>
      </div>
    </Link>
  );
}
