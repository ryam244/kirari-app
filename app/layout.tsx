import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kirari（キラリ）✨ - 体重ログ × AI日記",
  description: "かわいいUIで毎日の健康習慣を楽しく記録。AIが優しく励ます体重管理アプリ。",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#FFB5C8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
