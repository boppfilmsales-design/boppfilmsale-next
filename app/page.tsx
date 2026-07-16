import Link from "next/link";
import { query } from "@/lib/db";

export default async function HomePage() {
  const news = await query<{ id: number; title: string; created_at: string }>(
    "SELECT id, title, created_at FROM news WHERE lang='cn' ORDER BY created_at DESC LIMIT 5"
  );

  return (
    <div>
      <div className="banner">中国东渐集团 · 专业薄膜材料供应商</div>

      <h2 className="section-title">关于我们</h2>
      <div className="prose">
        <p>东渐集团是由安徽东渐新材料有限公司和安徽东渐进出口有限公司组成的，集生产、研发、销售和服务为一体的综合性企业，产品覆盖塑膜工业、涂布工业、印刷复合业、镀铝镭射等行业。</p>
        <p>公司从软塑料包装薄膜及制品业起步，成长为在包装薄膜、薄膜深加工（彩印、镀铝、涂布、分切等）、薄膜电子材料、胶粘带、胶水及自动化机械设备等行业具有雄厚实力的大型企业。</p>
        <Link href="/about" className="btn" style={{ marginTop: 12, display: "inline-block" }}>了解更多</Link>
      </div>

      <h2 className="section-title">新闻动态</h2>
      <ul>
        {news.map((n) => (
          <li key={n.id} style={{ marginBottom: 10 }}>
            <Link href={`/news/${n.id}`}><strong>{n.title}</strong></Link>
            <span style={{ color: "#999", fontSize: 13, marginLeft: 8 }}>{n.created_at}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
