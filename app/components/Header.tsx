"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = {
  en: [
    { href: "/en", label: "Home" },
    { href: "/en/about", label: "About" },
    { href: "/en/products", label: "Products" },
    { href: "/en/news", label: "News" },
    { href: "/en/contact", label: "Contact" },
  ],
  zh: [
    { href: "/zh", label: "首页" },
    { href: "/zh/about", label: "关于我们" },
    { href: "/zh/products", label: "产品中心" },
    { href: "/zh/news", label: "新闻动态" },
    { href: "/zh/contact", label: "联系我们" },
  ],
};

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect locale from pathname
  const locale = pathname.startsWith("/zh") ? "zh" : "en";
  const links = navLinks[locale];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-inner wrap">
        <Link href={locale === "zh" ? "/zh" : "/"} className="logo" aria-label="AEC GROUP Home">
          <span className="logo-icon">AEC</span>
          <span className="logo-text">GROUP</span>
        </Link>

        <nav className={`site-nav ${isMobileMenuOpen ? "open" : ""}`} role="navigation" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href || (link.href !== (locale === "zh" ? "/zh" : "/") && pathname.startsWith(link.href)) ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
          <Link href={locale === "zh" ? "/zh/contact" : "/contact"} className="nav-cta">
            {locale === "zh" ? "获取报价" : "Get a Quote"}
          </Link>
        </nav>

        <div className="lang-switcher">
          <Link
            href={locale === "zh" ? "/" : "/zh"}
            className="lang-btn"
            aria-label={locale === "zh" ? "English Version" : "中文版"}
          >
            <span className="lang-flag">{locale === "zh" ? "🇺🇸" : "🇨🇳"}</span>
            <span>{locale === "zh" ? "English" : "中文"}</span>
          </Link>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="main-navigation"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}