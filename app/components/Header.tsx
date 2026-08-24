"use client";

import { useState, useEffect, useRef } from "react";
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

// Product categories for dropdown
const productCategories = {
  en: [
    { label: "Biaxially Oriented Polypropylene Film", href: "/en/products?category=Biaxially%20Oriented%20Polypropylene%20Film" },
    { label: "Biaxially Oriented Polyester Film", href: "/en/products?category=Biaxially%20Oriented%20Polyester%20Film" },
    { label: "Adhesive Tape and Glue", href: "/en/products?category=Adhesive%20Tape%20and%20Glue" },
    { label: "Coating Film", href: "/en/products?category=Coating%20Film" },
    { label: "Intermediates", href: "/en/products?category=Intermediates" },
    { label: "PS Film, CPP Film, Nylon Film", href: "/en/products?category=PS%20Film%2C%20CPP%20Film%2C%20Nylon%20Film" },
    { label: "Tear Tape, Ribbon, Label, Coding Machine", href: "/en/products?category=Tear%20Tape%2C%20Ribbon%2C%20Label%2C%20Coding%20Machine" },
    { label: "PE, PVC, PO Film and Bags", href: "/en/products?category=PE%2C%20PVC%2C%20PO%20Film%20and%20Bags" },
    { label: "Paper Products", href: "/en/products?category=Paper%20Products" },
    { label: "Machinery and Electronics", href: "/en/products?category=Machinery%20and%20Electronics" },
    { label: "Epidemic Prevention Supplies", href: "/en/products?category=Epidemic%20Prevention%20Supplies" },
  ],
  zh: [
    { label: "双向拉伸聚丙烯薄膜", href: "/zh/products?category=Biaxially%20Oriented%20Polypropylene%20Film" },
    { label: "双向拉伸聚酯薄膜", href: "/zh/products?category=Biaxially%20Oriented%20Polyester%20Film" },
    { label: "胶粘带与胶水", href: "/zh/products?category=Adhesive%20Tape%20and%20Glue" },
    { label: "涂布薄膜", href: "/zh/products?category=Coating%20Film" },
    { label: "中间体", href: "/zh/products?category=Intermediates" },
    { label: "PS膜、CPP膜、尼龙膜", href: "/zh/products?category=PS%20Film%2C%20CPP%20Film%2C%20Nylon%20Film" },
    { label: "撕拉带、碳带、标签、打码机", href: "/zh/products?category=Tear%20Tape%2C%20Ribbon%2C%20Label%2C%20Coding%20Machine" },
    { label: "PE、PVC、PO薄膜及袋子", href: "/zh/products?category=PE%2C%20PVC%2C%20PO%20Film%20and%20Bags" },
    { label: "纸制品", href: "/zh/products?category=Paper%20Products" },
    { label: "机器设备与电子产品", href: "/zh/products?category=Machinery%20and%20Electronics" },
    { label: "防疫用品", href: "/zh/products?category=Epidemic%20Prevention%20Supplies" },
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
        <Link href={locale === "zh" ? "/zh" : "/"} className="logo" aria-label="AEC GROUP Home">
          <span className="logo-icon">AEC</span>
          <span className="logo-text">GROUP</span>
        </Link>

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
                  <Link
                    href={link.href}
                    className={`${isProductsActive ? "active" : ""} has-dropdown`}
                    aria-haspopup="true"
                    aria-expanded={hoveredNav === "products" || mobileSubmenuOpen === "products"}
                  >
                    {link.label}
                    <svg className="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </Link>
                  
                  {/* Desktop dropdown */}
                  {(hoveredNav === "products" || mobileSubmenuOpen === "products") && (
                    <div className="dropdown-menu" role="menu">
                      {categories.map((cat) => (
                        <Link
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
                        </Link>
                      ))}
                      <Link
                        href={productsBaseHref}
                        className="dropdown-item dropdown-view-all"
                        role="menuitem"
                        onClick={() => {
                          setHoveredNav(null);
                          setMobileSubmenuOpen(null);
                        }}
                      >
                        {locale === "zh" ? "查看所有产品" : "View All Products"}
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href || (link.href !== (locale === "zh" ? "/zh" : "/") && pathname.startsWith(link.href)) ? "active" : ""}
              >
                {link.label}
              </Link>
            );
          })}
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