"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/store/useCart"; 
import { Button } from "@/components/ui/button"; 
import { 
  ShoppingBag, 
  Truck, 
  ArrowLeft, 
  ShieldCheck, 
  ReceiptText 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderSummaryProps {
  showDetails?: boolean;
  className?: string;
}

const SHIPPING_FEE = 100_000;

export default function OrderSummary({
  showDetails = false,
  className,
}: OrderSummaryProps) {
  const { items, totalCount, totalPrice } = useCart();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shippingFee = items.length > 0 ? SHIPPING_FEE : 0;
  const finalPrice = totalPrice + shippingFee;

  const formatPrice = (price: number): string =>
    new Intl.NumberFormat("fa-IR").format(price);

  if (!isMounted) {
    return (
      <aside className={cn("lg:col-span-1", className)}>
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm animate-pulse space-y-4">
          <div className="h-6 w-1/3 bg-muted rounded" />
          <div className="h-20 bg-muted/50 rounded-xl" />
          <div className="h-10 bg-muted rounded-xl" />
        </div>
      </aside>
    );
  }

  const isCartEmpty = items.length === 0;

  return (
    <aside className={cn("lg:col-span-1", className)}>
      <div className="sticky top-24 rounded-2xl border border-border/60 bg-card/95 backdrop-blur-sm p-6 shadow-sm transition-all">
        <div className="mb-6 flex items-center justify-between border-b border-border/50 pb-4">
          <div className="flex items-center gap-2">
            <ReceiptText className="h-5 w-5 text-primary" />
            <h2 className="text-base font-bold text-foreground">
              {showDetails ? "اقلام سفارش" : "خلاصه سفارش"}
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
            <ShoppingBag className="h-3.5 w-3.5" />
            {formatPrice(totalCount)} کالا
          </span>
        </div>

        {showDetails && (
          <div className="mb-6 max-h-[320px] space-y-4 overflow-y-auto pr-1 border-b border-border/50 pb-6 scrollbar-thin">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted">
                    <Image
                      src={item.image || "/images/placeholder.jpg"}
                      alt={item.title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 text-right">
                    <h4 className="truncate font-semibold text-foreground">
                      {item.title}
                    </h4>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      تعداد: {formatPrice(item.quantity)}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 text-left font-bold text-foreground">
                  {formatPrice(item.price * item.quantity)}
                  <span className="text-[11px] font-normal text-muted-foreground mr-1">
                    تومان
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3.5 text-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>مبلغ کالاها</span>
            <span className="font-semibold text-foreground">
              {formatPrice(totalPrice)} تومان
            </span>
          </div>

          <div className="flex items-center justify-between text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Truck className="h-4 w-4" />
              هزینه ارسال
            </span>
            <span className="font-semibold text-foreground">
              {shippingFee === 0 ? "رایگان" : `${formatPrice(shippingFee)} تومان`}
            </span>
          </div>

          <div className="border-t border-dashed border-border/80 pt-4 flex items-baseline justify-between">
            <span className="text-base font-bold text-foreground">
              {showDetails ? "مبلغ قابل پرداخت:" : "مبلغ نهایی:"}
            </span>
            <div className="text-left">
              <span className="text-xl font-extrabold text-main ">
                {formatPrice(finalPrice)}
              </span>
              <span className="text-xs font-medium text-muted-foreground mr-1">
                تومان
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {!showDetails ? (
            <Button
              asChild
              disabled={isCartEmpty}
              className="w-full h-12 text-base font-medium rounded-xl bg-main hover:bg-[#3d5232] text-white shadow-sm transition-all disabled:pointer-events-none disabled:opacity-50"
            >
              <Link href="/checkout" className="inline-flex items-center justify-center gap-2">
                <span>ادامه و ثبت سفارش</span>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button
              type="submit"
              form="checkout-form"
              disabled={isCartEmpty}
              className="w-full h-12 text-base font-medium rounded-xl bg-main hover:bg-[#3d5232] text-white shadow-sm transition-all"
            >
              پرداخت و تکمیل خرید
            </Button>
          )}
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-[#314328] " />
          <span>ضمانت سلامت فیزیکی و بازگشت کالا</span>
        </div>
      </div>
    </aside>
  );
}
