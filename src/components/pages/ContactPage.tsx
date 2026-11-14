import { CONTACT } from "@/content/pages";
import { SITE, UI, type Lang } from "@/content/site";
import { IconCheck, IconMail, IconPhone, IconPin, IconClock, IconMessage } from "../Icons";
import InquiryForm from "../InquiryForm";
import { jsonLdScript } from "@/lib/seo";
import PageHero from "./PageHero";
import FinalCta from "./FinalCta";

export default function ContactPage({
  lang,
  productName,
}: {
  lang: Lang;
  productName?: string;
}) {
  const c = CONTACT[lang];
  const u = UI[lang];
  const zh = lang === "zh";

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: c.metaTitle,
    description: c.metaDescription,
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      email: SITE.email,
      telephone: SITE.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: zh ? "徽州大道1158号" : "No.1158 Huizhou Ave., Baohe District",
        addressLocality: "Hefei",
        addressRegion: "Anhui",
        postalCode: "230051",
        addressCountry: "CN",
      },
    },
  };

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={c.eyebrow}
        title={c.h1}
        lead={c.lead}
        crumbs={[{ name: zh ? "联系我们" : "Contact" }]}
      />

      <section className="section">
        <div className="wrap contact-grid">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(contactJsonLd) }} />

          <div className="prose">
            <h2 style={{ marginTop: 0 }}>{c.introTitle}</h2>
            <p>{c.intro}</p>
            <ul>
              {c.expectations.map((x) => (
                <li key={x}><IconCheck size={15} /> {x}</li>
              ))}
            </ul>

            <div className="contact-list">
              <div className="contact-item">
                <span className="contact-ico"><IconMail size={19} /></span>
                <div>
                  <h4>{zh ? "邮箱" : "Email"}</h4>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-ico"><IconPhone size={19} /></span>
                <div>
                  <h4>{zh ? "电话 / WhatsApp" : "Phone / WhatsApp"}</h4>
                  <a href={`tel:${SITE.mobile.replace(/[^+\d]/g, "")}`}>{SITE.mobile}</a>
                  <p style={{ fontSize: 14, color: "var(--muted)", margin: "4px 0 0" }}>{SITE.phone}</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-ico"><IconPin size={19} /></span>
                <div>
                  <h4>{zh ? "地址" : "Office"}</h4>
                  <p>{zh ? SITE.addressZh : SITE.address}</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-ico"><IconClock size={19} /></span>
                <div>
                  <h4>{zh ? "工作时间" : "Business hours"}</h4>
                  <p>{zh ? SITE.hoursZh : SITE.hours}</p>
                </div>
              </div>
            </div>

            <p style={{ marginTop: 26, fontSize: 14, color: "var(--muted)" }}>
              <IconMessage size={14} /> {u.responseTime} · {u.noObligation}
            </p>
          </div>

          <InquiryForm lang={lang} productName={productName} />
        </div>
      </section>

      <FinalCta lang={lang} title={c.ctaTitle} body={c.ctaBody} />
    </>
  );
}
