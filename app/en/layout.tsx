import Link from "next/link";
import { EnHeader, EnFooter } from "./LayoutComponents";
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