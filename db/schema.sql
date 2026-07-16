-- ============================================================
--  boppfilmsale-old 数据库 schema (Turso / LibSQL / SQLite)
--  由源站 ASP + Access (yuzhiguo_* 表) 迁移而来
--  中英文合并：lang 字段 'cn' = 中文, 'en' = 英文
--  已在 Turso 控制台执行（用户已 Run）
-- ============================================================

CREATE TABLE IF NOT EXISTS product_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lang TEXT NOT NULL DEFAULT 'cn',
  name TEXT NOT NULL,
  sort INTEGER DEFAULT 0,
  html_url TEXT
);

CREATE TABLE IF NOT EXISTS product_subcategories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
  lang TEXT NOT NULL DEFAULT 'cn',
  name TEXT NOT NULL,
  sort INTEGER DEFAULT 0,
  FOREIGN KEY (category_id) REFERENCES product_categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lang TEXT NOT NULL DEFAULT 'cn',
  category_id INTEGER,
  subcategory_id INTEGER,
  name TEXT NOT NULL,
  model TEXT,
  intro TEXT,
  description TEXT,
  summary TEXT,
  image TEXT,
  images TEXT,
  sort INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (category_id) REFERENCES product_categories(id) ON DELETE SET NULL,
  FOREIGN KEY (subcategory_id) REFERENCES product_subcategories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lang TEXT NOT NULL DEFAULT 'cn',
  title TEXT NOT NULL,
  content TEXT,
  summary TEXT,
  image TEXT,
  sort INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lang TEXT NOT NULL DEFAULT 'cn',
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  sort INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lang TEXT NOT NULL DEFAULT 'cn',
  name TEXT,
  company TEXT,
  email TEXT,
  phone TEXT,
  product_id INTEGER,
  product_name TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lang TEXT NOT NULL DEFAULT 'cn',
  name TEXT,
  email TEXT,
  phone TEXT,
  content TEXT,
  status TEXT DEFAULT 'new',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lang TEXT NOT NULL DEFAULT 'cn',
  name TEXT NOT NULL,
  url TEXT,
  sort INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  note TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_products_lang ON products(lang);
CREATE INDEX IF NOT EXISTS idx_products_cat ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_news_lang ON news(lang);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug, lang);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
