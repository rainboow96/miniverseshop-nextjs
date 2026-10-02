import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import FanCarousel from "@/components/ui/FanCarousel";
import { HERO_CAROUSEL_IMAGES } from "@/app/constants/hero";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden py-6 sm:py-12 md:py-16">
      <Image
        src="/images/Heroimg.webp"
        alt="Hero Background"
        fill
        priority
        quality={75}
        sizes="100vw"
        className="pointer-events-none object-cover object-center -z-10"
      />

      <Container>
        <div className="relative z-20 mx-auto w-full max-w-2xl px-2 text-center text-main sm:px-6">
          <h1 className="mb-4 flex flex-col gap-2 text-2xl font-black leading-tight sm:gap-3 sm:text-3xl lg:text-4xl">
            <span>مینی ورس؛</span>
            <span>کتابخانه‌ای در کف دست شما</span>
          </h1>

          <p className="mx-auto max-w-lg text-sm font-medium leading-7 text-stone-700 sm:text-lg sm:leading-8">
            ساخت دکوری‌های مینیاتوری و کتابخانه‌های خاص دست‌ساز؛ هدیه‌ای از ظرافت در ابعاد کوچک
          </p>
        </div>
      </Container>

    
      <div className="relative z-10 my-6 w-full sm:my-8 md:-mt-12 md:mb-4">
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
              className="h-12 px-10 text-base font-bold shadow-md sm:h-14 sm:px-12 sm:text-lg"
            >
              مشاهده محصولات
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
