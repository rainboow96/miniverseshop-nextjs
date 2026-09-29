import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Container from "@/components/ui/container";
import Breadcrumb from "@/components/ui/breadcrumb";
import ProductGallery from "@/components/products/productGallery";
import FeatureItem from "@/components/sections/featureItem";
import ProductDetailsTabs from "@/components/products/productDetailsTabs";
import ProductInfoPanel from "@/components/products/productInfoPanel";
import SimilarProducts from "@/components/sections/similarProducts";

export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true },
  });

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { title: true, description: true },
  });

  if (!product) return { title: "محصول پیدا نشد" };

  return {
    title: `${product.title} | مینی‌ورس`,
    description: product.description?.slice(0, 160) || undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const session = await auth();
  const isLoggedIn = !!session?.user;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
      specs: { orderBy: { sortOrder: "asc" } },
      features: { orderBy: { sortOrder: "asc" } },
      variants: true,
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!product) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "خانه", href: "/" },
    { label: "محصولات", href: "/products" },
    ...(product.category
      ? [
        {
          label: product.category.title,
          href: `/products?category=${product.category.slug}`,
        },
      ]
      : []),
    { label: product.title, href: `/products/${product.slug}` },
  ];

  const productImages: string[] =
    product.images.length > 0
      ? product.images.map((img) => img.url)
      : ["/images/1.webp"];

  const mainImage = productImages[0];

  const specsForUI = [
    ...product.specs.map((spec) => ({
      label: spec.label,
      value: spec.value,
    })),
    ...(product.color
      ? [{ label: "رنگ پایه", value: product.color }]
      : []),
  ];

  const featureList =
    product.features.length > 0
      ? product.features.map((f) => f.item)
      : product.specs.slice(0, 4).map((s) => `${s.label}: ${s.value}`);

  const variantsList =
    product.variants.length > 0
      ? product.variants.map((v) => ({
        id: v.variantId,
        colorName: v.colorName,
        colorHex: v.colorHex,
      }))
      : product.color && product.colorHex
        ? [
          {
            id: `single-${product.id}`,
            colorName: product.color,
            colorHex: product.colorHex,
          },
        ]
        : [];

  return (
    <Container>
      <Breadcrumb items={breadcrumbItems} />

      <div className="relative mt-6">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-40 rounded-[28px] bg-secondary"
        />

        <div className="relative z-10 grid grid-cols-1 items-start gap-6 px-4 pt-6 lg:grid-cols-2 lg:gap-8">
          <ProductGallery
            images={productImages}
            productTitle={product.title}
          />

          <ProductInfoPanel
            productId={String(product.id)}
            title={product.title}
            alternativeName={product.alternativeName ?? undefined}
            price={product.price}
            image={mainImage}
            featuresTitle={product.features[0]?.title ?? "ویژگی محصول:"}
            featuresItems={featureList}
            variants={variantsList}
          />
        </div>

        <div className="mt-12 space-y-10">
          <FeatureItem />
          <div id="product-details">
            <ProductDetailsTabs
              specs={specsForUI}
              description={product.description ?? ""}
              reviews={product.reviews}
              productId={product.id}
              slug={product.slug}
              isLoggedIn={isLoggedIn}
            />
          </div>
        </div>
      </div>
      <SimilarProducts
        currentProductId={product.id}
        productType={product.productType}
        categorySlug={product.category?.slug}
      />

    </Container>
  );
}
