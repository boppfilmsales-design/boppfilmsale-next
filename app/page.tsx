import Link from "next/link";
import { query } from "@/lib/db";

export default async function HomePage() {
  const news = await query<{ id: number; title: string; created_at: string }>(
    "SELECT id, title, created_at FROM news WHERE lang='cn' ORDER BY created_at DESC LIMIT 3"
  );

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="wrap">
          <div className="hero-content">
            <div className="hero-badge">专业薄膜材料供应商 · 成立于2011年</div>
            <h1>
              全球领先的 <span className="highlight">柔性包装薄膜</span> 与工业材料供应商
            </h1>
            <p className="hero-subtitle">
              安徽东渐进出口有限公司 (东渐集团) 专业提供 BOPP、BOPET、POF 薄膜、热转印碳带、标签、胶粘制品及包装机械整体解决方案，远销 80+ 国家。
            </p>
            <div className="hero-actions">
              <Link href="#products" className="btn btn-gold">浏览产品目录</Link>
              <Link href="#contact" className="btn btn-outline" style={{ background: "transparent", borderColor: "#fff", color: "#fff" }}>获取报价</Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="num">14+</span>
                <span className="label">年行业经验</span>
              </div>
              <div className="hero-stat">
                <span className="num">80+</span>
                <span className="label">出口国家</span>
              </div>
              <div className="hero-stat">
                <span className="num">200+</span>
                <span className="label">合作客户</span>
              </div>
              <div className="hero-stat">
                <span className="num">100%</span>
                <span className="label">品质保证</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="advantages">
        <div className="wrap">
          <h2 className="section-title">我们的优势</h2>
          <p className="section-subtitle">结合专业贸易经验与严格质量标准，提供定制化工业服务。</p>
          <div className="features-grid">
            <article className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>14年口碑积累</h3>
              <p>自2011年起，在欧洲、亚洲、美洲、非洲建立优质客户网络。</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>严格质量管控</h3>
              <p>所有出口物料经过严格检测，符合国际标准认证要求。</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>极速交付能力</h3>
              <p>订单快速处理、定制分切宽度、高效海运物流配送。</p>
            </article>
          </div>
        </div>
      </section>

      {/* Categories / Products Section */}
      <section className="categories" id="products">
        <div className="wrap">
          <h2 className="section-title">核心产品系列</h2>
          <p className="section-subtitle">提供高度多元化的产品目录，涵盖原材料、深加工薄膜、办公耗材及自动化设备。</p>
          <div className="cat-grid">
            <Link href="/products?category=BOPP" className="cat-card">
              <div className="cat-icon">🎞️</div>
              <h3>BOPP 薄膜</h3>
              <p>双向拉伸聚丙烯薄膜，包括平膜、热封膜、消光膜、镀铝膜、珠光膜等。</p>
            </Link>
            <Link href="/products?category=BOPET" className="cat-card">
              <div className="cat-icon">🌟</div>
              <h3>BOPET 薄膜</h3>
              <p>优质聚酯薄膜，适用于电气绝缘、电容器、多色印刷复合基材等领域。</p>
            </Link>
            <Link href="/products?category=胶粘带和胶水" className="cat-card">
              <div className="cat-icon">📦</div>
              <h3>胶粘带与胶水</h3>
              <p>封箱胶带大卷、美纹纸胶带、双面胶带、丙烯酸涂布胶水等。</p>
            </Link>
            <Link href="/products?category=涂布膜" className="cat-card">
              <div className="cat-icon">🛡️</div>
              <h3>涂布薄膜</h3>
              <p>PVDC 涂布(K膜)、丙烯酸涂布等功能性涂布膜，阻隔性能优异。</p>
            </Link>
            <Link href="/products?category=中间体" className="cat-card">
              <div className="cat-icon">🔬</div>
              <h3>中间体产品</h3>
              <p>伽马丁内酯等精细化工中间体，纯度高、供应稳定。</p>
            </Link>
            <Link href="/products?category=其他" className="cat-card">
              <div className="cat-icon">📦</div>
              <h3>其他材料</h3>
              <p>CPP、BOPA、POF、PE、PVC 薄膜及袋子、纸制品、各类包装耗材。</p>
            </Link>
            <Link href="/products?category=机器设备和电子产品" className="cat-card">
              <div className="cat-icon">⚙️</div>
              <h3>机器设备与电子产品</h3>
              <p>工业分切机、高速涂布机、复合机、收缩设备等自动化包装机械。</p>
            </Link>
            <Link href="/products?category=防疫用品" className="cat-card">
              <div className="cat-icon">🏥</div>
              <h3>防疫用品</h3>
              <p>防护口罩等医疗防护产品，符合相关标准认证。</p>
            </Link>
          </div>
          <div className="view-all">
            <Link href="/products" className="btn btn-primary">查看所有分类</Link>
          </div>
        </div>
      </section>

      {/* About / Company Overview */}
      <section className="about" id="about">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-content">
              <h2 className="section-title">公司简介</h2>
              <p className="section-subtitle">安徽东渐进出口有限公司 —— 您值得信赖的包装解决方案合作伙伴。</p>
              <p className="about-desc">
                东渐集团位于安徽省合肥市，由安徽东渐新材料有限公司和安徽东渐进出口有限公司组成，
                从专业包装薄膜出口商成长为工业材料供应链领军企业。
              </p>
              <p className="about-desc">
                我们集生产、定制深加工（镀铝、彩印、分切、涂布）及国际营销于一体，
                为全球客户提供包装薄膜、薄膜电子材料、胶粘制品、自动化设备的一站式解决方案。
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <div className="about-feature-icon">🏭</div>
                  <div className="about-feature-text">
                    <h4>一体化制造</h4>
                    <p>生产、涂布、印刷、镀铝、分切一站式完成。</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon">🌍</div>
                  <div className="about-feature-text">
                    <h4>全球触达</h4>
                    <p>出口 80+ 国家，本地化支持，多币种结算。</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon">🔬</div>
                  <div className="about-feature-text">
                    <h4>研发能力</h4>
                    <p>定制配方、厚度控制、特种薄膜开发能力。</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon">📦</div>
                  <div className="about-feature-text">
                    <h4>供应链服务</h4>
                    <p>从工厂到您仓库的端到端全球物流服务。</p>
                  </div>
                </div>
              </div>
              <Link href="/about" className="btn btn-primary" style={{ marginTop: 24 }}>了解更多</Link>
            </div>
            <div className="about-image">
              <img src="https://oldwebsite-boppfilmsale.vercel.app/images/factory.jpg" alt="东渐集团工厂" />
            </div>
          </div>
        </div>
      </section>

      {/* Advantages / Why Partner */}
      <section className="advantages">
        <div className="wrap">
          <h2 className="section-title">为什么选择东渐集团</h2>
          <p className="section-subtitle">我们结合专业贸易经验与严格质量标准，提供定制化工业服务。</p>
          <div className="advantages-grid">
            <article className="advantage-card">
              <div className="advantage-icon">🏆</div>
              <h3>14年行业口碑</h3>
              <p>自2011年起，在欧洲、亚洲、美洲、非洲建立优质客户网络。</p>
            </article>
            <article className="advantage-card">
              <div className="advantage-icon">🎯</div>
              <h3>严格质量管控</h3>
              <p>所有出口物料经过严格检测，符合国际标准认证要求。</p>
            </article>
            <article className="advantage-card">
              <div className="advantage-icon">🚀</div>
              <h3>极速交付能力</h3>
              <p>订单快速处理、定制分切宽度、高效海运物流配送。</p>
            </article>
            <article className="advantage-card">
              <div className="advantage-icon">🤝</div>
              <h3>专业多语种团队</h3>
              <p>提供英、法、俄、西语技术咨询，支持多币种结算方式。</p>
            </article>
          </div>
        </div>
      </section>

      {/* Industries / Applications */}
      <section className="industries" id="industries">
        <div className="wrap">
          <h2 className="section-title">应用行业领域</h2>
          <p className="section-subtitle">我们的材料广泛应用于全球多个关键工业领域。</p>
          <div className="industries-grid">
            <article className="industry-card">
              <img src="https://oldwebsite-boppfilmsale.vercel.app/images/food-packaging.jpg" alt="食品包装" />
              <div className="industry-overlay">
                <h3>食品包装</h3>
                <p>符合 FDA/EU 标准的食品级 BOPP/BOPET 薄膜，可直接接触食品。</p>
              </div>
            </article>
            <article className="industry-card">
              <img src="https://oldwebsite-boppfilmsale.vercel.app/images/pharma.jpg" alt="医药包装" />
              <div className="industry-overlay">
                <h3>医药包装</h3>
                <p>高阻隔薄膜用于泡罩包装、袋装剂、医疗器械包装等。</p>
              </div>
            </article>
            <article className="industry-card">
              <img src="https://oldwebsite-boppfilmsale.vercel.app/images/electronics.jpg" alt="电子电气" />
              <div className="industry-overlay">
                <h3>电子电气</h3>
                <p>BOPET 电容薄膜、绝缘胶带、PCB 标签用热转印碳带。</p>
              </div>
            </article>
            <article className="industry-card">
              <img src="https://oldwebsite-boppfilmsale.vercel.app/images/tobacco.jpg" alt="烟草包装" />
              <div className="industry-overlay">
                <h3>烟草包装</h3>
                <p>专用 BOPP 薄膜用于卷烟外包装和内衬纸应用。</p>
              </div>
            </article>
            <article className="industry-card">
              <img src="https://oldwebsite-boppfilmsale.vercel.app/images/printing.jpg" alt="印刷出版" />
              <div className="industry-overlay">
                <h3>印刷出版</h3>
                <p>高透明度薄膜适配凹版、柔版、数码印刷，油墨附着力强。</p>
              </div>
            </article>
            <article className="industry-card">
              <img src="https://oldwebsite-boppfilmsale.vercel.app/images/solar.jpg" alt="光伏新能源" />
              <div className="industry-overlay">
                <h3>光伏新能源</h3>
                <p>EVA 胶膜、背板材料、高效双面双玻组件，助力清洁能源。</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="news" id="news">
        <div className="wrap">
          <h2 className="section-title">最新动态</h2>
          <p className="section-subtitle">关注我们的最新发展、产品发布与行业洞察。</p>
          <div className="news-grid">
            {news.map((n) => (
              <article key={n.id} className="news-card">
                <div className="news-image">
                  <img src="https://oldwebsite-boppfilmsale.vercel.app/images/news-placeholder.jpg" alt={n.title} />
                </div>
                <div className="news-content">
                  <div className="news-meta">
                    <span>{new Date(n.created_at).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <h3><Link href={`/news/${n.id}`}>{n.title}</Link></h3>
                  <p>阅读完整文章了解我们的最新动态与行业洞察。</p>
                  <Link href={`/news/${n.id}`} className="news-link">阅读全文 →</Link>
                </div>
              </article>
            ))}
          </div>
          <div className="view-all" style={{ marginTop: 48 }}>
            <Link href="/news" className="btn btn-outline">查看所有新闻</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="wrap">
          <div className="cta-content">
            <h2>准备拓展您的业务了吗？</h2>
            <p>索取产品目录样品、定制技术分切宽度、获取即时批发报价。</p>
            <div className="cta-actions">
              <Link href="#contact" className="btn btn-gold">联系我们</Link>
              <Link href="#products" className="btn btn-outline" style={{ background: "transparent", borderColor: "#fff", color: "#fff" }}>查看产品</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="section-title">联系我们</h2>
              <p className="section-subtitle">联系包装工程专家，获取免费样品与定制报价。</p>
              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div>
                    <h4>电话</h4>
                    <p>+86-551-64687285</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📱</div>
                  <div>
                    <h4>手机 / 微信</h4>
                    <p>+86-18919659471</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div>
                    <h4>邮箱</h4>
                    <p>sale@boppfilmsale.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <h4>地址</h4>
                    <p>安徽省合肥市包河区徽州大道1158号 230051</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form action="/feedback" method="POST">
                <div className="form-group">
                  <label htmlFor="name">姓名 *</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">邮箱 *</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="company">公司</label>
                  <input type="text" id="company" name="company" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">留言 *</label>
                  <textarea id="message" name="message" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary form-submit">提交询盘</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}