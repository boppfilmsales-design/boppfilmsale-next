import { CASES, type Lang } from "@/content/site";
import { IconCheck } from "../Icons";
import PageHero from "./PageHero";
import FinalCta from "./FinalCta";

export default function CasesPage({ lang }: { lang: Lang }) {
  const c = CASES[lang];
  const zh = lang === "zh";

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={c.eyebrow}
        title={c.h1}
        lead={c.lead}
        crumbs={[{ name: zh ? "合作案例" : "Case studies" }]}
      />

      {/* 4 — Portfolio: high-end project presentation, problem → decision → result */}
      <section className="section">
        <div className="wrap">
          <div className="prose" style={{ marginBottom: 50 }}>
            <h2>{zh ? "项目怎么看" : "How to read these projects"}</h2>
            <p>
              {zh
                ? "每个案例都写明遇到的问题、我们改了哪几项规格、以及最后产线上发生了什么变化。没有「显著提升」「大幅优化」这类无法验证的说法——能提供的检测数据与等级参照，都在下面注明的范围内。"
                : "Each project states the symptom, the specification decision and what changed on the line. No “significantly improved” claims you cannot verify — the test data and grade references available on request are described below."}
            </p>
          </div>

          <div className="case-list">
            {c.items.map((item, i) => (
              <article className="case-card case-detail" key={item.title}>
                <div className="case-head">
                  <div className="meta"><span>{String(i + 1).padStart(2, "0")}</span><span>/</span><span>{item.region}</span></div>
                  <h3>{item.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 10 }}>{item.sector}</p>
                </div>
                <div className="case-body">
                  <p style={{ marginBottom: 14 }}><strong>{zh ? "问题" : "Problem"}</strong> · {item.challenge}</p>
                  <p style={{ marginBottom: 14 }}><strong>{zh ? "处理" : "What we changed"}</strong> · {item.approach}</p>
                  <div className="case-result"><IconCheck size={16} />{item.outcome}</div>
                </div>
              </article>
            ))}
          </div>

          <p style={{ marginTop: 34, maxWidth: 780, fontSize: 14, color: "var(--muted)", lineHeight: 1.8 }}>
            {c.note}
          </p>
        </div>
      </section>

      <FinalCta lang={lang} title={c.ctaTitle} body={c.ctaBody} />
    </>
  );
}
