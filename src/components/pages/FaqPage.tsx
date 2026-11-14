import { FAQS, type Lang } from "@/content/site";
import { IconPlus } from "../Icons";
import { jsonLdScript } from "@/lib/seo";
import PageHero from "./PageHero";
import FinalCta from "./FinalCta";

export default function FaqPage({ lang }: { lang: Lang }) {
  const faqs = FAQS[lang];
  const zh = lang === "zh";

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
      <PageHero
        lang={lang}
        eyebrow={zh ? "常见问题" : "FAQ"}
        title={zh ? "下单前，您大概会问这些" : "The questions buyers ask before the first order"}
        lead={
          zh
            ? "起订量、寄样、交期、单证、拼柜、付款与批次一致性——全部写清楚，不用先发一封邮件试探。"
            : "MOQ, samples, lead times, documents, consolidation, payment and lot consistency — answered plainly, before you have to ask."
        }
        crumbs={[{ name: zh ? "常见问题" : "FAQ" }]}
      />

      <section className="section">
        <div className="wrap">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
          <div className="faq-list">
            {faqs.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary>{f.q}<IconPlus size={18} /></summary>
                <div className="answer">{f.a}</div>
              </details>
            ))}
          </div>
          <p style={{ marginTop: 36, fontSize: 14, color: "var(--muted)", maxWidth: 760 }}>
            {zh
              ? "没有找到答案？把问题连同应用说明一起发来，工程师直接回复，不经过销售话术。"
              : "Something missing? Send the question together with your application brief and an engineer answers it directly."}
          </p>
        </div>
      </section>

      <FinalCta
        lang={lang}
        title={zh ? "还有一个具体问题？" : "Still have a specific question?"}
        body={zh ? "写下产线条件和目标规格，我们 24 小时内给出书面答复。" : "Send the line conditions and target spec. A written answer within 24 hours."}
      />
    </>
  );
}
