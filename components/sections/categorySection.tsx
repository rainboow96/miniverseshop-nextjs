import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import { CATEGORIES_DATA, type CategoryItemData } from "@/app/constants/categories";

interface CategoryItemProps {
  readonly category: CategoryItemData;
}

function CategoryItem({ category }: CategoryItemProps) {
  const { title, image, slug } = category;

  return (
    <Link
      href={slug}
      className="group flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main focus-visible:ring-offset-2 rounded-2xl p-1"
      aria-label={`مشاهده دسته‌بندی ${title}`}
    >
      <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ease-out group-hover:scale-105 sm:h-36 sm:w-36 md:h-40 md:w-40">
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
            className="object-contain"
            loading="lazy"
          />
        </div>
      </div>

      <h3 className="mt-3 text-center text-sm font-medium text-stone-800 transition-colors duration-300 group-hover:text-main sm:text-base">
        {title}
      </h3>
    </Link>
  );
}

export default function CategorySection() {
  return (
    <Container size="wide">
      <section className="mt-6" aria-labelledby="category-section-title">
        <div className="mx-auto w-full max-w-5xl rounded-[30px] bg-[#b7bd9a] px-3 pt-4 pb-[110px] text-center sm:px-5">
          <h2
            id="category-section-title"
            className="text-lg font-extrabold text-white sm:text-2xl md:text-3xl"
          >
            دسته بندی محصولات مینی ورس
          </h2>
        </div>

        <div className="-mt-16 mx-auto grid w-full max-w-5xl grid-cols-2 gap-x-1 gap-y-8 px-1 sm:grid-cols-4 sm:gap-x-2 md:-mt-20">
          {CATEGORIES_DATA.map((item) => (
            <CategoryItem key={item.id} category={item} />
          ))}
        </div>
      </section>
    </Container>
  );
}
