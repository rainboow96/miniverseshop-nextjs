"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks } from "../data/navigation";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleLogin = () => {
    handleClose();
    router.push("/login");
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="p-1 text-main transition-colors hover:text-primary-hover"
        aria-label="باز کردن منو"
      >
        <Menu className="h-6 w-6 stroke-[1.8]" />
      </button>

      {mounted &&
        createPortal(
          <>
            <div
              onClick={handleClose}
              className={`fixed inset-0 z-[9999] bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            />

            <div
              id="mobile-drawer"
              className={`fixed inset-x-0 top-0 z-[10000] max-h-[85vh] overflow-y-auto rounded-b-2xl bg-white shadow-2xl transition-all duration-300 ease-out ${
                isOpen
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-full opacity-0"
              }`}
            >
              <div className="p-5 pt-6">
                <div className="mb-4 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="p-1 text-main transition-colors hover:text-primary-hover"
                    aria-label="بستن منو"
                  >
                    <X className="h-6 w-6 stroke-[1.8]" />
                  </button>
                </div>

                <ul className="flex flex-col gap-1 font-bold text-main">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        onClick={handleClose}
                        className="block rounded-xl px-4 py-3 transition-colors hover:bg-zinc-100"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 border-t border-zinc-100 pt-5">
                  <Button
                    variant="outline"
                    className="w-full py-2.5 text-sm"
                    onClick={handleLogin}
                  >
                    ورود | ثبت‌نام
                  </Button>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
