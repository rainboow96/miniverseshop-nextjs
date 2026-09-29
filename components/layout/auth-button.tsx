"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, ShoppingBag, LogOut, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface AuthButtonProps {
  isMobile?: boolean;
}

export function AuthButton({ isMobile = false }: AuthButtonProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center p-2">
        <Loader2 className="h-4 w-4 animate-spin text-main/50" />
      </div>
    );
  }

  if (session?.user) {
    const displayName = session.user.name || session.user.email || "حساب من";

    return (
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          {isMobile ? (
            <button
              type="button"
              className="p-1.5 text-main hover:text-primary-hover transition-colors"
              aria-label="حساب کاربری"
            >
              <User className="h-5 w-5 stroke-[1.8]" />
            </button>
          ) : (
            <Button
              variant="outline"
              className="flex items-center gap-2 border-main/30 text-main hover:bg-primary/20 text-xs font-bold"
            >
              <User className="h-4 w-4" />
              <span className="max-w-[120px] truncate">{displayName}</span>
            </Button>
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="end"
          sideOffset={10}
          className="w-48 bg-white border border-gray-200 shadow-xl"
        >
          <DropdownMenuLabel className="text-right text-xs font-bold text-gray-700 px-2 py-1.5 truncate">
            {displayName}
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="my-1 bg-gray-100" />

          <DropdownMenuItem asChild className="cursor-pointer text-xs rounded-lg hover:bg-gray-50 focus:bg-gray-50">
            <Link href="/orders" className="flex items-center gap-2 px-2 py-1.5 w-full text-gray-700">
              <ShoppingBag className="h-4 w-4 text-gray-500" />
              <span>سفارش‌های من</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1 bg-gray-100" />

          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
            className="cursor-pointer text-xs font-bold text-red-600 hover:bg-red-50 focus:bg-red-50 rounded-lg px-2 py-1.5 flex items-center gap-2"
          >
            <LogOut className="h-4 w-4 text-red-600" />
            <span>خروج از حساب</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (isMobile) {
    return (
      <Link
        href="/login"
        className="p-1.5 text-main hover:text-primary-hover transition-colors"
        aria-label="ورود به حساب"
      >
        <User className="h-5 w-5 stroke-[1.8]" />
      </Link>
    );
  }

  return (
    <Button asChild variant="outline" className="text-sm">
      <Link href="/login">ورود | ثبت‌نام</Link>
    </Button>
  );
}
