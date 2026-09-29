"use client";

import { useState } from "react";
import { AlertTriangle, Check } from "lucide-react";
import ColorSelector, { type ProductVariant } from "./colorSelector";
import QuantitySelector from "./quantitySelector";
import { Button } from "../ui/button";
import { useCart } from "@/store/useCart"; 

export interface ProductInfoPanelProps {
  productId: string;
  title: string;
  alternativeName?: string;
  price: number;
  image?: string; 
  featuresTitle?: string;
  featuresItems?: string[];
  variants?: ProductVariant[];
}

export default function ProductInfoPanel({
  productId,
  title,
  alternativeName,
  price,
  image = "/placeholder.png",
  featuresTitle = "ویژگی محصول:",
  featuresItems = [],
  variants = [],
}: ProductInfoPanelProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCart((state) => state.addToCart);

  const handleAddToCart = () => {
    const selectedVariant =
      variants && variants.length > 0 ? variants[selectedVariantIndex] : null;

    const cartItemId = selectedVariant ? `${productId}-${selectedVariant.id}` : productId;

    const cartItemTitle = selectedVariant
      ? `${title} (${selectedVariant.colorName})`
      : title;

    const itemPrice = selectedVariant?.price ?? price;

    addToCart({
      id: cartItemId,
      title: cartItemTitle,
      price: itemPrice,
      image: image,
      quantity: quantity,
    });
  };
  return (
    <div className="flex flex-col justify-start rounded-[22px] bg-white p-6 shadow-sm border border-main/10 sm:p-7">
      <div>
        <h1 className="mb-1 text-xl font-bold text-main sm:text-2xl">{title}</h1>
        {alternativeName && (
          <p className="text-xs font-light text-[#77765d] mb-2">{alternativeName}</p>
        )}

        <div className="my-2 h-px bg-main/15" />

        {variants.length > 0 && (
          <ColorSelector
            variants={variants}
            selectedVariantIndex={selectedVariantIndex}
            onVariantChange={setSelectedVariantIndex}
          />
        )}

        {featuresItems.length > 0 && (
          <div className="mt-6 text-sm leading-6 text-main">
            <h3 className="mb-3 font-bold">{featuresTitle}</h3>
            <ul className="space-y-1.5">
              {featuresItems.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-main stroke-[2.5]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-[#ffeeba]/60 bg-[#fdf8e6] p-3 text-[13px] leading-6 text-[#856404]">
        <AlertTriangle className="h-5 w-5 shrink-0 text-[#a8893b]" />
        <p>
          لطفاً قبل از نهایی کردن سفارش،{" "}
          <a
            href="#product-details"
            className="font-bold text-[#856404] underline decoration-dotted transition-opacity hover:opacity-80"
          >
            توضیحات تکمیلی
          </a>{" "}
          را در پایین صفحه مطالعه بفرمایید.
        </p>
      </div>

      <div className="mt-6 border-t border-main/10 pt-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-base font-bold text-main">قیمت محصول:</span>
          <strong className="text-xl font-bold text-main">
            {price.toLocaleString("fa-IR")} تومان
          </strong>
        </div>

        <div className="flex items-stretch gap-3">
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity((prev) => prev + 1)}
            onDecrease={() => setQuantity((prev) => Math.max(1, prev - 1))}
          />
          <Button variant="cart" className="flex-1" onClick={handleAddToCart}>
            افزودن به سبد خرید
          </Button>
        </div>
      </div>
    </div>
  );
}
