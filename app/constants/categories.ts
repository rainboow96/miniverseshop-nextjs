export interface CategoryItemData {
  readonly id: number;
  readonly title: string;
  readonly image: string;
  readonly slug: string;
}

export const CATEGORIES_DATA: readonly CategoryItemData[] = [
  {
    id: 1,
    title: "مینی کتابخونه کامل",
    image: "/images/categories/4.webp",
    slug: "/category/full-bookcase",
  },
  {
    id: 2,
    title: "مینی دکوری ها",
    image: "/images/categories/3.webp",
    slug: "/category/decor",
  },
  {
    id: 3,
    title: "مینی کتاب",
    image: "/images/categories/2.webp",
    slug: "/category/book",
  },
  {
    id: 4,
    title: "مینی کتابخونه",
    image: "/images/categories/1.webp",
    slug: "/category/bookcase",
  },
] as const;
