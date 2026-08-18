import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import Sidebar from "./Sidebar";

export function ZhHeader() {
  return (
    <header className="site-header">
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <Link href="/zh" className="logo">中国东渐集团</Link>
        <nav className="site-nav">
          <Link href="/zh">首页</Link>
          <Link href="/zh/about">关于我们</Link>
          <Link href="/zh/products">产品展示</Link>
          <Link href="/zh/news">新闻动态</Link>
          <Link href="/zh/contact">联系我们</Link>
          <Link href="/zh/feedback">在线留言</Link>
        </nav>
        <div className="lang-switcher">
          <a href="/zh" className="lang-btn active" title="中文版">
            <span className="lang-flag">🇨🇳</span>
            <span className="lang-text">中文</span>
          </a>
          <span className="lang-separator">|</span>
          <a href="/" className="lang-btn" title="English Version">
            <span className="lang-flag">🇺🇸</span>
            <span className="lang-text">EN</span>
          </a>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}

export function ZhFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        中国东渐集团（安徽东渐进出口有限公司） · 邮箱：sale@boppfilmsale.com · 电话：86-551-64687285
      </div>
    </footer>
  );
}

export function ZhLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ZhHeader />
      <main className="wrap">
        <div className="layout">
          <Sidebar />
          <div className="content-box">{children}</div>
        </div>
      </main>
      <ZhFooter />
    </>
  );
}