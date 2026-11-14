"use client";

import { useState } from "react";
import { SITE, type Lang } from "@/content/site";

/**
 * Static site, no backend: the form composes a fully pre-filled email and
 * opens the visitor's mail client. Nothing is silently "sent" and lost —
 * the success panel always keeps a direct mailto link plus a copyable address.
 */
export default function InquiryForm({
  lang,
  productName,
}: {
  lang: Lang;
  productName?: string;
}) {
  const [href, setHref] = useState<string | null>(null);
  const zh = lang === "zh";

  const t = zh
    ? {
        title: "发送询盘",
        sub: "填写规格或应用说明，24 小时内收到技术建议与报价。",
        name: "姓名 *",
        email: "邮箱 *",
        company: "公司",
        country: "国家 / 地区",
        product: "感兴趣的产品",
        message: "应用说明 / 规格要求 *",
        placeholder: "例如：BOPP 预涂膜，20 μm，用于高速复合线，幅宽 880 mm，月需 5 吨…",
        submit: "生成询盘邮件",
        note: "提交后会打开您的邮件客户端，内容已预填，确认后发送即可。",
        sentTitle: "询盘邮件已准备好",
        sentBody: "您的邮件客户端应已自动打开。若没有打开，请点击下方按钮：",
        sentLink: "打开邮件客户端",
        direct: "或直接发送至",
        again: "再填一份",
      }
    : {
        title: "Send an enquiry",
        sub: "Tell us the specification or the application. A technical answer within 24 hours.",
        name: "Your name *",
        email: "Email *",
        company: "Company",
        country: "Country / region",
        product: "Product of interest",
        message: "Application / specification *",
        placeholder: "e.g. BOPP thermal lamination film, 20 µm, high-speed laminator, 880 mm width, 5 t/month…",
        submit: "Prepare enquiry email",
        note: "This opens your mail client with everything pre-filled. You review it before sending.",
        sentTitle: "Your enquiry is ready",
        sentBody: "Your mail client should have opened. If it didn't, use the button below:",
        sentLink: "Open mail client",
        direct: "Or write directly to",
        again: "Write another enquiry",
      };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) || "").trim();
    const name = get("name");
    const email = get("email");
    const company = get("company");
    const country = get("country");
    const product = get("product");
    const message = get("message");

    const subject = `${zh ? "询盘" : "Enquiry"} — ${product || (zh ? "薄膜规格咨询" : "Film specification")} — ${company || name}`;
    const lines = [
      `${zh ? "姓名" : "Name"}: ${name}`,
      `${zh ? "公司" : "Company"}: ${company || "—"}`,
      `${zh ? "邮箱" : "Email"}: ${email}`,
      `${zh ? "国家/地区" : "Country"}: ${country || "—"}`,
      `${zh ? "产品" : "Product"}: ${product || "—"}`,
      "",
      `${zh ? "应用 / 规格要求" : "Application / specification"}:`,
      message,
      "",
      "---",
      `${zh ? "来源页面" : "Sent from"}: ${typeof window !== "undefined" ? window.location.href : SITE.baseUrl}`,
    ];
    const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setHref(mailto);
    if (typeof window !== "undefined") window.location.href = mailto;
  }

  if (href) {
    return (
      <div className="form-success" role="status">
        <h2>{t.sentTitle}</h2>
        <p>{t.sentBody}</p>
        <p style={{ marginTop: 18 }}>
          <a className="btn btn-primary" href={href}>{t.sentLink}</a>
        </p>
        <p style={{ marginTop: 18 }}>
          {t.direct} <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
        <p style={{ marginTop: 20, fontSize: 14 }}>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => setHref(null)}>{t.again}</button>
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>{t.title}</h2>
      <p>{t.sub}</p>

      <div className="form-group">
        <label htmlFor="iq-name">{t.name}</label>
        <input id="iq-name" name="name" type="text" required autoComplete="name" />
      </div>
      <div className="form-group">
        <label htmlFor="iq-email">{t.email}</label>
        <input id="iq-email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="form-group">
        <label htmlFor="iq-company">{t.company}</label>
        <input id="iq-company" name="company" type="text" autoComplete="organization" />
      </div>
      <div className="form-group">
        <label htmlFor="iq-country">{t.country}</label>
        <input id="iq-country" name="country" type="text" autoComplete="country-name" />
      </div>
      <div className="form-group">
        <label htmlFor="iq-product">{t.product}</label>
        <input id="iq-product" name="product" type="text" defaultValue={productName || ""} />
      </div>
      <div className="form-group">
        <label htmlFor="iq-message">{t.message}</label>
        <textarea id="iq-message" name="message" required placeholder={t.placeholder} />
      </div>

      <button type="submit" className="btn btn-primary form-submit">{t.submit}</button>
      <p className="form-note">{t.note}</p>
    </form>
  );
}
