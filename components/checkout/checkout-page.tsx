"use client";

import { useMemo } from "react";
import CheckoutSteps from "@/components/sections/checkoutSteps";
import Container from "@/components/ui/container";
import OrderSummary from "@/components/cart/orderSummary";
import CheckoutForm from "./checkout-form";
import Breadcrumb from "../ui/breadcrumb";

interface CheckoutPageProps {
  initialUser?: {
    name?: string | null;
    email?: string | null;
  };
}

export default function CheckoutPage({ initialUser }: CheckoutPageProps) {
  const breadcrumbs = useMemo(
    () => [
      { label: "خانه", to: "/" },
      { label: "تکمیل سفارش", to: "/checkout" },
    ],
    []
  );

  return (
    <main className="bg-gray-50 pb-20">
      <Container>
        <div className="py-4">
          <Breadcrumb items={breadcrumbs} />
        </div>

        <CheckoutSteps currentStep="information" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CheckoutForm initialUser={initialUser} />
          </div>

          <OrderSummary showDetails />
        </div>
      </Container>
    </main>
  );
}
