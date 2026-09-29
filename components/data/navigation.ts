export interface NavItem {
  id: number;
  title: string;
  href: string;
}
//for header
export const navLinks: readonly NavItem[] = [
  { id: 1, title: "صفحه اصلی", href: "/" },
  { id: 2, title: "محصولات", href: "/products" },
  { id: 3, title: "ارتباط با ما", href: "/contact" },
  { id: 4, title: "درباره ما", href: "/about" },
  { id: 5, title: "سوالات متداول", href: "/faq" },
] as const;

//for footer
export const supportLinks: readonly NavItem[] = [
  { id: 1, title: "قوانین مرجوعی", href: "/faq" },
  { id: 2, title: "پیگیری سفارش", href: "/order-tracking" },
] as const;
