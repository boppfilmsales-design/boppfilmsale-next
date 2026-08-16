import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AEC GROUP - Professional BOPP/BOPET Film Supplier",
  description: "Anhui Eastern Progress Imp. & Exp. Co., Ltd - Global supplier of BOPP, BOPET films, adhesive tapes, ribbons & labels, and packaging machinery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}