"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FallenMiniBook {
  id: number;
  title: string;
  coverBg: string;
  spineBorder: string;
  badgeColor: string;
  rotate: number;
  x: number;
  y: number;
  width: number;
  height: number;
  delay: number;
}

const fallenBooks: FallenMiniBook[] = [
  {
  id: 4,
  title: "برگ گمشده",
  coverBg: "bg-[#d4a373]", 
  spineBorder: "border-[#f4f1ea] bg-[#bb8654]",
  badgeColor: "bg-white/40",
  rotate: 93,  
  x: 108,
  y: 34,      
  width: 30,
  height: 102,
  delay: 0.35,
},
  {
    id: 2,
    title: "مینی‌ورس",
    coverBg: "bg-[#606c38]", // سبز زیتونی
    spineBorder: "border-[#a3b18a] bg-[#4f592d]",
    badgeColor: "bg-[#a3b18a]/30",
    rotate: 68,
    x: -30,
    y: 22,
    width: 28,
    height: 110,
    delay: 0.28,
  },


];

const shelfFloatAnim: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-3, 3, -3],
    transition: {
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function NotFound(): React.ReactElement {
  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#faf8f4] px-5 py-12 text-[#3b432a] selection:bg-[#d4a373] selection:text-white"
    >
      <div className="pointer-events-none absolute -top-32 right-1/4 h-[420px] w-[420px] rounded-full bg-[#94a378]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-[380px] w-[380px] rounded-full bg-[#dda15e]/15 blur-[100px]" />

      <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-right"
        >

          <span className="select-none text-8xl font-black leading-none tracking-tight text-main sm:text-9xl">
            ۴۰۴
          </span>

          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-main sm:text-3xl lg:text-4xl">
            متاسفانه صفحه مورد نظر شما یافت نشد
          </h1>

          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#606c38] sm:text-base">
            انگار کتابچه‌های این قفسه مینیاتوری بهم ریخته و صفحه مورد نظرتون از جاش افتاده یا هنوز ساخته نشده!
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button asChild variant="cart">
              <Link href="/">
                <Home className="h-4 w-4" />
                <span>مشاهده محصولات مینی‌ورس</span>
              </Link>
            </Button>

            <Button
              type="button"
              variant="cart"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.history.back();
                }
              }}
            >
              <RotateCcw className="h-4 w-4" />
              <span>بازگشت به صفحه قبل</span>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex flex-col items-center justify-center lg:col-span-6"
        >
          <div className="relative flex w-full max-w-md flex-col items-center">
            
            <motion.div
              variants={shelfFloatAnim}
              initial="initial"
              animate="animate"
              className="relative z-10 w-64 rounded-xl border-4 border-[#738258] bg-[#849466] p-2 shadow-2xl shadow-[#3b432a]/15"
            >
              <div className="absolute -top-3 left-1/2 h-3 w-56 -translate-x-1/2 rounded-t-md bg-[#6b7a50] shadow-sm" />

              <div className="flex flex-col gap-1.5">
                <div className="flex h-24 items-end justify-between rounded-t-lg bg-[#596640]/25 px-2.5 pb-1">
                  <div className="flex items-end gap-1">
                    <div className="h-16 w-5 rounded-sm bg-[#bc6c25] shadow-sm" />
                    <div className="h-20 w-6 rounded-sm bg-[#dda15e] shadow-sm" />
                    <div className="h-14 w-4 rounded-sm bg-[#d48c8c] shadow-sm" />
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex -space-x-1">
                      <div className="h-3.5 w-3 -rotate-12 rounded-full bg-[#386641] shadow-sm" />
                      <div className="h-4.5 w-3.5 rotate-6 rounded-full bg-[#2a4d31] shadow-sm" />
                      <div className="h-3.5 w-3 rotate-12 rounded-full bg-[#497d54] shadow-sm" />
                    </div>
                    <div className="h-6 w-6 rounded-b-md rounded-t-xs border-t-2 border-[#b06834] bg-[#bc6c25] shadow-sm" />
                  </div>
                </div>

                <div className="h-2.5 w-full bg-[#5f6d45] shadow-sm" />

                <div className="flex h-24 items-end justify-between bg-[#596640]/25 px-2.5 pb-1">
                  <div className="flex items-end gap-1">
                    <div className="h-18 w-5 rounded-sm bg-[#8c3f3f] shadow-sm" />
                    <motion.div
                      animate={{ rotate: [18, 23, 18] }}
                      transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                      className="h-16 w-5 origin-bottom-left cursor-pointer rounded-sm bg-[#dda15e] shadow-sm"
                      title="مراقب باش!"
                    />
                  </div>


                </div>

                <div className="h-3 w-full rounded-b-sm bg-[#525f3a] shadow-md" />
              </div>
            </motion.div>

            <div className="relative mt-6 flex h-28 w-full items-center justify-center">
              <div className="absolute bottom-2 h-1.5 w-60 rounded-full bg-[#3b432a]/10 blur-[2px]" />

              {fallenBooks.map((book) => (
                <motion.div
                  key={book.id}
                  initial={{
                    y: -100,
                    opacity: 0,
                    rotate: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    y: book.y,
                    opacity: 1,
                    rotate: book.rotate,
                    scale: 1,
                  }}
                  whileHover={{
                    scale: 1.12,
                    rotate: book.rotate + (book.rotate > 0 ? 5 : -5),
                    transition: { type: "spring", stiffness: 350 },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 11,
                    delay: book.delay,
                  }}
                  style={{
                    width: `${book.width}px`,
                    height: `${book.height}px`,
                    transform: `translateX(${book.x}px)`,
                  }}
                  className={`absolute bottom-3 flex cursor-pointer select-none flex-col justify-between rounded-sm border-l-2 p-1 shadow-md transition-shadow ${book.coverBg} ${book.spineBorder}`}
                >
                  <div className={`h-1 w-full rounded-xs ${book.badgeColor}`} />
                  <p className="origin-center rotate-90 truncate text-center text-[9px] font-bold tracking-tight text-white/95">
                    {book.title}
                  </p>
                  <div className="flex items-center justify-between px-0.5">
                    <div className="h-1 w-1 rounded-full bg-white/40" />
                    <div className="h-1 w-1 rounded-full bg-white/40" />
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </main>
  );
}