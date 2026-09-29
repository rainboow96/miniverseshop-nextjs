"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Trash2, Plus, Minus, PackageOpen } from "lucide-react";
import { useCart } from "@/store/useCart";
import { Button } from "../ui/button";

export default function MiniCart() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const miniCartRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const items = useCart((state) => state.items);
  const totalCount = useCart((state) => state.totalCount);
  const totalPrice = useCart((state) => state.totalPrice);
  const increaseQuantity = useCart((state) => state.increaseQuantity);
  const decreaseQuantity = useCart((state) => state.decreaseQuantity);
  const removeFromCart = useCart((state) => state.removeFromCart);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // مدیریت باز شدن سریع و لغو تایمر بستن
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  // بستن پاپ‌آپ با کلیک خارج از کادر
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        miniCartRef.current &&
        !miniCartRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("fa-IR").format(num);
  };

  const count = isMounted ? totalCount : 0;
  const cartList = isMounted ? items : [];
  const total = isMounted ? totalPrice : 0;

  return (
    <div
      ref={miniCartRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="سبد خرید"
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-main transition-colors hover:bg-stone-100/80 focus:outline-none"
      >
        <ShoppingBag className="h-6 w-6 stroke-[1.8]" />

        {count > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-600 px-1 text-[11px] font-bold text-white shadow-sm ring-2 ring-white">
            {formatNumber(count)}
          </span>
        )}
      </button>

      <div
        className={`absolute left-0 top-full z-50 pt-2 transition-all duration-200 ${
          isOpen
            ? "pointer-events-auto visible translate-y-0 opacity-100"
            : "pointer-events-none invisible translate-y-2 opacity-0"
        }`}
      >
        <div className="w-[340px] sm:w-[370px] rounded-[24px] border border-stone-100 bg-white p-5 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <h3 className="text-sm font-bold text-stone-800">
              سبد خرید شما
            </h3>
            <span className="text-xs font-medium text-stone-400">
              {formatNumber(count)} کالا
            </span>
          </div>

          {cartList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                <PackageOpen className="size-6" />
              </div>
              <p className="mt-3 text-sm font-medium text-stone-600">
                سبد خرید شما خالی است
              </p>
            </div>
          ) : (
            <>
              <div className="max-h-[260px] divide-y divide-stone-100 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-stone-200">
                {cartList.map((item) => {
                  const imageSrc =
                    item.image && (item.image.startsWith("/") || item.image.startsWith("http"))
                      ? item.image
                      : item.image
                        ? `/${item.image}`
                        : "/placeholder.png";

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 py-4"
                    >
                      <div className="flex-1 flex flex-col justify-between gap-2.5">
                        <h4 className="text-xs font-bold text-stone-800 line-clamp-1">
                          {item.title}
                        </h4>

                        <div className="flex items-center gap-2.5">
                          <div className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-2 py-0.5 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id)}
                              className="text-stone-500 hover:text-stone-900"
                            >
                              <Plus className="size-3" />
                            </button>
                            <span className="min-w-3 text-center text-xs font-bold text-stone-800">
                              {formatNumber(item.quantity)}
                            </span>
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.id)}
                              className="text-stone-500 hover:text-red-500"
                            >
                              <Minus className="size-3" />
                            </button>
                          </div>

                          <span className="text-xs font-bold text-stone-700 whitespace-nowrap">
                            {formatNumber(item.price * item.quantity)} ت
                          </span>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            aria-label="حذف آیتم"
                            className="p-1 text-red-400 transition-colors hover:text-red-600"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-stone-100 bg-stone-50">
                        <Image
                          src={imageSrc}
                          alt={item.title}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-stone-800 pt-3 mt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-500">
                    مبلغ قابل پرداخت:
                  </span>
                  <span className="text-sm font-extrabold text-stone-800">
                    {formatNumber(total)} تومان
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  variant="tab"
                  asChild
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/cart">
                    ثبت سفارش / مشاهده سبد
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
