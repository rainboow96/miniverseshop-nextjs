"use client";

import { Plus, Minus } from "lucide-react";

export interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max,
  disabled = false,
  className = "",
}: QuantitySelectorProps) {
  const isMinReached = disabled || quantity <= min;
  const isMaxReached = disabled || (max !== undefined && quantity >= max);

  return (
    <div
      role="group"
      aria-label="انتخاب تعداد محصول"
      className={`inline-flex items-center rounded-xl border border-main/20 bg-white shadow-2xs transition-colors ${
        disabled ? "pointer-events-none opacity-50" : ""
      } ${className}`}
    >
      <button
        type="button"
        onClick={onIncrease}
        disabled={isMaxReached}
        aria-label="افزایش تعداد"
        className="flex h-11 w-10 items-center justify-center rounded-s-xl text-main transition-colors hover:bg-main/5 active:bg-main/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/30 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Plus className="h-4 w-4 stroke-[2.5]" />
      </button>

      <span
        aria-live="polite"
        className="flex h-11 min-w-11 select-none items-center justify-center border-x border-main/15 px-3 text-sm font-bold tabular-nums text-main"
      >
        {quantity.toLocaleString("fa-IR")}
      </span>

      <button
        type="button"
        onClick={onDecrease}
        disabled={isMinReached}
        aria-label="کاهش تعداد"
        className="flex h-11 w-10 items-center justify-center rounded-e-xl text-main transition-colors hover:bg-main/5 active:bg-main/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/30 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Minus className="h-4 w-4 stroke-[2.5]" />
      </button>
    </div>
  );
}
