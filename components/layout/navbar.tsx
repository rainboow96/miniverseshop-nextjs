import Image from "next/image";
import Link from "next/link";
import Container from "../ui/container";
import { MobileMenu } from "./mobile-menu";
import { navLinks } from "../data/navigation";
import { AuthButton } from "../layout/auth-button";
import MiniCart from "../cart/miniCart";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-[100] border-b border-white/20 bg-white/45 backdrop-blur-[20px] backdrop-saturate-[180%]">
      <Container size="wide" className="px-6 lg:px-10">
        <div className="relative flex h-16 items-center justify-between gap-4 lg:h-20">
          
          <MobileMenu />

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <Link href="/">
              <Image
                src="/images/Logo.svg"
                alt="Miniverse Logo"
                width={96}
                height={40}
                className="h-auto w-20 lg:w-24"
                priority
              />
            </Link>
          </div>

          <ul className="hidden items-center gap-8 font-sans font-bold text-main lg:flex">
            {navLinks.map((link) => (
              <li key={link.id} className="whitespace-nowrap">
                <Link
                  href={link.href}
                  className="transition-colors hover:text-primary-hover"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 lg:flex">
            <MiniCart />

            <AuthButton />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <MiniCart />

            <AuthButton isMobile />
          </div>

        </div>
      </Container>
    </nav>
  );
}
