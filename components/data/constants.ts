export const contactUs = {
  name: "مینی‌ورس",
  englishName: "Mini Verse",
  description: "دنیایی کوچک از کتابخانه‌ها و دکورهای مینیاتوری؛ ساخته‌شده برای عاشقان جزئیات.",
  url: "https://miniverse.ir", 
  contact: {
    email: "mobina@gmail.com",
    phone: {
      display: "۰۹۳۶ ۴۳۰ ۵۴۴۳",
      href: "tel:+989364305443",
    },
    workingHours: "شنبه تا پنج‌شنبه، ۹ الی ۱۸",
  },

  socials: {
    instagram: "https://instagram.com/miniverse",
    telegram: "https://t.me/miniverse",
    whatsapp: "https://wa.me/989364305443",
  },
} as const;

export type contactUs = typeof contactUs;
