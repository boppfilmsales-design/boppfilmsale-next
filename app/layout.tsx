import "./globals.css";
import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),
  // Every page supplies a complete, brand-aware title via pageMeta().
  // A template here would append "| AEC GROUP" a second time.
  title: "BOPP, BOPET & Flexible Packaging Films | AEC GROUP",
  description:
    "AEC GROUP supplies BOPP, BOPET, CPP, POF, metallized and coated films, thermal ribbons and packaging machinery to 80+ countries. Custom slitting, FDA/EU compliant grades, quotation within 24 hours.",
  keywords: [
    "BOPP film", "BOPET film", "CPP film", "POF shrink film",
    "metallized film", "thermal lamination film", "packaging film supplier",
    "flexible packaging", "thermal transfer ribbon", "BOPP film manufacturer China",
  ],
  applicationName: "AEC GROUP",
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: {
    canonical: "/en",
    languages: { "en": "/en", "zh-CN": "/zh", "x-default": "/en" },
  },
  openGraph: {
    type: "website",
    siteName: "AEC GROUP",
    locale: "en_US",
    alternateLocale: "zh_CN",
    title: "BOPP, BOPET & Flexible Packaging Films | AEC GROUP",
    description: "Film engineered to your converting line, delivered worldwide from Hefei, China.",
    url: SITE.baseUrl,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: true, address: true, email: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.baseUrl}/#organization`,
  name: "AEC GROUP",
  legalName: SITE.legalName,
  alternateName: SITE.legalNameZh,
  url: SITE.baseUrl,
  foundingDate: String(SITE.founded),
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "No.1158 Huizhou Ave., Baohe District",
    addressLocality: "Hefei",
    addressRegion: "Anhui",
    postalCode: "230051",
    addressCountry: "CN",
  },
  contactPoint: [{
    "@type": "ContactPoint",
    contactType: "sales",
    email: SITE.email,
    telephone: SITE.phone,
    availableLanguage: ["English", "Chinese", "French", "Russian", "Spanish"],
    areaServed: "Worldwide",
  }],
  knowsAbout: ["BOPP film", "BOPET film", "CPP film", "POF shrink film", "metallized film", "thermal lamination film", "flexible packaging"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
