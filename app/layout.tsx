import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "BOPP Film Sale",
  description: "BOPP / BOPET 薄膜产品供应商",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <header className="site-header">
          <div className="wrap">
            <Link href="/" className="logo">BOPP Film Sale</Link>
            <nav>
              <Link href="/">首页</Link>
              <Link href="/products">产品</Link>
              <Link href="/news">新闻</Link>
              <Link href="/about">关于我们</Link>
              <Link href="/en" className="lang-switch">English</Link>
            </nav>
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer className="site-footer">
          <div className="wrap">© BOPP Film Sale. All rights reserved.</div>
        </footer>
      </body>
    </html>
  );
}
