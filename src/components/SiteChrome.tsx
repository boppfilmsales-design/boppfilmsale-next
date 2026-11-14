"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { UI, type Lang } from "@/content/site";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/en";
  const lang: Lang = pathname.startsWith("/zh") ? "zh" : "en";
  return (
    <>
      <a className="skip-link" href="#main-content">{UI[lang].skip}</a>
      <Header />
      <main id="main-content" className="main">{children}</main>
      <Footer lang={lang} />
    </>
  );
}
