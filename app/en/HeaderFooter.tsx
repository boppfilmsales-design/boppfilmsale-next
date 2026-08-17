import Link from "next/link";
import { MobileMenuButton } from "../MobileMenuButton";

export function EnHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/en" className="logo">
          <span className="logo-icon">AEC</span>
          <span className="logo-text">AEC GROUP</span>
        </Link>
        <nav className="site-nav" id="navLinks">
          <Link href="/en">Home</Link>
          <Link href="/en/about">About Us</Link>
          <Link href="/en/products">Products</Link>
          <Link href="/en/news">News</Link>
          <Link href="/en/contact" className="nav-cta">Contact Us</Link>
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
        <MobileMenuButton />
      </div>
    </header>
  );
}

export function EnFooter() {
  return (
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
  );
}