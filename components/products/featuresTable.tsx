import { Layers } from "lucide-react";

export interface SpecificationItem {
  label: string;
  value?: string | number | null;
}

interface FeaturesTableProps {
  specs?: SpecificationItem[];
}

export default function FeaturesTable({ specs = [] }: FeaturesTableProps) {
  if (!specs || specs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Layers className="h-9 w-9 text-neutral-400 stroke-[1.5]" />
        <p className="mt-2 text-xs text-neutral-500 sm:text-sm">
          مشخصات فنی برای این محصول ثبت نشده است.
        </p>
      </div>
    );
  }

  return (
    <div
      role="table"
      aria-label="مشخصات و ویژگی‌های محصول"
      className="w-full overflow-hidden rounded-2xl border border-[#d9ddd0] text-right"
    >
      <div className="divide-y divide-[#d9ddd0]">
        {specs.map((spec, index) => {
          const displayValue =
            spec.value !== undefined && spec.value !== null && String(spec.value).trim() !== ""
              ? String(spec.value)
              : "—";

          return (
            <div
              key={`${spec.label}-${index}`}
              role="row"
              className="grid grid-cols-[85px_1fr] sm:grid-cols-[140px_1fr] md:grid-cols-[160px_1fr] items-stretch transition-colors"
            >
              <div
                role="rowheader"
                className="flex min-h-[44px] items-center justify-start bg-[#c2c9ad]/60 px-3 py-2 text-xs font-bold text-neutral-800 sm:px-4 sm:text-sm"
              >
                <span className="truncate">{spec.label}</span>
              </div>

              <div
                role="cell"
                className="flex min-h-[44px] items-center bg-[#eef0e8]/50 px-3 py-2 text-xs leading-relaxed text-neutral-700 sm:px-4 sm:text-sm"
              >
                <bdi className="block w-full break-words">{displayValue}</bdi>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
