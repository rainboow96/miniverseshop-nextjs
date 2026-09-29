// components/products/productDetailsTabs.tsx
"use client";

import { useState } from "react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button"; 
import FeaturesTable from "@/components/products/featuresTable";
import DescriptionContent from "@/components/products/descriptionContent";
import ReviewsContent, { type ReviewItem } from "@/components/products/reviewsContent";

interface Specification {
  label: string;
  value: string;
}

interface ProductDetailsTabsProps {
  specs?: Specification[];
  description?: string;
  reviews?: ReviewItem[];
  productId?: number;
  slug?: string;       
  isLoggedIn?: boolean; 
}

type TabId = "features" | "description" | "reviews";

export default function ProductDetailsTabs({
  specs = [],
  description = "",
  reviews = [],
  productId,
  slug = "",          
  isLoggedIn = false,  
}: ProductDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("features");

  // دیتای پیش‌فرض در صورت نبود داده
  const displaySpecs = specs.length > 0 ? specs : [
    { label: "وزن", value: "۲۰۰ گرم" },
    { label: "اندازه", value: "متوسط" },
    { label: "رنگ", value: "سبز" },
    { label: "جنس", value: "پنبه" },
  ];

  const tabs: { id: TabId; label: string }[] = [
    { id: "features", label: "ویژگی‌ها" },
    { id: "description", label: "توضیحات تکمیلی" },
    { id: "reviews", label: `نظرات (${reviews.length})` },
  ];

  return (
    <section className="py-10" id="product-details" aria-label="جزئیات محصول">
      <Container>
        <div 
          className="flex flex-row justify-center gap-3 rounded-[40px] bg-[#b5be9b] px-4 pb-20 pt-8"
          role="tablist"
          aria-label="بخش‌های جزئیات محصول"
        >
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="tab"
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <div className="mx-auto -mt-16 max-w-4xl rounded-[40px] border border-neutral-100 bg-white p-8 shadow-lg md:p-12">
          <div role="tabpanel" id={`panel-${activeTab}`}>
            {activeTab === "features" && (
              <FeaturesTable specs={displaySpecs} />
            )}

            {activeTab === "description" && (
              <DescriptionContent description={description} />
            )}

            {activeTab === "reviews" && (
              <ReviewsContent
                reviews={reviews}
                productId={productId}
                slug={slug}            
                isLoggedIn={isLoggedIn} 
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
