import Link from "next/link";
import { query } from "@/lib/db";

export default async function HomeEnPage() {
  const news = await query<{ id: number; title: string; created_at: string }>(
    "SELECT id, title, created_at FROM news WHERE lang='en' ORDER BY created_at DESC LIMIT 3"
  );

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="wrap">
          <div className="hero-content">
            <div className="hero-badge">Global Supplier Since 2011</div>
            <h1>
              Global Experts in <span className="highlight">Flexible Packaging Films</span> & Industrial Materials
            </h1>
            <p className="hero-subtitle">
              Anhui Eastern Communication Imp.& Exp. Co., Ltd (AEC GROUP) delivers top-tier BOPP, BOPET, POF films, thermal ribbons, labels, and machinery solutions to over 80 countries.
            </p>
            <div className="hero-actions">
              <Link href="#products" className="btn btn-gold">Explore Catalog</Link>
              <Link href="#contact" className="btn btn-outline" style={{ background: "transparent", borderColor: "#fff", color: "#fff" }}>Get a Quote</Link>
            </div>
            {/* Language Switcher in Hero */}
            <div className="hero-lang-switcher">
              <a href="/zh" className="lang-btn-hero" title="中文版">
                <span className="lang-flag">🇨🇳</span>
                <span>中文</span>
              </a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><span className="num">14+</span><span className="label">Years of Experience</span></div>
              <div className="hero-stat"><span className="num">80+</span><span className="label">Export Countries</span></div>
              <div className="hero-stat"><span className="num">200+</span><span className="label">Happy Clients</span></div>
              <div className="hero-stat"><span className="num">100%</span><span className="label">Quality Guaranteed</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="advantages">
        <div className="wrap">
          <h2 className="section-title">Our Strength</h2>
          <p className="section-subtitle">We combine professional trading expertise with strict quality standards and customized industrial services.</p>
          <div className="features-grid">
            <article className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>14-Year Reputation</h3>
              <p>Since 2011, establishing premium customer networks across Europe, Asia, Americas, and Africa.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Strict Quality QA</h3>
              <p>All export materials undergo rigorous testing to meet international standard certificates.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Fast Delivery</h3>
              <p>Rapid order processing, customized slit widths, and efficient maritime shipment logistics.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Categories / Products Section */}
      <section className="categories" id="products">
        <div className="wrap">
          <h2 className="section-title">Premium Product Categories</h2>
          <p className="section-subtitle">We provide a highly diversified catalog covering raw materials, processed films, office supplies, and automation machines.</p>
          <div className="cat-grid">
            <Link href="/products?category=BOPP" className="cat-card">
              <div className="cat-icon">🎞️</div>
              <h3>BOPP Film</h3>
              <p>Biaxially Oriented Polypropylene films including plain, thermal, matte, metallized, and pearlized films.</p>
            </Link>
            <Link href="/products?category=BOPET" className="cat-card">
              <div className="cat-icon">🌟</div>
              <h3>BOPET Film</h3>
              <p>Premium polyester films outstanding for electrical insulation, capacitors, and multi-color printing composite base.</p>
            </Link>
            <Link href="/products?category=Adhesive" className="cat-card">
              <div className="cat-icon">📦</div>
              <h3>Adhesive Tape & Glue</h3>
              <p>Packing tapes jumbo rolls, masking tape, double-sided tapes, and acrylic coating glues.</p>
            </Link>
            <Link href="/products?category=Ribbons" className="cat-card">
              <div className="cat-icon">🖨️</div>
              <h3>Ribbons & Labels</h3>
              <p>High quality thermal transfer ribbons, self-adhesive barcode labels, and tear tapes.</p>
            </Link>
            <Link href="/products?category=Machinery" className="cat-card">
              <div className="cat-icon">⚙️</div>
              <h3>Packaging Machinery</h3>
              <p>Industrial slitting machines, high-speed coating machines, laminating units, and shrinking equipment.</p>
            </Link>
            <Link href="/products?category=Solar" className="cat-card">
              <div className="cat-icon">☀️</div>
              <h3>Solar Panels</h3>
              <p>High-efficiency monocrystalline and bifacial double-glass solar panels for clean energy applications.</p>
            </Link>
            <Link href="/products?category=Coating" className="cat-card">
              <div className="cat-icon">🛡️</div>
              <h3>Coating Films</h3>
              <p>PVDC coating (K film), acrylic coating, and other functional coated films for barrier properties.</p>
            </Link>
            <Link href="/products?category=Other" className="cat-card">
              <div className="cat-icon">📦</div>
              <h3>Other Materials</h3>
              <p>CPP, BOPA, POF, PE, PVC films and bags, paper products, and various packaging consumables.</p>
            </Link>
          </div>
          <div className="view-all">
            <Link href="/products" className="btn btn-primary">View All Categories</Link>
          </div>
        </div>
      </section>

      {/* About / Company Overview */}
      <section className="about" id="about">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-content">
              <h2 className="section-title">Company Overview</h2>
              <p className="section-subtitle">Anhui Eastern Communication Imp.& Exp. Co., Ltd. - Your trusted partner in packaging solutions.</p>
              <p className="about-desc">
                Established in Hefei, Anhui Province, AEC GROUP (Anhui Eastern Communication) has grown from a specialized packaging film exporter into an industrial material supply chain leader.
              </p>
              <p className="about-desc">
                We manage production, custom processing (metallization, color printing, slitting), and international marketing for a massive range of packaging solutions.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <div className="about-feature-icon">🏭</div>
                  <div className="about-feature-text">
                    <h4>Integrated Manufacturing</h4>
                    <p>Production, coating, printing, metallizing, and slitting under one roof.</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon">🌍</div>
                  <div className="about-feature-text">
                    <h4>Global Reach</h4>
                    <p>Exporting to 80+ countries with localized support and multi-currency payments.</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon">🔬</div>
                  <div className="about-feature-text">
                    <h4>R&D Capability</h4>
                    <p>Custom formulations, thickness control, and specialty film development.</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon">📦</div>
                  <div className="about-feature-text">
                    <h4>Supply Chain</h4>
                    <p>End-to-end logistics from factory to your warehouse worldwide.</p>
                  </div>
                </div>
              </div>
              <Link href="/about" className="btn btn-primary" style={{ marginTop: 24 }}>Read Our Story</Link>
            </div>
            <div className="about-image">
              <img src="/images/factory.svg" alt="AEC GROUP Factory" />
            </div>
          </div>
        </div>
      </section>

      {/* Advantages / Why Partner */}
      <section className="advantages">
        <div className="wrap">
          <h2 className="section-title">Why Partner with AEC GROUP</h2>
          <p className="section-subtitle">We combine professional trading expertise with strict quality standards and customized industrial services.</p>
          <div className="advantages-grid">
            <article className="advantage-card">
              <div className="advantage-icon">🏆</div>
              <h3>14-Year Reputation</h3>
              <p>Since 2011, establishing premium customer networks across Europe, Asia, Americas, and Africa.</p>
            </article>
            <article className="advantage-card">
              <div className="advantage-icon">🎯</div>
              <h3>Strict Quality QA</h3>
              <p>All export materials undergo rigorous testing to meet international standard certificates.</p>
            </article>
            <article className="advantage-card">
              <div className="advantage-icon">🚀</div>
              <h3>Fast Delivery</h3>
              <p>Rapid order processing, customized slit widths, and efficient maritime shipment logistics.</p>
            </article>
            <article className="advantage-card">
              <div className="advantage-icon">🤝</div>
              <h3>Professional Team</h3>
              <p>English, French, Russian and Spanish technical consultation, supporting multi-currency payments.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Industries / Applications */}
      <section className="industries" id="industries">
        <div className="wrap">
          <h2 className="section-title">Application Industries</h2>
          <p className="section-subtitle">Our materials power critical applications across diverse industrial sectors worldwide.</p>
          <div className="industries-grid">
            <article className="industry-card">
              <img src="/images/food-packaging.svg" alt="Food Packaging" />
              <div className="industry-overlay">
                <h3>Food Packaging</h3>
                <p>Food-grade BOPP/BOPET films meeting FDA/EU standards for direct food contact.</p>
              </div>
            </article>
            <article className="industry-card">
              <img src="/images/pharma.svg" alt="Pharmaceutical" />
              <div className="industry-overlay">
                <h3>Pharmaceutical</h3>
                <p>High-barrier films for blister packs, sachets, and medical device packaging.</p>
              </div>
            </article>
            <article className="industry-card">
              <img src="/images/electronics.svg" alt="Electronics" />
              <div className="industry-overlay">
                <h3>Electronics</h3>
                <p>BOPET capacitor films, insulation tapes, and thermal transfer ribbons for PCB labeling.</p>
              </div>
            </article>
            <article className="industry-card">
              <img src="/images/tobacco.svg" alt="Tobacco" />
              <div className="industry-overlay">
                <h3>Tobacco</h3>
                <p>Specialty BOPP films for cigarette overwrap and inner liner applications.</p>
              </div>
            </article>
            <article className="industry-card">
              <img src="/images/printing.svg" alt="Printing" />
              <div className="industry-overlay">
                <h3>Printing & Publishing</h3>
                <p>High-clarity films for gravure, flexo, and digital printing with excellent ink adhesion.</p>
              </div>
            </article>
            <article className="industry-card">
              <img src="/images/solar.svg" alt="Solar Energy" />
              <div className="industry-overlay">
                <h3>Solar Energy</h3>
                <p>EVA encapsulants, backsheets, and high-efficiency PV modules for renewable energy.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="news" id="news">
        <div className="wrap">
          <h2 className="section-title">Latest News</h2>
          <p className="section-subtitle">Stay updated with our latest developments, product launches, and industry insights.</p>
          <div className="news-grid">
            {news.map((n) => (
              <article key={n.id} className="news-card">
                <div className="news-image">
                  <img src="/images/news-placeholder.svg" alt={n.title} />
                </div>
                <div className="news-content">
                  <div className="news-meta">
                    <span>{new Date(n.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <h3><Link href={"/news/" + n.id}>{n.title}</Link></h3>
                  <p>Read the full article to learn more about our latest updates and industry insights.</p>
                  <Link href={"/news/" + n.id} className="news-link">Read More →</Link>
                </div>
              </article>
            ))}
          </div>
          <div className="view-all" style={{ marginTop: 48 }}>
            <Link href="/news" className="btn btn-outline">View All News</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="wrap">
          <div className="cta-content">
            <h2>Ready to Expand Your Business?</h2>
            <p>Request catalog samples, customize your technical roll width, and receive instant wholesale pricing quotes.</p>
            <div className="cta-actions">
              <Link href="#contact" className="btn btn-gold">Contact Us</Link>
              <Link href="#products" className="btn btn-outline" style={{ background: "transparent", borderColor: "#fff", color: "#fff" }}>View Products</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="section-title">Contact Us</h2>
              <p className="section-subtitle">Get in touch with our packaging engineering experts for free samples and customized quotations today.</p>
              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div>
                    <h4>Phone</h4>
                    <p>+86-551-64687285</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📱</div>
                  <div>
                    <h4>Mobile / WhatsApp</h4>
                    <p>+86-18919659471</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div>
                    <h4>Email</h4>
                    <p>sale@boppfilmsale.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <h4>Address</h4>
                    <p>No.1158 Huizhou Ave., Baohe Dist., Hefei, Anhui 230051, China</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form action="/feedback" method="POST">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input type="text" id="company" name="company" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary form-submit">Send Inquiry</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}