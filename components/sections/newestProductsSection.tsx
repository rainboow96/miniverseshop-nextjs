import { prisma } from "@/lib/prisma";
import Container from "@/components/ui/container";
import SectionLine from "@/components/sections/sectionLine"; 
import ProductCarousel from "@/components/ui/productCarousel";
import ProductCard from "@/components/products/product-card";
import { PackageX } from "lucide-react";

export default async function NewestProductsSection() {
  const newestProducts = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 8,
    include: {
      images: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  return (
    <Container size="wide">
       <section className="mt-20"  aria-label="جدیدترین محصولات">
        <SectionLine
          title="جدیدترین محصولات"
          actionText="مشاهده همه"
          to="/products"
        />

        <div className="mt-6">
          {newestProducts.length > 0 ? (
            <ProductCarousel itemCount={newestProducts.length}>
              {newestProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 2}
                />
              ))}
            </ProductCarousel>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-50/50 py-12 text-center">
              <PackageX className="h-10 w-10 text-stone-400" aria-hidden="true" />
              <p className="mt-3 text-sm font-medium text-stone-500">
                در حال حاضر محصول جدیدی برای نمایش وجود ندارد.
              </p>
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}
