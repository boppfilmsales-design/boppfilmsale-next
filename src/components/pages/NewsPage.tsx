import { NEWS } from "@/content/pages";
import type { Lang } from "@/content/site";
import PageHero from "./PageHero";
import FinalCta from "./FinalCta";

export default function NewsPage({ lang }: { lang: Lang }) {
  const c = NEWS[lang];
  const zh = lang === "zh";

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={c.eyebrow}
        title={c.h1}
        lead={c.lead}
        crumbs={[{ name: zh ? "技术笔记" : "Technical notes" }]}
      />

      <section className="section">
        <div className="wrap">
          <div className="news-list">
            {c.items.map((item) => (
              <article className="news-row" key={item.title}>
                <div className="date">
                  {item.date} <span aria-hidden="true"> · </span> {item.tag}
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        lang={lang}
        title={zh ? "把您的问题发来" : "Send us your question"}
        body={zh ? "规格、工艺或单证上的疑问，工程师直接书面回复。" : "Specification, converting or documentation questions — answered in writing by an engineer."}
      />
    </>
  );
}
