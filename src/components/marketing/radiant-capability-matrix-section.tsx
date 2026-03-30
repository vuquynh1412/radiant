"use client";

import Image from "next/image";
import {
  useEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

import type { CapabilityMatrixSlotKey } from "@/content/capability-matrix-images";

import type {
  RadiantExperienceContent,
  RadiantExperienceRefs,
} from "./radiant-experience.types";

type RadiantCapabilityMatrixSectionProps = {
  content: RadiantExperienceContent;
  capabilityMatrixSectionRef: RadiantExperienceRefs["capabilityMatrixSectionRef"];
  capabilityMatrixContentRef: RadiantExperienceRefs["capabilityMatrixContentRef"];
  capabilityMatrixTopTickerRef: RadiantExperienceRefs["capabilityMatrixTopTickerRef"];
  capabilityMatrixBottomTickerRef: RadiantExperienceRefs["capabilityMatrixBottomTickerRef"];
};

type RotatingImageSlotProps = {
  altLabel: string;
  className?: string;
  delayMs?: number;
  images: string[];
  isActive?: boolean;
  priority?: boolean;
};

const tickerRepeatCount = 8;
const desktopMediaQuery = "(min-width: 768px)";
const supportsIntersectionObserver =
  typeof IntersectionObserver !== "undefined";
const desktopRowHeight = "clamp(9.5rem, 16.5vh, 12rem)";

function subscribeToDesktopBreakpoint(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(desktopMediaQuery);

  mediaQuery.addEventListener("change", onStoreChange);

  return () => {
    mediaQuery.removeEventListener("change", onStoreChange);
  };
}

function getDesktopBreakpointSnapshot() {
  return window.matchMedia(desktopMediaQuery).matches;
}

function RadiantSparkIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 0L22.8 15.2L38 19L22.8 22.8L19 38L15.2 22.8L0 19L15.2 15.2L19 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PatternTicker({
  label,
  trackRef,
}: {
  label: string;
  trackRef: RadiantExperienceRefs["capabilityMatrixTopTickerRef"];
}) {
  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex w-max items-center gap-3 whitespace-nowrap will-change-transform md:gap-4"
      >
        {Array.from({ length: tickerRepeatCount * 2 }).map((_, index) => (
          <div key={`${label}-${index}`} className="flex items-center gap-3 md:gap-4">
            <span className="font-heading text-[clamp(2.15rem,3.95vw,3.75rem)] leading-none tracking-[0.03em] text-[#8C5725]/80">
              {label}
            </span>
            <RadiantSparkIcon className="size-4 text-[#8C5725]/80 md:size-5 lg:size-[2.35rem]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function RotatingImageSlot({
  altLabel,
  className,
  delayMs = 0,
  images,
  isActive = true,
  priority = false,
}: RotatingImageSlotProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isActive || images.length <= 1) {
      return undefined;
    }

    const advance = () => {
      setActiveIndex((current) => (current + 1) % images.length);
    };

    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      advance();
      intervalId = window.setInterval(advance, 3000);
    }, 3000 + delayMs);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [delayMs, images, isActive]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[0.95rem] bg-[#d4ccc2] shadow-[0_18px_48px_-34px_rgba(20,15,11,0.35)]",
        className,
      )}
    >
      {images.map((image, index) => (
        <Image
          key={`${image}-${index}`}
          alt={`${altLabel} ${index + 1}`}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out",
            index === activeIndex
              ? "scale-100 opacity-100"
              : "scale-[1.035] opacity-0",
          )}
          fill
          loading={priority && index === 0 ? "eager" : "lazy"}
          priority={priority && index === 0}
          sizes="(min-width: 1280px) 272px, (min-width: 768px) 24vw, 100vw"
          src={image}
          unoptimized
        />
      ))}
    </div>
  );
}

