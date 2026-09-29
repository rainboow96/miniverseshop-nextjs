"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ================= TYPES =================
export interface CategoryFilterItem {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export interface FilterSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: CategoryFilterItem[];
  absoluteMinPrice?: number;
  absoluteMaxPrice?: number;
}

interface PriceInputProps {
  value: number;
  min: number;
  max: number;
  label: string;
  onChange: (value: number) => void;
}

// ================= HELPERS =================
const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

function formatPriceFa(price: number | string): string {
  return Number(price || 0).toLocaleString("fa-IR");
}

function normalizePriceInput(value: string): number {
  const clean = String(value)
    .replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(ARABIC_DIGITS.indexOf(digit)))
    .replace(/[,\s٬]/g, "");

  return Number(clean) || 0;
}

// ================= SUB-COMPONENTS =================
function FilterPriceInput({ value, min, max, label, onChange }: PriceInputProps) {
  const [displayValue, setDisplayValue] = React.useState<string>(() => formatPriceFa(value));

  React.useEffect(() => {
    setDisplayValue(formatPriceFa(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const sanitized = raw.replace(/[^\d۰-۹٠-٩,٬]/g, "");

    if (!sanitized) {
      setDisplayValue("");
      return;
    }

    const parsed = normalizePriceInput(sanitized);
    if (Number.isNaN(parsed)) return;

    const clamped = Math.min(Math.max(parsed, min), max);
    setDisplayValue(formatPriceFa(clamped));
    onChange(clamped);
  };

  const handleBlur = () => {
    if (!displayValue) {
      onChange(min);
      setDisplayValue(formatPriceFa(min));
    }
  };

  return (
    <div className="flex h-11 items-center overflow-hidden rounded-lg border border-input bg-background shadow-xs transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
      <span className="flex h-full items-center border-l border-input bg-muted px-3 text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <input
        type="text"
        inputMode="numeric"
        dir="ltr"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full bg-transparent px-3 py-2 text-center text-sm font-semibold text-foreground outline-hidden"
      />
      <span className="px-3 text-xs text-muted-foreground">تومان</span>
    </div>
  );
}

// ================= MAIN COMPONENT =================
export function FilterSidebar({
  categories = [],
  absoluteMinPrice = 0,
  absoluteMaxPrice = 5_000_000,
  className,
  ...props
}: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();

  // Accordion Toggle States
  const [isCategoriesOpen, setIsCategoriesOpen] = React.useState(true);
  const [isPriceOpen, setIsPriceOpen] = React.useState(true);

  // Read URL Params (Source of Truth)
  const currentCategory = searchParams.get("category") || "";
  const currentQuery = searchParams.get("q") || "";
  const paramMinPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : absoluteMinPrice;
  const paramMaxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : absoluteMaxPrice;

  // Local state for smooth UX
  const [searchQuery, setSearchQuery] = React.useState<string>(currentQuery);
  const [minPrice, setMinPrice] = React.useState<number>(paramMinPrice);
  const [maxPrice, setMaxPrice] = React.useState<number>(paramMaxPrice);

  // Sync state with back/forward history
  React.useEffect(() => {
    setSearchQuery(currentQuery);
  }, [currentQuery]);

  React.useEffect(() => {
    setMinPrice(paramMinPrice);
    setMaxPrice(paramMaxPrice);
  }, [paramMinPrice, paramMaxPrice]);

  // URL Sync Dispatcher
  const updateFilters = React.useCallback(
    (updates: Record<string, string | number | null | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page"); // Reset pagination

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, searchParams]
  );

  // Search Debounce (350ms)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== currentQuery) {
        updateFilters({ q: searchQuery.trim() || null });
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery, currentQuery, updateFilters]);

  // Price Debounce (400ms)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const isMinChanged = minPrice !== paramMinPrice;
      const isMaxChanged = maxPrice !== paramMaxPrice;

      if (isMinChanged || isMaxChanged) {
        updateFilters({
          minPrice: minPrice > absoluteMinPrice ? minPrice : null,
          maxPrice: maxPrice < absoluteMaxPrice ? maxPrice : null,
        });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, paramMinPrice, paramMaxPrice, absoluteMinPrice, absoluteMaxPrice, updateFilters]);

  // Calculate Percentages for Dual Slider Track
  const { safeMin, safeMax, minPercent, maxPercent } = React.useMemo(() => {
    const min = Math.max(absoluteMinPrice, Math.min(minPrice, maxPrice));
    const max = Math.min(absoluteMaxPrice, Math.max(maxPrice, minPrice));
    const range = Math.max(absoluteMaxPrice - absoluteMinPrice, 1);

    return {
      safeMin: min,
      safeMax: max,
      minPercent: ((min - absoluteMinPrice) / range) * 100,
      maxPercent: ((max - absoluteMinPrice) / range) * 100,
    };
  }, [minPrice, maxPrice, absoluteMinPrice, absoluteMaxPrice]);

  return (
    <div
      dir="rtl"
      className={cn(
        "relative rounded-xl border border-border bg-card text-card-foreground shadow-xs",
        className
      )}
      {...props}
    >
      {/* Loading Overlay indicator when fetching from server */}
      {isPending && (
        <div className="absolute top-4 left-4 z-20 flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </div>
      )}

      {/* SEARCH SECTION */}
      <div className="p-5">
        <h3 className="mb-3 text-sm font-bold text-foreground">جستجو:</h3>
        <div className="relative">
          <Search className="absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی محصول..."
            className="w-full rounded-lg border border-input bg-background py-2.5 pr-10 pl-4 text-sm text-foreground shadow-xs outline-hidden transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* CATEGORIES ACCORDION */}
      <div className="border-t border-border">
        <button
          type="button"
          onClick={() => setIsCategoriesOpen((prev) => !prev)}
          className="flex w-full items-center justify-between px-5 py-4 text-sm font-bold text-foreground transition-colors hover:text-primary"
        >
          <span>دسته‌بندی</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              isCategoriesOpen && "rotate-180 text-foreground"
            )}
          />
        </button>

        {isCategoriesOpen && (
          <div className="px-5 pb-4">
            <ul className="space-y-1">
              {/* All Categories Option */}
              <li>
                <button
                  type="button"
                  onClick={() => updateFilters({ category: null })}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-2.5 py-2 text-right text-sm transition-colors",
                    !currentCategory
                      ? "bg-primary/10 font-bold text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span>همه محصولات</span>
                </button>
              </li>

              {/* Dynamic Categories */}
              {categories.map((cat) => {
                const isSelected = currentCategory === cat.slug;
                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => updateFilters({ category: isSelected ? null : cat.slug })}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-2.5 py-2 text-right text-sm transition-colors",
                        isSelected
                          ? "bg-primary/10 font-bold text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <span>{cat.name}</span>
                      {typeof cat.count === "number" && (
                        <span className="text-xs text-muted-foreground">({cat.count})</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* PRICE RANGE ACCORDION */}
      <div className="border-t border-border">
        <button
          type="button"
          onClick={() => setIsPriceOpen((prev) => !prev)}
          className="flex w-full items-center justify-between px-5 py-4 text-sm font-bold text-foreground transition-colors hover:text-primary"
        >
          <span>محدوده قیمت</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              isPriceOpen && "rotate-180 text-foreground"
            )}
          />
        </button>

        {isPriceOpen && (
          <div className="px-5 pb-5">
            {/* Dual Range Sliders */}
            <div dir="rtl" className="relative my-4 h-5 w-full">
              {/* Base background bar */}
              <div className="absolute top-1/2 right-0 left-0 h-1.5 -translate-y-1/2 rounded-full bg-secondary" />

              {/* Active filled bar */}
              <div
                className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary"
                style={{
                  left: `${100 - maxPercent}%`,
                  right: `${minPercent}%`,
                }}
              />

              {/* Native Slider Inputs for seamless Touch & Mouse experience */}
              <input
                type="range"
                min={absoluteMinPrice}
                max={absoluteMaxPrice}
                value={safeMin}
                onChange={(e) => setMinPrice(Math.min(Number(e.target.value), safeMax))}
                className="pointer-events-none absolute inset-0 z-20 h-5 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-md"
              />
              <input
                type="range"
                min={absoluteMinPrice}
                max={absoluteMaxPrice}
                value={safeMax}
                onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), safeMin))}
                className="pointer-events-none absolute inset-0 z-30 h-5 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-md"
              />
            </div>

            {/* Inputs */}
            <div className="space-y-3 pt-2">
              <FilterPriceInput
                label="از"
                value={safeMin}
                min={absoluteMinPrice}
                max={safeMax}
                onChange={(val) => setMinPrice(val)}
              />
              <FilterPriceInput
                label="تا"
                value={safeMax}
                min={safeMin}
                max={absoluteMaxPrice}
                onChange={(val) => setMaxPrice(val)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
