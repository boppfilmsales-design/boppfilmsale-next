export type Lang = "cn" | "en";

export interface Product {
  id: number;
  lang: Lang;
  category_id: number | null;
  subcategory_id: number | null;
  name: string;
  model: string | null;
  description: string | null;
  summary: string | null;
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
