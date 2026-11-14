import type { Metadata } from "next";
import ProductsIndex from "@/components/pages/ProductsIndex";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "zh",
  "/zh/products",
  "产品中心 | BOPP / BOPET 薄膜与软包装材料 | 安徽东渐",
  "11 大产品事业部、465 个薄膜、胶带、碳带、标签、纸品与包装机械条目。分类页为静态 HTML，图片与描述可被搜索引擎直接抓取。",
);

export default function Page() {
  return <ProductsIndex lang="zh" />;
}
