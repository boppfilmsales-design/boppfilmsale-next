import { ZhLayoutWrapper } from "./LayoutComponents";
import "./globals.css";

export default function ZhLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ZhLayoutWrapper>{children}</ZhLayoutWrapper>;
}