import type { Metadata } from "next";
import { SITE } from "@/content/site";

/**
 * Static language gateway. Cloudflare Pages also serves a 301 from / to /en
 * (see public/_redirects), so crawlers that follow the redirect never see
 * this page — but a crawlable HTML fallback is better than a JS-only redirect.
 */
export const metadata: Metadata = {
  title: "AEC GROUP — BOPP, BOPET & Flexible Packaging Films",
  description:
    "Manufacturer and exporter of BOPP, BOPET, CPP and metallized films, thermal transfer ribbons and packaging machinery. Choose your language.",
  alternates: {
    canonical: "/en",
    languages: { en: "/en", "zh-CN": "/zh", "x-default": "/en" },
  },
  robots: { index: false, follow: true },
};

export default function RootGateway() {
  return (
    <section className="section">
      <div className="wrap prose">
        <span className="eyebrow">AEC GROUP · Hefei, China</span>
        <h1>Flexible packaging films, specified for your process.</h1>
        <p>Choose a language to continue.</p>
        <p>选择语言继续浏览。</p>
        <div className="btn-row" style={{ marginTop: 28 }}>
          <a href="/en" className="btn btn-primary" hrefLang="en">English</a>
          <a href="/zh" className="btn btn-outline" hrefLang="zh-CN">中文</a>
        </div>
        <p style={{ marginTop: 40, fontSize: 14, color: "var(--muted)" }}>
          {SITE.legalName} · {SITE.email}
        </p>
      </div>
    </section>
  );
}
