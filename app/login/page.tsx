import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "ورود به حساب کاربری | مینی‌ورس",
  description: "ورود و ثبت‌نام سریع در فروشگاه دست‌سازه‌های مینیاتوری مینی‌ورس",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
