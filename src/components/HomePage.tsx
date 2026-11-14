import Link from "next/link";
import { CATEGORIES } from "@/data/catalog";
import { HOME, UI, FAQS, SITE, type Lang } from "@/content/site";
import {
  IconArrow, IconCheck, IconPlus, CategoryIcon, IconMail, IconClock,
} from "./Icons";

const FAQ_COUNT = 6;

export default function HomePage({ lang }: { lang: Lang }) {
  const c = HOME[lang];
  const u = UI[lang];
  const base = lang === "zh" ? "/zh" : "/en";
  const faqs = FAQS[lang];
  const catName = (x: (typeof CATEGORIES)[number]) => (lang === "zh" ? x.zh : x.en);
  const catDesc = (x: (typeof CATEGORIES)[number]) => (lang === "zh" ? x.descZh : x.descEn);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ============ 2. FIRST IMPRESSION ============ */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="hero-eyebrow">{c.eyebrow}</div>
            <h1>{c.h1}<em>{c.h1Accent}</em></h1>
            <p className="hero-sub">{c.sub}</p>
            <div className="hero-actions">
              <Link href={`${base}/contact`} className="btn btn-primary">
                {c.primaryCta} <IconArrow size={16} />
              </Link>
              <Link href={`${base}/products`} className="btn btn-ghost-light">
                {c.secondaryCta}
              </Link>
            </div>
            <p className="hero-micro"><IconClock size={15} /> {u.responseTime} · {u.noObligation}</p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-visual-inner">
              <img src="/images/hero-film.svg" alt="" width={800} height={900} />
              <div className="hero-visual-caption">
                <strong>{lang === "zh" ? "薄膜卷材 · 精密分切" : "Film rolls · precision slitting"}</strong>
                <span>{lang === "zh" ? "中国合肥 · 出口 80+ 国家" : "Hefei, China · 80+ export markets"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="hero-stats">
            {c.stats.map((s) => (
              <div className="hero-stat" key={s.label}>
                <span className="num">{s.value}</span>
                <span className="label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="trust-strip">
        <div className="wrap trust-inner">
          <span className="trust-label">{c.trustLine}</span>
          <div className="trust-items">
            {c.proofStrip.map((x) => (
              <span key={x}><IconCheck size={15} />{x}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ============ 3. PROBLEM ============ */}
      <section className="section tight">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{c.problem.label}</span>
            <h2 className="section-title">{c.problem.title}</h2>
            <p className="section-lead">{c.problem.lead}</p>
          </div>
          <div className="problem-grid">
            {c.problem.items.map((x, i) => (
              <article className="problem-card" key={x.title}>
                <div className="idx">0{i + 1}</div>
                <h3>{x.title}</h3>
                <p>{x.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. SOLUTION / PROCESS ============ */}
      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{c.solution.label}</span>
            <h2 className="section-title">{c.solution.title}</h2>
            <p className="section-lead">{c.solution.lead}</p>
          </div>
          <div className="steps">
            {c.solution.items.map((x) => (
              <article className="step" key={x.n}>
                <span className="n">{x.n}</span>
                <h3>{x.title}</h3>
                <p>{x.body}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 44 }}>
            <Link href={`${base}/capabilities`} className="btn btn-outline">
              {c.capability.cta} <IconArrow size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 1 + 8. CATALOGUE ============ */}
      <section className="section" id="products">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{c.catalog.label}</span>
            <h2 className="section-title">{c.catalog.title}</h2>
            <p className="section-lead">{c.catalog.lead}</p>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map((cat, i) => (
              <Link className="cat-card" href={`${base}/products/${cat.slug}`} key={cat.slug}>
                <div className="cat-top">
                  <span className="cat-num">{String(i + 1).padStart(2, "0")} / 11</span>
                  <span className="cat-swatch"><CategoryIcon slug={cat.slug} /></span>
                </div>
                <h3>{catName(cat)}</h3>
                <p>{catDesc(cat)}</p>
                <span className="cat-count">{cat.count} {u.productCount}</span>
                <span className="cat-arrow">{u.seeCategory} <IconArrow size={14} /></span>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link href={`${base}/products`} className="btn btn-navy">
              {c.catalog.cta} <IconArrow size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 5. CAPABILITIES (service page teaser) ============ */}
      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{c.capability.label}</span>
            <h2 className="section-title">{c.capability.title}</h2>
            <p className="section-lead">{c.capability.lead}</p>
          </div>
          <div className="cap-grid">
            {c.capability.items.map((x) => (
              <article className="cap-card" key={x.title}>
                <div className="cap-n">◆</div>
                <h3>{x.title}</h3>
                <p>{x.body}</p>
                <ul className="cap-list">
                  {x.points.map((p) => (
                    <li key={p}><IconCheck size={15} />{p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <Link href={`${base}/capabilities`} className="btn btn-outline">
              {c.capability.cta} <IconArrow size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 4. PORTFOLIO / CASE STUDIES ============ */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{c.cases.label}</span>
            <h2 className="section-title">{c.cases.title}</h2>
            <p className="section-lead">{c.cases.lead}</p>
          </div>
          <div className="case-grid">
            {c.cases.items.map((x) => (
              <article className="case-card" key={x.title}>
                <div className="case-head">
                  <div className="meta"><span>{x.region}</span><span>/</span><span>{x.sector}</span></div>
                  <h3>{x.title}</h3>
                </div>
                <div className="case-body">
                  <p>{x.body}</p>
                  <div className="case-result"><IconCheck size={16} />{x.result}</div>
                </div>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link href={`${base}/cases`} className="btn btn-outline">
              {c.cases.cta} <IconArrow size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 6. ABOUT STORY ============ */}
      <section className="section alt">
        <div className="wrap about-grid">
          <div className="about-copy">
            <span className="eyebrow">{c.about.label}</span>
            <h2 className="section-title">{c.about.title}</h2>
            {c.about.paragraphs.map((p) => <p key={p}>{p}</p>)}
            <div className="btn-row" style={{ marginTop: 28 }}>
              <Link href={`${base}/about`} className="btn btn-navy">
                {c.about.cta} <IconArrow size={16} />
              </Link>
            </div>
            <div className="about-facts" style={{ marginTop: 38 }}>
              {c.about.facts.map((f) => (
                <div className="about-fact" key={f.label}>
                  <div className="v">{f.value}</div>
                  <div className="l">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
          <aside className="about-aside">
            <h3>{lang === "zh" ? "和您对接的是懂工艺的人" : "You talk to someone who reads the datasheet"}</h3>
            <ul>
              {(lang === "zh"
                ? [
                    "读您询盘的工程师，就是之后和您对技术数据表的人。",
                    "支持中、英、法、俄、西语技术咨询，多币种结算。",
                    "复购订单留存样品，第三柜与第一柜保持一致。",
                    "规格不适合或交期做不到，会在下单前说明。",
                  ]
                : [
                    "The engineer reading your enquiry is the one who discusses the datasheet — not a ticket queue.",
                    "Technical consultation in English, French, Russian, Spanish and 中文.",
                    "Retained samples keep your third container identical to your first.",
                    "If a grade is wrong or a lead time unrealistic, you hear it before the order.",
                  ]
              ).map((x) => (
                <li key={x}><IconCheck size={16} />{x}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ============ 8. FAQ ============ */}
      <section className="section">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">{c.faq.label}</span>
            <h2 className="section-title">{c.faq.title}</h2>
            <p className="section-lead">{c.faq.lead}</p>
          </div>
          <div className="faq-list">
            {faqs.slice(0, FAQ_COUNT).map((f) => (
              <details className="faq-item" key={f.q}>
                <summary>{f.q}<IconPlus size={18} /></summary>
                <div className="answer">{f.a}</div>
              </details>
            ))}
          </div>
          <div style={{ marginTop: 34, textAlign: "center" }}>
            <Link href={`${base}/faq`} className="btn btn-outline">
              {c.faq.cta} <IconArrow size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="final-cta">
        <div className="wrap final-cta-inner">
          <span className="eyebrow">{u.getQuote}</span>
          <h2>{c.finalCta.title}</h2>
          <p>{c.finalCta.body}</p>
          <div className="btn-row">
            <Link href={`${base}/contact`} className="btn btn-primary">
              {c.finalCta.primary} <IconArrow size={16} />
            </Link>
            <a href={`mailto:${SITE.email}`} className="btn btn-ghost-light">
              <IconMail size={16} /> {c.finalCta.secondary}
            </a>
          </div>
          <p className="note">{c.finalCta.note}</p>
        </div>
      </section>
    </>
  );
}
