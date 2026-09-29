"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Tag, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface AppliedDiscount {
  code: string;
  amount: number;
  description?: string;
}

interface DiscountBoxProps {
  /** تابع فراخوانی برای اعتبارسنجی کد در سرور/استیت */
  onApply?: (code: string) => Promise<{ success: boolean; message?: string }>;
  /** تابع حذف کد تخفیف اعمال شده */
  onRemove?: () => void;
  /** کد تخفیفی که قبلاً روی سبد اعمال شده (در صورت وجود) */
  appliedDiscount?: AppliedDiscount | null;
  className?: string;
}

export default function DiscountBox({
  onApply,
  onRemove,
  appliedDiscount,
  className,
}: DiscountBoxProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // ارسال فرم کد تخفیف
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCode = code.trim().toUpperCase();
    if (!trimmedCode || isLoading) return;

    setIsLoading(true);
    setFeedback(null);

    try {
      if (onApply) {
        const result = await onApply(trimmedCode);
        if (result.success) {
          setFeedback({
            type: "success",
            message: result.message || "کد تخفیف با موفقیت اعمال شد.",
          });
          setCode("");
        } else {
          setFeedback({
            type: "error",
            message: result.message || "کد وارد شده نامعتبر یا منقضی است.",
          });
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setFeedback({
          type: "success",
          message: `کد تخفیف ${trimmedCode} فعال شد.`,
        });
        setCode("");
      }
    } catch {
      setFeedback({
        type: "error",
        message: "خطایی رخ داد. لطفاً اتصال اینترنت را بررسی کنید.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    setFeedback(null);
    setCode("");
    onRemove?.();
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between text-right font-medium text-gray-800 transition-colors hover:text-main"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-main/10 text-main">
            <Tag className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">کد تخفیف دارید؟</span>
        </div>

        <ChevronDown
          className={cn(
            "h-4 w-4 text-gray-400 transition-transform duration-300",
            isOpen && "rotate-180 text-main"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              {appliedDiscount ? (
                <div className="flex items-center justify-between rounded-xl border border-main/20 bg-main/5 p-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-main" />
                    <div>
                      <p className="text-xs font-semibold text-gray-800">
                        کد <span className="font-mono tracking-wider text-main font-bold">{appliedDiscount.code}</span> فعال است
                      </p>
                      {appliedDiscount.description && (
                        <p className="text-[11px] text-gray-500">
                          {appliedDiscount.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={handleRemove}
                    className="h-8 px-2 text-xs text-gray-400 hover:bg-main/10 hover:text-main"
                  >
                    <X className="h-3.5 w-3.5 ml-1" />
                    حذف
                  </Button>
                </div>
              ) : (
                /* فرم ورود کد تخفیف */
                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      dir="ltr"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
                        if (feedback) setFeedback(null);
                      }}
                      placeholder="مثلاً: TICKET20"
                      disabled={isLoading}
                      className="h-11 rounded-xl border-gray-200 bg-gray-50/50 font-mono text-sm uppercase tracking-wider text-center focus-visible:ring-main focus-visible:border-main placeholder:font-sans placeholder:tracking-normal placeholder:text-right"
                    />
                    <Button
                      type="submit"
                      disabled={!code.trim() || isLoading}
                      className="h-11 min-w-[95px] rounded-xl bg-main text-xs font-semibold text-white hover:bg-main/90"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                      ) : (
                        "اعمال کد"
                      )}
                    </Button>
                  </div>

                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex items-center gap-1.5 text-xs font-medium",
                        feedback.type === "success" ? "text-main" : "text-red-500"
                      )}
                    >
                      {feedback.type === "success" ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-main" />
                      ) : (
                        <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-500" />
                      )}
                      <span>{feedback.message}</span>
                    </motion.div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
