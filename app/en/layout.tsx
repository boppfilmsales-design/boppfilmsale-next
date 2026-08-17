"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import "../globals.css";

export default function EnLayout({
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
          if (mobileMenuOpen) {
            setMobileMenuOpen(false);
          }
        }
      });
    });
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <Link href="/en" className="logo">
            <span className="logo-icon">AEC</span>
            <span className="logo-text">AEC GROUP</span>
          </Link>
          <nav className="site-nav" id="navLinks" style={{ display: mobileMenuOpen ? "flex" : "flex", flexDirection: mobileMenuOpen ? "column" : "row", position: mobileMenuOpen ? "absolute" : "static", top: mobileMenuOpen ? "72px" : "auto", left: 0, right: 0, background: mobileMenuOpen ? "#fff" : "transparent", padding: mobileMenuOpen ? "20px" : 0, borderBottom: mobileMenuOpen ? "1px solid var(--border)" : "none", boxShadow: mobileMenuOpen ? "var(--shadow-md)" : "none", zIndex: mobileMenuOpen ? 999 : "auto", gap: mobileMenuOpen ? 8 : 8, alignItems: mobileMenuOpen ? "flex-start" : "center" }}>
            <Link href="/en" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/en/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link href="/en/products" onClick={() => setMobileMenuOpen(false)}>Products</Link>
            <Link href="/en/news" onClick={() => setMobileMenuOpen(false)}>News</Link>
            <Link href="/en/contact" className="nav-cta" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
          </nav>
          <div className="lang-switcher">
            <a href="/zh" className="lang-btn" title="中文版">
              <span className="lang-flag">🇨🇳</span>
              <span className="lang-text">中文</span>
            </a>
            <span className="lang-separator">|</span>
            <a href="/en" className="lang-btn active" title="English Version">
              <span className="lang-flag">🇺🇸</span>
              <span className="lang-text">EN</span>
            </a>
          </div>
          <button className="mobile-menu-btn" aria-label="Toggle menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: "none" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <h3>AEC GROUP</h3>
            <p>Anhui Eastern Communication Imp.& Exp. Co., Ltd</p>
            <p>Professional Film Materials Supplier Since 2011</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/en">Home</Link></li>
              <li><Link href="/en/about">About Us</Link></li>
              <li><Link href="/en/products">Products</Link></li>
              <li><Link href="/en/news">News</Link></li>
              <li><Link href="/en/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p><span className="contact-icon">📞</span> +86-551-64687285</p>
            <p><span className="contact-icon">📱</span> +86-18919659471</p>
            <p><span className="contact-icon">✉️</span> sale@boppfilmsale.com</p>
            <p><span className="contact-icon">📍</span> No.1158 Huizhou Ave., Baohe Dist., Hefei, Anhui, China</p>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <p>&copy; {new Date().getFullYear()} AEC GROUP · Anhui Eastern Communication Imp.& Exp. Co., Ltd. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}