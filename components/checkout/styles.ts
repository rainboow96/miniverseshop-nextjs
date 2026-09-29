export const labelClass =
  "mb-1.5 block text-right text-xs font-bold text-gray-700";

export const errorClass =
  "mt-1 text-right text-[11px] font-bold text-red-500";

export function inputClass(hasError?: boolean): string {
  return [
    "w-full rounded-md border bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition",
    "focus:ring-1 disabled:cursor-not-allowed disabled:bg-gray-100",
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
      : "border-gray-200 focus:border-main focus:ring-main/20",
  ].join(" ");
}
