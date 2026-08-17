import { ZhLayoutWrapper } from "./HeaderFooter";
import "./globals.css";

export default function ZhLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ZhLayoutWrapper>{children}</ZhLayoutWrapper>;
}