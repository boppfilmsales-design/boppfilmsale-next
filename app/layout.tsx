import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "中国东渐集团 - BOPP/BOPET 薄膜",
  description: "安徽东渐进出口有限公司 - BOPP/BOPET 薄膜、胶粘带、涂布膜等产品供应商",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}