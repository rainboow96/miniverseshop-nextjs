import type { Metadata } from "next";
import type { ComponentType, SVGProps } from "react";
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

export const metadata: Metadata = {
  title: "ارتباط با ما | مینی‌ورس",
  description: `راه‌های ارتباطی و پشتیبانی فروشگاه ${contactUs.name}`,
};

interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  isExternal: boolean;
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface BreadcrumbItem {
  label: string;
  to?: string;
}

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "خانه", to: "/" },
  { label: "ارتباط با ما" },
];

export default function ContactPage() {
  const contactChannels: readonly ContactChannel[] = [
    {
      id: "phone",
      label: "تلفن پشتیبانی",
      value: contactUs.contact.phone.display,
      href: contactUs.contact.phone.href,
      icon: Phone,
      isExternal: false,
    },
    {
      id: "email",
      label: "پست الکترونیک",
      value: contactUs.contact.email,
      href: `mailto:${contactUs.contact.email}`,
      icon: Mail,
      isExternal: false,
    },
    {
      id: "instagram",
      label: "اینستاگرام",
      value: contactUs.socials.instagram.replace(/^https?:\/\//, ""),
      href: contactUs.socials.instagram,
      icon: InstagramIcon,
      isExternal: true,
    },
    {
      id: "telegram",
      label: "تلگرام",
      value: contactUs.socials.telegram.replace(/^https?:\/\//, ""),
      href: contactUs.socials.telegram,
      icon: Send,
      isExternal: true,
    },
    {
      id: "whatsapp",
      label: "واتساپ",
      value: contactUs.socials.whatsapp.replace(/^https?:\/\//, ""),
      href: contactUs.socials.whatsapp,
      icon: MessageCircle,
      isExternal: true,
    },
  ];

  return (
    <Container className="px-4 py-6 md:py-8">
      <Breadcrumb items={breadcrumbItems} />

      <main className="mx-auto mt-6 max-w-2xl">
        <header className="mb-6 text-center md:mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            تماس با ما
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            راه‌های ارتباطی با {contactUs.name}
          </p>
        </header>

        <section aria-label="پل‌های ارتباطی">
          <ul className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
            {contactChannels.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.id}
                  className="group flex items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-muted/30 md:px-6 md:py-4.5"
                >
                  {/* لیبل و آیکون یکپارچه در موبایل و دسکتاپ */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-main/10 text-main transition-transform group-hover:scale-105 md:h-10 md:w-10">
                      <Icon className="h-4.5 w-4.5 md:h-5 md:w-5" />
                    </div>
                    <span className="truncate text-xs font-semibold text-foreground sm:text-sm md:text-base">
                      {item.label}
                    </span>
                  </div>

                  {/* مقدار لینک با همان فونت عمومی پروژه و بدون افتادن در مونو تایپ موبایل */}
                  <div className="flex min-w-0 shrink items-center justify-end">
                    <a
                      href={item.href}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex max-w-full items-center gap-1.5 text-xs font-medium text-main transition-opacity hover:opacity-80 sm:text-sm md:text-base"
                    >
                      <bdi className="truncate select-all">
                        {item.value}
                      </bdi>
                      {item.isExternal && (
                        <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-60" />
                      )}
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </Container>
  );
}
