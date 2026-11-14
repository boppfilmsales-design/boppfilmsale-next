import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { HOME } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "zh",
  "/zh",
  HOME.zh.metaTitle,
  HOME.zh.metaDescription,
  "/images/hero-film.svg",
);

export default function ZhHome() {
  return <HomePage lang="zh" />;
}
