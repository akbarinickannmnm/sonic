import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Arabic, Vazirmatn } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  display: "swap",
});
const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SONIC — شبیه‌ساز استدلال بالینی",
  description: "Interactive clinical case simulator for medical education.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={`${geistSans.variable} ${geistMono.variable} ${vazirmatn.variable} ${notoArabic.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
