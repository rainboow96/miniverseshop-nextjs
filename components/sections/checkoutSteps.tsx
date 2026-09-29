import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type CheckoutStepId = "cart" | "information" | "complete";

export interface Step {
  id: CheckoutStepId | string;
  label: string;
  path: string;
}

export interface CheckoutStepsProps {
  currentStep?: CheckoutStepId | string;
  steps?: readonly Step[];
  className?: string;
}

const DEFAULT_STEPS: readonly Step[] = [
  {
    id: "cart",
    label: "سبد خرید",
    path: "/cart",
  },
  {
    id: "information",
    label: "صورتحساب",
    path: "/checkout",
  },
  {
    id: "complete",
    label: "تکمیل سفارش",
    path: "/success",
  },
] as const;

export default function CheckoutSteps({
  currentStep = "information",
  steps = DEFAULT_STEPS,
  className,
}: CheckoutStepsProps) {
  const safeSteps = steps.length > 0 ? steps : DEFAULT_STEPS;

  const activeStepIndex = Math.max(
    0,
    safeSteps.findIndex((step) => step.id === currentStep)
  );

  return (
    <nav
      aria-label="مراحل ثبت سفارش"
      dir="rtl"
      className={cn(
        "mb-8 w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      <ol className="flex min-w-[340px] items-start justify-between px-4 pt-6 md:px-8">
        {safeSteps.map((step, index) => {
          const isCompleted = index < activeStepIndex;
          const isCurrent = index === activeStepIndex;
          const isLast = index === safeSteps.length - 1;

          return (
            <li
              key={step.id}
              className="relative flex min-w-0 flex-1 flex-col items-center"
            >
              {!isLast && (
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute right-1/2 top-5 -z-0 h-0.5 w-full -translate-y-1/2 transition-colors duration-300",
                    isCompleted ? "bg-main" : "bg-muted-foreground/20"
                  )}
                />
              )}

              {isCompleted ? (
                <Link
                  href={step.path}
                  aria-label={`بازگشت به ${step.label}`}
                  className="relative z-10 flex size-10 items-center justify-center rounded-full bg-main text-white shadow-sm transition-all duration-200 hover:scale-105 hover:bg-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main focus-visible:ring-offset-2"
                >
                  <Check className="size-5 stroke-[2.5]" />
                </Link>
              ) : (
                <div
                  aria-current={isCurrent ? "step" : undefined}
                  className={cn(
                    "relative z-10 flex size-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200",
                    isCurrent
                      ? "border-main bg-main text-white shadow-md shadow-main"
                      : "border-border bg-background text-muted-foreground"
                  )}
                >
                  {(index + 1).toLocaleString("fa-IR")}
                </div>
              )}

              <span
                className={cn(
                  "mt-2.5 whitespace-nowrap text-center text-xs font-medium md:text-sm",
                  isCurrent && "font-bold text-main",
                  isCompleted && "font-medium text-foreground",
                  !isCurrent && !isCompleted && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>

              <span className="sr-only">
                {isCompleted
                  ? "تکمیل شده"
                  : isCurrent
                    ? "مرحله فعلی"
                    : "تکمیل نشده"}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
