import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container"; 
import { Button } from "@/components/ui/button";
import FanCarousel from "@/components/ui/FanCarousel"; 
import { HERO_CAROUSEL_IMAGES } from "@/app/constants/hero"; 

export default function Hero() {
  return (
<section
  className="relative w-full bg-cover bg-center py-4 md:py-10"
  style={{ backgroundImage: "url('/images/Heroimg.webp')" }}
>

      <Container>
        <div className="relative z-20 mx-auto w-full max-w-2xl px-4 text-center text-main sm:px-6">
          <h1 className="mb-4 flex flex-col gap-2 text-2xl font-bold leading-tight sm:gap-3 sm:text-3xl lg:text-4xl">
            <span>مینی ورس؛</span>
            <span>کتابخانه‌ای در کف دست شما</span>
          </h1>

          <p className="text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
            ساخت دکوری‌های مینیاتوری و کتابخانه‌های خاص دست‌ساز؛ هدیه‌ای از ظرافت در ابعاد کوچک
          </p>
        </div>
      </Container>

      <div className="relative z-10 -mt-6 w-full md:-mt-24">
        <FanCarousel images={HERO_CAROUSEL_IMAGES} />
      </div>

      <div className="mt-6 flex justify-center">
        <div className="relative inline-block">
          <div className="hidden lg:block absolute -right-40 top-1.5 w-36 -translate-y-1/2 pointer-events-none">
            <Image
              src="/images/Arrow.svg"
              alt="arrow"
              width={144}
              height={50}
              priority
              className="w-full h-auto"
            />
          </div>

          <Link href="/products">
            <Button variant="secondary" className="text-lg px-10 py-4">
              مشاهده محصولات
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
