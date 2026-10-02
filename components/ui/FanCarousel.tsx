"use client";

import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
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
  { min: 0, cardWidth: 110, cardHeight: 150, gap: 110, curve: 65, maxRotate: 18 },
  { min: 480, cardWidth: 140, cardHeight: 190, gap: 145, curve: 95, maxRotate: 20 },
  { min: 768, cardWidth: 180, cardHeight: 250, gap: 190, curve: 130, maxRotate: 22 },
] as const;

function resolveConfig(width: number): BreakpointConfig {
  if (width >= 768) return BREAKPOINTS[2];
  if (width >= 480) return BREAKPOINTS[1];
  return BREAKPOINTS[0];
}

export interface FanCarouselProps {
  readonly images?: readonly string[];
  readonly count?: number;
  readonly speed?: number;
  readonly className?: string;
}

export default function FanCarousel({
  images = [],
  count = 6,
  speed = 0.025,
  className = "",
}: FanCarouselProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const stageWidthRef = useRef<number>(360);

  const baseItems = images.length > 0 ? images : Array.from({ length: count }, () => "");
  
  const displayItems = React.useMemo(() => {
    if (baseItems.length === 0) return [];
    let list = [...baseItems];
    while (list.length < 12) {
      list = [...list, ...baseItems];
    }
    return list;
  }, [baseItems]);

  const totalItems = displayItems.length;

  const [config, setConfig] = useState<BreakpointConfig>(BREAKPOINTS[0]);
  const configRef = useRef<BreakpointConfig>(BREAKPOINTS[0]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const w = stage?.clientWidth || window.innerWidth || 360;
    stageWidthRef.current = w;
    const nextConfig = resolveConfig(w);
    configRef.current = nextConfig;
    setConfig(nextConfig);

    const { gap, curve, maxRotate } = nextConfig;
    const totalWidth = gap * totalItems;
    const halfStageW = w / 2;

    for (let i = 0; i < totalItems; i++) {
      let rawPos = (i * gap) % totalWidth;
      if (rawPos < -totalWidth / 2) rawPos += totalWidth;
      if (rawPos > totalWidth / 2) rawPos -= totalWidth;

      const normalizedDist = Math.max(-1, Math.min(1, rawPos / (halfStageW + 40)));
      const posY = curve * (normalizedDist * normalizedDist);
      const rotateZ = normalizedDist * maxRotate;
      const scale = Math.max(0.7, 1 - Math.abs(normalizedDist) * 0.28);
      const opacity = Math.max(0.25, 1 - Math.abs(normalizedDist) * 0.55);

      const el = itemsRef.current[i];
      if (el) {
        el.style.transform = `translate3d(${rawPos}px, ${-posY}px, 0) rotate(${rotateZ}deg) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${100 - Math.round(Math.abs(rawPos))}`;
      }
    }
  }, [totalItems]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const width = entry.contentRect.width;
      stageWidthRef.current = width;
      const nextConfig = resolveConfig(width);
      configRef.current = nextConfig;
      setConfig(nextConfig);
    });

    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || totalItems === 0) return;

    let offset = 0;
    let isDragging = false;
    let isPaused = false;
    let dragStartX = 0;
    let dragStartOffset = 0;
    let velocity = 0;
    let lastX = 0;
    let lastTime = performance.now();
    let resumeTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let animationFrameId: number | null = null;

    const layout = () => {
      const { gap, curve, maxRotate } = configRef.current;
      const totalWidth = gap * totalItems;
      const halfStageW = (stageWidthRef.current || 360) / 2;

      for (let i = 0; i < totalItems; i++) {
        let rawPos = (i * gap - offset) % totalWidth;
        if (rawPos < -totalWidth / 2) rawPos += totalWidth;
        if (rawPos > totalWidth / 2) rawPos -= totalWidth;

        const normalizedDist = Math.max(-1, Math.min(1, rawPos / (halfStageW + 40)));
        const posY = curve * (normalizedDist * normalizedDist);
        const rotateZ = normalizedDist * maxRotate;
        const scale = Math.max(0.7, 1 - Math.abs(normalizedDist) * 0.28);
        const opacity = Math.max(0.25, 1 - Math.abs(normalizedDist) * 0.55);

        const el = itemsRef.current[i];
        if (!el) continue;

        el.style.transform = `translate3d(${rawPos}px, ${-posY}px, 0) rotate(${rotateZ}deg) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${100 - Math.round(Math.abs(rawPos))}`;
      }
    };

    const tick = (timestamp: number) => {
      const deltaTime = Math.min(timestamp - lastTime, 32); 
      lastTime = timestamp;

      if (!isDragging && !isPaused) {
        offset += speed * deltaTime;
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

      let inertia = -velocity * 1.1;
      const applyFriction = () => {
        if (Math.abs(inertia) < 0.05) {
          resumeTimeoutId = setTimeout(() => {
            isPaused = false;
          }, 300);
          return;
        }
        offset += inertia;
        inertia *= 0.92;
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

    stage.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

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
    };
  }, [totalItems, speed]);

  const { cardWidth, cardHeight, curve } = config;
  const stageHeight = cardHeight + curve + 20;
  const trackTop = stageHeight - cardHeight / 2 - 10;

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
        {displayItems.map((imgSrc, index) => (
          <div
            key={index}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className="absolute overflow-hidden rounded-2xl bg-[#E9DEC5] shadow-[0_12px_24px_-8px_rgba(0,0,0,0.25)] ring-1 ring-black/5 will-change-transform"
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
                  alt={`کتابخانه مینیاتوری ${index + 1}`}
                  fill
                  sizes="(max-width: 480px) 120px, (max-width: 768px) 150px, 190px"
                  priority={index < 5}
                  loading="eager"
                  quality={75}
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
        ))}
      </div>
    </div>
  );
}
