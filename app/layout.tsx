import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <Link href="/" className="logo">
            <span className="logo-icon">AEC</span>
            <span className="logo-text">AEC GROUP</span>
          </Link>
          <nav className="site-nav" id="navLinks">
            <Link href="#home">Home</Link>
            <Link href="#about">About Us</Link>
            <Link href="#products">Products</Link>
            <Link href="#advantages">Advantages</Link>
            <Link href="#industries">Industries</Link>
            <Link href="#news">News</Link>
            <Link href="#contact" className="nav-cta">Contact Us</Link>
          </nav>
          <div className="lang-switcher">
            <a href="/zh" className="lang-btn" title="中文版">
              <span className="lang-flag">🇨🇳</span>
              <span className="lang-text">中文</span>
            </a>
            <span className="lang-separator">|</span>
            <a href="/" className="lang-btn active" title="English Version">
              <span className="lang-flag">🇺🇸</span>
              <span className="lang-text">EN</span>
            </a>
          </div>
          <a href="/zh" className="lang-switch mobile-only">中文</a>
          <button className="mobile-menu-btn" aria-label="Toggle menu">
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
              <li><Link href="#home">Home</Link></li>
              <li><Link href="#about">About Us</Link></li>
              <li><Link href="#products">Products</Link></li>
              <li><Link href="#advantages">Advantages</Link></li>
              <li><Link href="#contact">Contact</Link></li>
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
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const btn = document.querySelector('.mobile-menu-btn');
              const nav = document.querySelector('.site-nav');
              if (btn && nav) {
                btn.addEventListener('click', () => {
                  nav.classList.toggle('open');
                  btn.setAttribute('aria-expanded', nav.classList.contains('open'));
                });
              }
              // Smooth scroll for anchor links
              document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                  const targetId = this.getAttribute('href');
                  if (targetId === '#') return;
                  const target = document.querySelector(targetId);
                  if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    if (nav.classList.contains('open')) {
                      nav.classList.remove('open');
                      btn.setAttribute('aria-expanded', 'false');
                    }
                  }
                });
              });
            })();
          `,
        }}
      />
    </>
  );
}