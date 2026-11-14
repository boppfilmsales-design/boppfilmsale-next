import { CATEGORIES } from "@/data/categories";
import { UI, type Lang } from "@/content/site";

export default function CategorySidebar({
  lang,
  active,
}: {
  lang: Lang;
  active?: string;
}) {
  const u = UI[lang];
  const base = lang === "zh" ? "/zh" : "/en";
  return (
    <aside className="cat-sidebar" aria-label={u.categoriesLabel}>
      <h3>{u.categoriesLabel}</h3>
      <a href={`${base}/products`} className={!active ? "active" : ""}>
        {u.allProducts}<span>{CATEGORIES.reduce((n, c) => n + c.count, 0)}</span>
      </a>
      {CATEGORIES.map((c) => (
        <a
          key={c.slug}
          href={`${base}/products/${c.slug}`}
          className={active === c.slug ? "active" : ""}
        >
          {lang === "zh" ? c.zh : c.en}<span>{c.count}</span>
        </a>
      ))}
    </aside>
  );
}
