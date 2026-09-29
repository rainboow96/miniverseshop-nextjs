import { prisma } from "@/lib/prisma";
import ProductCarousel from "../ui/productCarousel";
import ProductCard from "../products/product-card"; 
import SectionLine from "./sectionLine";

interface SimilarProductsProps {
  currentProductId: number | string;
  productType?: string | null;
  categorySlug?: string | null;
  limit?: number;
  title?: string;
  className?: string;
}

export default async function SimilarProducts({
  currentProductId,
  productType,
  categorySlug,
  limit = 8,
  title = "محصولات مشابه",
  className = "",
}: SimilarProductsProps) {
  const numericId =
    typeof currentProductId === "string"
      ? parseInt(currentProductId, 10)
      : currentProductId;

  const orConditions = [];

  if (productType) {
    orConditions.push({ productType });
  }

  if (categorySlug) {
    orConditions.push({ category: { slug: categorySlug } });
  }

  if (orConditions.length === 0) {
    return null;
  }

  const similarProducts = await prisma.product.findMany({
    where: {
      ...(isNaN(numericId) ? {} : { id: { not: numericId } }),
      OR: orConditions,
    },
    include: {
      images: true,
      category: true,
    },
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!similarProducts || similarProducts.length === 0) {
    return null;
  }

  return (
    <section
      aria-label={title}
      className={`w-full py-8 md:py-12 ${className}`.trim()}
    >
      <SectionLine
        title={title}
        actionText="مشاهده همه محصولات"
        to="/products"
      />

      <ProductCarousel itemCount={similarProducts.length}>
        {similarProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductCarousel>
    </section>
  );
}
