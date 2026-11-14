import { CAPABILITIES, UI, type Lang } from "@/content/site";
import { IconCheck, IconArrow } from "../Icons";
import Link from "next/link";
import PageHero from "./PageHero";
import FinalCta from "./FinalCta";

export default function CapabilitiesPage({ lang }: { lang: Lang }) {
  const c = CAPABILITIES[lang];
  const u = UI[lang];
  const zh = lang === "zh";
  const base = zh ? "/zh" : "/en";

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: zh ? "服务能力" : "AEC GROUP capabilities",
    itemListElement: c.services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Service", name: s.title, description: s.body, provider: { "@type": "Organization", name: "AEC GROUP" } },
    })),
  };

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={c.eyebrow}
        title={c.h1}
        lead={c.lead}
        crumbs={[{ name: zh ? "服务能力" : "Capabilities" }]}
      />

      <section className="section">
        <div className="wrap">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c") }} />
          <div className="section-head">
            <span className="eyebrow">{zh ? "服务清单" : "What is included"}</span>
            <h2 className="section-title">
              {zh ? "一张报价单背后，我们承担的工作" : "What a quotation actually covers"}
            </h2>
            <p className="section-lead">
              {zh
                ? "多数客户只用其中三到四项。按您的项目挑选，不必为用不到的环节付费。"
                : "Most customers use three or four of these. Choose what your programme needs — you are not billed for steps you skip."}
            </p>
          </div>
          <div className="cap-grid">
            {c.services.map((s) => (
              <article className="cap-card" key={s.n}>
                <div className="cap-n">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <ul className="cap-list">
                  {s.includes.map((x) => (
                    <li key={x}><IconCheck size={15} />{x}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Process makes the value obvious before the CTA */}
      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{zh ? "合作流程" : "The process"}</span>
            <h2 className="section-title">
              {zh ? "五步，从需求到您的仓库" : "Five steps from brief to your warehouse"}
            </h2>
            <p className="section-lead">
              {zh ? "每一步都有明确交付物，不靠「保持联系」推进。" : "Every step has a deliverable. Nothing moves forward on “we'll be in touch”."}
            </p>
          </div>
          <div className="steps">
            {c.process.map((p) => (
              <article className="step" key={p.n}>
                <span className="n">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
          <div className="btn-row" style={{ marginTop: 44 }}>
            <Link href={`${base}/products`} className="btn btn-navy">
              {u.viewProducts} <IconArrow size={16} />
            </Link>
            <Link href={`${base}/cases`} className="btn btn-outline">
              {zh ? "查看实际案例" : "See it applied"} <IconArrow size={16} />
            </Link>
          </div>
        </div>
      </section>

      <FinalCta lang={lang} title={c.ctaTitle} body={c.ctaBody} />
    </>
  );
}
