import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { HOME } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "en",
  "/en",
  HOME.en.metaTitle,
  HOME.en.metaDescription,
  "/images/hero-film.svg",
);

export default function EnHome() {
  return <HomePage lang="en" />;
}
