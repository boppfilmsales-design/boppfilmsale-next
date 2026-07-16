# BOPP Film Sale — Next.js 迁移项目

源站为 ASP + Access 老站，迁移至 **Next.js 14 (App Router) + Turso (LibSQL/SQLite)**，
计划部署于 Vercel。

## 技术栈
- Next.js 14 (App Router, TypeScript)
- @libsql/client 连接 Turso
- Vercel 部署

## 目录结构
- `app/`            前台页面（中文在根路由，英文在 `/en`）
- `app/products/`   产品列表 + 详情 `[id]`
- `app/news/`       新闻列表 + 详情 `[id]`
- `app/about/`      关于我们
- `lib/db.ts`       Turso 连接层
- `lib/types.ts`    类型定义
- `db/schema.sql`   建表 SQL（已在 Turso 执行）

## 本地开发
```bat
npm install
copy .env.example .env.local   # 填入真实 TURSO_AUTH_TOKEN
npm run dev                    # http://localhost:3000
```

## 数据库（Turso）
建表语句见 `db/schema.sql`，表已通过 Turso 控制台创建。
中英文合并存储：字段 `lang` = 'cn' / 'en'。

## 部署（Vercel）
1. Vercel 关联本仓库（或推送后导入）
2. 设置环境变量：TURSO_DATABASE_URL、TURSO_AUTH_TOKEN
3. 自动部署

## 待办
- [ ] 后台管理界面（admin）
- [ ] 订单/留言提交 API
- [ ] 图片迁移至对象存储
- [ ] 产品数据从源站导入 Turso
