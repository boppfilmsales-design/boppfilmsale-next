import type { Metadata } from "next";
import FaqPage from "@/components/pages/FaqPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "zh",
  "/zh/faq",
  "常见问题 | 起订量、寄样、交期与单证 | 安徽东渐",
  "关于最小起订量、样品、报价时效、交期、认证单证、定制分切、拼柜与付款方式的明确答复。",
);

export default function Page() {
  return <FaqPage lang="zh" />;
}
