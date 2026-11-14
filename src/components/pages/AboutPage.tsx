import { ABOUT, SITE, UI, type Lang } from "@/content/site";
import { IconCheck } from "../Icons";
import PageHero from "./PageHero";
import FinalCta from "./FinalCta";

export default function AboutPage({ lang }: { lang: Lang }) {
  const c = ABOUT[lang];
  const u = UI[lang];
  const zh = lang === "zh";

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={c.eyebrow}
        title={c.h1}
        lead={c.lead}
        crumbs={[{ name: zh ? "关于我们" : "About us" }]}
      />

      {/* 6 — Story: relevant, credible, chronological */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{zh ? "发展历程" : "Our story"}</span>
            <h2 className="section-title">
              {zh ? "从一卷 BOPP 膜，到十一条产品线" : "From one BOPP grade to eleven product divisions"}
            </h2>
            <p className="section-lead">
              {zh
                ? "我们没有先写愿景，再找业务；是先解决客户产线上的具体问题，业务才长成今天的样子。"
                : "We did not write a vision statement and then look for a business. We kept fixing problems on customers' lines, and the business grew around them."}
            </p>
          </div>
          <div className="steps">
            {c.story.map((s) => (
              <article className="step" key={s.year}>
                <span className="n">{s.year}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Proof / values */}
      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">{zh ? "做事方式" : "How we work"}</span>
            <h2 className="section-title">
              {zh ? "四条不写在合同里、但每张订单都遵守的规则" : "Four rules that never make it into the contract, but govern every order"}
            </h2>
          </div>
          <div className="cap-grid">
            {c.values.map((v, i) => (
              <article className="cap-card" key={v.title}>
                <div className="cap-n">0{i + 1}</div>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Human trust */}
      <section className="section">
        <div className="wrap about-grid">
          <div className="about-copy">
            <span className="eyebrow">{zh ? "谁来服务您" : "Who you actually deal with"}</span>
            <h2 className="section-title">
              {zh ? "不是工单号，是能看懂数据表的人。" : "A person who reads the datasheet, not a ticket number."}
            </h2>
            <p>
              {zh
                ? `${SITE.legalNameZh}（${SITE.name}）自 ${SITE.founded} 年起在合肥经营薄膜出口。团队不大，但选型、深加工、检验与发运由同一批人协调，中间不转手。规格确认后即锁定，复购逐批对标留样。`
                : `${SITE.legalName} (${SITE.name}) has exported film from Hefei since ${SITE.founded}. The team is deliberately small: the people who specify the grade also coordinate converting, inspection and shipping. Once a specification is approved it is frozen, and every repeat lot is checked against the retained sample.`}
            </p>
            <p>
              {zh
                ? "我们更愿意在报价前多问几句线速、热封窗口和印刷方式——因为让产线停下来的便宜膜，从来都不便宜。"
                : "We ask about line speed, sealing window and print method before quoting — because a cheaper film that stops your line was never cheaper."}
            </p>
            <div className="about-facts" style={{ marginTop: 36 }}>
              {(zh
                ? [
                    { v: "2011", l: "成立年份" },
                    { v: "80+", l: "出口国家" },
                    { v: "11", l: "产品事业部" },
                    { v: "24h", l: "报价响应" },
                  ]
                : [
                    { v: "2011", l: "Founded" },
                    { v: "80+", l: "Export markets" },
                    { v: "11", l: "Product divisions" },
                    { v: "24h", l: "Quotation" },
                  ]
              ).map((f) => (
                <div className="about-fact" key={f.l}>
                  <div className="v">{f.v}</div>
                  <div className="l">{f.l}</div>
                </div>
              ))}
            </div>
          </div>
          <aside className="about-aside">
            <h3>{zh ? "您会直接感受到的三件事" : "Three things you will notice immediately"}</h3>
            <ul>
              {c.human.map((x) => (
                <li key={x}><IconCheck size={16} />{x}</li>
              ))}
            </ul>
            <p style={{ marginTop: 22, fontSize: 14, color: "var(--muted)" }}>
              {u.responseTime} · {u.noObligation}
            </p>
          </aside>
        </div>
      </section>

      <FinalCta lang={lang} title={c.ctaTitle} body={c.ctaBody} />
    </>
  );
}
