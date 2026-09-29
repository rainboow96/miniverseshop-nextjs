import { PrismaClient } from "@prisma/client";
import productsData from "./products.json";

const prisma = new PrismaClient();

type SeedVariant = {
  variantId: string;
  colorName: string;
  colorHex: string;
  stock?: number;
};

type SeedProduct = {
  title: string;
  alternativeName?: string | null;
  slug: string;
  price: number;
  productType: string;
  categorySlug: string;
  categoryTitle: string;
  color?: string | null;
  colorHex?: string | null;
  description?: string | null;
  images?: string[];
  featureTitle?: string;
  features?: string[];
  specs?: { label: string; value: string }[];
  tags?: string[];
  variants?: SeedVariant[];
};

async function main() {
  const products = productsData as SeedProduct[];

  console.log(`🌱 شروع فرآیند Seed برای ${products.length} محصول...`);

  // 1) دسته‌بندی‌ها (یکتا)
  const categoriesMap = new Map<string, { slug: string; title: string }>();
  for (const p of products) {
    if (p.categorySlug && p.categoryTitle) {
      categoriesMap.set(p.categorySlug, {
        slug: p.categorySlug,
        title: p.categoryTitle,
      });
    }
  }

  for (const [slug, cat] of categoriesMap) {
    await prisma.category.upsert({
      where: { slug },
      update: { title: cat.title },
      create: { slug, title: cat.title },
    });
    console.log(`  📁 دسته‌بندی: ${cat.title}`);
  }

  // 2) درج و به‌روزرسانی محصولات
  for (const p of products) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { slug: p.categorySlug },
    });

    const images = p.images ?? [];
    const features = p.features ?? [];
    const specs = p.specs ?? [];
    const tags = p.tags ?? [];
    const variants = p.variants ?? [];

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        alternativeName: p.alternativeName ?? null,
        price: p.price,
        productType: p.productType,
        color: p.color ?? null,
        colorHex: p.colorHex ?? null,
        description: p.description ?? null,
        categoryId: category.id,
        // پاک‌سازی روابط قبلی جهت جلوگیری از تکرار در اجرای دوباره
        images: {
          deleteMany: {},
          create: images.map((url, i) => ({ url, sortOrder: i })),
        },
        features: {
          deleteMany: {},
          create: features.map((item, i) => ({
            title: p.featureTitle ?? "ویژگی محصول:",
            item,
            sortOrder: i,
          })),
        },
        specs: {
          deleteMany: {},
          create: specs.map((s, i) => ({
            label: s.label,
            value: s.value,
            sortOrder: i,
          })),
        },
        tags: {
          deleteMany: {},
          create: tags.map((tag) => ({ tag })),
        },
        variants: {
          deleteMany: {},
          create: variants.map((v) => ({
            variantId: v.variantId,
            colorName: v.colorName,
            colorHex: v.colorHex,
            stock: v.stock ?? 0,
          })),
        },
      },
      create: {
        title: p.title,
        alternativeName: p.alternativeName ?? null,
        slug: p.slug,
        price: p.price,
        productType: p.productType,
        color: p.color ?? null,
        colorHex: p.colorHex ?? null,
        description: p.description ?? null,
        categoryId: category.id,
        images: {
          create: images.map((url, i) => ({ url, sortOrder: i })),
        },
        features: {
          create: features.map((item, i) => ({
            title: p.featureTitle ?? "ویژگی محصول:",
            item,
            sortOrder: i,
          })),
        },
        specs: {
          create: specs.map((s, i) => ({
            label: s.label,
            value: s.value,
            sortOrder: i,
          })),
        },
        tags: {
          create: tags.map((tag) => ({ tag })),
        },
        variants: {
          create: variants.map((v) => ({
            variantId: v.variantId,
            colorName: v.colorName,
            colorHex: v.colorHex,
            stock: v.stock ?? 0,
          })),
        },
      },
    });

    console.log(`  📦 محصول: ${p.title} (${p.slug})`);
  }

  console.log("✨ Seed دیتابیس با موفقیت کامل شد!");
}

main()
  .catch((e) => {
    console.error("❌ خطا در اجرای Seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
