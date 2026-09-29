"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Phone } from "lucide-react";

function normalizeIranianPhoneNumber(input: string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

  let normalized = input.trim();

  for (let i = 0; i < 10; i++) {
    normalized = normalized.replaceAll(persianDigits[i], String(i));
    normalized = normalized.replaceAll(arabicDigits[i], String(i));
  }

  normalized = normalized.replace(/[^\d+]/g, "");

  if (normalized.startsWith("+98")) {
    normalized = "0" + normalized.slice(3);
  } else if (normalized.startsWith("98") && normalized.length === 12) {
    normalized = "0" + normalized.slice(2);
  }

  return normalized.replace(/\D/g, "").slice(0, 11);
}

function validatePhoneNumber(phone: string): string | null {
  if (!phone) {
    return "لطفاً شماره موبایل خود را وارد کنید.";
  }
  if (!/^09\d{9}$/.test(phone)) {
    return "شماره موبایل نامعتبر است (نمونه صحیح: ۰۹۱۲۳۴۵۶۷۸۹).";
  }
  return null;
}

function GoogleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export function LoginForm() {
  const [phone, setPhone] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isPhoneSubmitting, setIsPhoneSubmitting] = useState<boolean>(false);

  const [isGoogleLoading, startGoogleTransition] = useTransition();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanPhone = normalizeIranianPhoneNumber(e.target.value);
    setPhone(cleanPhone);
    if (phoneError) setPhoneError(null);
  };

  const handlePhoneSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorMsg = validatePhoneNumber(phone);
    if (errorMsg) {
      setPhoneError(errorMsg);
      return;
    }

    setIsPhoneSubmitting(true);
    try {
      console.log("ارسال کد تایید به شماره:", phone);
      await new Promise((res) => setTimeout(res, 1200));
      alert(`کد تایید به شماره ${phone} ارسال خواهد شد (مرحله پیامک هنوز متصل نیست).`);
    } catch {
      setPhoneError("خطایی رخ داد، لطفاً دوباره تلاش کنید.");
    } finally {
      setIsPhoneSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    startGoogleTransition(async () => {
      try {
        await signIn("google", { callbackUrl: "/" });
      } catch (err) {
        console.error("خطا در اتصال به گوگل:", err);
      }
    });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F5F5F5] px-4 py-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[35%] h-48 w-[60%] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem] bg-secondary opacity-70 blur-2xl"
      />

      <section className="relative z-10 w-full max-w-sm rounded-3xl border border-primary/40 bg-white p-7 shadow-xl backdrop-blur-sm sm:p-8">


        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-xl font-black tracking-tight text-main sm:text-2xl">
              ورود به مینی‌ورس
            </h1>
            <p className="text-xs sm:text-sm text-main/70">
              برای ثبت سفارش و پیگیری خریدها وارد شوید
            </p>
          </div>

          <form onSubmit={handlePhoneSubmit} noValidate className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="phone-input"
                className="flex items-center gap-1.5 text-xs font-bold text-main"
              >
                <Phone className="h-3.5 w-3.5 text-main/70" />
                <span>شماره موبایل</span>
              </label>
              <div className="relative">
                <input
                  id="phone-input"
                  type="tel"
                  inputMode="numeric"
                  dir="ltr"
                  maxLength={11}
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="۰۹xxxxxxxxx"
                  className={`w-full rounded-2xl border px-4 py-2.5 text-center text-sm font-medium tracking-wider outline-none transition placeholder:text-neutral-400 focus:border-main focus:ring-2 focus:ring-main/10 ${
                    phoneError ? "border-red-500 bg-red-50/30" : "border-neutral-200 bg-neutral-50/50"
                  }`}
                />
              </div>
              {phoneError && (
                <p className="text-right text-[11px] font-medium text-red-500">
                  {phoneError}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={phone.length < 11 || isPhoneSubmitting}
              className="h-11 w-full rounded-2xl bg-main text-sm font-bold text-white shadow-sm transition hover:bg-main/90 disabled:opacity-50"
            >
              {isPhoneSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>در حال ارسال کد...</span>
                </div>
              ) : (
                "ادامه و دریافت کد تایید"
              )}
            </Button>
          </form>
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-neutral-200" />
            <span className="absolute bg-white px-3 text-[11px] font-medium text-neutral-400">
              یا
            </span>
          </div>

          <div>
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-neutral-200 bg-white text-sm font-bold text-main shadow-sm transition-all hover:border-neutral-400 active:scale-[0.99]"
            >
              {isGoogleLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-main" />
                  <span>در حال اتصال به گوگل...</span>
                </>
              ) : (
                <>
                  <GoogleIcon className="h-5 w-5" />
                  <span>ورود با حساب گوگل</span>
                </>
              )}
            </Button>
          </div>

          <p className="text-center text-[11px] leading-5 text-main/60">
            ورود شما به معنای پذیرش{" "}
            <Link
              href="/terms"
              className="underline underline-offset-2 hover:text-main"
            >
              قوانین و شرایط
            </Link>{" "}
            مینی‌ورس است.
          </p>
        </div>
      </section>
    </main>
  );
}
