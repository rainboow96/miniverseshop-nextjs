"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

interface ImageModalProps {
  imageUrl: string;
  altText: string;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  showNavButtons?: boolean;
}

export default function ImageModal({
  imageUrl,
  altText,
  onClose,
  onPrevious,
  onNext,
  showNavButtons = true,
}: ImageModalProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (showNavButtons && (event.key === "ArrowLeft" || event.key === "ArrowDown")) {
        onNext();
      } else if (showNavButtons && (event.key === "ArrowRight" || event.key === "ArrowUp")) {
        onPrevious();
      }
    },
    [onClose, onNext, onPrevious, showNavButtons]
  );

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="بزرگ‌نمایی تصویر محصول"
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md transition-all duration-300 animate-in fade-in"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="بستن پنجره"
        className="absolute top-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-[#b5be9b]"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="relative flex h-[82vh] w-full max-w-5xl items-center justify-center">
        <div className="relative h-full w-full overflow-hidden rounded-3xl">
          <Image
            src={imageUrl}
            alt={altText}
            fill
            sizes="(max-width: 1280px) 90vw, 1200px"
            className="select-none object-contain transition-transform duration-200"
            priority
            draggable={false}
          />
        </div>

        {showNavButtons && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              aria-label="تصویر قبلی"
              className="absolute -right-2 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-main text-white shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-[#b5be9b] sm:-right-6"
            >
              <ChevronRight className="h-7 w-7" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="تصویر بعدی"
              className="absolute -left-2 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-main text-white shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-[#b5be9b] sm:-left-6"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
