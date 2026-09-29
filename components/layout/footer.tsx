import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Clock } from "lucide-react";

import Container from "@/components/ui/container";
import { navLinks, supportLinks, type NavItem } from "@/components/data/navigation";
import { contactUs } from "@/components/data/constants"; 

function FooterLinkList({ title, links }: { title: string; links: readonly NavItem[] }) {
  return (
    <nav aria-label={title}>
      <h3 className="text-sm font-bold text-main">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              className="text-main/80 transition-colors duration-200 hover:text-white"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="mt-10 bg-secondary text-main">
      <Container size="wide">
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" aria-label="صفحه اصلی مینی‌ورس">
              <Image
                src="/images/Logo.svg"
                alt="Miniverse Logo"
                width={96}
                height={40}
                className="h-auto w-20 lg:w-24"
                priority
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-7 text-main/80">
              {contactUs.description}
            </p>
          </div>

          <FooterLinkList title="دسترسی سریع" links={navLinks} />

          <FooterLinkList title="پشتیبانی" links={supportLinks} />

          <div>
            <h3 className="text-sm font-bold text-main">ارتباط با ما</h3>
            <ul className="mt-5 space-y-3 text-sm text-main/80">
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-main/60" aria-hidden="true" />
                <span>{contactUs.contact.workingHours}</span>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-main/60" aria-hidden="true" />
                <a
                  href={contactUs.contact.phone.href}
                  dir="ltr"
                  className="transition-colors hover:text-white"
                >
                  {contactUs.contact.phone.display}
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-main/60" aria-hidden="true" />
                <a
                  href={`mailto:${contactUs.contact.email}`}
                  dir="ltr"
                  className="transition-colors hover:text-white"
                >
                  {contactUs.contact.email}
                </a>
              </li>

              <li>
                <a
                  href={contactUs.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 shrink-0 text-main/60"
                    aria-hidden="true"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>اینستاگرام مینی‌ورس</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-main/10 py-5 text-xs text-main/70 sm:text-sm">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p>
              © {new Date().getFullYear()} — کلیه حقوق مادی و معنوی سایت برای {contactUs.name} محفوظ است.
            </p>

            <p dir="ltr" className="text-xs tracking-wider">
              Designed &amp; Built by <span className="font-semibold text-main">Rainbow</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
