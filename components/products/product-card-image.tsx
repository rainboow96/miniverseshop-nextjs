"use client";
// اینجا تصویر کارتا رو داریم. تعاملیه چون نیاز بود کلاینتی بشه جدا کردم
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ProductCardImageProps {
  images: string[];
  alt: string;
  priority?: boolean;
}

export function ProductCardImage({
  images,
  alt,
  priority = false,
}: ProductCardImageProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const validImages = images.length > 0 ? images : ["/placeholder.jpg"];
  const hasMultipleImages = validImages.length > 1;

  useEffect(() => {
    if (!isHovered || !hasMultipleImages) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setActiveImage(0);
      return;
    }

    intervalRef.current = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % validImages.length);
    }, 1200);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, hasMultipleImages, validImages.length]);

  return (
    <div
      className="relative aspect-square w-full overflow-hidden rounded-[12px] border border-[#37472F]/15 bg-[#E9DEC5] sm:rounded-[14px]"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.55) 1.5px, transparent 1.6px)",
        backgroundSize: "16px 16px",
      }}
      onMouseEnter={() => hasMultipleImages && setIsHovered(true)}
      onMouseLeave={() => hasMultipleImages && setIsHovered(false)}
    >
      {validImages.map((src, index) => {
        const isActive = activeImage === index;
        return (
          <Image
            key={`${src}-${index}`}
            src={src}
            alt={`${alt} - تصویر ${index + 1}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 270px"
            priority={priority && index === 0}
            quality={75}
            draggable={false}
            className={`object-cover transition-opacity duration-500 ease-in-out ${
              isActive ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          />
        );
      })}

      {hasMultipleImages && (
        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#37472F]/50 px-2 py-1 backdrop-blur-sm sm:bottom-3 sm:gap-1.5 sm:px-2.5">
          {validImages.map((_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeImage === index
                  ? "w-3.5 bg-[#E3BE7C]"
                  : "w-1.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}