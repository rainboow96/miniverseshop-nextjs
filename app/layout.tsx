import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import SmoothScroll from "@/components/ui/smoothScroll";

const vazir = localFont({
  src: [
    {
      path: "./fonts/Vazir-Regular-FD.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Vazir-Medium-FD.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Vazir-Bold-FD.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "مینی‌ورس | فروشگاه کتابخانه‌ها و بوک‌نوک‌های مینیاتوری",
    template: "%s | مینی‌ورس",
  },
  description:
    "طراحی و ساخت انواع کتابخانه‌های مینیاتوری، ماکت‌های دست‌ساز چوبی با جزئیات دقیق.",
  keywords: [
    "کتابخانه مینیاتوری",
    "ماکت چوبی",
    "مینیاتوری",
    "دکوری فانتزی",
    "هدیه خاص",
    "مینی ورس",
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={cn("scroll-smooth", vazir.variable)}
    >
      <body className="flex min-h-dvh w-full flex-col font-sans bg-background text-foreground antialiased selection:bg-[#B5BA9A]/30 selection:text-[#424127]">
        <SessionProvider>
            <SmoothScroll>
              <Navbar />
              <main className="w-full flex-1 min-w-0 overflow-x-clip">
                {children}
              </main>
              <Footer />
            </SmoothScroll>
        </SessionProvider>
      </body>
    </html>
  );
}
