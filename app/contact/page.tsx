import { contactUs } from "@/components/data/constants";
import {
  Phone,
  Mail,
  Send,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import Breadcrumb from "@/components/ui/breadcrumb";
import Container from "@/components/ui/container";

export const metadata = {
  title: "ارتباط با ما | مینی‌ورس",
  description: `راه‌های ارتباطی و پشتیبانی فروشگاه ${contactUs.name}`,
};

function InstagramIcon({ className = "h-4.5 w-4.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function ContactPage() {
  const contactRows = [
    {
      label: "تلفن پشتیبانی",
      value: contactUs.contact.phone.display,
      href: contactUs.contact.phone.href,
      icon: Phone,
      isExternal: false,
    },
    {
      label: "پست الکترونیک",
      value: contactUs.contact.email,
      href: `mailto:${contactUs.contact.email}`,
      icon: Mail,
      isExternal: false,
    },
    {
      label: "اینستاگرام",
      value: contactUs.socials.instagram.replace("https://", ""),
      href: contactUs.socials.instagram,
      icon: InstagramIcon,
      isExternal: true,
    },
    {
      label: "تلگرام",
      value: contactUs.socials.telegram.replace("https://", ""),
      href: contactUs.socials.telegram,
      icon: Send,
      isExternal: true,
    },
    {
      label: "واتساپ",
      value: contactUs.socials.whatsapp.replace("https://", ""),
      href: contactUs.socials.whatsapp,
      icon: MessageCircle,
      isExternal: true,
    },
  ];

  const breadcrumbItems = [
    { label: "خانه", to: "/" },
    { label: "ارتباط با ما" },
  ];

  return (
    <Container >
      <Breadcrumb items={breadcrumbItems} />

      <main className="mx-auto max-w-3xl px-4 py-6 md:py-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
            تماس با ما
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            راه‌های ارتباطی با {contactUs.name}
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
          <table className="w-full border-collapse">
            <tbody className="divide-y divide-border/60">
              {contactRows.map((item, index) => {
                const Icon = item.icon;
                return (
                  <tr
                    key={index}
                    className="group hover:bg-muted/30 transition-colors duration-150"
                  >
                    <td className="py-4 px-4 md:px-6 align-middle text-right">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-main/10 text-main transition-transform group-hover:scale-105">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <span className="font-medium text-foreground text-sm md:text-base">
                          {item.label}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 md:px-6 align-middle text-left">
                      <div className="flex justify-end">
                        <a
                          href={item.href}
                          target={item.isExternal ? "_blank" : undefined}
                          rel={item.isExternal ? "noopener noreferrer" : undefined}
                          dir="ltr"
                          className="inline-flex items-center gap-1.5 font-medium text-main hover:opacity-80 transition-opacity text-sm md:text-base font-mono sm:font-sans"
                        >
                          <span className="truncate max-w-[220px] sm:max-w-none">
                            {item.value}
                          </span>
                          {item.isExternal && (
                            <ExternalLink className="h-3.5 w-3.5 opacity-60 shrink-0" />
                          )}
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </Container>
  );
}
