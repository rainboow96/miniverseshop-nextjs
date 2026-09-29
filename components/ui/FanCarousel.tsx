"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";

interface BreakpointConfig {
  readonly min: number;
  readonly cardWidth: number;
  readonly cardHeight: number;
  readonly gap: number;
  readonly curve: number;
  readonly maxRotate: number;
}

const BREAKPOINTS: readonly BreakpointConfig[] = [
  { min: 0, cardWidth: 108, cardHeight: 148, gap: 118, curve: 85, maxRotate: 20 },
  { min: 480, cardWidth: 140, cardHeight: 190, gap: 155, curve: 120, maxRotate: 22 },
  { min: 768, cardWidth: 190, cardHeight: 260, gap: 210, curve: 190, maxRotate: 22 },
] as const;

function resolveConfig(width: number): BreakpointConfig {
  let matchedConfig: BreakpointConfig = BREAKPOINTS[0];
  for (const bp of BREAKPOINTS) {
    if (width >= bp.min) {
      matchedConfig = bp;
    }
  }
  return matchedConfig;
}

export interface FanCarouselProps {
  /** آرایه‌ای از آدرس تصاویر که درون public قرار دارند */
  readonly images?: readonly string[];
  /** تعداد اسلایدهای رزرو در صورت نبود تصویر */
  readonly count?: number;
  /** سرعت انیمیشن حرکت خودکار */
  readonly speed?: number;
  readonly className?: string;
}

export default function FanCarousel({
  images = [],
  count = 8,
  speed = 0.035,
  className = "",
}: FanCarouselProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [, startTransition] = useTransition();

  const totalItems = images.length > 0 ? images.length : count;

  const [config, setConfig] = useState<BreakpointConfig>(BREAKPOINTS[BREAKPOINTS.length - 1]);
  const configRef = useRef<BreakpointConfig>(config);
  configRef.current = config;

  // هماهنگی ریسپانسیو با ResizeObserver
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const width = entry.contentRect.width;
      startTransition(() => {
        setConfig(resolveConfig(width));
      });
    });

    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  // موتور انیمیشن و مدیریت درگ و اینرسی (Inertia Physics)
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let offset = 0;
    let isDragging = false;
    let isPaused = false;
    let dragStartX = 0;
    let dragStartOffset = 0;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;
    let resumeTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let animationFrameId: number | null = null;

    const layout = () => {
      const { gap, curve, maxRotate } = configRef.current;
      const totalWidth = gap * totalItems;
      const stageW = stage.clientWidth || 800;
      const halfStageW = stageW / 2;

      for (let i = 0; i < totalItems; i++) {
        let pos = (i * gap - offset) % totalWidth;
        if (pos < -totalWidth / 2) pos += totalWidth;
        if (pos > totalWidth / 2) pos -= totalWidth;

        const normalizedDist = Math.max(-1, Math.min(1, pos / halfStageW));
        const posY = curve * (normalizedDist * normalizedDist);
        const rotateZ = normalizedDist * maxRotate;
        const scale = 1 - Math.abs(normalizedDist) * 0.35;
        const opacity = 1 - Math.abs(normalizedDist) * 0.55;

        const el = itemsRef.current[i];
        if (!el) continue;

        el.style.transform = `translate3d(${pos}px, ${-posY}px, 0) rotate(${rotateZ}deg) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${100 - Math.round(Math.abs(pos))}`;
      }
    };

    const tick = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      const { gap } = configRef.current;
      const effectiveSpeed = speed * (gap / 210);

      if (!isDragging && !isPaused) {
        offset += effectiveSpeed * deltaTime;
      }

      layout();
      animationFrameId = requestAnimationFrame(tick);
    };

    const handlePointerDown = (clientX: number) => {
      isDragging = true;
      isPaused = true;
      dragStartX = clientX;
      dragStartOffset = offset;
      velocity = 0;
      lastX = clientX;

      if (resumeTimeoutId) clearTimeout(resumeTimeoutId);
      stage.style.cursor = "grabbing";
    };

    const handlePointerMove = (clientX: number) => {
      if (!isDragging) return;
      const deltaX = clientX - dragStartX;
      offset = dragStartOffset - deltaX;
      velocity = clientX - lastX;
      lastX = clientX;
    };

    const handlePointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      stage.style.cursor = "grab";

      let inertia = -velocity * 1.2;
      const applyFriction = () => {
        if (Math.abs(inertia) < 0.05) {
          resumeTimeoutId = setTimeout(() => {
            isPaused = false;
          }, 250);
          return;
        }
        offset += inertia;
        inertia *= 0.93;
        requestAnimationFrame(applyFriction);
      };

      applyFriction();
    };

    const onMouseDown = (e: MouseEvent) => handlePointerDown(e.clientX);
    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX);
    const onMouseUp = () => handlePointerUp();

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) handlePointerDown(touch.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) handlePointerMove(touch.clientX);
    };
    const onTouchEnd = () => handlePointerUp();
    const onResize = () => layout();

    stage.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);

    layout();
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      if (resumeTimeoutId) clearTimeout(resumeTimeoutId);

      stage.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      stage.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
    };
  }, [totalItems, speed]);

  const { cardWidth, cardHeight, curve } = config;
  const stageHeight = cardHeight + curve * 0.75 + 28;
  const trackTop = stageHeight - cardHeight / 2 - 14;

  return (
    <div
      ref={stageRef}
      dir="ltr"
      className={`relative w-full select-none touch-pan-y cursor-grab overflow-hidden bg-transparent ${className}`}
      style={{ height: `${stageHeight}px` }}
    >
      <div
        className="absolute left-1/2 h-0 w-0 pointer-events-none"
        style={{ top: `${trackTop}px` }}
      >
        {Array.from({ length: totalItems }).map((_, index) => {
          const imgSrc = images[index];

          return (
            <div
              key={index}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="absolute overflow-hidden rounded-2xl bg-stone-100 shadow-xl ring-1 ring-black/5 will-change-transform"
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                marginLeft: `${-cardWidth / 2}px`,
                marginTop: `${-cardHeight / 2}px`,
              }}
            >
              {imgSrc ? (
                <div className="relative h-full w-full">
                  <Image
                    src={imgSrc}
                    alt={`Hero slide ${index + 1}`}
                    fill
                    sizes="(max-width: 480px) 108px, (max-width: 768px) 140px, 190px"
                    priority={index < 2}
                    draggable={false}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-medium text-stone-400">
                  تصویر {index + 1}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
