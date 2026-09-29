"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ImageModal from "@/components/products/imageModal";

interface ProductGalleryProps {
  images?: string[];
  productTitle: string;
}

export default function ProductGallery({
  images = [],
  productTitle,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedImage = images[selectedIndex];

  function navigate(
    direction: "prev" | "next",
    setter: React.Dispatch<React.SetStateAction<number>>
  ) {
    setter((i) =>
      direction === "prev"
        ? i === 0
          ? images.length - 1
          : i - 1
        : i === images.length - 1
        ? 0
        : i + 1
    );
  }

  function openModal() {
    if (!selectedImage) return;
    setModalIndex(selectedIndex);
    setIsModalOpen(true);
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="relative h-[380px] w-full overflow-hidden rounded-[24px] border border-[#e8ece3] bg-white p-4 shadow-sm sm:h-[420px]">
        {selectedImage ? (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(28px) saturate(1.1) brightness(1.02)",
                transform: "scale(1.15)",
              }}
            />
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xs" />

            <button
              type="button"
              onClick={openModal}
              aria-label="نمایش بزرگ تصویر محصول"
              className="relative z-10 flex h-full w-full cursor-zoom-in items-center justify-center focus:outline-none"
            >
              <Image
                src={selectedImage}
                alt={productTitle}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-contain p-3 transition-transform duration-300 hover:scale-105"
                draggable={false}
              />
            </button>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm font-medium text-neutral-500">تصویری موجود نیست</p>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="flex items-center justify-between gap-3 px-1">
          {images.length > 1 && (
            <button
              type="button"
              onClick={() => navigate("prev", setSelectedIndex)}
              aria-label="تصویر قبلی"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d9ddd0] bg-white text-main shadow-xs transition-all hover:border-main hover:bg-[#f4f6f0] focus:outline-none focus:ring-2 focus:ring-main/20"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          <div className="flex flex-1 justify-center gap-2.5 overflow-x-auto py-1">
            {images.slice(0, 5).map((image, index) => {
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`نمایش تصویر ${index + 1}`}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-[14px] border bg-white p-1 transition-all duration-200 md:h-20 md:w-20 focus:outline-none ${
                    isSelected
                      ? "border-main ring-2 ring-main/30 shadow-xs"
                      : "border-[#e0e4d7] hover:border-main/50"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${productTitle} - تصویر ${index + 1}`}
                    fill
                    sizes="80px"
                    className="rounded-[10px] object-cover"
                    draggable={false}
                  />
                </button>
              );
            })}
          </div>

          {images.length > 1 && (
            <button
              type="button"
              onClick={() => navigate("next", setSelectedIndex)}
              aria-label="تصویر بعدی"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d9ddd0] bg-white text-main shadow-xs transition-all hover:border-main hover:bg-[#f4f6f0] focus:outline-none focus:ring-2 focus:ring-main/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
        </div>
      )}

      {isModalOpen && images[modalIndex] && (
        <ImageModal
          imageUrl={images[modalIndex]}
          altText={productTitle}
          onClose={() => setIsModalOpen(false)}
          onPrevious={() => navigate("prev", setModalIndex)}
          onNext={() => navigate("next", setModalIndex)}
          showNavButtons={images.length > 1}
        />
      )}
    </div>
  );
}
