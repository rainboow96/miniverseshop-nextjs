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
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <Layers className="h-10 w-10 text-neutral-400 stroke-[1.5]" />
        <p className="mt-2 text-sm text-neutral-500">
          مشخصات فنی برای این محصول ثبت نشده است.
        </p>
      </div>
    );
  }

  return (
    <div
      role="table"
      aria-label="مشخصات و ویژگی‌های محصول"
      className="w-full overflow-hidden rounded-2xl border border-[#d9ddd0] text-right shadow-xs"
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
              className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] items-stretch transition-colors duration-150"
            >
              <div
                role="rowheader"
                className="flex min-h-12 items-center justify-start bg-[#c2c9ad]/60 px-4 text-xs font-semibold text-neutral-800 sm:text-sm"
              >
                {spec.label}
              </div>

              <div
                role="cell"
                className="flex min-h-12 items-center bg-[#eef0e8]/50 px-4 text-xs text-neutral-700 sm:text-sm"
              >
                {displayValue}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
