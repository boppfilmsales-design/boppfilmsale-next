import type { Metadata } from "next";
import Link from "next/link";
import "../globals.css";

export const metadata: Metadata = {
  title: "AEC GROUP - Professional BOPP/BOPET Film Supplier",
  description: "Anhui Eastern Progress Imp. & Exp. Co., Ltd - Global supplier of BOPP, BOPET films, adhesive tapes, ribbons & labels, and packaging machinery",
};

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header className="site-header">
          <div className="wrap header-inner">
            <Link href="/en" className="logo">
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
            <a href="/en" className="lang-switch mobile-only">中文</a>
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
              <p>Anhui Eastern Progress Imp. & Exp. Co., Ltd</p>
              <p>Professional Film Materials Supplier Since 2011</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><Link href="/en#home">Home</Link></li>
                <li><Link href="/en#about">About Us</Link></li>
                <li><Link href="/en#products">Products</Link></li>
                <li><Link href="/en#advantages">Advantages</Link></li>
                <li><Link href="/en#contact">Contact</Link></li>
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
            <p>&copy; {new Date().getFullYear()} AEC GROUP · Anhui Eastern Progress Imp. & Exp. Co., Ltd. All rights reserved.</p>
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
      </body>
    </html>
  );
}