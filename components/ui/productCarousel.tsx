"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductCarouselProps {
  children: React.ReactNode;
  itemCount: number;
}

export default function ProductCarousel({ children, itemCount }: ProductCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  if (itemCount === 0) return null;

  return (
    <Carousel
      opts={{
        align: "start",
        direction: "rtl",
        loop: itemCount > 2,
        skipSnaps: false,
        dragFree: false,
      }}
      plugins={[plugin.current]}
      className="w-full"
    >
      <CarouselContent className="-mr-2 -ml-2 md:-mr-4 md:-ml-4">
        {React.Children.map(children, (child, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 pr-2 pl-2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 md:pr-4 md:pl-4"
          >
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex -right-4 lg:-right-6 bg-white/90 hover:bg-white text-stone-700 shadow-md" />
      <CarouselNext className="hidden sm:flex -left-4 lg:-left-6 bg-white/90 hover:bg-white text-stone-700 shadow-md" />
    </Carousel>
  );
}
