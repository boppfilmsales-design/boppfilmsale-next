import Link from "next/link";
import { query } from "@/lib/db";

export default async function Sidebar() {
  const cats = await query<{ id: number; name: string }>(
    "SELECT id, name FROM product_categories WHERE lang='cn' ORDER BY sort"
  );

  return (
    <>
      <aside>
        <div className="sidebar-box">
          <h3>产品分类</h3>
          <div className="body cat-list">
            {cats.map((c) => (
              <Link key={c.id} href={`/products?category=${encodeURIComponent(c.name)}`}>
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="sidebar-box">
          <h3>Contact Us</h3>
          <div className="body contact-info">
            <p><strong>联系人:</strong> 杨经理</p>
            <p><strong>电话:</strong> 86-551-64687285</p>
            <p><strong>手机:</strong> 18919659471</p>
            <p><strong>Email:</strong> sale@boppfilmsale.com</p>
            <p><strong>地址:</strong> 合肥市包河区徽州大道1158号</p>
            <p><strong>Skype:</strong> boppfilmsales</p>
            <p><strong>QQ:</strong> 2538474128</p>
          </div>
        </div>
      </aside>
    </>
  );
}
