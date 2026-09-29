import Image from "next/image";
import Container from "@/components/ui/container";

interface FeatureItemData {
  id: number;
  icon: string;
  title: string;
}

const FEATURE_ITEMS: FeatureItemData[] = [
  { id: 1, icon: "/images/car.svg", title: "ارسال به سراسر کشور" },
  { id: 2, icon: "/images/card.svg", title: "پرداخت امن" },
  { id: 3, icon: "/images/hour.svg", title: "پشتیبانی ۲۴ ساعته" },
  { id: 4, icon: "/images/box.svg", title: "بسته‌بندی مطمئن" },
];

export default function FeatureItem() {
  return (
    <section aria-label="ویژگی‌های فروشگاه" className="py-6 sm:py-8">
      <Container size="wide">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-8">
          {FEATURE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center text-center group"
            >
              <div className="relative flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16 lg:h-20 lg:w-20">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <p className="mt-3 text-xs font-medium text-main sm:text-sm lg:text-base">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
