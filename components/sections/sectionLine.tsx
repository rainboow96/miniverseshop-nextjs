import Link from "next/link";

interface SectionLineProps {
  readonly title: string;
  readonly actionText: string;
  readonly to: string;
  readonly className?: string;
}

export default function SectionLine({
  title,
  actionText,
  to,
  className = "",
}: SectionLineProps) {
  return (
    <div className={`flex w-full items-center gap-4 pb-8 ${className}`}>
      <h2 className="shrink-0 whitespace-nowrap text-base font-bold text-main sm:text-lg md:text-xl">
        {title}
      </h2>

      <span className="h-[2px] flex-1 bg-secondary" aria-hidden="true"></span>

      <Link
        href={to}
        className="relative z-10 shrink-0 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 -my-2 text-xs font-semibold text-stone-600 transition-colors duration-200 hover:text-main hover:bg-stone-100/60 sm:text-sm cursor-pointer select-none"
      >
        {actionText}
      </Link>
    </div>
  );
}
