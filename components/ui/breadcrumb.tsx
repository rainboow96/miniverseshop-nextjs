import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <div
      className={`mt-10 mb-8 rounded-md bg-primary px-4 py-3 sm:mt-10 ${className}`}
    >
      <nav
        aria-label="مسیر صفحه"
        className="flex items-center text-sm"
      >
        <ol className="flex flex-wrap items-center gap-2 text-stone-600">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isLink = item.to && !isLast;

            return (
              <li key={index} className="flex items-center gap-2">
                {isLink ? (
                  <Link
                    href={item.to!}
                    className="transition-colors hover:text-primary hover:underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="font-medium text-stone-900"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}

                {!isLast && (
                  <span
                    className="text-stone-400 select-none"
                    aria-hidden="true"
                  >
                    ›
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}