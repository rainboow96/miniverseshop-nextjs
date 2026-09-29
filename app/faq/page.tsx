import type { Metadata } from "next";
import Container from "@/components/ui/container";
import Breadcrumb from "@/components/ui/breadcrumb";
import FaqSection from "@/components/sections/faq-section";

export const metadata: Metadata = {
  title: "سوالات متداول | مینی‌ورس",
  description: "پاسخ به سوالات پرتکرار کاربران مینی‌ورس درباره ثبت سفارش و ارسال کالا",
};

export default function FaqPage() {
  const breadcrumbItems = [
    { label: "خانه", to: "/" },
    { label: "سوالات متداول" },
  ];

  return (
    <main className="pb-16">
      <Container>
        <Breadcrumb items={breadcrumbItems} />

        <FaqSection />
      </Container>
    </main>
  );
}
