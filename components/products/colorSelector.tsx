"use client";

import { useId, type KeyboardEvent } from "react";

export interface ProductVariant {
  id: string | number;
  colorName: string;
  colorHex: string;
  price?: number;
}

export interface ColorSelectorProps {
  variants: ProductVariant[];
  selectedVariantIndex: number;
  onVariantChange: (index: number) => void;
  className?: string;
}

export default function ColorSelector({
  variants,
  selectedVariantIndex,
  onVariantChange,
  className = "",
}: ColorSelectorProps) {
  const groupId = useId();

  if (!variants || variants.length === 0) {
    return null;
  }

  const selectedVariant = variants[selectedVariantIndex] ?? variants[0];

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      nextIndex = (currentIndex + 1) % variants.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      nextIndex = (currentIndex - 1 + variants.length) % variants.length;
    }

    if (nextIndex !== null) {
      onVariantChange(nextIndex);
    }
  };

  return (
    <section
      aria-labelledby={`color-selector-label-${groupId}`}
      className={`mt-4 flex flex-col gap-3 ${className}`}
    >
      <div
        role="radiogroup"
        id={`color-selector-group-${groupId}`}
        aria-labelledby={`color-selector-label-${groupId}`}
        className="flex flex-wrap items-center gap-3"
      >
        {variants.map((variant, index) => {
          const isSelected = selectedVariantIndex === index;

          return (
            <button
              key={variant.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onVariantChange(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-label={`انتخاب رنگ ${variant.colorName}`}
              title={variant.colorName}
              className={`group relative flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main focus-visible:ring-offset-2 ${
                isSelected
                  ? "ring-2 ring-main ring-offset-2 ring-offset-white shadow-xs scale-105"
                  : "hover:scale-110 opacity-80 hover:opacity-100"
              }`}
            >
              <span
                className="h-5 w-5 rounded-full border border-black/10 transition-transform group-active:scale-95"
                style={{
                  backgroundColor: variant.colorHex.startsWith("var(")
                    ? variant.colorHex
                    : variant.colorHex,
                }}
              />
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-sm font-semibold text-main">
        <span id={`color-selector-label-${groupId}`}>رنگ:</span>
        <span className="font-normal text-[#77765d]">
          {selectedVariant?.colorName}
        </span>
      </div>
    </section>
  );
}
