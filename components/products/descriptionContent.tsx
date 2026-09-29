import { CheckCircle2 } from "lucide-react";

interface DescriptionContentProps {
  description?: string | null;
}

const FALLBACK_ITEMS: readonly string[] = [
  "در صورت سفارش کتابخونه کامل، توی هر کتابخونه ۵۰ جلد مینی کتاب هست که تقدیمتون می‌شه.",
  "جنس داخل کتاب‌ها از فوم ماکت‌سازی هست و قابل ورق زدن نیستن.",
  "احتمال اختلاف رنگ در حد ۲ الی ۳ درجه با تصویر وجود داره.",
  "اندازه‌ها مطابق جدول سایزه و ممکنه چند میلی‌متر اختلاف در اندازه‌ها وجود داشته باشه.",
  "چون تمامی کارها به‌صورت دست‌ساز و با دقت بالا ساخته میشن، زمان آماده‌سازی و تحویلشون ممکنه ۲ تا ۳ هفته زمان ببره.",
  "فرآیند ساخت سفارش‌ها پس از ثبت، انجام میشه.",
  "امکان انصراف و استرداد وجه پس از شروع فرایند تولید وجود نداره.",
  "خیالتون راحت؛ اگر سفارشتون با عکس یا توضیحات محصول مغایرت داشت، تا ۷ روز بعد از دریافت سفارش امکان مرجوعی وجود داره.",
];

export default function DescriptionContent({
  description,
}: DescriptionContentProps) {
  const hasCustomDescription = Boolean(description && description.trim().length > 0);

  return (
    <div className="text-right">
      <h3 className="mb-6 text-lg font-bold text-[#25311C] sm:text-xl">
        توضیحات تکمیلی
      </h3>

      {hasCustomDescription ? (
        <div className="prose prose-neutral max-w-none text-xs leading-8 text-neutral-600 sm:text-sm sm:leading-8">
          <p className="whitespace-pre-line">{description}</p>
        </div>
      ) : (
        <ul className="space-y-3.5 text-xs leading-7 text-neutral-600 sm:text-sm sm:leading-7">
          {FALLBACK_ITEMS.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#25311C] sm:h-5 sm:w-5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
