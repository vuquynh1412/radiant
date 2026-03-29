"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

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
};

const tickerRepeatCount = 8;

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
            <span className="font-heading text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-[-0.05em] text-black">
              {label}
            </span>
            <RadiantSparkIcon className="size-4 text-black md:size-5" />
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
}: RotatingImageSlotProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) {
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
  }, [delayMs, images]);

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
          loading="eager"
          priority={index === 0}
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
  rows,
}: {
  altLabel: string;
  imageSlots: RadiantExperienceContent["capabilityMatrix"]["imageSlots"];
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
          <p className="font-sans text-[clamp(2.4rem,9vw,3.8rem)] font-semibold leading-none tracking-[-0.08em] text-[#cfb8a1]/78">
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
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DesktopRowFrame({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-8 py-5 lg:gap-12 lg:py-6">{children}</div>;
}

export function RadiantCapabilityMatrixSection({
  content,
  capabilityMatrixSectionRef,
  capabilityMatrixContentRef,
  capabilityMatrixTopTickerRef,
  capabilityMatrixBottomTickerRef,
}: RadiantCapabilityMatrixSectionProps) {
  const matrix = content.capabilityMatrix;

  return (
    <section
      ref={capabilityMatrixSectionRef}
      className="relative z-20 overflow-hidden bg-[#e9ddd1] pb-16 pt-8 sm:pb-20 sm:pt-10 md:pb-24 md:pt-12 lg:pt-14"
    >
      <div className="space-y-6 md:space-y-8">
        <PatternTicker
          label={matrix.topTickerLabel}
          trackRef={capabilityMatrixTopTickerRef}
        />

        <div
          ref={capabilityMatrixContentRef}
          className="mx-auto max-w-[76rem] px-4 sm:px-6 lg:px-8"
        >
          <div className="mb-6 md:hidden">
            <p className="text-[0.72rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              {matrix.eyebrow}
            </p>
          </div>

          <MobileMatrix
            altLabel={matrix.slotAltLabel}
            imageSlots={matrix.imageSlots}
            rows={matrix.rows}
          />

          <div className="hidden divide-y divide-[#d4c4b5]/75 md:block">
            <DesktopRowFrame>
              <div className="min-w-[10.5rem] flex-1 basis-0">
                <RotatingImageSlot
                  altLabel={matrix.slotAltLabel}
                  className="h-[4.9rem] w-full lg:h-[5.3rem]"
                  delayMs={0}
                  images={matrix.imageSlots.slotA}
                />
              </div>
              <p className="shrink-0 text-center font-sans text-[clamp(3.35rem,5.8vw,5.9rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-[#d1b8a0]/76 whitespace-nowrap">
                {matrix.rows.branding}
              </p>
              <div className="min-w-[10.5rem] flex-1 basis-0">
                <RotatingImageSlot
                  altLabel={matrix.slotAltLabel}
                  className="h-[4.9rem] w-full lg:h-[5.3rem]"
                  delayMs={180}
                  images={matrix.imageSlots.slotB}
                />
              </div>
            </DesktopRowFrame>

            <DesktopRowFrame>
              <p className="shrink-0 font-sans text-[clamp(3.25rem,5.8vw,5.8rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-[#d1b8a0]/76 whitespace-nowrap">
                {matrix.rows.marketing}
              </p>
              <div className="min-w-[12rem] flex-1 basis-0">
                <RotatingImageSlot
                  altLabel={matrix.slotAltLabel}
                  className="h-[4.9rem] w-full lg:h-[5.3rem]"
                  delayMs={360}
                  images={matrix.imageSlots.slotC}
                />
              </div>
              <p className="shrink-0 text-right font-sans text-[clamp(3rem,5.1vw,4.9rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-[#d1b8a0]/76 whitespace-nowrap">
                {matrix.rows.socials}
              </p>
            </DesktopRowFrame>

            <DesktopRowFrame>
              <div className="min-w-[10.5rem] flex-1 basis-0">
                <RotatingImageSlot
                  altLabel={matrix.slotAltLabel}
                  className="h-[4.9rem] w-full lg:h-[5.3rem]"
                  delayMs={540}
                  images={matrix.imageSlots.slotD}
                />
              </div>
              <p className="shrink-0 text-center font-sans text-[clamp(3.4rem,6vw,6rem)] font-semibold leading-[0.9] tracking-[-0.078em] text-[#d1b8a0]/76 whitespace-nowrap">
                {matrix.rows.storytelling}
              </p>
              <div className="min-w-[10.5rem] flex-1 basis-0">
                <RotatingImageSlot
                  altLabel={matrix.slotAltLabel}
                  className="h-[4.9rem] w-full lg:h-[5.3rem]"
                  delayMs={720}
                  images={matrix.imageSlots.slotE}
                />
              </div>
            </DesktopRowFrame>
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