function MobileMatrix({
  altLabel,
  imageSlots,
  isActive,
  rows,
}: {
  altLabel: string;
  imageSlots: RadiantExperienceContent["capabilityMatrix"]["imageSlots"];
  isActive: boolean;
  rows: RadiantExperienceContent["capabilityMatrix"]["rows"];
}) {
  const mobileRows: Array<{
    key: string;
    label: string;
    slots: CapabilityMatrixSlotKey[];
  }> = [
    { key: "branding", label: rows.branding, slots: ["slotA", "slotB"] },
    { key: "marketing", label: rows.marketing, slots: ["slotC"] },
    { key: "socials", label: rows.socials, slots: ["slotD"] },
    { key: "storytelling", label: rows.storytelling, slots: ["slotE"] },
  ];

  return (
    <div className="grid gap-6 md:hidden">
      {mobileRows.map((row, rowIndex) => (
        <div
          key={row.key}
          className="grid gap-4 border-t border-[#d4c4b5]/75 pt-5 first:border-t-0 first:pt-0"
        >
          <p className="font-inika text-[clamp(2.4rem,9vw,3.8rem)] font-bold leading-none tracking-[0em] text-[#8C5725]/20">
            {row.label}
          </p>
          <div
            className={cn(
              "grid gap-3",
              row.slots.length > 1 ? "grid-cols-2" : "grid-cols-1",
            )}
          >
            {row.slots.map((slotKey, slotIndex) => (
              <RotatingImageSlot
                key={slotKey}
                altLabel={altLabel}
                className="aspect-[2.8/1]"
                delayMs={(rowIndex * 240) + slotIndex * 180}
                images={imageSlots[slotKey]}
                isActive={isActive}
                priority={rowIndex === 0 && slotIndex === 0}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DesktopRowFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-h-0 flex-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

function DesktopMatrix({
  altLabel,
  imageSlots,
  isActive,
  rows,
}: {
  altLabel: string;
  imageSlots: RadiantExperienceContent["capabilityMatrix"]["imageSlots"];
  isActive: boolean;
  rows: RadiantExperienceContent["capabilityMatrix"]["rows"];
}) {
  const labelClassName =
    "inline-block w-max font-inika font-bold leading-[0.9] tracking-[0em] whitespace-nowrap text-[#8C5725]/28";
  const labelStyle: CSSProperties = {
    fontSize: `calc(${desktopRowHeight} * 0.66)`,
  };

  return (
    <div className="flex min-h-[clamp(31rem,58vh,36.5rem)] flex-1 flex-col justify-center gap-3">
      <DesktopRowFrame
        className="grid h-[clamp(9.5rem,16.5vh,12rem)] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 md:gap-5 lg:gap-6"
      >
        <div className="min-w-0 h-full">
          <RotatingImageSlot
            altLabel={altLabel}
            className="h-full w-full"
            delayMs={0}
            images={imageSlots.slotA}
            isActive={isActive}
            priority
          />
        </div>
        <div className="flex items-center justify-center">
          <p className={labelClassName} style={labelStyle}>
            {rows.branding}
          </p>
        </div>
        <div className="min-w-0 h-full">
          <RotatingImageSlot
            altLabel={altLabel}
            className="h-full w-full"
            delayMs={180}
            images={imageSlots.slotB}
            isActive={isActive}
          />
        </div>
      </DesktopRowFrame>

      <DesktopRowFrame
        className="grid h-[clamp(9.5rem,16.5vh,12rem)] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-t border-[#d7c5b4] pt-3 md:gap-5 lg:gap-6"
      >
        <div className="flex items-center justify-start">
          <p className={labelClassName} style={labelStyle}>
            {rows.marketing}
          </p>
        </div>
        <div className="min-w-0 h-full">
          <RotatingImageSlot
            altLabel={altLabel}
            className="h-full w-full"
            delayMs={360}
            images={imageSlots.slotC}
            isActive={isActive}
          />
        </div>
        <div className="flex items-center justify-end">
          <p className={labelClassName} style={labelStyle}>
            {rows.socials}
          </p>
        </div>
      </DesktopRowFrame>

      <DesktopRowFrame
        className="grid h-[clamp(9.5rem,16.5vh,12rem)] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 border-t border-[#d7c5b4] pt-3 md:gap-5 lg:gap-6"
      >
        <div className="min-w-0 h-full">
          <RotatingImageSlot
            altLabel={altLabel}
            className="h-full w-full"
            delayMs={540}
            images={imageSlots.slotD}
            isActive={isActive}
          />
        </div>
        <div className="flex items-center justify-center">
          <p className={labelClassName} style={labelStyle}>
            {rows.storytelling}
          </p>
        </div>
        <div className="min-w-0 h-full">
          <RotatingImageSlot
            altLabel={altLabel}
            className="h-full w-full"
            delayMs={720}
            images={imageSlots.slotE}
            isActive={isActive}
          />
        </div>
      </DesktopRowFrame>
    </div>
  );
}

export function RadiantCapabilityMatrixSection({
  content,
  capabilityMatrixSectionRef,
  capabilityMatrixContentRef,
  capabilityMatrixTopTickerRef,
  capabilityMatrixBottomTickerRef,
}: RadiantCapabilityMatrixSectionProps) {
  const matrix = content.capabilityMatrix;
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopBreakpoint,
    getDesktopBreakpointSnapshot,
    () => false,
  );
  const [isSectionActive, setIsSectionActive] = useState(
    !supportsIntersectionObserver,
  );

  useEffect(() => {
    const section = capabilityMatrixSectionRef.current;

    if (!section || !supportsIntersectionObserver) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionActive(entry.isIntersecting);
      },
      {
        rootMargin: "20% 0px",
        threshold: 0.1,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [capabilityMatrixSectionRef]);

  return (
    <section
      ref={capabilityMatrixSectionRef}
      className="relative z-20 min-h-svh overflow-hidden bg-[#e9ddd1] py-6 md:py-8 lg:py-10"
    >
      <div className="flex min-h-[calc(100svh-3rem)] flex-col justify-center gap-6">
        <PatternTicker
          label={matrix.topTickerLabel}
          trackRef={capabilityMatrixTopTickerRef}
        />

        <div
          ref={capabilityMatrixContentRef}
          className="site-gutter mx-auto flex w-full max-w-[96rem] flex-1 items-stretch"
        >
          <div className="flex w-full flex-1 self-stretch flex-col gap-3">
            <div className="mb-6 md:hidden">
              <p className="text-[0.72rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                {matrix.eyebrow}
              </p>
            </div>

            {isDesktop ? (
              <DesktopMatrix
                altLabel={matrix.slotAltLabel}
                imageSlots={matrix.imageSlots}
                isActive={isSectionActive}
                rows={matrix.rows}
              />
            ) : (
              <MobileMatrix
                altLabel={matrix.slotAltLabel}
                imageSlots={matrix.imageSlots}
                isActive={isSectionActive}
                rows={matrix.rows}
              />
            )}
          </div>
        </div>

        <PatternTicker
          label={matrix.bottomTickerLabel}
          trackRef={capabilityMatrixBottomTickerRef}
        />
      </div>
    </section>
  );
}
