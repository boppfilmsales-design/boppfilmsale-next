import { RootHeader, RootFooter } from "./LayoutComponents";
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