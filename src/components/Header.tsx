"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { NAV, UI, type Lang } from "@/content/site";
import { IconChevron, IconMenu, IconClose } from "./Icons";

export default function Header() {
  const pathname = usePathname() || "/en";
  const lang: Lang = pathname.startsWith("/zh") ? "zh" : "en";
  const t = UI[lang];
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  const base = lang === "zh" ? "/zh" : "/en";
  const links = NAV[lang];
  const productsHref = `${base}/products`;
  const isActive = (href: string) =>
    href === base ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <a href={base} className="logo" aria-label="AEC GROUP — Home">
          <span className="logo-mark">AEC</span>
          <span className="logo-text">GROUP<small>FILM &amp; PACKAGING</small></span>
        </a>

        <nav className={`site-nav ${open ? "open" : ""}`} id="main-navigation" aria-label="Main navigation">
          {links.map((link) =>
            link.href === productsHref ? (
              <div className="nav-dropdown" key={link.href} data-open={subOpen ? "true" : "false"}>
                <a
                  href={link.href}
                  className={isActive(link.href) ? "active" : ""}
                  aria-haspopup="true"
                  aria-expanded={subOpen}
                  onClick={(e) => {
                    // On touch devices the first tap opens the submenu.
                    if (window.matchMedia("(max-width: 860px)").matches && !subOpen) {
                      e.preventDefault();
                      setSubOpen(true);
                    } else {
                      setOpen(false);
                    }
                  }}
                >
                  {link.label}
                  <IconChevron size={14} className="dropdown-arrow" />
                </a>
                <div className="dropdown-menu" role="menu">
                  {CATEGORIES.map((c) => (
                    <a
                      key={c.slug}
                      href={`${productsHref}/${c.slug}`}
                      className="dropdown-item"
                      role="menuitem"
                      onClick={() => { setOpen(false); setSubOpen(false); }}
                    >
                      {lang === "zh" ? c.zh : c.en}
                      <span>{c.count} {t.productCount}</span>
                    </a>
                  ))}
                  <a
                    href={productsHref}
                    className="dropdown-item dropdown-view-all"
                    role="menuitem"
                    onClick={() => { setOpen(false); setSubOpen(false); }}
                  >
                    {t.allProducts} →
                  </a>
                </div>
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={isActive(link.href) ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            )
          )}
          <a href={`${base}/contact`} className="nav-cta" onClick={() => setOpen(false)}>
            {t.getQuote}
          </a>
        </nav>

        <div className="header-actions">
          <a
            href={lang === "zh" ? "/en" : "/zh"}
            className="lang-btn"
            aria-label={lang === "zh" ? "Switch to English" : "切换到中文"}
            hrefLang={lang === "zh" ? "en" : "zh-CN"}
          >
            {t.language}
          </a>
          <button
            className="mobile-menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="main-navigation"
            aria-label={open ? t.closeMenu : t.menu}
            onClick={() => { setOpen(!open); if (open) setSubOpen(false); }}
          >
            {open ? <IconClose size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
