import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "キラリ - 体重管理 & AI日記 | かわいく続くダイエット記録アプリ",
  description:
    "かわいいUIで毎日の体重記録が楽しくなる無料アプリ。AIが優しく励ましてダイエットをサポート。体重グラフ・連続記録・気分メモで健康管理を習慣化。20〜30代女性に人気の体重管理アプリ。",
  keywords: [
    "体重管理",
    "ダイエット",
    "体重記録",
    "体重日記",
    "AI日記",
    "健康管理",
    "体重ログ",
    "レコーディングダイエット",
    "体重グラフ",
    "かわいい",
    "体重アプリ",
    "ダイエットアプリ",
  ],
  applicationName: "キラリ",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "キラリ - 体重管理 & AI日記",
    description:
      "AIが優しく励ます体重管理アプリ。かわいいUIで毎日のダイエット記録が楽しく続く！",
    type: "website",
    locale: "ja_JP",
    siteName: "キラリ",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FFB5C8",
  viewportFit: "cover",
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
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
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
