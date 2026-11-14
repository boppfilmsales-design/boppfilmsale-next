
export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="wrap">
        <span className="eyebrow">404</span>
        <h1>Page not found / 页面不存在</h1>
        <p className="lead">
          The page may have moved. The full product catalogue and the contact form are below.
        </p>
        <div className="btn-row" style={{ marginTop: 28 }}>
          <a href="/en/products" className="btn btn-primary">Browse products</a>
          <a href="/zh/products" className="btn btn-outline">浏览产品</a>
        </div>
      </div>
    </section>
  );
}
