import Link from "next/link";
import { UI, type Lang } from "@/content/site";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export interface Crumb {
  name: string;
  href?: string;
}

export default function PageHero({
  lang,
  eyebrow,
  title,
  lead,
  crumbs,
}: {
  lang: Lang;
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
}) {
  const u = UI[lang];
  const base = lang === "zh" ? "/zh" : "/en";
  const all: Crumb[] = [{ name: u.home, href: base }, ...crumbs];
  const paths = all.map((c) => c.href || `${base}/${c.name}`);
  const ld = breadcrumbJsonLd(all.map((c, i) => ({ name: c.name, path: paths[i] })));

  return (
    <section className="page-hero">
      <div className="wrap">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(ld) }} />
        <nav className="breadcrumb" aria-label="Breadcrumb">
          {all.map((c, i) => (
            <span key={`${c.name}-${i}`}>
              {i > 0 && <span className="sep" aria-hidden="true"> / </span>}
              {c.href ? (
                <Link href={c.href}>{c.name}</Link>
              ) : (
                <span className="current" aria-current="page">{c.name}</span>
              )}
            </span>
          ))}
        </nav>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}
