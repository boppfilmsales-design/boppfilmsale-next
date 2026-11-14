import { CATEGORIES } from "@/data/categories";
import { SITE, NAV, FOOTER, UI, type Lang } from "@/content/site";
import { IconArrow, IconMail, IconPhone, IconPin, IconClock } from "./Icons";

export default function Footer({ lang }: { lang: Lang }) {
  const t = FOOTER[lang];
  const u = UI[lang];
  const base = lang === "zh" ? "/zh" : "/en";
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-cta">
          <div>
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaBody}</p>
          </div>
          <a href={`${base}/contact`} className="btn btn-primary">
            {t.ctaButton} <IconArrow size={16} />
          </a>
        </div>

        <div className="footer-main">
          <div className="footer-brand">
            <a href={base} className="logo" aria-label="AEC GROUP — Home">
              <span className="logo-mark">AEC</span>
              <span className="logo-text">GROUP<small>FILM &amp; PACKAGING</small></span>
            </a>
            <p>{t.tagline}</p>
          </div>

          <div className="footer-col">
            <h4>{t.navTitle}</h4>
            {NAV[lang].map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </div>

          <div className="footer-col">
            <h4>{t.productTitle}</h4>
            {CATEGORIES.slice(0, 8).map((c) => (
              <a key={c.slug} href={`${base}/products/${c.slug}`}>
                {lang === "zh" ? c.zh : c.en}
              </a>
            ))}
            <a href={`${base}/products`} style={{ color: "var(--copper-light)", fontWeight: 650 }}>
              {u.allProducts} →
            </a>
          </div>

          <div className="footer-col">
            <h4>{t.contactTitle}</h4>
            <span className="contact-line"><IconPin size={15} /><span>{lang === "zh" ? SITE.addressZh : SITE.address}</span></span>
            <a className="contact-line" href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}><IconPhone size={15} /><span>{SITE.phone}</span></a>
            <a className="contact-line" href={`mailto:${SITE.email}`}><IconMail size={15} /><span>{SITE.email}</span></a>
            <span className="contact-line"><IconClock size={15} /><span>{lang === "zh" ? SITE.hoursZh : SITE.hours}</span></span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} {lang === "zh" ? SITE.legalNameZh : SITE.legalName}. {t.legal}</span>
          <span>{SITE.baseUrl.replace("https://", "")}</span>
        </div>
      </div>
    </footer>
  );
}
