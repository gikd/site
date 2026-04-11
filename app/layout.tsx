import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "About Me | Personal Brand",
  description: "감각적인 인터랙션과 함께 나를 소개하는 개인 브랜드 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
