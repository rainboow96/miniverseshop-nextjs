import Image from "next/image";
import { ArrowLeft } from "lucide-react";

function InstagramIcon({ className = "h-4 w-4" }: { readonly className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface InstagramBannerProps {
  readonly instagramUrl?: string;
  readonly title?: string;
  readonly buttonText?: string;
  readonly imageSrc?: string;
  readonly className?: string;
}

export default function InstagramBanner({
  instagramUrl = "https://instagram.com/",
  title = "ما هر روز کلی محتوای جالب در اینستاگرام منتشر می‌کنیم!",
  buttonText = "مشاهده پست‌های اینستاگرام",
  imageSrc = "/images/mobile.webp",
  className = "",
}: InstagramBannerProps) {
  return (
    <section
      aria-label="بنر اینستاگرام مینی ورس"
      className={`my-16 px-4 sm:my-24 ${className}`}
    >
      <div className="relative mx-auto flex max-w-[1200px] flex-col justify-center overflow-visible rounded-3xl bg-gradient-to-l from-main to-secondary p-6 pr-32 shadow-lg shadow-main/10 sm:p-8 sm:pr-44 md:min-h-[130px] md:flex-row md:items-center md:justify-between md:py-6 md:pl-10 md:pr-[240px]">
        
        <div className="pointer-events-none absolute -bottom-6 -top-8 right-2 z-10 flex w-[110px] items-center justify-center sm:-bottom-8 sm:-top-10 sm:right-6 sm:w-[150px] md:-bottom-10 md:-top-12 md:right-8 md:w-[200px]">
          <Image
            src={imageSrc}
            alt="پیش‌نمایش اینستاگرام"
            width={240}
            height={320}
            priority={false}
            className="h-full w-full select-none object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)]"
          />
        </div>

        <div className="z-0 text-right">
          <p className="text-sm font-bold leading-relaxed text-white sm:text-base md:text-lg">
            {title}
          </p>
        </div>

        <div className="z-10 mt-4 flex w-full shrink-0 md:mt-0 md:w-auto">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-center text-xs font-bold text-main shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-stone-50 hover:shadow-xl active:scale-[0.98] sm:w-auto md:px-6 md:py-3 md:text-sm"
          >
            <InstagramIcon className="h-4 w-4 text-main transition-transform group-hover:scale-110" />
            <span>{buttonText}</span>
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
}
