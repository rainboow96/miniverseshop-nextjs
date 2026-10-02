import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import FanCarousel from "@/components/ui/FanCarousel";
import { HERO_CAROUSEL_IMAGES } from "@/app/constants/hero";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[calc(100dvh-4.5rem)] w-full flex-col justify-between bg-cover bg-center py-6 md:min-h-0 md:py-16"
      style={{ backgroundImage: "url('/images/Heroimg.webp')" }}
    >
      <Container>
        <div className="relative z-20 mx-auto w-full max-w-2xl px-4 pt-6 text-center text-main sm:px-6 sm:pt-0">
          <h1 className="mb-3 flex flex-col gap-1.5 text-2xl font-bold leading-tight sm:gap-3 sm:text-3xl lg:text-4xl">
            <span>مینی ورس؛</span>
            <span>کتابخانه‌ای در کف دست شما</span>
          </h1>

          <p className="mx-auto max-w-sm text-sm font-medium leading-7 text-stone-700 sm:max-w-none sm:text-base sm:leading-8">
            ساخت دکوری‌های مینیاتوری و کتابخانه‌های خاص دست‌ساز؛ هدیه‌ای از ظرافت در ابعاد کوچک
          </p>
        </div>
      </Container>

      <div className="relative z-10 my-auto w-full py-2 md:my-0 md:-mt-16">
        <FanCarousel images={HERO_CAROUSEL_IMAGES} />
      </div>

      <div className="relative z-20 flex justify-center px-4">
        <div className="relative inline-block">
          <div className="pointer-events-none absolute -right-36 top-1/2 hidden w-32 -translate-y-1/2 lg:block">
            <Image
              src="/images/arrow.svg"
              alt="arrow"
              width={144}
              height={50}
              priority
              className="h-auto w-full"
            />
          </div>

          <Link href="/products">
            <Button
              variant="secondary"
              className="h-12 px-8 text-base font-semibold shadow-md sm:h-14 sm:px-10 sm:text-lg"
            >
              مشاهده محصولات
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
