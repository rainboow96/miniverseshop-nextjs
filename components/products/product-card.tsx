// کارتا باید سرور کامپوننت باشن
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCardImage } from "./product-card-image";
import type { Prisma } from "@prisma/client";

type ProductWithImages = Prisma.ProductGetPayload<{
  include: { images: true };
}>;

interface CardProps {
  product: ProductWithImages;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: CardProps) {
  const imageUrls = product.images?.length
    ? product.images.map((img) => img.url)
    : ["/placeholder.jpg"];

  const formattedPrice = new Intl.NumberFormat("fa-IR").format(product.price);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative mx-auto block w-full min-w-0 cursor-pointer rounded-[20px] bg-primary p-2.5 pb-3 shadow-[0_18px_34px_-18px_rgba(45,34,15,0.45)] transition-all duration-300 sm:max-w-[270px] sm:rounded-[26px] sm:p-3 sm:pb-4 hover:scale-[1.02] hover:shadow-[0_28px_44px_-18px_rgba(45,34,15,0.5)]"
    >
      <div className="pointer-events-none absolute inset-1.5 rounded-[15px] border-[1.5px] border-dashed border-main sm:inset-2 sm:rounded-[19px]" />

      <ProductCardImage
        images={imageUrls}
        alt={product.title}
        priority={priority}
      />

      <div className="flex flex-col gap-2 px-1 pt-2.5 sm:gap-3 sm:px-2 sm:pt-3">
        <div>
          <div className="mb-2 flex items-center justify-center gap-1.5 px-2 sm:mb-3 sm:gap-2 sm:px-4">
            <span className="h-1 w-1 rounded-full bg-main sm:h-1.5 sm:w-1.5" />
            <span className="flex-1 border-t-[1.5px] border-dashed border-main" />
            <span className="h-1 w-1 rounded-full bg-main sm:h-1.5 sm:w-1.5" />
          </div>

          <h3 className="line-clamp-2 min-h-9 text-center text-[14px] font-bold leading-[18px] text-[#312A20] sm:min-h-10 sm:text-[15px] sm:leading-5">
            {product.title}
          </h3>
        </div>

        <div>
          <div className="mb-2.5 flex justify-end sm:mb-3">
            <div dir="rtl" className="flex items-baseline gap-1.5 whitespace-nowrap">
              <span className="text-[14px] font-bold leading-none text-[#25311C] sm:text-[16px]">
                {formattedPrice}
              </span>
              <span className="text-[10px] font-medium leading-none text-[#6B6152] sm:text-[11px]">
                تومان
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="button"
              variant="cart"
              className="w-full gap-2 text-[12px] sm:text-[13px]"
            >
              <ShoppingCart className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">مشاهده و خرید</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
