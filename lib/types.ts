export type Lang = "cn" | "en";

export interface ProductCategory {
  id: number;
  lang: Lang;
  name: string;
  sort: number;
}

export interface ProductSubcategory {
  id: number;
  category_id: number;
  lang: Lang;
  name: string;
  sort: number;
}

export interface Product {
  id: number;
  lang: Lang;
  category_id: number | null;
  subcategory_id: number | null;
  name: string;       // 产品名称 (cpmc)
  model: string | null; // 产品编号/型号 (cpbh)
  intro: string | null; // 简介
  description: string | null; // 详情
  image: string | null;
  images: string | null;
  sort: number;
  created_at: string;
}

export interface NewsItem {
  id: number;
  lang: Lang;
  title: string;
  content: string | null;
  summary: string | null;
  image: string | null;
  sort: number;
  created_at: string;
}

export interface PageContent {
  id: number;
  lang: Lang;
  slug: string;
  title: string;
  content: string | null;
  sort: number;
}
