'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadMoreButtonProps {
  currentLimit: number;
  step?: number;
}

export default function LoadMoreButton({ currentLimit, step = 9 }: LoadMoreButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleShowMore = () => {
    const params = new URLSearchParams(searchParams.toString());
    const nextLimit = currentLimit + step;
    params.set('limit', String(nextLimit));

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="mt-10 flex justify-center">
      <button
        type="button"
        onClick={handleShowMore}
        disabled={isPending}
        className="flex items-center gap-2 rounded-xl border-2 border-main px-6 py-3 text-sm font-bold text-main transition duration-200 hover:bg-main hover:text-white cursor-pointer disabled:opacity-60 md:px-8"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>در حال بارگذاری...</span>
          </>
        ) : (
          <span>مشاهده محصولات بیشتر</span>
        )}
      </button>
    </div>
  );
}
