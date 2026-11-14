"use client";

import { useState, useEffect, useRef } from "react";
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

// Product categories for dropdown
const productCategories = {
  en: [
    { label: "Biaxially Oriented Polypropylene Film", href: "/en/products?category=1" },
    { label: "Biaxially Oriented Polyester Film", href: "/en/products?category=2" },
    { label: "Adhesive Tape and Glue", href: "/en/products?category=3" },
    { label: "Coating Film", href: "/en/products?category=4" },
    { label: "PS Film, CPP Film, Nylon Film", href: "/en/products?category=6" },
    { label: "Tear Tape, Ribbon, Label, Coding Machine", href: "/en/products?category=7" },
    { label: "PE, PVC, PO Film and Bags", href: "/en/products?category=8" },
    { label: "Paper Products", href: "/en/products?category=9" },
    { label: "Machinery and Electronics", href: "/en/products?category=10" },
    { label: "Epidemic Prevention Supplies", href: "/en/products?category=11" },
  ],
  zh: [
    { label: "双向拉伸聚丙烯薄膜", href: "/zh/products?category=1" },
    { label: "双向拉伸聚酯薄膜", href: "/zh/products?category=2" },
    { label: "胶粘带与胶水", href: "/zh/products?category=3" },
    { label: "涂布薄膜", href: "/zh/products?category=4" },
    { label: "PS膜、CPP膜、尼龙膜", href: "/zh/products?category=6" },
    { label: "撕拉带、碳带、标签、打码机", href: "/zh/products?category=7" },
    { label: "PE、PVC、PO薄膜及袋子", href: "/zh/products?category=8" },
    { label: "纸制品", href: "/zh/products?category=9" },
    { label: "机器设备与电子产品", href: "/zh/products?category=10" },
    { label: "防疫用品", href: "/zh/products?category=11" },
  ],
};

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect locale from pathname
  const locale = pathname.startsWith("/zh") ? "zh" : "en";
  const links = navLinks[locale];
  const categories = productCategories[locale];
  const productsBaseHref = locale === "zh" ? "/zh/products" : "/en/products";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setHoveredNav(null);
        setMobileSubmenuOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isProductsActive = pathname.startsWith(productsBaseHref);

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`} ref={dropdownRef}>
      <div className="header-inner wrap">
        <a href={locale === "zh" ? "/zh" : "/en"} className="logo" aria-label="AEC GROUP Home">
          <span className="logo-icon">AEC</span>
          <span className="logo-text">GROUP</span>
        </a>

        <nav className={`site-nav ${isMobileMenuOpen ? "open" : ""}`} role="navigation" aria-label="Main navigation">
          {links.map((link) => {
            const isProductsLink = link.href === productsBaseHref;
            
            if (isProductsLink) {
              return (
                <div
                  key={link.href}
                  className="nav-dropdown"
                  onMouseEnter={() => setHoveredNav("products")}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  <a
                    href={link.href}
                    className={`${isProductsActive ? "active" : ""} has-dropdown`}
                    aria-haspopup="true"
                    aria-expanded={hoveredNav === "products" || mobileSubmenuOpen === "products"}
                  >
                    {link.label}
                    <svg className="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </a>
                  
                  {/* Desktop dropdown */}
                  {(hoveredNav === "products" || mobileSubmenuOpen === "products") && (
                    <div className="dropdown-menu" role="menu">
                      {categories.map((cat) => (
                        <a
                          key={cat.href}
                          href={cat.href}
                          className={`dropdown-item ${pathname === cat.href ? "active" : ""}`}
                          role="menuitem"
                          onClick={() => {
                            setHoveredNav(null);
                            setMobileSubmenuOpen(null);
                          }}
                        >
                          {cat.label}
                        </a>
                      ))}
                      <a
                        href={productsBaseHref}
                        className="dropdown-item dropdown-view-all"
                        role="menuitem"
                        onClick={() => {
                          setHoveredNav(null);
                          setMobileSubmenuOpen(null);
                        }}
                      >
                        {locale === "zh" ? "查看所有产品" : "View All Products"}
                      </a>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                className={pathname === link.href || (link.href !== (locale === "zh" ? "/zh" : "/") && pathname.startsWith(link.href)) ? "active" : ""}
              >
                {link.label}
              </a>
            );
          })}
          <a href={locale === "zh" ? "/zh/contact" : "/contact"} className="nav-cta">
            {locale === "zh" ? "获取报价" : "Get a Quote"}
          </a>
        </nav>

        <div className="lang-switcher">
          <a
            href={locale === "zh" ? "/en" : "/zh"}
            className="lang-btn"
            aria-label={locale === "zh" ? "English Version" : "中文版"}
          >
            <span className="lang-flag">{locale === "zh" ? "🇺🇸" : "🇨🇳"}</span>
            <span>{locale === "zh" ? "English" : "中文"}</span>
          </a>
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