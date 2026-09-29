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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isHovered || images.length <= 1) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setActiveImage(0);
      return;
    }

    intervalRef.current = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 1100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, images.length]);

  return (
    <div
      className="relative aspect-square w-full overflow-hidden rounded-[12px] border border-[#37472F]/15 sm:rounded-[14px]"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.55) 1.5px, transparent 1.6px)",
        backgroundSize: "16px 16px",
        backgroundColor: "#E9DEC5",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={images[activeImage] || "/placeholder.jpg"}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, 270px"
        priority={priority}
        className="object-cover transition-opacity duration-300"
      />

      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-[#37472F]/40 px-2.5 py-1 backdrop-blur-sm sm:bottom-3 sm:gap-2 sm:px-3">
          {images.map((_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeImage === index ? "w-3 bg-[#E3BE7C]" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
