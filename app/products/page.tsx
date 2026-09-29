import type { Metadata } from "next";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import Container from "@/components/ui/container";
import Breadcrumb from "@/components/ui/breadcrumb";
import { FilterSidebar } from "@/components/filters/filterSidebar";
import ProductCard from "@/components/products/product-card";
import ProductSort, { type SortType } from "@/components/products/ProductSort";
import LoadMoreButton from "@/components/products/loadMoreButton";
import { PackageSearch } from "lucide-react";

export const metadata: Metadata = {
  title: "همه محصولات | مینی‌ورس",
  description: "لیست کامل محصولات فروشگاه مینی‌ورس با امکان فیلتر و جستجوی پیشرفته",
};

 // تعدادمحصولات درهربا نمایش. 3 ردیف3تایی
const DEFAULT_LIMIT = 9;

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: SortType;
    limit?: string;
  }>;
}

export default async function AllProductsPage({ searchParams }: PageProps) {
  const { q, category, minPrice, maxPrice, sort, limit } = await searchParams;

  const currentLimit = limit && !Number.isNaN(Number(limit)) ? Number(limit) : DEFAULT_LIMIT;

  const breadcrumbItems = [
    { label: "خانه", to: "/" },
    { label: "همه محصولات" },
  ];

  const where: Prisma.ProductWhereInput = {};

  const queryTrimmed = q?.trim();
  if (queryTrimmed) {
    where.OR = [
      { title: { contains: queryTrimmed, mode: "insensitive" } },
      { alternativeName: { contains: queryTrimmed, mode: "insensitive" } },
      { description: { contains: queryTrimmed, mode: "insensitive" } },
    ];
  }

  if (category) {
    where.category = { slug: category };
  }

  const minVal = minPrice ? Number(minPrice) : undefined;
  const maxVal = maxPrice ? Number(maxPrice) : undefined;

  if (
    (minVal !== undefined && !Number.isNaN(minVal)) ||
    (maxVal !== undefined && !Number.isNaN(maxVal))
  ) {
    where.price = {
      ...(minVal !== undefined && !Number.isNaN(minVal) ? { gte: minVal } : {}),
      ...(maxVal !== undefined && !Number.isNaN(maxVal) ? { lte: maxVal } : {}),
    };
  }

  const getOrderBy = (): Prisma.ProductOrderByWithRelationInput => {
    switch (sort) {
      case "cheapest":
        return { price: "asc" };
      case "expensive":
        return { price: "desc" };
      case "popular":
      case "bestseller":
      case "newest":
      default:
        return { createdAt: "desc" };
    }
  };

  const [categories, totalMatchingProducts, products] = await Promise.all([
    prisma.category.findMany({
      orderBy: { title: "asc" },
      select: {
        id: true,
        title: true,
        slug: true,
        _count: {
          select: { products: true },
        },
      },
    }),
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: getOrderBy(),
      take: currentLimit,
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: "asc" },
        },
      },
    }),
  ]);

  const hasMoreProducts = products.length < totalMatchingProducts;

  const formattedCategories = categories.map((cat) => ({
    id: String(cat.id),
    name: cat.title,
    slug: cat.slug,
    count: cat._count.products,
  }));

  return (
    <Container>
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <FilterSidebar
              categories={formattedCategories}
              absoluteMinPrice={0}
              absoluteMaxPrice={5_000_000}
            />
          </div>
        </aside>

        <section className="lg:col-span-3">
          <div className="mb-4">
            <ProductSort />
          </div>

          <div className="mb-6 flex items-center justify-between border-b border-border pb-3">
            <span className="text-xs text-muted-foreground">
              {totalMatchingProducts.toLocaleString("fa-IR")} محصول موجود است
            </span>
            {products.length > 0 && (
              <span className="text-xs text-muted-foreground">
                نمایش {products.length.toLocaleString("fa-IR")} از {totalMatchingProducts.toLocaleString("fa-IR")}
              </span>
            )}
          </div>

          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
              <PackageSearch className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-base font-semibold text-foreground">
                محصولی با این مشخصات یافت نشد
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                لطفاً فیلترها را تغییر دهید یا عبارت دیگری را جستجو کنید.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={index < 3}
                  />
                ))}
              </div>

              {hasMoreProducts && (
                <LoadMoreButton currentLimit={currentLimit} step={9} />
              )}
            </>
          )}
        </section>
      </div>
    </Container>
  );
}
