"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/useCart";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import OrderSummary from "@/components/cart/orderSummary";
import DiscountBox from "@/components/cart/discountBox";
import CheckoutSteps from "@/components/sections/checkoutSteps";

export default function CartPage() {
    const {
        items,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCart();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("fa-IR").format(price);

    if (!mounted) {
        return (
            <Container>
                <div className="flex h-96 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-main border-t-transparent" />
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <CheckoutSteps currentStep="cart" />

            <div className="py-6 md:py-10">
                <h1 className="mb-6 text-xl font-bold text-gray-800 md:text-2xl">
                    سبد خرید شما ({items.length.toLocaleString("fa-IR")})
                </h1>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="space-y-4 lg:col-span-2">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center text-gray-500 shadow-sm">
                                <ShoppingBag className="mb-3 h-12 w-12 text-gray-300" />
                                <p className="text-base font-medium">سبد خرید شما خالی است.</p>
                                <Button variant="cart" asChild className="mt-4">
                                    <Link href="/products">
                                        مشاهده محصولات
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            items.map((item) => {
                                const itemImage = item.image || "/images/placeholder.jpg";

                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm md:gap-6 md:p-5"
                                    >
                                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 md:h-32 md:w-32">
                                            <Image
                                                src={itemImage}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 96px, 128px"
                                            />
                                        </div>

                                        <div className="flex-1 text-right">
                                            <Link
                                                href={`/products/${item.id}`}
                                                className="line-clamp-2 text-sm font-bold leading-6 text-gray-800 transition hover:text-main md:text-lg"
                                            >
                                                {item.title}
                                            </Link>
                                            <p className="mt-1 text-xs text-gray-400">
                                                کد کالا: {String(item.id).slice(0, 6)}
                                            </p>

                                            <div className="mt-2 md:mt-4">
                                                <span className="text-sm font-extrabold text-main md:text-lg">
                                                    {formatPrice(item.price)} تومان
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex h-24 flex-col items-end justify-between md:h-32">
                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.id)}
                                                className="group rounded-lg p-1.5 transition-colors hover:bg-red-50"
                                                title="حذف از سبد"
                                            >
                                                <Trash2 className="h-5 w-5 text-gray-400 transition-colors group-hover:text-red-500" />
                                            </button>

                                            <div className="flex items-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-sm md:rounded-xl">
                                                <button
                                                    type="button"
                                                    onClick={() => increaseQuantity(item.id)}
                                                    className="px-2 py-1 text-gray-600 transition hover:bg-green-50 md:px-3 md:py-2"
                                                    aria-label="افزایش تعداد"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                                <span className="min-w-[30px] border-x border-gray-200 px-2 text-center text-xs font-bold md:min-w-[40px] md:px-4 md:text-sm">
                                                    {item.quantity.toLocaleString("fa-IR")}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => decreaseQuantity(item.id)}
                                                    className="px-2 py-1 text-gray-600 transition hover:bg-red-50 md:px-3 md:py-2"
                                                    aria-label="کاهش تعداد"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <div className="space-y-4">
                        <OrderSummary />
                        <DiscountBox />
                    </div>
                </div>
            </div>
        </Container>
    );
}
