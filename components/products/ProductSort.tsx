'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowDownWideNarrow } from 'lucide-react';

export type SortType = 'popular' | 'bestseller' | 'newest' | 'cheapest' | 'expensive';

interface SortOption {
  id: SortType;
  label: string;
}

const SORT_OPTIONS: readonly SortOption[] = [
  { id: 'popular', label: 'پربازدیدترین' },
  { id: 'bestseller', label: 'پرفروش‌ترین' },
  { id: 'newest', label: 'جدیدترین' },
  { id: 'cheapest', label: 'ارزان‌ترین' },
  { id: 'expensive', label: 'گران‌ترین' },
] as const;

export default function ProductSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = (searchParams.get('sort') as SortType) || 'popular';

  const handleSortChange = (sortKey: SortType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sortKey);
    params.delete('page');

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-x-6 md:gap-x-7 gap-y-3 py-1 select-none">
      <div className="flex items-center gap-2 text-sm md:text-base font-bold text-main">
        <span>مرتب‌سازی براساس:</span>
        <ArrowDownWideNarrow className="w-5 h-5 text-main stroke-[2.2]" />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 md:gap-x-6 gap-y-2">
        {SORT_OPTIONS.map((option) => {
          const isActive = currentSort === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSortChange(option.id)}
              className={`text-sm md:text-base font-bold transition-colors duration-200 cursor-pointer ${
                isActive
                  ? 'text-rose-500 hover:text-rose-600'
                  : 'text-main hover:opacity-80'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
