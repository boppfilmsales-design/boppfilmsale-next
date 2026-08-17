import { EnHeader, EnFooter } from "./HeaderFooter";
import "../globals.css";

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EnHeader />
      <main id="main-content">{children}</main>
      <EnFooter />
    </>
  );
}