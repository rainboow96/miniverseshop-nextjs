import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import SectionLine from "@/components/sections/sectionLine";

const WHY_MINIVERSE_IMAGE = "/images/main.webp" as const;

export default function WhyMiniverseSection() {
  return (
    <Container size="wide">
      <section className="mt-10" aria-labelledby="why-miniverse-title">
        <SectionLine
          title="چرا مینی ورس؟"
          actionText="مشاهده همه محصولات"
          to="/products"
        />

        <div className="grid items-start gap-8 md:grid-cols-2">
          {/* متن و دکمه */}
          <div className="order-2 text-right md:order-1">
            <p className="text-sm leading-8 text-stone-700 sm:text-base">
              اینجا دنیای کوچکی است برای آرام کردن ذهن بزرگ؛ جایی که چیدن کتاب‌های ریز روی قفسه،
              تمرکز روی جزئیات ظریف و لمس بافت گرم چوب، تجربه‌ای فراتر از یک دکور ساده می‌سازد
              و ما با استفاده از چوب طبیعی بالسا، رنگ‌های ملایم و متریال دست‌ساز، فضایی خلق
              می‌کنیم که حس صمیمی یک کتابخانه واقعی را در ابعادی کوچک زنده می‌کند؛ سبکی و بافت
              نرم چوب بالسا به ما اجازه می‌دهد دقیق‌ترین جزئیات را با دست اجرا کنیم تا هر قطعه،
              شخصیت و لطافت خاص خود را داشته باشد؛ این محصولات فقط برای تزئین نیستند، بلکه
              وقفه‌ای آرام در میان شلوغی روزمره‌اند که ذهن را از هیاهو جدا کرده و برای لحظاتی،
              حس سکوت، نظم و لذت کشف را به فضای زندگی شما هدیه می‌دهند.
            </p>

            <div className="mt-6">
              <Button asChild variant="secondary" className="text-lg">
                <Link href="/products">مشاهده محصولات</Link>
              </Button>
            </div>
          </div>

          <div className="order-1 mb-24 flex justify-center md:order-2 md:mb-0 md:-mt-12">
            <div className="mt-10 relative h-56 w-56 rounded-full bg-secondary sm:h-60 sm:w-60 md:h-64 md:w-64">

              <Image
                src={WHY_MINIVERSE_IMAGE}
                alt="مینی کتابخونه"
                width={300}
                height={380}
                className="absolute left-1/2 bottom-[-100px] h-[350px] w-auto -translate-x-1/2 object-contain md:bottom-[-170px] md:h-[430px]"
                priority={false}
              />
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
