"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import "./globals.css";
import Sidebar from "./Sidebar";

export default function ZhLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      const el = anchor as HTMLAnchorElement;
      el.addEventListener('click', (e: MouseEvent) => {
        const targetId = el.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <Link href="/zh" className="logo">中国东渐集团</Link>
          <nav className="site-nav" style={{ display: mobileMenuOpen ? "flex" : "none", flexDirection: "column", position: "absolute", top: "72px", left: 0, right: 0, background: "#fff", padding: "20px", borderBottom: "1px solid var(--border)", boxShadow: "var(--shadow-md)", zIndex: 999, gap: 8 }}>
            <Link href="/zh" onClick={() => setMobileMenuOpen(false)}>首页</Link>
            <Link href="/zh/about" onClick={() => setMobileMenuOpen(false)}>关于我们</Link>
            <Link href="/zh/products" onClick={() => setMobileMenuOpen(false)}>产品展示</Link>
            <Link href="/zh/news" onClick={() => setMobileMenuOpen(false)}>新闻动态</Link>
            <Link href="/zh/contact" onClick={() => setMobileMenuOpen(false)}>联系我们</Link>
            <Link href="/zh/feedback" onClick={() => setMobileMenuOpen(false)}>在线留言</Link>
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
          <button className="mobile-menu-btn" aria-label="Toggle menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: "block" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>
      <main className="wrap">
        <div className="layout">
          <Sidebar />
          <div className="content-box">{children}</div>
        </div>
      </main>
      <footer className="site-footer">
        <div className="wrap">
          中国东渐集团（安徽东渐进出口有限公司） · 邮箱：sale@boppfilmsale.com · 电话：86-551-64687285
        </div>
      </footer>
    </>
  );
}