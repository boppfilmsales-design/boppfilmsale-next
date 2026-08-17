import { RootHeader, RootFooter } from "./HeaderFooter";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RootHeader />
      <main id="main-content">{children}</main>
      <RootFooter />
    </>
  );
}